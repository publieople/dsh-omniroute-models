import z from '@deepseek-ai/schemastery';
import { settingsNamespace } from '@deepseek-ai/dsh-settings';
import { WebError } from '@deepseek-ai/dsh-web';
export const name = '@dsh-external/dsh-omniroute-models';
export const inject = ['webServer', 'web'];
export const Config = z.object({
    provider: z.string().default('omniroute'),
    baseURL: z.string().default('http://localhost:20128/v1'),
    apiKeyEnv: z.string().default('OMNIROUTE_API_KEY'),
});
/** Split a model id into its vendor namespace and the rest (`opencode-go/deepseek-x` → `{ vendor: 'opencode-go', rest: 'deepseek-x' }`). */
function splitVendor(id) {
    const slash = id.indexOf('/');
    if (slash <= 0)
        return { vendor: '', rest: id };
    return { vendor: id.slice(0, slash), rest: id.slice(slash + 1) };
}
/**
 * Whether this route's endpoint can be listed through an OpenAI-shaped
 * `GET {baseURL}/models`. OmniRoute is a protocol-translating gateway: its
 * model catalog is protocol-agnostic and always served as OpenAI format, so
 * even a route DSH talks to as `anthropic-messages` (or `openai-responses`)
 * still exposes a listable `/v1/models` carrying `input_modalities`. What
 * matters is the discovery shape, not the chat protocol the route speaks.
 */
