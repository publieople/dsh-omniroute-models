/**
 * @dsh-external/dsh-omniroute-models — client half.
 *
 * Registers a `settings.section` page ("OmniRoute 模型管理"), localized through
 * the DSH locale runtime (`ctx.locale`). Copy lives in `./locales.ts`
 * (namespace `omniroute-models`, zh/en); the section reads it via the
 * framework-injected `t` seat. All styling uses DSH's theme tokens.
 */
import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
// Pull the settings.section SlotMap augmentation into scope (type-only).
import type {} from '@deepseek-ai/dsh-client-ui-settings'
// Bring the locale runtime service (`ctx.locale`) into scope.
import type {} from '@deepseek-ai/dsh-client-locale/client'
import { NS, dictionaries, zh, type OmniKey, type OmniTranslate } from './locales.js'
import { MorphIcon, type IconNode } from 'morphicons/react'
import { OmCombobox } from './OmCombobox.js'
import { OmCheckbox } from './OmCheckbox.js'

export const name = '@dsh-external/dsh-omniroute-models'
export const inject = ['slots', 'locale']

const API = '/omniroute-models/api'
const PAGE_SIZE = 50

// Morphicons icon data (lucide-style `[tag, attrs]` lists). Constructed once at
// module scope — never recreated per render (morphicons: hoist icon data).
const IconChevronRight: IconNode = [['path', { d: 'm9 18 6-6-6-6' }]]
const IconChevronDown: IconNode = [['path', { d: 'm6 9 6 6 6-6' }]]
const IconRefresh: IconNode = [
  ['path', { d: 'M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8' }],
  ['path', { d: 'M21 3v5h-5' }],
]
const IconCheck: IconNode = [['path', { d: 'M20 6 9 17l-5-5' }]]
const IconX: IconNode = [['path', { d: 'M18 6 6 18' }], ['path', { d: 'm6 6 12 12' }]]
const IconInfo: IconNode = [['circle', { cx: 12, cy: 12, r: 10 }], ['path', { d: 'M12 16v-4' }], ['path', { d: 'M12 8h.01' }]]

