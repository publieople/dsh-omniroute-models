# @dsh-external/dsh-omniroute-models

> [English](README.md)

OmniRoute 模型管理器：一个 DSH host+client 插件，自动拉取 OmniRoute 全部模型及其**模态**，
并用一个可搜索/可筛选/可多选的设置页，管理 DSH 实际能用 OmniRoute 的哪些模型。

> 痛点：[OmniRoute](https://github.com/diegosouzapw/OmniRoute)（OpenAI 兼容网关）模型太多（本机 400+）；DSH 自带「模型」页添加模型
> 没有搜索/筛选，且 discovery 契约不返回模态（`DiscoveredModelView` 只有 id/name/contextWindow/maxTokens）。
> 本插件把 OmniRoute `/v1/models` 的真实 `input_modalities`/`context_length`/`max_output_tokens`
> 映射进 `llm-pi-ai.providers.<route>.models`，一次勾选即生效，无需重启。

## 能做什么

- **按供应商筛选**：模型 id 里的命名空间前缀（`/` 前的部分，如 `opencode-go/deepseek-…` → `opencode-go`）会解析出来，UI 有「供应商」下拉 + 独立「供应商」列，可按供应商过滤/查看（`opencode`、`oc`、`auto`、`github`、无命名空间…）。
- **按路由（DSH 供应商）切换**：自动枚举 `llm-pi-ai.providers` 下所有已配置路由（route、displayName、api、baseURL、模型数、是否 OpenAI 兼容），UI 顶部「路由」下拉切换，管理对应端点的模型。
- 一键拉取供应商 `/v1/models`（默认 `http://localhost:20128/v1`），得到每个模型的
  `input`（text/image，自动从 `input_modalities`/`capabilities.vision` 推导）、`contextWindow`、`maxTokens`。
- 在 DSH 设置面板新增「OmniRoute 模型管理」页：搜索框 + 模态筛选 + 全选匹配/全不选 + 逐行勾选。
- 「保存所选」整体替换 `llm-pi-ai.providers.<route>.models`（即 DSH 恰好能用勾选的这些），
  经由官方 settings seam 写入 `settings.yaml`，下一请求立即生效；`apiKeyEnv/api/baseURL` 等兄弟字段保留。
- 已启用的模型预勾选，并在重复拉取时用存储值覆盖（不覆盖你在 `settings.yaml` 手改的模态/容量）。
- 模态只取 DSH 认识的 `text`/`image`（`video`/`audio` 等被裁剪），避免写入 DSH 无法处理的模态导致校验失败。

## 内部

- **Host**（`src/index.ts`）：注册两条同源 JSON 路由（`ctx.webServer.register`）：
  - `GET  /omniroute-models/api/catalog?provider=<route>` — 枚举 `llm-pi-ai` 供应商目录（`providers`）→ 读该路由当下模型 → 请求
    `GET {baseURL}/models` → 返回 `{ configured, compatible, provider, displayName, api, baseURL, providers:[...], models:[{id,name,input,contextWindow,maxTokens,enabled}], enabledCount, totalCount }`；仅当路由协议无法按 OpenAI 形状 `/v1/models` 列举时返回 `compatible:false`；`anthropic-messages`/`openai-responses` 与 `openai-completions` 一样照常拉取（OmniRoute 网关的模型目录与所用协议无关，恒为 OpenAI 格式）。
  - `POST /omniroute-models/api/apply` — `{ provider, models:[{id,name,input,contextWindow,maxTokens}] }`，
    校验后经 `ctx.settings.mutate('llm-pi-ai', [{op:'set', path:['providers',provider,'models'], value}], expectedRevision)` 写入；
    冲突返回 `SETTINGS_CONFLICT`、schema 拒绝返回 `settings-rejected`。
  - 组件**不注册/不拥有** `llm-pi-ai` 命名空间（那是适配器 `@deepseek-ai/dsh-llm-pi-ai` 的）；只读/写既有命名空间。
- **Client**（`src/client/index.tsx`）：订阅 `settings.section` slot（id `omniroute-models`，order 15），
  渲染 React 表格；全部数据走同源 `fetch`，不依赖 `ctx.api`/LLM 远程。
- 只列出**可对话**模型：网关 /v1/models 会混入 `embedding`/视频/图像生成等，host 的
  `fetchCatalog` 按 `type`（`embedding|video|image|audio|music|rerank`）过滤，避免当文本 chat 模型误列/误存。

## i18n

- 采用 DSH 官方 locale 机制（`@deepseek-ai/dsh-client-locale`），namespace `omniroute-models`。
- 字典在 `src/client/locales.ts`：`zh` 为 key 集源，`en: Record<OmniKey,string>` 编译期强制补全。
- `client` 的 `inject = ['slots','locale']`；`apply` 里 `ctx.effect(() => ctx.locale.register(NS, { zh, en }))`，
  再 `ctx.locale.bind(NS)` 得 `t`；`settings.section` 注册带 `inject: () => ({ t })`、`label: () => t('nav')`，
  组件从 `props.t` 取文案，语言切换（DSH 设置 → 语言）即时刷新。
- **host 文案本地化**：catalog/apply 的确定性文案返回 `code`（如 `catalog.notConfigured`、
  `apply.duplicateId`）+ `params`，保留中文 `message` 供 curl/开发；client 的 `hostMessage`
  仅翻译**已知** `code`（`host.*` 键），未知回退原文，故 `SETTINGS_CONFLICT`/`settings-rejected` 等
  异常码不会被误译。
- 新增第三种语言：在 `locales.ts` 加对应字典并把它加进 `dictionaries`；在 `apply` 的注册循环里补该 locale。

## 构建

```bash
# 需要 node + typescript + tsdown（可用 dev_build_plugin，或手动）：
npm run build          # host → lib/index.js
npm run build:client   # client → lib/client.js
```

## 安装 / 注入

- 本环境（super-injector）：`dev_inject_plugin /path/to/dsh-omniroute-models`，注入即 host+client 完整生效。
- 生产 bundle：`dsh plugin --profile web add <本目录 | tgz | github:...>`，然后重启目标 profile。

## 使用

1. 刷新 DSH 页面（运行时注入的 client 模块需页面重载后才引导）。
2. 打开「设置」→ 右侧出现「OmniRoute 模型管理」入口。
3. 搜索 / 按模态筛选 / 勾选要用的模型（视觉模型会显示 `text + image` 徽标）。
4. 点「保存所选」→ 写入 `settings.yaml` 的 `llm-pi-ai.providers.omniroute.models`。
5. 用一个刚勾选的模型发一条消息验证（视觉模型可附带图片）。

## 验证

- host：`curl "http://127.0.0.1:3080/omniroute-models/api/catalog"` 应返回模型列表 + 模态 + enabled。
- 写入：`curl -X POST .../api/apply -d '{"provider":"omniroute","models":[{...}]}'`。
- 检查 `~/.dsh/settings.yaml` 的 `llm-pi-ai.providers.omniroute.models`（含 `input`/`contextWindow`/`maxTokens`，兄弟字段保留）。
