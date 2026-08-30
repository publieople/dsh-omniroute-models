# @dsh-external/dsh-omniroute-models

[简体中文](README.zh.md)

OmniRoute model manager: a DSH host+client plugin that pulls every OmniRoute model and its
**modalities**, and lets you control which OmniRoute models DSH actually serves through a
searchable / filterable / multi-select settings page.

> Pain point: [OmniRoute](https://github.com/diegosouzapw/OmniRoute) (an OpenAI-compatible gateway) exposes a lot of models (400+ on this machine).
> DSH's built-in "Models" page has no search or filter, and its discovery contract does not return
> modalities (`DiscoveredModelView` only has id/name/contextWindow/maxTokens). This plugin maps
> OmniRoute `/v1/models` real `input_modalities`/`context_length`/`max_output_tokens` into
> `llm-pi-ai.providers.<route>.models`; a single check applies immediately, no restart needed.

## What it does

- **Filter by vendor**: the namespace prefix of a model id (the part before the first `/`, e.g.
  `opencode-go/deepseek-…` → `opencode-go`) is parsed out; the UI has a "Vendor" dropdown and a
  vendor column to filter/view by vendor (`opencode`, `oc`, `auto`, `github`, no namespace…).
- **Switch by route (DSH provider)**: auto-enumerates every configured route under
  `llm-pi-ai.providers` (route, displayName, api, baseURL, model count, OpenAI-compatible or not);
  the top "Route" dropdown switches which endpoint's models you manage.
- One click pulls the provider's `/v1/models` (default `http://localhost:20128/v1`), giving each
  model's `input` (text/image, derived from `input_modalities`/`capabilities.vision`),
  `contextWindow`, `maxTokens`.
- Adds an "OmniRoute model manager" page to the DSH settings panel: search box + modality filter +
  select-matching/clear-all + per-row checkbox.
- "Save selected" replaces `llm-pi-ai.providers.<route>.models` in one go (DSH serves exactly the
  checked ones), written through the official settings seam into `settings.yaml` and effective on the
  next request; sibling fields like `apiKeyEnv`/`api`/`baseURL` are preserved.
- Enabled models are pre-checked, and on re-pull the stored value wins (it does not override
  modalities/capacities you hand-edited in `settings.yaml`).
- Modality keeps only `text`/`image` (what DSH understands); `video`/`audio` etc. are clipped so the
  plugin never writes modalities DSH cannot handle (and thus fails validation).
- **Web search**: wires DSH's built-in \`web_search\` tool to OmniRoute's aggregate \`POST /v1/search\` (Tavily/Brave/Exa/Ollama/…); enable it from the \`Web search\` card in the settings page.

## Internals

- **Host** (`src/index.ts`): registers two same-origin JSON routes (`ctx.webServer.register`):
  - `GET  /omniroute-models/api/catalog?provider=<route>` — enumerates the `llm-pi-ai` provider
    directory (`providers`) → reads the route's current models → requests `GET {baseURL}/models` →
    returns `{ configured, compatible, provider, displayName, api, baseURL, providers:[...], models:[{id,name,input,contextWindow,maxTokens,enabled}], enabledCount, totalCount }`; returns `compatible:false` only when the route protocol cannot be listed through an OpenAI-shaped `/v1/models`; `anthropic-messages`/`openai-responses` are pulled just like `openai-completions` (the OmniRoute gateway's model catalog is protocol-agnostic and always OpenAI format).
  - `POST /omniroute-models/api/apply` — `{ provider, models:[{id,name,input,contextWindow,maxTokens}] }`,
    validated then written via `ctx.settings.mutate('llm-pi-ai', [{op:'set', path:['providers',provider,'models'], value}], expectedRevision)`;
    conflicts return `SETTINGS_CONFLICT`, schema rejection returns `settings-rejected`.
  - The component does **not** register/own the `llm-pi-ai` namespace (that is the adapter
    `@deepseek-ai/dsh-llm-pi-ai`'s); it only reads/writes an existing namespace.
- **Client** (`src/client/index.tsx`): subscribes the `settings.section` slot (id `omniroute-models`, order 15),
  renders a React table; all data goes through same-origin `fetch`, no `ctx.api`/LLM remote.
- **Web search provider** (`src/index.ts`): owns the `omniroute-models` settings namespace for search config and, when enabled, registers a `ctx.web` `WebSearchProvider` (id `omniroute`) so DSH's `web_search` uses OmniRoute; config/test routes `GET|POST /omniroute-models/api/search-config` and `POST /omniroute-models/api/search-test`.
- **Only chat-capable models are listed**: the gateway `/v1/models` can mix in `embedding`/video/image-generation
  entries; the host's `fetchCatalog` filters by `type` (`embedding|video|image|audio|music|rerank`) so they are
  never mis-listed/mis-saved as text chat models.

## i18n

- Uses DSH's official locale mechanism (`@deepseek-ai/dsh-client-locale`), namespace `omniroute-models`.
- Dictionaries live in `src/client/locales.ts`: `zh` is the key-set source of truth; `en: Record<OmniKey,string>`
  is compile-checked complete.
- The client sets `inject = ['slots','locale']`; `apply` calls `ctx.effect(() => ctx.locale.register(NS, { zh, en }))`,
  then `ctx.locale.bind(NS)` for `t`; the `settings.section` registers with `inject: () => ({ t })` and
  `label: () => t('nav')`; the section reads copy from `props.t` and refreshes when the language switches
  (DSH settings → Language).
- **Host message localization**: the deterministic catalog/apply messages return a `code` (e.g. `catalog.notConfigured`,
  `apply.duplicateId`) plus `params`, keeping the Chinese `message` for curl/development; the client's `hostMessage`
  only translates **known** `code` (`host.*` keys), so `SETTINGS_CONFLICT`/`settings-rejected` exception codes are not mis-translated.
- Add a third language: add the dictionary in `locales.ts`, add it to `dictionaries`, and add the locale to the
  registration loop in `apply`.

## Build

```bash
# needs node + typescript + tsdown (or use dev_build_plugin):
npm run build          # host → lib/index.js
npm run build:client   # client → lib/client.js
```

## Install / inject

- In this environment (super-injector): `dev_inject_plugin /path/to/dsh-omniroute-models`, host+client applied immediately.
- Production bundle (GitHub): `dsh plugin --profile web add github:publieople/dsh-omniroute-models`, then restart the target profile.

## Usage

1. Refresh the DSH page (runtime-injected client modules only bootstrap after a page reload).
2. Open "Settings" → the "OmniRoute model manager" entry appears on the right.
3. Search / filter by modality / check the models to use (vision models show a `text + image` badge).
4. Click "Save selected" → writes `llm-pi-ai.providers.omniroute.models` in `settings.yaml`.
5. Send a message with a just-checked model to verify (vision models can attach an image).

## Verify

- host: `curl "http://127.0.0.1:3080/omniroute-models/api/catalog"` should return the model list + modalities + enabled.
- write: `curl -X POST .../api/apply -d '{"provider":"omniroute","models":[{...}]}'`.
- check `~/.dsh/settings.yaml`'s `llm-pi-ai.providers.omniroute.models` (with `input`/`contextWindow`/`maxTokens`, siblings preserved).