const STYLE = `
.om-root{color:var(--dsw-alias-label-primary);font-size:15px;line-height:1.6;font-family:var(--dsw-font-family,system-ui)}
.om-root *{box-sizing:border-box}
.om-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 12px;margin-bottom:12px}
.om-title{font-size:18px;font-weight:600;color:var(--dsw-alias-label-primary);margin:0}
.om-sub{font-size:13px;color:var(--dsw-alias-label-secondary)}
.om-count{margin-left:auto;font-size:13px;color:var(--dsw-alias-label-secondary)}
.om-toolbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:12px}
.om-group{display:flex;flex-wrap:wrap;gap:10px;align-items:center;min-width:0}
.om-group.right{margin-left:auto;justify-content:flex-end}
.om-toolbar .om-select{min-width:118px}
.om-search{flex:1 1 180px;min-width:170px;max-width:340px}
.om-input,.om-select{min-height:38px;padding:7px 12px;font-size:14px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px}
.om-input::placeholder{color:var(--dsw-alias-label-tertiary)}
.om-btn{display:inline-flex;align-items:center;gap:6px;min-height:38px;padding:7px 14px;font-size:14px;font-weight:500;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;cursor:pointer;transition:background .15s ease,border-color .15s ease}
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
.om-tip{display:flex;gap:8px;align-items:flex-start;padding:10px 12px;font-size:13px;line-height:1.5;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover-accent,rgba(22,102,192,.08));border:1px solid var(--dsw-alias-border-l2);border-radius:10px;margin-bottom:12px}
.om-tip svg{flex:none;margin-top:2px;color:var(--dsw-alias-brand-primary)}
.om-card{border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-1);padding:20px;max-width:620px}
.om-card h3{font-size:16px;font-weight:600;color:var(--dsw-alias-label-primary);margin:0 0 8px}
.om-card p{color:var(--dsw-alias-label-secondary);margin:0 0 14px}
.om-skel{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:20px;background:var(--dsw-alias-bg-layer-1)}
.om-skel .bar{height:14px;border-radius:6px;background:var(--dsw-alias-bg-skeleton);margin:0 0 12px}
.om-check{width:16px;height:16px;accent-color:var(--dsw-alias-brand-primary);cursor:pointer}
.om-tabs{display:flex;gap:2px;border-bottom:1px solid var(--dsw-alias-border-l2,#e5e7eb);align-items:flex-end;margin-bottom:12px;flex-wrap:wrap}
.om-tab{border:none;background:none;font:inherit;font-size:13px;color:var(--dsw-alias-label-secondary,#6b7280);padding:7px 12px;cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap}
.om-tab.on{color:var(--dsw-alias-brand-primary,#4f6ef7);border-bottom-color:var(--dsw-alias-brand-primary,#4f6ef7);font-weight:600}
.om-row{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;margin-bottom:12px}
.om-field{display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap}
.om-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px 14px;margin:2px 0 12px}
.om-adv{display:inline-flex;align-items:center;gap:4px;padding:0;border:none;background:none;color:var(--dsw-alias-label-secondary,#6b7280);font:inherit;font-size:13px;cursor:pointer}
.om-adv:hover{color:var(--dsw-alias-brand-primary,#4f6ef7)}
.om-combo{position:relative;display:inline-block;min-width:150px}
.om-combo-btn{width:100%;display:inline-flex;align-items:center;gap:6px;min-height:38px;padding:7px 12px;font-size:14px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;cursor:pointer;text-align:left;transition:background .15s ease,border-color .15s ease}
.om-combo-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.08))}
.om-combo-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
.om-combo-val{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.om-combo-caret{flex:none;color:var(--dsw-alias-label-secondary,#6b7280)}
.om-combo-panel{position:absolute;z-index:99999;top:calc(100% + 4px);left:0;min-width:100%;max-height:260px;display:flex;flex-direction:column;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;box-shadow:0 8px 22px rgba(0,0,0,.28);overflow:hidden}
.om-combo-search{display:flex;align-items:center;gap:6px;padding:6px 10px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.om-combo-search svg{flex:none;color:var(--dsw-alias-label-tertiary)}
.om-combo-search input{flex:1;min-width:0;border:none;background:none;font:inherit;font-size:13px;color:var(--dsw-alias-label-primary);outline:none}
.om-combo-search input::placeholder{color:var(--dsw-alias-label-tertiary)}
.om-combo-list{overflow-y:auto;padding:4px;margin:0;list-style:none}
.om-combo-opt{display:flex;align-items:center;gap:8px;padding:7px 10px;font-size:13px;border-radius:6px;cursor:pointer;color:var(--dsw-alias-label-primary)}
.om-combo-opt.on{background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.1))}
.om-combo-opt.sel{color:var(--dsw-alias-brand-primary,#4f6ef7);font-weight:600}
.om-combo-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.om-combo-check{margin-left:8px;flex:none}
.om-combo-empty{color:var(--dsw-alias-label-tertiary);text-align:center;padding:14px 10px;font-size:13px}
.om-select-trigger{display:inline-flex;align-items:center;gap:6px;min-height:38px;padding:7px 12px;font-size:14px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;cursor:pointer;transition:background .15s ease,border-color .15s ease}
.om-select-trigger:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.08))}
.om-select-trigger:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
.om-select-value[data-placeholder]{color:var(--dsw-alias-label-tertiary)}
.om-select-caret{flex:none;color:var(--dsw-alias-label-secondary,#6b7280)}
.om-select-content{min-width:var(--radix-select-trigger-width);max-height:260px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;box-shadow:0 8px 22px rgba(0,0,0,.28);overflow:hidden;z-index:99999}
.om-select-viewport{padding:4px}
.om-select-item{display:flex;align-items:center;gap:8px;padding:7px 10px;font-size:13px;border-radius:6px;cursor:pointer;color:var(--dsw-alias-label-primary);outline:none}
.om-select-item[data-highlighted]{background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.1))}
.om-select-item[data-state=checked]{color:var(--dsw-alias-brand-primary,#4f6ef7);font-weight:600}
.om-select-item-text{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.om-select-item-ind{margin-left:8px;flex:none}
.om-checkbox{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:4px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary-inverted,#fff);cursor:pointer;vertical-align:middle;outline:none}
.om-checkbox:hover{border-color:var(--dsw-alias-brand-primary,#4f6ef7)}
.om-checkbox:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
.om-checkbox[data-state=checked]{background:var(--dsw-alias-button-primary-fill);border-color:transparent}
.om-checkbox-ind{display:inline-flex}
`

