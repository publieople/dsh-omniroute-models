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
export const zh = {
  nav: 'OmniRoute 模型管理',
  'tab.models': '模型管理',
  'tab.search': '联网搜索',
  'head.title': '模型管理',

  'toolbar.route': '路由',
  'toolbar.search': '搜索模型 id 或名称…',

  'filter.modality.all': '全部模态',
  'filter.modality.text': '仅文本',
  'filter.modality.image': '视觉（含图片）',
  'filter.vendor.all': '全部供应商',
  'filter.vendor.none': '无命名空间',
  'filter.enabled.all': '全部',
  'filter.enabled.enabled': '已启用',
  'filter.enabled.disabled': '未启用',

  'action.selectMatching': '全选匹配',
  'action.deselectAll': '全不选',
  'action.refresh': '拉取',
  'action.save': '保存所选',
  'action.saving': '保存中…',
  'action.prevPage': '上一页',
  'action.nextPage': '下一页',
  'action.back': '返回',

  'col.model': '模型',
  'col.modality': '模态',
  'col.context': '上下文',
  'col.output': '输出',

  'modality.textImage': 'text + image',
  'modality.text': 'text',

  'counts.enabled': '已启用 {enabled} / {total}',
  'counts.selected': '已选 {checked} · 匹配 {matched} · 共 {total}',
  'counts.page': '第 {page} / {totalPages} 页',

  'status.saved': '已保存 {count} 个模型',
  'status.minOne': '至少勾选 1 个模型',
  'status.applyFailed': '应用失败',

  'empty.noMatch': '无匹配模型',

  'loading.fetching': '正在拉取 OmniRoute 模型…',

  'error.loadFailed': '加载失败',
  'error.retry': '重试',

  'configured.title': 'OmniRoute 模型管理',
  'configured.notSet': '未配置 OmniRoute 提供方。',
  'configured.recheck': '重新检查',

  'notCompatible.msg': '该供应商不支持自动发现。',
  'option.notDiscoverable': '不可自动发现',

  'note.save':
    '保存即整体替换该路由的 models 列表（DSH 恰好能用勾选的这些）；筛选只影响显示，不影响已勾选的保存内容；未保存前不落盘。',

  'note.apiKey':
    '拉取模型列表无需 API key；但实际对话必须给当前路由配置一个非空 key（否则 DSH 经 pi-ai 报 "No API key for provider: <route>"）。请在 DSH「模型」页为该路由填写 API key。',

  'aria.selectModel': '选择 {id}',

  'search.title': '联网搜索',
  'search.enabled': '启用 OmniRoute 联网搜索',
  'search.provider': '搜索后端',
  'search.provider.auto': 'OmniRoute 默认',
  'search.baseURL': '网关地址',
  'search.apiKeyEnv': '密钥环境变量',
  'search.maxResults': '结果上限',
  'search.advanced': '高级',
  'search.test': '测试连接',
  'search.testing': '测试中…',
  'search.testOk': '连接成功：{count} 条结果',
  'search.testFail': '测试失败：{error}',
  'search.save': '保存搜索配置',
  'search.saved': '搜索配置已保存',
  'search.minKey': '启用搜索需配置网关地址与密钥环境变量。',
  'search.hint': '在 OmniRoute 后台给所选搜索引擎（Tavily/Brave/Ollama 等）配置 API key 后，DSH 的 web_search 才会返回结果。',

  // Host-driven message/error copy (the host returns a stable `code` + params;
  // the client translates it, falling back to the raw `message`).
  'host.catalog.notConfigured':
    '未发现 llm-pi-ai 提供方配置，请先在「模型」设置中添加对应路由（baseURL + apiKeyEnv）。',
  'host.catalog.notCompatible':
    '该供应商协议 "{api}" 不是 OpenAI 兼容，无法自动拉取模型。请在 settings.yaml 手动维护 {route} 的 models。',
  'host.apply.emptyModels': '至少需要勾选 1 个模型（空列表会让手工声明路由不可服务）',
  'host.apply.emptyId': '存在空模型 id',
  'host.apply.duplicateId': '重复模型 id: {id}',
  'host.apply.noModality': '模型 {id} 缺少有效模态（只支持 text/image）',
  'host.apply.noSettings': 'settings 服务不可用（未挂载 llm-pi-ai 提供方）',
} satisfies Record<string, string>

