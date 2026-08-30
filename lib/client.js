window.__ModuleLoader__.load({
	id: "@dsh-external/dsh-omniroute-models",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/locales.ts
		/**
		* `omniroute-models` client namespace dictionaries (zh/en).
		*
		* `zh` is the key-set source of truth (Chinese-first repo convention); `en` is
		* typed `Record<OmniKey, string>` so a missing English key is a compile error.
		* Registered into the DSH locale runtime (`ctx.locale.register(NS, dictionaries)`)
		* and bound with `ctx.locale.bind(NS)`; the settings section reads copy through
		* the framework-injected `t` seat.
		*/
		/** Simplified Chinese dictionary (key-set source of truth). */
		const zh = {
			nav: "OmniRoute 模型管理",
			"tab.models": "模型管理",
			"tab.search": "联网搜索",
			"head.title": "模型管理",
			"toolbar.route": "路由",
			"toolbar.search": "搜索模型 id 或名称…",
			"filter.modality.all": "全部模态",
			"filter.modality.text": "仅文本",
			"filter.modality.image": "视觉（含图片）",
			"filter.vendor.all": "全部供应商",
			"filter.vendor.none": "无命名空间",
			"filter.enabled.all": "全部",
			"filter.enabled.enabled": "已启用",
			"filter.enabled.disabled": "未启用",
			"action.selectMatching": "全选匹配",
			"action.deselectAll": "全不选",
			"action.refresh": "拉取",
			"action.save": "保存所选",
			"action.saving": "保存中…",
			"action.prevPage": "上一页",
			"action.nextPage": "下一页",
			"action.back": "返回",
			"col.model": "模型",
			"col.modality": "模态",
			"col.context": "上下文",
			"col.output": "输出",
			"modality.textImage": "text + image",
			"modality.text": "text",
			"counts.enabled": "已启用 {enabled} / {total}",
			"counts.selected": "已选 {checked} · 匹配 {matched} · 共 {total}",
			"counts.page": "第 {page} / {totalPages} 页",
			"status.saved": "已保存 {count} 个模型",
			"status.minOne": "至少勾选 1 个模型",
			"status.applyFailed": "应用失败",
			"empty.noMatch": "无匹配模型",
			"loading.fetching": "正在拉取 OmniRoute 模型…",
			"error.loadFailed": "加载失败",
			"error.retry": "重试",
			"configured.title": "OmniRoute 模型管理",
			"configured.notSet": "未配置 OmniRoute 提供方。",
			"configured.recheck": "重新检查",
			"notCompatible.msg": "该供应商不支持自动发现。",
			"option.notDiscoverable": "不可自动发现",
			"note.save": "保存即整体替换该路由的 models 列表（DSH 恰好能用勾选的这些）；筛选只影响显示，不影响已勾选的保存内容；未保存前不落盘。",
			"aria.selectModel": "选择 {id}",
			"search.title": "联网搜索",
			"search.enabled": "启用 OmniRoute 联网搜索",
			"search.provider": "搜索后端",
			"search.provider.auto": "OmniRoute 默认",
			"search.baseURL": "网关地址",
			"search.apiKeyEnv": "密钥环境变量",
			"search.maxResults": "结果上限",
			"search.advanced": "高级",
			"search.test": "测试连接",
			"search.testing": "测试中…",
			"search.testOk": "连接成功：{count} 条结果",
			"search.testFail": "测试失败：{error}",
			"search.save": "保存搜索配置",
			"search.saved": "搜索配置已保存",
			"search.minKey": "启用搜索需配置网关地址与密钥环境变量。",
			"search.hint": "在 OmniRoute 后台给所选搜索引擎（Tavily/Brave/Ollama 等）配置 API key 后，DSH 的 web_search 才会返回结果。",
			"host.catalog.notConfigured": "未发现 llm-pi-ai 提供方配置，请先在「模型」设置中添加对应路由（baseURL + apiKeyEnv）。",
			"host.catalog.notCompatible": "该供应商协议 \"{api}\" 不是 OpenAI 兼容，无法自动拉取模型。请在 settings.yaml 手动维护 {route} 的 models。",
			"host.apply.emptyModels": "至少需要勾选 1 个模型（空列表会让手工声明路由不可服务）",
			"host.apply.emptyId": "存在空模型 id",
			"host.apply.duplicateId": "重复模型 id: {id}",
			"host.apply.noModality": "模型 {id} 缺少有效模态（只支持 text/image）",
			"host.apply.noSettings": "settings 服务不可用（未挂载 llm-pi-ai 提供方）"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			nav: "OmniRoute model manager",
			"tab.models": "Models",
			"tab.search": "Web search",
			"head.title": "Models",
			"toolbar.route": "Route",
			"toolbar.search": "Search model id or name…",
			"filter.modality.all": "All modalities",
			"filter.modality.text": "Text only",
			"filter.modality.image": "Vision (with images)",
			"filter.vendor.all": "All vendors",
			"filter.vendor.none": "No namespace",
			"filter.enabled.all": "All",
			"filter.enabled.enabled": "Enabled",
			"filter.enabled.disabled": "Disabled",
			"action.selectMatching": "Select matching",
			"action.deselectAll": "Clear all",
			"action.refresh": "Refresh",
			"action.save": "Save selected",
			"action.saving": "Saving…",
			"action.prevPage": "Previous",
			"action.nextPage": "Next",
			"action.back": "Back",
			"col.model": "Model",
			"col.modality": "Modality",
			"col.context": "Context",
			"col.output": "Output",
			"modality.textImage": "text + image",
			"modality.text": "text",
			"counts.enabled": "Enabled {enabled} / {total}",
			"counts.selected": "Selected {checked} · Matching {matched} · Of {total}",
			"counts.page": "Page {page} / {totalPages}",
			"status.saved": "Saved {count} models",
			"status.minOne": "Select at least 1 model",
			"status.applyFailed": "Apply failed",
			"empty.noMatch": "No matching models",
			"loading.fetching": "Fetching OmniRoute models…",
			"error.loadFailed": "Load failed",
			"error.retry": "Retry",
			"configured.title": "OmniRoute model manager",
			"configured.notSet": "No OmniRoute provider is configured.",
			"configured.recheck": "Recheck",
			"notCompatible.msg": "This provider does not support auto-discovery.",
			"option.notDiscoverable": "auto-discovery unavailable",
			"note.save": "Saving replaces this route’s models list in one go (DSH serves exactly the checked ones). Filters only narrow the view — they never change what a save writes. Nothing is written until you save.",
			"aria.selectModel": "Select {id}",
			"search.title": "Web search",
			"search.enabled": "Enable OmniRoute web search",
			"search.provider": "Search backend",
			"search.provider.auto": "OmniRoute default",
			"search.baseURL": "Gateway base URL",
			"search.apiKeyEnv": "Key environment variable",
			"search.maxResults": "Max results",
			"search.advanced": "Advanced",
			"search.test": "Test connection",
			"search.testing": "Testing…",
			"search.testOk": "OK: {count} results",
			"search.testFail": "Test failed: {error}",
			"search.save": "Save search config",
			"search.saved": "Search config saved",
			"search.minKey": "A gateway base URL and a key environment variable are required to enable search.",
			"search.hint": "After configuring an API key for the chosen search engine (Tavily/Brave/Ollama, …) in OmniRoute, DSH’s web_search will return results.",
			"host.catalog.notConfigured": "No llm-pi-ai provider is configured. Add the route (baseURL + apiKeyEnv) in the “Models” settings first.",
			"host.catalog.notCompatible": "Provider protocol \"{api}\" is not OpenAI-compatible and cannot be listed automatically. Maintain {route}’s models in settings.yaml instead.",
			"host.apply.emptyModels": "Select at least 1 model (an empty list would make a manually-declared route unserviceable)",
			"host.apply.emptyId": "A model id is missing",
			"host.apply.duplicateId": "Duplicate model id: {id}",
			"host.apply.noModality": "Model {id} has no valid modality (only text/image are supported)",
			"host.apply.noSettings": "The settings service is unavailable (no llm-pi-ai provider is mounted)"
		};
		/** Locale namespace of this plugin's client half. */
		const NS = "omniroute-models";
		/** The two dictionaries, keyed by locale id. */
		const dictionaries = {
			zh,
			en
		};
		//#endregion
		//#region src/client/index.tsx
		/**
		* @dsh-external/dsh-omniroute-models — client half.
		*
		* Registers a `settings.section` page ("OmniRoute 模型管理"), localized through
		* the DSH locale runtime (`ctx.locale`). Copy lives in `./locales.ts`
		* (namespace `omniroute-models`, zh/en); the section reads it via the
		* framework-injected `t` seat. All styling uses DSH's theme tokens.
		*/
		const name = "@dsh-external/dsh-omniroute-models";
		const inject = ["slots", "locale"];
		const API = "/omniroute-models/api";
		const PAGE_SIZE = 50;
		const STYLE = `
.om-root{color:var(--dsw-alias-label-primary);font-size:15px;line-height:1.6;font-family:var(--dsw-font-family,system-ui)}
.om-root *{box-sizing:border-box}
.om-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 12px;margin-bottom:12px}
.om-title{font-size:18px;font-weight:600;color:var(--dsw-alias-label-primary);margin:0}
.om-sub{font-size:13px;color:var(--dsw-alias-label-secondary)}
.om-count{margin-left:auto;font-size:13px;color:var(--dsw-alias-label-secondary)}
.om-toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px}
.om-input,.om-select{min-height:38px;padding:7px 12px;font-size:14px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px}
.om-input::placeholder{color:var(--dsw-alias-label-tertiary)}
.om-btn{min-height:38px;padding:7px 14px;font-size:14px;font-weight:500;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;cursor:pointer;transition:background .15s ease,border-color .15s ease}
.om-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.08))}
.om-btn:disabled{opacity:.5;cursor:not-allowed}
.om-btn.primary{color:var(--dsw-alias-label-primary-inverted,#fff);background:var(--dsw-alias-button-primary-fill);border-color:transparent}
.om-btn.primary:hover{background:var(--dsw-alias-button-primary-hover)}
.om-input:focus-visible,.om-select:focus-visible,.om-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
.om-table-wrap{overflow-x:auto;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1)}
.om-table{width:100%;table-layout:fixed;border-collapse:collapse;font-size:14px}
.om-table thead th{position:sticky;top:0;z-index:1;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:600;text-align:left;padding:10px 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:1px solid var(--dsw-alias-border-l1)}
.om-table tbody td{padding:10px 12px;border-bottom:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-primary);vertical-align:top;overflow-wrap:anywhere}
.om-table tbody tr:last-child td{border-bottom:none}
.om-table tbody tr:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.08))}
.om-table tbody tr.om-sel{background:var(--dsw-alias-interactive-bg-hover-accent,rgba(22,102,192,.1))}
.om-model-cell{overflow-wrap:anywhere}
.om-vendor{color:var(--dsw-alias-label-secondary);font-weight:600;font-size:13px}
.om-id{overflow-wrap:anywhere;word-break:break-word}
.om-meta{color:var(--dsw-alias-label-secondary);font-size:13px;white-space:nowrap}
.om-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;font-size:12px;font-weight:600;border-radius:999px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);white-space:nowrap}
.om-badge.img{color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-interactive-bg-hover-accent,rgba(22,102,192,.12));border-color:var(--dsw-alias-border-l2)}
.om-foot{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:14px}
.om-status{font-size:13px}
.om-status.ok{color:var(--dsw-alias-state-success-primary)}
.om-status.err{color:var(--dsw-alias-state-error-primary)}
.om-empty{color:var(--dsw-alias-label-secondary);text-align:center;padding:32px 12px}
.om-note{color:var(--dsw-alias-label-tertiary);font-size:12px;margin-top:10px}
.om-card{border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-1);padding:20px;max-width:620px}
.om-card h3{font-size:16px;font-weight:600;color:var(--dsw-alias-label-primary);margin:0 0 8px}
.om-card p{color:var(--dsw-alias-label-secondary);margin:0 0 14px}
.om-skel{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:20px;background:var(--dsw-alias-bg-layer-1)}
.om-skel .bar{height:14px;border-radius:6px;background:var(--dsw-alias-bg-skeleton);margin:0 0 12px}
.om-check{width:16px;height:16px;accent-color:var(--dsw-alias-brand-primary);cursor:pointer}
.om-tabs{display:flex;gap:2px;border-bottom:1px solid var(--dsw-alias-border-l2,#e5e7eb);align-items:flex-end;margin-bottom:4px;flex-wrap:wrap}
.om-tab{border:none;background:none;font:inherit;font-size:13px;color:var(--dsw-alias-label-secondary,#6b7280);padding:7px 12px;cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap}
.om-tab.on{color:var(--dsw-alias-brand-primary,#4f6ef7);border-bottom-color:var(--dsw-alias-brand-primary,#4f6ef7);font-weight:600}
`;
		/** Translate a host-driven message: prefer the localized `code`, else the raw text. */
		function hostMessage(t, code, params, fallback) {
			const key = "host." + (code ?? "");
			if (code && key in zh) return t(key, params);
			return fallback;
		}
		function apply(ctx) {
			ctx.effect(() => {
				const style = document.createElement("style");
				style.textContent = STYLE;
				document.head.appendChild(style);
				return () => style.remove();
			}, "omniroute-models: styles");
			ctx.effect(() => {
				const disposers = [];
				for (const locale of ["zh", "en"]) disposers.push(ctx.locale.register(NS, locale, dictionaries[locale]));
				return () => {
					for (const dispose of disposers) dispose();
				};
			}, "omniroute-models: copy dictionaries");
			ctx.effect(() => {
				const t = ctx.locale.bind(NS);
				return ctx.slots.inject("settings.section", () => ctx.slots.register({
					name: "settings.section",
					id: "omniroute-models",
					order: 15,
					label: () => t("nav"),
					inject: () => ({ t })
				}, OmnirouteModelsSection));
			}, "omniroute-models: settings.section");
		}
		function fmtTokens(n) {
			if (!n || n <= 0 || !Number.isFinite(n)) return "-";
			if (n >= 1e6) return (n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1) + "M";
			if (n >= 1e3) return (n / 1e3).toFixed(n % 1e3 === 0 ? 0 : 1) + "K";
			return String(n);
		}
		const SEARCH_DEFAULT_BASE = "http://localhost:20128/v1";
		function SearchConfigCard({ t }) {
			const [form, setForm] = (0, react.useState)({
				searchEnabled: false,
				searchProvider: "",
				searchBaseURL: SEARCH_DEFAULT_BASE,
				searchApiKeyEnv: "OMNIROUTE_API_KEY",
				searchApiKey: "",
				searchMaxResults: 8
			});
			const [providers, setProviders] = (0, react.useState)([]);
			const [revision, setRevision] = (0, react.useState)(void 0);
			const [loading, setLoading] = (0, react.useState)(false);
			const [saving, setSaving] = (0, react.useState)(false);
			const [testing, setTesting] = (0, react.useState)(false);
			const [flash, setFlash] = (0, react.useState)(null);
			async function load() {
				setLoading(true);
				setFlash(null);
				try {
					const data = await (await fetch(API + "/search-config", { cache: "no-store" })).json();
					if (data.config) setForm((f) => ({
						...f,
						...data.config
					}));
					setProviders(data.providers ?? []);
					setRevision(data.revision);
				} catch (e) {
					setFlash({
						kind: "err",
						text: String(e.message ?? e)
					});
				} finally {
					setLoading(false);
				}
			}
			(0, react.useEffect)(() => {
				load();
			}, []);
			function field(key, value) {
				setForm((prev) => ({
					...prev,
					[key]: value
				}));
			}
			async function save() {
				setSaving(true);
				setFlash(null);
				try {
					const res = await fetch(API + "/search-config", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							config: form,
							expectedRevision: revision
						})
					});
					const data = await res.json();
					if (!res.ok || !data.ok) {
						setFlash({
							kind: "err",
							text: hostMessage(t, data.code, void 0, data.error ?? t("status.applyFailed"))
						});
						return;
					}
					setFlash({
						kind: "ok",
						text: t("search.saved")
					});
					await load();
				} catch (e) {
					setFlash({
						kind: "err",
						text: String(e.message ?? e)
					});
				} finally {
					setSaving(false);
				}
			}
			async function test() {
				setTesting(true);
				setFlash(null);
				try {
					const data = await (await fetch(API + "/search-test", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ config: form })
					})).json();
					if (data.ok) setFlash({
						kind: "ok",
						text: t("search.testOk", { count: data.count ?? 0 })
					});
					else setFlash({
						kind: "err",
						text: data.error ?? t("search.testFail", { error: "" })
					});
				} catch (e) {
					setFlash({
						kind: "err",
						text: t("search.testFail", { error: String(e.message ?? e) })
					});
				} finally {
					setTesting(false);
				}
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "om-card",
				style: { marginBottom: 16 },
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: t("search.title") }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						style: {
							color: "var(--dsw-alias-label-secondary)",
							margin: "0 0 12px",
							fontSize: 13
						},
						children: t("search.hint")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
						style: {
							display: "inline-flex",
							alignItems: "center",
							gap: 8,
							marginBottom: 10,
							cursor: "pointer"
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							className: "om-check",
							type: "checkbox",
							checked: form.searchEnabled,
							onChange: (e) => field("searchEnabled", e.target.checked)
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "om-sub",
							children: t("search.enabled")
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-toolbar",
						style: { marginBottom: 6 },
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: 6
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "om-sub",
									children: t("search.provider")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
									className: "om-select",
									value: form.searchProvider,
									onChange: (e) => field("searchProvider", e.target.value),
									style: { minWidth: 170 },
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "",
										children: t("search.provider.auto")
									}), providers.map((p) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: p.id,
										children: p.name || p.id
									}, p.id))]
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: 6
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "om-sub",
									children: t("search.maxResults")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									className: "om-input",
									type: "number",
									min: 1,
									max: 50,
									style: { width: 90 },
									value: form.searchMaxResults,
									onChange: (e) => field("searchMaxResults", Number(e.target.value))
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
								style: { color: "var(--dsw-alias-label-secondary)" },
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", {
									className: "om-sub",
									children: t("search.advanced")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										flexWrap: "wrap",
										gap: 8,
										marginTop: 8
									},
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
											style: {
												display: "inline-flex",
												alignItems: "center",
												gap: 6
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "om-sub",
												children: t("search.baseURL")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												className: "om-input",
												style: { width: 220 },
												value: form.searchBaseURL,
												onChange: (e) => field("searchBaseURL", e.target.value)
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
											style: {
												display: "inline-flex",
												alignItems: "center",
												gap: 6
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "om-sub",
												children: t("search.apiKeyEnv")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												className: "om-input",
												style: { width: 150 },
												value: form.searchApiKeyEnv,
												onChange: (e) => field("searchApiKeyEnv", e.target.value)
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
											style: {
												display: "inline-flex",
												alignItems: "center",
												gap: 6
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "om-sub",
												children: "API Key"
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												className: "om-input",
												type: "password",
												style: { width: 160 },
												value: form.searchApiKey,
												placeholder: "(optional)",
												onChange: (e) => field("searchApiKey", e.target.value)
											})]
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-foot",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn",
								onClick: () => void test(),
								disabled: testing || loading,
								children: testing ? t("search.testing") : t("search.test")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn primary",
								onClick: () => void save(),
								disabled: saving || loading,
								children: t("search.save")
							}),
							loading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "om-sub",
								children: t("loading.fetching")
							}),
							flash && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "om-status " + flash.kind,
								role: "status",
								children: flash.text
							})
						]
					})
				]
			});
		}
		function OmnirouteModelsSection(props) {
			const t = props.t;
			const [catalog, setCatalog] = (0, react.useState)(null);
			const [provider, setProvider] = (0, react.useState)("");
			const [loading, setLoading] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)(null);
			const [query, setQuery] = (0, react.useState)("");
			const [modality, setModality] = (0, react.useState)("all");
			const [vendorFilter, setVendorFilter] = (0, react.useState)("all");
			const [enabledFilter, setEnabledFilter] = (0, react.useState)("all");
			const [checked, setChecked] = (0, react.useState)(/* @__PURE__ */ new Set());
			const [saving, setSaving] = (0, react.useState)(false);
			const [flash, setFlash] = (0, react.useState)(null);
			const [page, setPage] = (0, react.useState)(1);
			const [tab, setTab] = (0, react.useState)("models");
			let loadCtrl = null;
			async function load(p) {
				loadCtrl?.abort();
				const ctrl = new AbortController();
				loadCtrl = ctrl;
				setLoading(true);
				setError(null);
				setFlash(null);
				try {
					const qs = p ? `?provider=${encodeURIComponent(p)}` : "";
					const data = await (await fetch(`${API}/catalog${qs}`, {
						cache: "no-store",
						signal: ctrl.signal
					})).json();
					if (ctrl.signal.aborted) return;
					setCatalog(data);
					setProvider(data.provider ?? "");
					const enabled = /* @__PURE__ */ new Set();
					for (const m of data.models ?? []) if (m.enabled) enabled.add(m.id);
					setChecked(enabled);
				} catch (e) {
					if (e.name === "AbortError" || ctrl.signal.aborted) return;
					setError(String(e.message ?? e));
				} finally {
					if (loadCtrl === ctrl) setLoading(false);
				}
			}
			(0, react.useEffect)(() => {
				load();
				return () => {
					loadCtrl?.abort();
				};
			}, []);
			function selectProvider(p) {
				setProvider(p);
				setQuery("");
				setModality("all");
				setVendorFilter("all");
				setEnabledFilter("all");
				load(p);
			}
			const vendors = (0, react.useMemo)(() => {
				const set = /* @__PURE__ */ new Set();
				for (const m of catalog?.models ?? []) set.add(m.vendor);
				return [...set].sort();
			}, [catalog]);
			const filtered = (0, react.useMemo)(() => {
				const models = catalog?.models ?? [];
				const q = query.trim().toLowerCase();
				const out = models.filter((m) => {
					if (q && !m.id.toLowerCase().includes(q) && !(m.name ?? "").toLowerCase().includes(q)) return false;
					if (modality === "image" && !m.input.includes("image")) return false;
					if (modality === "text" && m.input.includes("image")) return false;
					if (vendorFilter !== "all") {
						if (vendorFilter === "") {
							if (m.vendor !== "") return false;
						} else if (m.vendor !== vendorFilter) return false;
					}
					if (enabledFilter === "enabled" && !m.enabled) return false;
					if (enabledFilter === "disabled" && m.enabled) return false;
					return true;
				});
				out.sort((a, b) => a.vendor.localeCompare(b.vendor) || (a.name ?? "").toLowerCase().localeCompare((b.name ?? "").toLowerCase()) || a.id.localeCompare(b.id));
				return out;
			}, [
				catalog,
				query,
				modality,
				vendorFilter,
				enabledFilter
			]);
			const total = catalog?.models?.length ?? 0;
			const enabledCount = catalog?.enabledCount ?? 0;
			const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
			const safePage = Math.min(page, totalPages);
			const paged = (0, react.useMemo)(() => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE), [filtered, safePage]);
			(0, react.useEffect)(() => {
				setPage(1);
			}, [
				query,
				modality,
				vendorFilter,
				enabledFilter,
				catalog
			]);
			function toggle(id) {
				setChecked((prev) => {
					const next = new Set(prev);
					if (next.has(id)) next.delete(id);
					else next.add(id);
					return next;
				});
			}
			async function apply() {
				const selected = (catalog?.models ?? []).filter((m) => checked.has(m.id));
				if (selected.length === 0) {
					setFlash({
						kind: "err",
						text: t("status.minOne")
					});
					return;
				}
				setSaving(true);
				setFlash(null);
				try {
					const res = await fetch(`${API}/apply`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							provider: catalog?.provider,
							models: selected.map((m) => ({
								id: m.id,
								name: m.name,
								input: m.input,
								contextWindow: m.contextWindow,
								maxTokens: m.maxTokens
							}))
						})
					});
					const body = await res.json();
					if (!res.ok || !body.ok) {
						setFlash({
							kind: "err",
							text: hostMessage(t, body.code, body.params, body.error ?? t("status.applyFailed"))
						});
						return;
					}
					setFlash({
						kind: "ok",
						text: t("status.saved", { count: selected.length })
					});
					await load();
				} catch (e) {
					setFlash({
						kind: "err",
						text: String(e.message ?? e)
					});
				} finally {
					setSaving(false);
				}
			}
			function renderModels() {
				if (loading && !catalog) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					"aria-busy": "true",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-skel",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "bar",
								style: { width: "40%" }
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "bar",
								style: { width: "80%" }
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "bar",
								style: { width: "60%" }
							})
						]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "om-note",
						children: t("loading.fetching")
					})]
				});
				if (error && !catalog) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "om-card",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: t("error.loadFailed") }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: error }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							className: "om-btn",
							onClick: () => void load(),
							children: t("error.retry")
						})
					]
				});
				if (!catalog?.configured) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "om-card",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: t("configured.title") }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: hostMessage(t, catalog?.code, catalog?.params, catalog?.message ?? t("configured.notSet")) }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							className: "om-btn",
							onClick: () => void load(),
							children: t("configured.recheck")
						})
					]
				});
				if (catalog?.compatible === false) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "om-card",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: catalog.displayName || catalog.provider }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: hostMessage(t, catalog?.code, catalog?.params, catalog?.message ?? t("notCompatible.msg")) }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							className: "om-btn",
							onClick: () => void selectProvider(provider === catalog.provider ? "" : catalog.provider),
							children: t("action.back")
						})
					]
				});
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-head",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
								className: "om-title",
								children: t("head.title")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "om-sub",
								children: [
									catalog.displayName || catalog.provider,
									catalog.api ? " · " + catalog.api : "",
									" · ",
									catalog.baseURL
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "om-count",
								children: t("counts.enabled", {
									enabled: enabledCount,
									total
								})
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-toolbar",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: 6
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "om-sub",
									children: t("toolbar.route")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
									className: "om-select",
									value: provider,
									onChange: (e) => selectProvider(e.target.value),
									style: { minWidth: 170 },
									children: [(catalog.providers ?? []).map((p) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("option", {
										value: p.provider,
										children: [
											p.displayName,
											"（",
											p.modelCount,
											"）",
											p.compatible ? "" : " · " + t("option.notDiscoverable")
										]
									}, p.provider)), !catalog.providers?.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: provider,
										children: catalog.provider
									})]
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								className: "om-input",
								style: { width: 240 },
								placeholder: t("toolbar.search"),
								value: query,
								onChange: (e) => setQuery(e.target.value)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
								className: "om-select",
								value: modality,
								onChange: (e) => setModality(e.target.value),
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "all",
										children: t("filter.modality.all")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "text",
										children: t("filter.modality.text")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "image",
										children: t("filter.modality.image")
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
								className: "om-select",
								value: vendorFilter,
								onChange: (e) => setVendorFilter(e.target.value),
								style: { minWidth: 150 },
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
									value: "all",
									children: t("filter.vendor.all")
								}), vendors.map((v) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
									value: v,
									children: v === "" ? t("filter.vendor.none") : v
								}, v || "__none__"))]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
								className: "om-select",
								value: enabledFilter,
								onChange: (e) => setEnabledFilter(e.target.value),
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "all",
										children: t("filter.enabled.all")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "enabled",
										children: t("filter.enabled.enabled")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "disabled",
										children: t("filter.enabled.disabled")
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn",
								onClick: () => setChecked((prev) => {
									const next = new Set(prev);
									for (const m of filtered) next.add(m.id);
									return next;
								}),
								children: t("action.selectMatching")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn",
								onClick: () => setChecked(/* @__PURE__ */ new Set()),
								children: t("action.deselectAll")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn",
								onClick: () => void load(provider),
								children: t("action.refresh")
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "om-table-wrap",
						style: { maxHeight: 420 },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("table", {
							className: "om-table",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { style: { width: 44 } }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: t("col.model") }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
									style: { width: 108 },
									children: t("col.modality")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
									style: {
										width: 80,
										textAlign: "right"
									},
									children: t("col.context")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {
									style: {
										width: 80,
										textAlign: "right"
									},
									children: t("col.output")
								})
							] }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tbody", { children: [filtered.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
								colSpan: 5,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "om-empty",
									children: t("empty.noMatch")
								})
							}) }), paged.map((m) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", {
								className: checked.has(m.id) ? "om-sel" : void 0,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
										style: {
											verticalAlign: "middle",
											padding: "10px 0",
											textAlign: "center"
										},
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											className: "om-check",
											type: "checkbox",
											checked: checked.has(m.id),
											onChange: () => toggle(m.id),
											"aria-label": t("aria.selectModel", { id: m.id })
										})
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "om-model-cell",
										children: [m.vendor && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											className: "om-vendor",
											children: [m.vendor, " / "]
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "om-id",
											children: m.vendor ? m.id.slice(m.vendor.length + 1) : m.id
										})]
									}) }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "om-badge" + (m.input.includes("image") ? " img" : ""),
										children: m.input.includes("image") ? t("modality.textImage") : t("modality.text")
									}) }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
										className: "om-meta",
										style: { textAlign: "right" },
										children: fmtTokens(m.contextWindow)
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
										className: "om-meta",
										style: { textAlign: "right" },
										children: fmtTokens(m.maxTokens)
									})
								]
							}, m.id))] })]
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-pager",
						style: {
							display: "flex",
							alignItems: "center",
							gap: 8,
							marginTop: 10
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn",
								onClick: () => setPage((p) => Math.max(1, p - 1)),
								disabled: safePage <= 1,
								children: t("action.prevPage")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "om-sub",
								children: t("counts.page", {
									page: safePage,
									totalPages
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn",
								onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
								disabled: safePage >= totalPages,
								children: t("action.nextPage")
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "om-foot",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "om-btn primary",
								onClick: () => void apply(),
								disabled: saving,
								style: { minWidth: 120 },
								children: saving ? t("action.saving") : t("action.save")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "om-sub",
								children: t("counts.selected", {
									checked: checked.size,
									matched: filtered.length,
									total
								})
							}),
							flash && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "om-status " + flash.kind,
								role: "status",
								children: flash.text
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "om-note",
						children: t("note.save")
					})
				] });
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "om-root",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "om-tabs",
					role: "tablist",
					"aria-label": t("nav"),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						role: "tab",
						"aria-selected": tab === "models",
						className: tab === "models" ? "om-tab on" : "om-tab",
						onClick: () => setTab("models"),
						children: t("tab.models")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						role: "tab",
						"aria-selected": tab === "search",
						className: tab === "search" ? "om-tab on" : "om-tab",
						onClick: () => setTab("search"),
						children: t("tab.search")
					})]
				}), tab === "models" ? renderModels() : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SearchConfigCard, { t })]
			});
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		exports.name = name;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map