interface CatalogModel {
  id: string
  vendor: string
  name?: string
  contextWindow?: number
  maxTokens?: number
  input: string[]
  enabled: boolean
}

interface ProviderInfo {
  provider: string
  displayName: string
  api?: string
  baseURL: string
  modelCount: number
  compatible: boolean
}

interface Catalog {
  configured: boolean
  compatible?: boolean
  provider: string
  displayName?: string
  api?: string
  baseURL?: string
  endpoint?: string
  message?: string
  code?: string
  params?: Record<string, string>
  providers?: ProviderInfo[]
  models?: CatalogModel[]
  enabledCount?: number
  totalCount?: number
}

/** Translate a host-driven message: prefer the localized `code`, else the raw text. */
function hostMessage(t: OmniTranslate, code: string | undefined, params: Record<string, string> | undefined, fallback: string): string {
  const key = ('host.' + (code ?? '')) as OmniKey
  // Only translate codes that are known dictionary keys (apply also reports
  // SETTINGS_CONFLICT / settings-rejected err.code, which must stay verbatim).
  if (code && key in zh) return t(key, params)
  return fallback
}

export function apply(ctx: ClientContext): void {
  ctx.effect(() => {
    const style = document.createElement('style')
    style.textContent = STYLE
    document.head.appendChild(style)
    return () => style.remove()
  }, 'omniroute-models: styles')

  ctx.effect(() => {
    // Register zh/en dictionaries for the omniroute-models namespace. The
    // framework enforces bilingual balance; a disposer is returned.
    const disposers: Array<() => void> = []
    for (const locale of ['zh', 'en'] as const) disposers.push(ctx.locale.register(NS, locale, dictionaries[locale]))
    return () => { for (const dispose of disposers) dispose() }
  }, 'omniroute-models: copy dictionaries')

  ctx.effect(() => {
    const t = ctx.locale.bind(NS as string) as OmniTranslate
    return ctx.slots.inject('settings.section', () =>
      ctx.slots.register(
        {
          name: 'settings.section',
          id: 'omniroute-models',
          order: 15,
          label: () => t('nav'),
          inject: () => ({ t }),
        },
        OmnirouteModelsSection,
      ),
    )
  }, 'omniroute-models: settings.section')
}

function fmtTokens(n?: number): string {
  if (!n || n <= 0 || !Number.isFinite(n)) return '-'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'K'
  return String(n)
}

function Spinner() {
  return (
    <span
      className="om-spin"
      style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid var(--dsw-alias-border-l2)', borderTopColor: 'var(--dsw-alias-brand-primary)', borderRadius: '50%', verticalAlign: -2, marginRight: 8 }}
    />
  )
}


interface SearchConfig {
  searchEnabled: boolean
  searchProvider: string
  searchBaseURL: string
  searchApiKeyEnv: string
  searchApiKey: string
  searchMaxResults: number
}

const SEARCH_DEFAULT_BASE = 'http://localhost:20128/v1'