/** The omniroute-models namespace key union. */
export type OmniKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en: Record<OmniKey, string> = {
  nav: 'OmniRoute model manager',
  'tab.models': 'Models',
  'tab.search': 'Web search',
  'head.title': 'Models',

  'toolbar.route': 'Route',
  'toolbar.search': 'Search model id or name…',

  'filter.modality.all': 'All modalities',
  'filter.modality.text': 'Text only',
  'filter.modality.image': 'Vision (with images)',
  'filter.vendor.all': 'All vendors',
  'filter.vendor.none': 'No namespace',
  'filter.enabled.all': 'All',
  'filter.enabled.enabled': 'Enabled',
  'filter.enabled.disabled': 'Disabled',

  'action.selectMatching': 'Select matching',
  'action.deselectAll': 'Clear all',
  'action.refresh': 'Refresh',
  'action.save': 'Save selected',
  'action.saving': 'Saving…',
  'action.prevPage': 'Previous',
  'action.nextPage': 'Next',
  'action.back': 'Back',

  'col.model': 'Model',
  'col.modality': 'Modality',
  'col.context': 'Context',
  'col.output': 'Output',

  'modality.textImage': 'text + image',
  'modality.text': 'text',

  'counts.enabled': 'Enabled {enabled} / {total}',
  'counts.selected': 'Selected {checked} · Matching {matched} · Of {total}',
  'counts.page': 'Page {page} / {totalPages}',

  'status.saved': 'Saved {count} models',
  'status.minOne': 'Select at least 1 model',
  'status.applyFailed': 'Apply failed',

  'empty.noMatch': 'No matching models',

  'loading.fetching': 'Fetching OmniRoute models…',

  'error.loadFailed': 'Load failed',
  'error.retry': 'Retry',

  'configured.title': 'OmniRoute model manager',
  'configured.notSet': 'No OmniRoute provider is configured.',
  'configured.recheck': 'Recheck',

  'notCompatible.msg': 'This provider does not support auto-discovery.',
  'option.notDiscoverable': 'auto-discovery unavailable',

  'note.save':
    'Saving replaces this route’s models list in one go (DSH serves exactly the checked ones). Filters only narrow the view — they never change what a save writes. Nothing is written until you save.',

  'note.apiKey':
    'Fetching the model list needs no API key, but actually chatting requires a non-empty key for the current route (otherwise DSH’s pi-ai layer reports "No API key for provider: <route>"). Set the API key for this route in the “Models” settings.',

  'aria.selectModel': 'Select {id}',

  'search.title': 'Web search',
  'search.enabled': 'Enable OmniRoute web search',
  'search.provider': 'Search backend',
  'search.provider.auto': 'OmniRoute default',
  'search.baseURL': 'Gateway base URL',
  'search.apiKeyEnv': 'Key environment variable',
  'search.maxResults': 'Max results',
  'search.advanced': 'Advanced',
  'search.test': 'Test connection',
  'search.testing': 'Testing…',
  'search.testOk': 'OK: {count} results',
  'search.testFail': 'Test failed: {error}',
  'search.save': 'Save search config',
  'search.saved': 'Search config saved',
  'search.minKey': 'A gateway base URL and a key environment variable are required to enable search.',
  'search.hint': 'After configuring an API key for the chosen search engine (Tavily/Brave/Ollama, …) in OmniRoute, DSH’s web_search will return results.',

  'host.catalog.notConfigured':
    'No llm-pi-ai provider is configured. Add the route (baseURL + apiKeyEnv) in the “Models” settings first.',
  'host.catalog.notCompatible':
    'Provider protocol "{api}" is not OpenAI-compatible and cannot be listed automatically. Maintain {route}’s models in settings.yaml instead.',
  'host.apply.emptyModels':
    'Select at least 1 model (an empty list would make a manually-declared route unserviceable)',
  'host.apply.emptyId': 'A model id is missing',
  'host.apply.duplicateId': 'Duplicate model id: {id}',
  'host.apply.noModality': 'Model {id} has no valid modality (only text/image are supported)',
  'host.apply.noSettings': 'The settings service is unavailable (no llm-pi-ai provider is mounted)',
}

/** Locale namespace of this plugin's client half. */
export const NS = 'omniroute-models' as const

/** The two dictionaries, keyed by locale id. */
export const dictionaries: Record<'zh' | 'en', Record<OmniKey, string>> = { zh, en }

/** Translate-one-key signature the settings section receives. */
export type OmniTranslate = (key: OmniKey, params?: Record<string, string | number>) => string