function isCatalogListable(api) {
    return !api || ['openai-completions', 'openai-responses', 'anthropic-messages'].includes(api);
}
const NS = settingsNamespace('llm-pi-ai');
const DEFAULT_CONTEXT_WINDOW = 262144;
const DEFAULT_MAX_TOKENS = 32768;
const DEFAULT_BASE_URL = 'http://localhost:20128/v1';
function joinUrl(base, path) {
    const b = base.replace(/\/+$/, '');
    return b + '/' + path.replace(/^\/+/, '');
}
function readPath(provider) {
    return ['providers', provider, 'models'];
}
async function readBody(req) {
    let data = '';
    for await (const chunk of req)
        data += chunk;
    return data;
}
function sendJson(res, status, body) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify(body));
}
function asProviders(section) {
    if (!section || typeof section !== 'object')
        return {};
    const p = section.providers;
    if (!p || typeof p !== 'object')
        return {};
    return p;
}
function buildDirectory(providers, defaultBaseURL) {
    return Object.keys(providers).map((route) => {
        const p = providers[route];
        return {
            provider: route,
            displayName: p.displayName || route,
            api: p.api,
            baseURL: p.baseURL || defaultBaseURL,
            modelCount: (p.models ?? []).length,
            compatible: isCatalogListable(p.api),
        };
    });
}
const KNOWN_MODALITIES = new Set(['text', 'image']);
function clampInput(list) {
    if (!Array.isArray(list))
        return [];
    const out = list.filter((m) => typeof m === 'string' && KNOWN_MODALITIES.has(m));
    if (out.length === 0)
        return [];
    if (!out.includes('text'))
        out.unshift('text');
    return out;
}
function normalizeInput(model) {
    const mods = clampInput(model.input_modalities);
    if (mods.length > 0)
        return mods;
    if (model.capabilities?.vision)
        return ['text', 'image'];
    return ['text'];
}
function modelIdOf(m) {
    return typeof m?.id === 'string' && m.id.trim() !== '' ? m.id : undefined;
}
const NON_CHAT_TYPES = new Set(['embedding', 'video', 'image', 'audio', 'music', 'rerank']);
async function fetchCatalog(baseURL, apiKey, profile, currentProfile) {
    const enabledIds = new Set((currentProfile ?? []).map((m) => m.id));
    const storedById = new Map((currentProfile ?? []).map((m) => [m.id, m]));
    const endpoint = joinUrl(baseURL, 'models');
    const headers = {};
    if (apiKey)
        headers['Authorization'] = `Bearer ${apiKey}`;
    const res = await fetch(endpoint, { headers, signal: AbortSignal.timeout(8000) });
    if (!res.ok)
        throw new Error(`端点 ${endpoint} 返回 ${res.status}`);
    const json = (await res.json());
    const data = Array.isArray(json.data) ? json.data : [];
    const seen = new Set();
    const rows = [];
    for (const raw of data) {
        const m = raw;
        const id = modelIdOf(m);
        if (!id || seen.has(id))
            continue;
        // Drop non-chat entries the gateway advertises (embedding / image / video / ...):
        // they must never be whitelisted as chat models (they'd otherwise get input ['text']).
        if (typeof m.type === 'string' && NON_CHAT_TYPES.has(m.type))
            continue;
        seen.add(id);
        const stored = storedById.get(id);
        const input = stored?.input && stored.input.length > 0 ? stored.input : normalizeInput(m);
        rows.push({
            id,
            vendor: splitVendor(id).vendor,
            name: stored?.name || (typeof m.name === 'string' && m.name !== '' ? m.name : id),
            contextWindow: typeof stored?.contextWindow === 'number' ? stored.contextWindow : typeof m.context_length === 'number' ? m.context_length : typeof m.max_input_tokens === 'number' ? m.max_input_tokens : profile.defaultContextWindow ?? DEFAULT_CONTEXT_WINDOW,
            maxTokens: typeof stored?.maxTokens === 'number' ? stored.maxTokens : typeof m.max_output_tokens === 'number' ? m.max_output_tokens : profile.defaultMaxTokens ?? DEFAULT_MAX_TOKENS,
            input,
            enabled: enabledIds.has(id),
        });
    }
    return rows;
}
// ---- Model catalog cache (OmniRoute /v1/models can be slow — cache per base URL) ----
const CATALOG_TTL_MS = 5 * 60_000;
const catalogCache = new Map();
// ---- Web search: plugin-owned settings section + ctx.web provider ----
const SEARCH_NS = settingsNamespace('omniroute-models');
/** Schema for the plugin-owned `omniroute-models` settings section (search). */
export const searchSectionSchema = z.object({
    searchEnabled: z.boolean().default(false),
    searchProvider: z.string().default(''),
    searchBaseURL: z.string().default(DEFAULT_BASE_URL),
    searchApiKeyEnv: z.string().default('OMNIROUTE_API_KEY'),
    searchApiKey: z.string().role('secret').default(''),
    searchMaxResults: z.number().step(1).min(1).max(50).default(8),
});
function resolveSearch(value) {
    const v = (value ?? {});
    return {
        searchEnabled: v.searchEnabled === true,
        searchProvider: typeof v.searchProvider === 'string' ? v.searchProvider : '',
        searchBaseURL: typeof v.searchBaseURL === 'string' && v.searchBaseURL ? v.searchBaseURL : DEFAULT_BASE_URL,
        searchApiKeyEnv: typeof v.searchApiKeyEnv === 'string' ? v.searchApiKeyEnv : 'OMNIROUTE_API_KEY',
        searchApiKey: typeof v.searchApiKey === 'string' ? v.searchApiKey : '',
        searchMaxResults: typeof v.searchMaxResults === 'number' && Number.isInteger(v.searchMaxResults) ? v.searchMaxResults : 8,
    };
}
function searchKeyOf(s) {
    if (s.searchApiKey && s.searchApiKey.trim())
        return s.searchApiKey;
    if (s.searchApiKeyEnv && s.searchApiKeyEnv.trim())
        return process.env[s.searchApiKeyEnv] || undefined;
    return undefined;
}
/** The provider registered into `ctx.web` so DSH's `web_search` uses OmniRoute. */
function makeSearchProvider(s) {
    return {
        id: 'omniroute',
        available() {
            return s.searchEnabled && /^https?:\/\//.test(s.searchBaseURL) && !!searchKeyOf(s);
        },
        async search(req, signal) {
            const key = searchKeyOf(s);
            const endpoint = joinUrl(s.searchBaseURL, 'search');
            const body = { query: req.query, max_results: req.maxResults ?? s.searchMaxResults };
            if (s.searchProvider)
                body.provider = s.searchProvider;
            const headers = { 'Content-Type': 'application/json' };
            if (key)
                headers['Authorization'] = `Bearer ${key}`;
            const res = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(body), signal });
            const json = (await res.json().catch(() => ({})));
            if (!res.ok) {
                const err = json.error;
                const msg = typeof err?.message === 'string' ? err.message : typeof json.message === 'string' ? json.message : `OmniRoute search failed (${res.status})`;
                throw new WebError(msg, 'WEB_PROVIDER_ERROR');
            }
            const rawItems = Array.isArray(json.data) ? json.data : Array.isArray(json.results) ? json.results : Array.isArray(json.sources) ? json.sources : [];
            const sources = rawItems
                .map((it) => {
                const o = (it ?? {});
                const url = typeof o.url === 'string' ? o.url : typeof o.link === 'string' ? o.link : '';
                const title = typeof o.title === 'string' ? o.title : typeof o.name === 'string' ? o.name : undefined;
                const snippet = typeof o.snippet === 'string' ? o.snippet : typeof o.description === 'string' ? o.description : undefined;
                const publishedAt = typeof o.publishedAt === 'string' ? o.publishedAt : typeof o.published_at === 'string' ? o.published_at : undefined;
                return { url, title, snippet, publishedAt };
            })
                .filter((s) => s.url.length > 0);
            return {
                content: typeof json.content === 'string' ? json.content : typeof json.answer === 'string' ? json.answer : undefined,
                sources,
                truncated: false,
            };
        },
    };
}
/** Best-effort list of OmniRoute's configured search providers (GET /v1/search). */
async function omniSearchProviders(s) {
    const key = searchKeyOf(s);
    const endpoint = joinUrl(s.searchBaseURL, 'search');
    const headers = {};
    if (key)
        headers['Authorization'] = `Bearer ${key}`;
    try {
        const res = await fetch(endpoint, { headers, signal: AbortSignal.timeout(8000) });
        if (!res.ok)
            return [];
        const json = (await res.json());
        return (json.data ?? []).map((p) => {
            const o = (p ?? {});
            return { id: typeof o.id === 'string' ? o.id : '', name: typeof o.name === 'string' ? o.name : undefined };
        }).filter((p) => p.id.length > 0);
    }
    catch {
        return [];
    }
}
export function apply(ctx, config) {
    const apiRoot = '/omniroute-models/api';
    const resolveSettings = () => ctx.get('settings');
    // Diagnostic: report what DSH's LLM seam actually resolves for one provider/model
    // (inputModalities is what the image-attachment check reads).
    ctx.effect(() => ctx.webServer.register({
        kind: 'exact',
        path: `${apiRoot}/resolve`,
        handler: (req, res) => {
            void (async () => {
                try {
                    const llm = ctx.get('llm');
                    if (!llm?.resolveModelInfo) {
                        sendJson(res, 503, { error: 'llm 服务不可用' });
                        return;
                    }
                    const url = new URL(req.url ?? '/', 'http://localhost');
                    const provider = url.searchParams.get('provider') ?? config.provider ?? 'omniroute';
                    const model = url.searchParams.get('model') ?? '';
                    if (!model) {
                        sendJson(res, 400, { error: '缺少 model 参数' });
                        return;
                    }
                    const info = await llm.resolveModelInfo(provider, model, AbortSignal.timeout(8000));
                    sendJson(res, 200, {
                        provider,
                        model,
                        inputModalities: info.inputModalities,
                        contextWindow: info.context?.contextWindow,
                        defaultMaxTokens: info.defaultMaxTokens,
                        reasoning: info.reasoning,
                    });
                }
                catch (e) {
                    sendJson(res, 502, { error: String(e.message ?? e) });
                }
            })();
        },
    }), 'omniroute-models: resolve route');
    ctx.effect(() => ctx.webServer.register({
        kind: 'exact',
        path: `${apiRoot}/catalog`,
        handler: (req, res) => {
            void (async () => {
                try {
                    const settings = resolveSettings();
                    const section = settings?.get(NS);
                    const providers = asProviders(section);
                    const url = new URL(req.url ?? '/', 'http://localhost');
                    const qs = url.searchParams.get('provider') ?? config.provider ?? 'omniroute';
                    const route = providers[qs] ? qs : Object.keys(providers)[0] ?? qs;
                    const profile = providers[route] ?? {};
                    const baseURL = profile.baseURL || config.baseURL || DEFAULT_BASE_URL;
                    const apiKeyEnv = profile.apiKeyEnv || config.apiKeyEnv;
                    const apiKey = (apiKeyEnv && process.env[apiKeyEnv]) || url.searchParams.get('apiKey') || undefined;
                    const currentProfile = profile.models ?? [];
                    if (!providers[route] && Object.keys(providers).length === 0) {
                        sendJson(res, 200, {
                            configured: false,
                            provider: qs,
                            providers: buildDirectory(providers, config.baseURL || DEFAULT_BASE_URL),
                            baseURL,
                            code: 'catalog.notConfigured',
                            params: {},
                            message: '未发现 llm-pi-ai 提供方配置，请先在「模型」设置中添加对应路由（baseURL + apiKeyEnv）。',
                        });
                        return;
                    }
                    if (!isCatalogListable(profile.api)) {
                        sendJson(res, 200, {
                            configured: true,
                            compatible: false,
                            provider: route,
                            displayName: profile.displayName || route,
                            api: profile.api,
                            baseURL,
                            providers: buildDirectory(providers, config.baseURL || DEFAULT_BASE_URL),
                            models: [],
                            enabledCount: 0,
                            totalCount: 0,
                            code: 'catalog.notCompatible',
                            params: { api: profile.api ?? '', route },
                            message: `该供应商协议 "${profile.api}" 不是 OpenAI 兼容，无法自动拉取模型。请在 settings.yaml 手动维护 ${route} 的 models。`,
                        });
                        return;
                    }
                    const cacheKey = baseURL;
                    const cached = catalogCache.get(cacheKey);
                    let models;
                    if (cached && Date.now() - cached.at < CATALOG_TTL_MS) {
                        models = cached.models;
                    }
                    else {
                        models = await fetchCatalog(baseURL, apiKey, profile, currentProfile);
                        catalogCache.set(cacheKey, { at: Date.now(), models });
                    }
                    sendJson(res, 200, {
                        configured: true,
                        compatible: true,
                        provider: route,
                        displayName: profile.displayName || route,
                        api: profile.api,
                        baseURL,
                        endpoint: joinUrl(baseURL, 'models'),
                        providers: buildDirectory(providers, config.baseURL || DEFAULT_BASE_URL),
                        models,
                        enabledCount: models.filter((m) => m.enabled).length,
                        totalCount: models.length,
                    });
                }
                catch (e) {
                    sendJson(res, 502, { error: String(e.message ?? e) });
                }
            })();
        },
    }), 'omniroute-models: catalog route');
    ctx.effect(() => ctx.webServer.register({
        kind: 'exact',
        path: `${apiRoot}/apply`,
        handler: (req, res) => {
            void (async () => {
                try {
                    const settings = resolveSettings();
                    if (!settings) {
                        sendJson(res, 503, { error: 'settings 服务不可用（未挂载 llm-pi-ai 提供方）', code: 'apply.noSettings', params: {} });
                        return;
                    }
                    const body = JSON.parse((await readBody(req)) || '{}');
                    const provider = body.provider || config.provider || 'omniroute';
                    const models = Array.isArray(body.models) ? body.models : [];
                    if (models.length === 0) {
                        sendJson(res, 400, { error: '至少需要勾选 1 个模型（空列表会让手工声明路由不可服务）', code: 'apply.emptyModels', params: {} });
                        return;
                    }
                    const seen = new Set();
                    for (const m of models) {
                        const id = modelIdOf(m);
                        if (!id) {
                            sendJson(res, 400, { error: '存在空模型 id', code: 'apply.emptyId', params: {} });
                            return;
                        }
                        if (seen.has(id)) {
                            sendJson(res, 400, { error: `重复模型 id: ${id}`, code: 'apply.duplicateId', params: { id } });
                            return;
                        }
                        seen.add(id);
                    }
                    const patch = models.map((m) => {
                        const id = modelIdOf(m);
                        const input = clampInput(m.input);
                        if (input.length === 0) {
                            sendJson(res, 400, { error: `模型 ${id} 缺少有效模态（只支持 text/image）`, code: 'apply.noModality', params: { id } });
                            return null;
                        }
                        const out = { id, input };
                        if (typeof m.name === 'string' && m.name !== '')
                            out.name = m.name;
                        if (typeof m.contextWindow === 'number')
                            out.contextWindow = m.contextWindow;
                        if (typeof m.maxTokens === 'number')
                            out.maxTokens = m.maxTokens;
                        return out;
                    });
                    if (patch.some((p) => p === null))
                        return;
                    const desc = settings.describe().find((d) => d.ns === NS);
                    const expectedRevision = typeof body.expectedRevision === 'number' ? body.expectedRevision : desc?.revision;
                    await settings.mutate(NS, [{ op: 'set', path: readPath(provider), value: patch }], expectedRevision);
                    catalogCache.clear();
                    sendJson(res, 200, { ok: true, provider, count: patch.length });
                }
                catch (e) {
                    const err = e;
                    const code = err.code;
                    const status = code === 'SETTINGS_CONFLICT' ? 409 : code === 'settings-rejected' ? 422 : 500;
                    sendJson(res, status, { error: String(err.message ?? e), code });
                }
            })();
        },
    }), 'omniroute-models: apply route');
    // Web search: own the `omniroute-models` settings section and sync a
    // `ctx.web` search provider so DSH's `web_search` uses OmniRoute.
    let searchSection = resolveSearch(undefined);
    let searchDisposer = null;
    let searchRegistered = false;
    ctx.effect(() => {
        const settings = resolveSettings();
        let scope;
        if (settings) {
            try {
                scope = settings.register(SEARCH_NS, searchSectionSchema, { applies: 'live' });
            }
            catch {
                scope = undefined; // already registered (re-entrant composition) — read via settings.get
            }
        }
        const sync = (value) => {
            searchSection = resolveSearch(value);
            const webRuntime = ctx.get('web');
            if (!webRuntime)
                return;
            if (searchSection.searchEnabled && !searchRegistered) {
                searchDisposer = webRuntime.registerSearchProvider(makeSearchProvider(searchSection));
                searchRegistered = true;
            }
            else if (!searchSection.searchEnabled && searchRegistered) {
                searchDisposer?.();
                searchDisposer = null;
                searchRegistered = false;
            }
        };
        if (scope) {
            sync(scope.get());
            const unsub = scope.watch(() => sync(scope.get()));
            return () => { unsub(); };
        }
        return () => { };
    }, 'omniroute-models: search provider');
    // Search config: GET (read) / POST (write) one same-origin route.
    ctx.effect(() => ctx.webServer.register({
        kind: 'exact',
        path: `${apiRoot}/search-config`,
        handler: (req, res) => {
            void (async () => {
                try {
                    const settings = resolveSettings();
                    if (!settings) {
                        sendJson(res, 503, { error: 'settings 服务不可用' });
                        return;
                    }
                    if (req.method === 'POST') {
                        const body = JSON.parse((await readBody(req)) || '{}');
                        const config = resolveSearch(body.config);
                        const desc = settings.describe().find((d) => d.ns === SEARCH_NS);
                        const expectedRevision = typeof body.expectedRevision === 'number' ? body.expectedRevision : desc?.revision;
                        await settings.mutate(SEARCH_NS, [{ op: 'set', path: [], value: config }], expectedRevision);
                        sendJson(res, 200, { ok: true, config });
                        return;
                    }
                    const section = settings.get(SEARCH_NS);
                    const config = resolveSearch(section);
                    const providers = await omniSearchProviders(config);
                    const desc = settings.describe().find((d) => d.ns === SEARCH_NS);
                    sendJson(res, 200, { config, providers, revision: desc?.revision });
                }
                catch (e) {
                    const err = e;
                    const code = err.code;
                    const status = code === 'SETTINGS_CONFLICT' ? 409 : code === 'settings-rejected' ? 422 : 500;
                    sendJson(res, status, { error: String(err.message ?? e), code });
                }
            })();
        },
    }), 'omniroute-models: search-config route');
    // Search connectivity test with the caller's current (possibly unsaved) config.
    ctx.effect(() => ctx.webServer.register({
        kind: 'exact',
        path: `${apiRoot}/search-test`,
        handler: (req, res) => {
            void (async () => {
                try {
                    const body = JSON.parse((await readBody(req)) || '{}');
                    const config = resolveSearch(body.config);
                    const key = searchKeyOf(config);
                    if (!key || !/^https?:\/\//.test(config.searchBaseURL)) {
                        sendJson(res, 200, { ok: false, error: '需要网关地址与密钥', code: 'search.minKey' });
                        return;
                    }
                    const endpoint = joinUrl(config.searchBaseURL, 'search');
                    const requestBody = { query: 'deepseek harness', max_results: 1 };
                    if (config.searchProvider)
                        requestBody.provider = config.searchProvider;
                    const probe = await fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
                        body: JSON.stringify(requestBody),
                        signal: AbortSignal.timeout(20000),
                    });
                    const json = (await probe.json().catch(() => ({})));
                    if (!probe.ok) {
                        const err = json.error;
                        const msg = typeof err?.message === 'string' ? err.message : `搜索失败（${probe.status}）`;
                        sendJson(res, 200, { ok: false, error: msg, code: 'upstream_error' });
                        return;
                    }
                    const rawItems = Array.isArray(json.data) ? json.data : Array.isArray(json.results) ? json.results : [];
                    sendJson(res, 200, { ok: true, count: rawItems.length });
                }
                catch (e) {
                    sendJson(res, 200, { ok: false, error: String(e.message ?? e) });
                }
            })();
        },
    }), 'omniroute-models: search-test route');
    // Background catalog prefetch: keep the model cache warm so the settings page
    // opens fast even on first visit (OmniRoute /v1/models can take ~6s). Runs on
    // activation and every TTL interval; never blocks a caller (fire-and-forget).
    let prefetching = false;
    const prefetchCatalog = async () => {
        if (prefetching)
            return;
        prefetching = true;
        try {
            const settings = resolveSettings();
            const section = settings?.get(NS);
            const providers = asProviders(section);
            if (Object.keys(providers).length === 0)
                return;
            const preferred = config.provider ?? 'omniroute';
            const route = providers[preferred] ? preferred : Object.keys(providers)[0];
            const profile = providers[route] ?? {};
            if (!isCatalogListable(profile.api))
                return;
            const baseURL = profile.baseURL || config.baseURL || DEFAULT_BASE_URL;
            const apiKeyEnv = profile.apiKeyEnv || config.apiKeyEnv;
            const apiKey = (apiKeyEnv && process.env[apiKeyEnv]) || undefined;
            const currentProfile = profile.models ?? [];
            const models = await fetchCatalog(baseURL, apiKey, profile, currentProfile);
            catalogCache.set(baseURL, { at: Date.now(), models });
        }
        catch {
            // silent — retry on the next interval
        }
        finally {
            prefetching = false;
        }
    };
    ctx.effect(() => {
        void prefetchCatalog();
        const timer = setInterval(() => void prefetchCatalog(), CATALOG_TTL_MS);
        return () => clearInterval(timer);
    }, 'omniroute-models: catalog prefetch');
    ctx.logger?.info?.('[omniroute-models] routes mounted at ' + apiRoot);
}
//# sourceMappingURL=index.js.map