function SearchConfigCard({ t }: { t: OmniTranslate }): ReactNode {
  const [form, setForm] = useState<SearchConfig>({
    searchEnabled: false,
    searchProvider: '',
    searchBaseURL: SEARCH_DEFAULT_BASE,
    searchApiKeyEnv: 'OMNIROUTE_API_KEY',
    searchApiKey: '',
    searchMaxResults: 8,
  })
  const [providers, setProviders] = useState<Array<{ id: string; name?: string }>>([])
  const [revision, setRevision] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [flash, setFlash] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)

  async function load() {
    setLoading(true)
    setFlash(null)
    try {
      const res = await fetch(API + '/search-config', { cache: 'no-store' })
      const data = (await res.json()) as { config?: SearchConfig; providers?: Array<{ id: string; name?: string }>; revision?: number }
      if (data.config) setForm((f) => ({ ...f, ...data.config }))
      setProviders(data.providers ?? [])
      setRevision(data.revision)
    } catch (e) {
      setFlash({ kind: 'err', text: String((e as Error).message ?? e) })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function field<K extends keyof SearchConfig>(key: K, value: SearchConfig[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function save() {
    setSaving(true)
    setFlash(null)
    try {
      const res = await fetch(API + '/search-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: form, expectedRevision: revision }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string; code?: string }
      if (!res.ok || !data.ok) {
        setFlash({ kind: 'err', text: hostMessage(t, data.code, undefined, data.error ?? t('status.applyFailed')) })
        return
      }
      setFlash({ kind: 'ok', text: t('search.saved') })
      await load()
    } catch (e) {
      setFlash({ kind: 'err', text: String((e as Error).message ?? e) })
    } finally {
      setSaving(false)
    }
  }

  async function test() {
    setTesting(true)
    setFlash(null)
    try {
      const res = await fetch(API + '/search-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: form }),
      })
      const data = (await res.json()) as { ok?: boolean; count?: number; error?: string }
      if (data.ok) setFlash({ kind: 'ok', text: t('search.testOk', { count: data.count ?? 0 }) })
      else setFlash({ kind: 'err', text: data.error ?? t('search.testFail', { error: '' }) })
    } catch (e) {
      setFlash({ kind: 'err', text: t('search.testFail', { error: String((e as Error).message ?? e) }) })
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="om-card" style={{ marginBottom: 0 }}>
      <div className="om-head">
        <h3 className="om-title">{t('search.title')}</h3>
      </div>

      <div className="om-row">
        <label className="om-field" style={{ cursor: 'pointer' }}>
          <OmCheckbox checked={form.searchEnabled} onCheckedChange={(v) => field('searchEnabled', v === true)} aria-label={t('search.enabled')} />
          <span>{t('search.enabled')}</span>
        </label>
      </div>

      <div className="om-grid">
        <label className="om-field">
          <span className="om-sub">{t('search.provider')}</span>
          <OmCombobox
            aria-label={t('search.provider')}
            value={form.searchProvider}
            onChange={(v) => field('searchProvider', v)}
            placeholder={t('search.provider.auto')}
            options={[{ value: '', label: t('search.provider.auto') }, ...providers.map((p) => ({ value: p.id, label: p.name || p.id }))]}
            style={{ minWidth: 180 }}
          />
        </label>
        <label className="om-field">
          <span className="om-sub">{t('search.maxResults')}</span>
          <input className="om-input" type="number" min={1} max={50} style={{ width: 90 }} value={form.searchMaxResults} onChange={(e) => field('searchMaxResults', Number(e.target.value))} />
        </label>
      </div>

      <button className="om-adv" onClick={() => setShowAdvanced((s) => !s)} aria-expanded={showAdvanced} style={{ marginBottom: showAdvanced ? 10 : 0 }}>
        <MorphIcon icon={showAdvanced ? IconChevronDown : IconChevronRight} size={14} strokeWidth={2} /> {t('search.advanced')}
      </button>
      {showAdvanced && (
        <div className="om-grid">
          <label className="om-field">
            <span className="om-sub">{t('search.baseURL')}</span>
            <input className="om-input" style={{ width: 260 }} value={form.searchBaseURL} onChange={(e) => field('searchBaseURL', e.target.value)} />
          </label>
          <label className="om-field">
            <span className="om-sub">{t('search.apiKeyEnv')}</span>
            <input className="om-input" style={{ width: 180 }} value={form.searchApiKeyEnv} onChange={(e) => field('searchApiKeyEnv', e.target.value)} />
          </label>
          <label className="om-field">
            <span className="om-sub">API Key</span>
            <input className="om-input" type="password" style={{ width: 220 }} value={form.searchApiKey} placeholder="(optional)" onChange={(e) => field('searchApiKey', e.target.value)} />
          </label>
        </div>
      )}

      <div className="om-foot">
        <button className="om-btn" onClick={() => void test()} disabled={testing || loading}>
          {testing ? t('search.testing') : t('search.test')}
        </button>
        <button className="om-btn primary" onClick={() => void save()} disabled={saving || loading}>
          {t('search.save')}
        </button>
        {flash && <span className={'om-status ' + flash.kind} role="status">{flash.text}</span>}
      </div>
      <p className="om-note">{t('search.hint')}</p>
    </div>
  )
}

function OmnirouteModelsSection(props: { close?: () => void; t: OmniTranslate }): ReactNode {
  const t = props.t
  const [catalog, setCatalog] = useState<Catalog | null>(null)
  const [provider, setProvider] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [modality, setModality] = useState<'all' | 'text' | 'image'>('all')
  const [vendorFilter, setVendorFilter] = useState('all')
  const [enabledFilter, setEnabledFilter] = useState<'all' | 'enabled' | 'disabled'>('all')
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [saving, setSaving] = useState(false)
  const [flash, setFlash] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)
  const [page, setPage] = useState(1)
  const [tab, setTab] = useState<'models' | 'search'>('models')

  let loadCtrl: AbortController | null = null
  async function load(p?: string) {
    loadCtrl?.abort()
    const ctrl = new AbortController()
    loadCtrl = ctrl
    setLoading(true)
    setError(null)
    setFlash(null)
    try {
      const qs = p ? `?provider=${encodeURIComponent(p)}` : ''
      const res = await fetch(`${API}/catalog${qs}`, { cache: 'no-store', signal: ctrl.signal })
      const data = (await res.json()) as Catalog
      if (ctrl.signal.aborted) return
      setCatalog(data)
      setProvider(data.provider ?? '')
      const enabled = new Set<string>()
      for (const m of data.models ?? []) if (m.enabled) enabled.add(m.id)
      setChecked(enabled)
    } catch (e) {
      if ((e as Error).name === 'AbortError' || ctrl.signal.aborted) return
      setError(String((e as Error).message ?? e))
    } finally {
      if (loadCtrl === ctrl) setLoading(false)
    }
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => { loadCtrl?.abort() }
  }, [])

  function selectProvider(p: string) {
    setProvider(p)
    setQuery('')
    setModality('all')
    setVendorFilter('all')
    setEnabledFilter('all')
    void load(p)
  }

  const vendors = useMemo(() => {
    const set = new Set<string>()
    for (const m of catalog?.models ?? []) set.add(m.vendor)
    return [...set].sort()
  }, [catalog])

  const filtered = useMemo(() => {
    const models = catalog?.models ?? []
    const q = query.trim().toLowerCase()
    const out = models.filter((m) => {
      if (q && !m.id.toLowerCase().includes(q) && !(m.name ?? '').toLowerCase().includes(q)) return false
      if (modality === 'image' && !m.input.includes('image')) return false
      if (modality === 'text' && m.input.includes('image')) return false
      if (vendorFilter !== 'all') {
        if (vendorFilter === '') {
          if (m.vendor !== '') return false
        } else if (m.vendor !== vendorFilter) return false
      }
      if (enabledFilter === 'enabled' && !m.enabled) return false
      if (enabledFilter === 'disabled' && m.enabled) return false
      return true
    })
    // Stable browse order: vendor, then name, then id.
    out.sort((a, b) => a.vendor.localeCompare(b.vendor) || (a.name ?? '').toLowerCase().localeCompare((b.name ?? '').toLowerCase()) || a.id.localeCompare(b.id))
    return out
  }, [catalog, query, modality, vendorFilter, enabledFilter])

  const total = catalog?.models?.length ?? 0
  const enabledCount = catalog?.enabledCount ?? 0

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paged = useMemo(
    () => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage],
  )

  // Any filter change or a fresh catalog load lands back on page 1.
  useEffect(() => { setPage(1) }, [query, modality, vendorFilter, enabledFilter, catalog])

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function apply() {
    // Save ALL checked models from the full catalog, never the filtered subset:
    // a search / vendor / modality / enabled filter must only narrow the view,
    // not silently drop items that are still checked but currently hidden.
    const selected = (catalog?.models ?? []).filter((m) => checked.has(m.id))
    if (selected.length === 0) {
      setFlash({ kind: 'err', text: t('status.minOne') })
      return
    }
    setSaving(true)
    setFlash(null)
    try {
      const res = await fetch(`${API}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: catalog?.provider,
          models: selected.map((m) => ({
            id: m.id,
            name: m.name,
            input: m.input,
            contextWindow: m.contextWindow,
            maxTokens: m.maxTokens,
          })),
        }),
      })
      const body = (await res.json()) as { ok?: boolean; error?: string; code?: string; params?: Record<string, string> }
      if (!res.ok || !body.ok) {
        setFlash({ kind: 'err', text: hostMessage(t, body.code, body.params, body.error ?? t('status.applyFailed')) })
        return
      }
      setFlash({ kind: 'ok', text: t('status.saved', { count: selected.length }) })
      await load()
    } catch (e) {
      setFlash({ kind: 'err', text: String((e as Error).message ?? e) })
    } finally {
      setSaving(false)
    }
  }

  function renderModels(): ReactNode {
    if (loading && !catalog) {
      return (
        <div aria-busy="true">
          <div className="om-skel">
            <div className="bar" style={{ width: '40%' }} />
            <div className="bar" style={{ width: '80%' }} />
            <div className="bar" style={{ width: '60%' }} />
          </div>
          <p className="om-note">{t('loading.fetching')}</p>
        </div>
      )
    }
    if (error && !catalog) {
      return (
        <div className="om-card">
          <h3>{t('error.loadFailed')}</h3>
          <p>{error}</p>
          <button className="om-btn" onClick={() => void load()}>{t('error.retry')}</button>
        </div>
      )
    }
    if (!catalog?.configured) {
      return (
        <div className="om-card">
          <h3>{t('configured.title')}</h3>
          <p>{hostMessage(t, catalog?.code, catalog?.params, catalog?.message ?? t('configured.notSet'))}</p>
          <button className="om-btn" onClick={() => void load()}>{t('configured.recheck')}</button>
        </div>
      )
    }
    if (catalog?.compatible === false) {
      return (
        <div className="om-card">
          <h3>{catalog.displayName || catalog.provider}</h3>
          <p>{hostMessage(t, catalog?.code, catalog?.params, catalog?.message ?? t('notCompatible.msg'))}</p>
          <button className="om-btn" onClick={() => void selectProvider(provider === catalog.provider ? '' : catalog.provider)}>{t('action.back')}</button>
        </div>
      )
    }
    return (
      <>
        <div className="om-head">
          <h3 className="om-title">{t('head.title')}</h3>
          <span className="om-sub">
            {catalog.displayName || catalog.provider}
            {catalog.api ? ' · ' + catalog.api : ''} · {catalog.baseURL}
          </span>
          <span className="om-count">{t('counts.enabled', { enabled: enabledCount, total })}</span>
        </div>

        <div className="om-tip" role="note">
          <MorphIcon icon={IconInfo} size={15} strokeWidth={2} />
          <span>{t('note.apiKey')}</span>
        </div>

        <div className="om-toolbar">
          <div className="om-group">
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span className="om-sub">{t('toolbar.route')}</span>
              <OmCombobox
                aria-label={t('toolbar.route')}
                value={provider}
                onChange={selectProvider}
                placeholder={t('toolbar.route')}
                options={(catalog.providers ?? []).map((p) => ({
                  value: p.provider,
                  label: `${p.displayName}（${p.modelCount}）${p.compatible ? '' : ' · ' + t('option.notDiscoverable')}`,
                }))}
                style={{ minWidth: 170 }}
              />
            </label>
            <input className="om-input om-search" placeholder={t('toolbar.search')} value={query} onChange={(e) => setQuery(e.target.value)} />
            <OmCombobox
              aria-label={t('filter.modality.all')}
              value={modality}
              onChange={(v) => setModality(v as typeof modality)}
              options={[
                { value: 'all', label: t('filter.modality.all') },
                { value: 'text', label: t('filter.modality.text') },
                { value: 'image', label: t('filter.modality.image') },
              ]}
            />
            <OmCombobox
              aria-label={t('filter.vendor.all')}
              value={vendorFilter}
              onChange={setVendorFilter}
              searchable
              searchPlaceholder={t('toolbar.search')}
              emptyText={t('empty.noMatch')}
              options={[
                { value: 'all', label: t('filter.vendor.all') },
                ...vendors.map((v) => ({ value: v, label: v === '' ? t('filter.vendor.none') : v })),
              ]}
              style={{ minWidth: 150 }}
            />
            <OmCombobox
              aria-label={t('filter.enabled.all')}
              value={enabledFilter}
              onChange={(v) => setEnabledFilter(v as typeof enabledFilter)}
              options={[
                { value: 'all', label: t('filter.enabled.all') },
                { value: 'enabled', label: t('filter.enabled.enabled') },
                { value: 'disabled', label: t('filter.enabled.disabled') },
              ]}
            />
          </div>
          <div className="om-group right">
            <button className="om-btn" onClick={() => setChecked((prev) => { const next = new Set(prev); for (const m of filtered) next.add(m.id); return next })}><MorphIcon icon={IconCheck} size={15} strokeWidth={2} /> {t('action.selectMatching')}</button>
            <button className="om-btn" onClick={() => setChecked(new Set())}><MorphIcon icon={IconX} size={15} strokeWidth={2} /> {t('action.deselectAll')}</button>
            <button className="om-btn" onClick={() => void load(provider)}><MorphIcon icon={IconRefresh} size={15} strokeWidth={2} /> {t('action.refresh')}</button>
          </div>
        </div>

        <div className="om-table-wrap" style={{ maxHeight: 420 }}>
          <table className="om-table">
            <thead>
              <tr>
                <th style={{ width: 44 }}></th>
                <th>{t('col.model')}</th>
                <th style={{ width: 108 }}>{t('col.modality')}</th>
                <th style={{ width: 80, textAlign: 'right' }}>{t('col.context')}</th>
                <th style={{ width: 80, textAlign: 'right' }}>{t('col.output')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <div className="om-empty">{t('empty.noMatch')}</div>
                  </td>
                </tr>
              )}
              {paged.map((m) => (
                <tr key={m.id} className={checked.has(m.id) ? 'om-sel' : undefined}>
                  <td style={{ verticalAlign: 'middle', padding: '10px 0', textAlign: 'center' }}>
                    <OmCheckbox checked={checked.has(m.id)} onCheckedChange={() => toggle(m.id)} aria-label={t('aria.selectModel', { id: m.id })} />
                  </td>
                  <td>
                    <div className="om-model-cell">
                      {m.vendor && <span className="om-vendor">{m.vendor} / </span>}
                      <span className="om-id">{m.vendor ? m.id.slice(m.vendor.length + 1) : m.id}</span>
                    </div>
                  </td>
                  <td>
                    <span className={'om-badge' + (m.input.includes('image') ? ' img' : '')}>
                      {m.input.includes('image') ? t('modality.textImage') : t('modality.text')}
                    </span>
                  </td>
                  <td className="om-meta" style={{ textAlign: 'right' }}>{fmtTokens(m.contextWindow)}</td>
                  <td className="om-meta" style={{ textAlign: 'right' }}>{fmtTokens(m.maxTokens)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="om-pager" style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
          <button className="om-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage <= 1}>{t('action.prevPage')}</button>
          <span className="om-sub">{t('counts.page', { page: safePage, totalPages })}</span>
          <button className="om-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage >= totalPages}>{t('action.nextPage')}</button>
        </div>

        <div className="om-foot">
          <button className="om-btn primary" onClick={() => void apply()} disabled={saving} style={{ minWidth: 120 }}>
            {saving ? t('action.saving') : t('action.save')}
          </button>
          <span className="om-sub">{t('counts.selected', { checked: checked.size, matched: filtered.length, total })}</span>
          {flash && <span className={'om-status ' + flash.kind} role="status">{flash.text}</span>}
        </div>
        <p className="om-note">{t('note.save')}</p>
      </>
    )
  }

  return (
    <div className="om-root">
      <div className="om-tabs" role="tablist" aria-label={t('nav')}>
        <button role="tab" aria-selected={tab === 'models'} className={tab === 'models' ? 'om-tab on' : 'om-tab'} onClick={() => setTab('models')}>{t('tab.models')}</button>
        <button role="tab" aria-selected={tab === 'search'} className={tab === 'search' ? 'om-tab on' : 'om-tab'} onClick={() => setTab('search')}>{t('tab.search')}</button>
      </div>
      {tab === 'models' ? renderModels() : <SearchConfigCard t={t} />}
    </div>
  )
}

