/**
 * @dsh-external/dsh-omniroute-models — client half.
 *
 * Registers a `settings.section` page ("OmniRoute 模型管理"). All styling uses
 * DSH's theme tokens (`--dsw-alias-*` / `--dsw-font-*`) so it matches the
 * panel's light/dark surfaces and stays readable at every contrast level.
 */
import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
// Pull the settings.section SlotMap augmentation into scope (type-only).
import type {} from '@deepseek-ai/dsh-client-ui-settings'

export const name = '@dsh-external/dsh-omniroute-models'
export const inject = ['slots']

const API = '/omniroute-models/api'

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
  providers?: ProviderInfo[]
  models?: CatalogModel[]
  enabledCount?: number
  totalCount?: number
}

export function apply(ctx: ClientContext): void {
  ctx.effect(() => {
    const style = document.createElement('style')
    style.textContent = STYLE
    document.head.appendChild(style)
    return () => style.remove()
  }, 'omniroute-models: styles')

  ctx.effect(
    () =>
      ctx.slots.inject('settings.section', () =>
        ctx.slots.register(
          {
            name: 'settings.section',
            id: 'omniroute-models',
            order: 15,
            label: () => 'OmniRoute 模型管理',
          },
          OmnirouteModelsSection,
        ),
      ),
    'omniroute-models: settings.section',
  )
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

function OmnirouteModelsSection(_props: { close?: () => void }): ReactNode {
  const [catalog, setCatalog] = useState<Catalog | null>(null)
  const [provider, setProvider] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [modality, setModality] = useState<'all' | 'text' | 'image'>('all')
  const [vendorFilter, setVendorFilter] = useState('all')
  const [onlyDisabled, setOnlyDisabled] = useState(false)
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [saving, setSaving] = useState(false)
  const [flash, setFlash] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)

  async function load(p?: string) {
    setLoading(true)
    setError(null)
    setFlash(null)
    try {
      const qs = p ? `?provider=${encodeURIComponent(p)}` : ''
      const res = await fetch(`${API}/catalog${qs}`, { cache: 'no-store' })
      const data = (await res.json()) as Catalog
      setCatalog(data)
      setProvider(data.provider ?? '')
      const enabled = new Set<string>()
      for (const m of data.models ?? []) if (m.enabled) enabled.add(m.id)
      setChecked(enabled)
    } catch (e) {
      setError(String((e as Error).message ?? e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function selectProvider(p: string) {
    setProvider(p)
    setQuery('')
    setModality('all')
    setVendorFilter('all')
    setOnlyDisabled(false)
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
    return models.filter((m) => {
      if (q && !m.id.toLowerCase().includes(q) && !(m.name ?? '').toLowerCase().includes(q)) return false
      if (modality === 'image' && !m.input.includes('image')) return false
      if (modality === 'text' && m.input.includes('image')) return false
      if (vendorFilter !== 'all') {
        if (vendorFilter === '') {
          if (m.vendor !== '') return false
        } else if (m.vendor !== vendorFilter) return false
      }
      if (onlyDisabled && m.enabled) return false
      return true
    })
  }, [catalog, query, modality, vendorFilter, onlyDisabled])

  const total = catalog?.models?.length ?? 0
  const enabledCount = catalog?.enabledCount ?? 0

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function apply() {
    const selected = filtered.filter((m) => checked.has(m.id))
    if (selected.length === 0) {
      setFlash({ kind: 'err', text: '至少勾选 1 个模型' })
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
      const body = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !body.ok) {
        setFlash({ kind: 'err', text: body.error ?? '应用失败' })
        return
      }
      setFlash({ kind: 'ok', text: '已保存 ' + selected.length + ' 个模型' })
      await load()
    } catch (e) {
      setFlash({ kind: 'err', text: String((e as Error).message ?? e) })
    } finally {
      setSaving(false)
    }
  }

  // Loading (first fetch) → skeleton
  if (loading && !catalog) {
    return (
      <div className="om-root" aria-busy="true">
        <div className="om-skel">
          <div className="bar" style={{ width: '40%' }} />
          <div className="bar" style={{ width: '80%' }} />
          <div className="bar" style={{ width: '60%' }} />
        </div>
        <p className="om-note">正在拉取 OmniRoute 模型…</p>
      </div>
    )
  }

  if (error && !catalog) {
    return (
      <div className="om-root">
        <div className="om-card">
          <h3>加载失败</h3>
          <p>{error}</p>
          <button className="om-btn" onClick={() => void load()}>
            重试
          </button>
        </div>
      </div>
    )
  }

  if (!catalog?.configured) {
    return (
      <div className="om-root">
        <div className="om-card">
          <h3>OmniRoute 模型管理</h3>
          <p>{catalog?.message ?? '未配置 OmniRoute 提供方。'}</p>
          <button className="om-btn" onClick={() => void load()}>
            重新检查
          </button>
        </div>
      </div>
    )
  }

  if (catalog?.compatible === false) {
    return (
      <div className="om-root">
        <div className="om-card">
          <h3>{catalog.displayName || catalog.provider}</h3>
          <p>{catalog?.message ?? '该供应商不支持自动发现。'}</p>
          <button className="om-btn" onClick={() => void selectProvider(provider === catalog.provider ? '' : catalog.provider)}>
            返回
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="om-root">
      <div className="om-head">
        <h3 className="om-title">模型管理</h3>
        <span className="om-sub">
          {catalog.displayName || catalog.provider}
          {catalog.api ? ' · ' + catalog.api : ''} · {catalog.baseURL}
        </span>
        <span className="om-count">已启用 {enabledCount} / {total}</span>
      </div>

      <div className="om-toolbar">
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span className="om-sub">路由</span>
          <select className="om-select" value={provider} onChange={(e) => selectProvider(e.target.value)} style={{ minWidth: 170 }}>
            {(catalog.providers ?? []).map((p) => (
              <option key={p.provider} value={p.provider}>
                {p.displayName}（{p.modelCount}）{p.compatible ? '' : ' · 不可自动发现'}
              </option>
            ))}
            {!catalog.providers?.length && <option value={provider}>{catalog.provider}</option>}
          </select>
        </label>
        <input
          className="om-input"
          style={{ width: 240 }}
          placeholder="搜索模型 id 或名称…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="om-select" value={modality} onChange={(e) => setModality(e.target.value as typeof modality)}>
          <option value="all">全部模态</option>
          <option value="text">仅文本</option>
          <option value="image">视觉（含图片）</option>
        </select>
        <select className="om-select" value={vendorFilter} onChange={(e) => setVendorFilter(e.target.value)} style={{ minWidth: 150 }}>
          <option value="all">全部供应商</option>
          {vendors.map((v) => (
            <option key={v || '__none__'} value={v}>
              {v === '' ? '无命名空间' : v}
            </option>
          ))}
        </select>
        <label className="om-sub" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
          <input className="om-check" type="checkbox" checked={onlyDisabled} onChange={(e) => setOnlyDisabled(e.target.checked)} />
          仅未启用
        </label>
        <button className="om-btn" onClick={() => setChecked(new Set(filtered.map((m) => m.id)))}>
          全选匹配
        </button>
        <button className="om-btn" onClick={() => setChecked(new Set())}>
          全不选
        </button>
        <button className="om-btn" onClick={() => void load(provider)}>
          拉取
        </button>
      </div>

      <div className="om-table-wrap" style={{ maxHeight: 420 }}>
        <table className="om-table">
          <thead>
            <tr>
              <th style={{ width: 44 }}></th>
              <th style={{ width: 96 }}>供应商</th>
              <th>模型</th>
              <th style={{ width: 108 }}>模态</th>
              <th style={{ width: 80, textAlign: 'right' }}>上下文</th>
              <th style={{ width: 80, textAlign: 'right' }}>输出</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <div className="om-empty">无匹配模型</div>
                </td>
              </tr>
            )}
            {filtered.map((m) => (
              <tr key={m.id} className={checked.has(m.id) ? 'om-sel' : undefined}>
                <td style={{ verticalAlign: 'middle', padding: '10px 0', textAlign: 'center' }}>
                  <input className="om-check" type="checkbox" checked={checked.has(m.id)} onChange={() => toggle(m.id)} aria-label={`选择 ${m.id}`} />
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {m.vendor ? <span className="om-badge">{m.vendor}</span> : <span className="om-meta">—</span>}
                </td>
                <td>
                  <div className="om-id">{m.vendor ? m.id.slice(m.vendor.length + 1) : m.id}</div>
                </td>
                <td>
                  <span className={'om-badge' + (m.input.includes('image') ? ' img' : '')}>
                    {m.input.includes('image') ? 'text + image' : 'text'}
                  </span>
                </td>
                <td className="om-meta" style={{ textAlign: 'right' }}>{fmtTokens(m.contextWindow)}</td>
                <td className="om-meta" style={{ textAlign: 'right' }}>{fmtTokens(m.maxTokens)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="om-foot">
        <button className="om-btn primary" onClick={() => void apply()} disabled={saving} style={{ minWidth: 120 }}>
          {saving ? '保存中…' : '保存所选'}
        </button>
        <span className="om-sub">已选 {checked.size} · 匹配 {filtered.length} · 共 {total}</span>
        {flash && <span className={'om-status ' + flash.kind} role="status">{flash.text}</span>}
      </div>
      <p className="om-note">保存即整体替换该路由的 models 列表（DSH 恰好能用勾选的这些）；未保存前不落盘。</p>
    </div>
  )
}
