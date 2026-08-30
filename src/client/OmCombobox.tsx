/**
 * OmCombobox — a lightweight, dependency-free listbox/combobox for DSH client.
 *
 * Designed to replace native <select> for list-style fields (route, vendor):
 * styled entirely with DSH `--dsw-*` tokens (matches the deep theme), supports
 * keyboard navigation + optional input filtering (searchable), and is a11y-aware
 * (ARIA combobox/listbox pattern). Icons come from morphicons (already bundled).
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import { MorphIcon, type IconNode } from 'morphicons/react'

export interface OmOption {
  value: string
  label: string
}

interface OmComboboxProps {
  value: string
  onChange: (value: string) => void
  options: OmOption[]
  placeholder?: string
  searchable?: boolean
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  style?: CSSProperties
  'aria-label'?: string
}

// Hoisted icon data (module scope — never recreated per render).
const IconChevronDown: IconNode = [['path', { d: 'm6 9 6 6 6-6' }]]
const IconChevronUp: IconNode = [['path', { d: 'm18 15-6-6-6 6' }]]
const IconSearchBox: IconNode = [['circle', { cx: 11, cy: 11, r: 8 }], ['path', { d: 'm21 21-4.3-4.3' }]]
const IconCheck: IconNode = [['path', { d: 'M20 6 9 17l-5-5' }]]

export function OmCombobox({
  value,
  onChange,
  options,
  placeholder,
  searchable = false,
  searchPlaceholder,
  emptyText = '无匹配项',
  className,
  style,
  'aria-label': ariaLabel,
}: OmComboboxProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(-1)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const selected = options.find((o) => o.value === value)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, query])

  function close() {
    setOpen(false)
    setQuery('')
    setActive(-1)
  }

  function openList() {
    setOpen(true)
    setActive(-1)
    setQuery('')
    if (searchable) requestAnimationFrame(() => inputRef.current?.focus())
  }

  function select(v: string) {
    onChange(v)
    close()
  }

  // Close on outside click.
  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  // Keep the active option in view while arrowing.
  useEffect(() => {
    if (!open || active < 0) return
    listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  function onKeyDown(e: KeyboardEvent) {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openList()
      }
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (filtered.length ? (a + 1) % filtered.length : -1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (filtered.length ? (a - 1 + filtered.length) % filtered.length : -1))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActive(filtered.length ? 0 : -1)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActive(filtered.length ? filtered.length - 1 : -1)
    } else if (e.key === 'Enter') {
      if (active >= 0 && filtered[active]) {
        e.preventDefault()
        select(filtered[active].value)
      } else if (!searchable && filtered[0]) {
        e.preventDefault()
        select(filtered[0].value)
      }
    }
  }

  return (
    <div className={'om-combo' + (className ? ' ' + className : '')} style={style} ref={rootRef}>
      <button
        type="button"
        className="om-combo-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onKeyDown}
      >
        <span className="om-combo-val">{selected ? selected.label : (placeholder ?? '')}</span>
        <span className="om-combo-caret" aria-hidden="true">
          <MorphIcon icon={open ? IconChevronUp : IconChevronDown} size={14} strokeWidth={2} />
        </span>
      </button>

      {open && (
        <div className="om-combo-panel">
          {searchable && (
            <label className="om-combo-search">
              <MorphIcon icon={IconSearchBox} size={14} strokeWidth={2} />
              <input
                ref={inputRef}
                value={query}
                placeholder={searchPlaceholder}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(-1)
                }}
                onKeyDown={onKeyDown}
              />
            </label>
          )}
          <ul className="om-combo-list" ref={listRef} role="listbox" aria-label={ariaLabel}>
            {filtered.length === 0 && <li className="om-combo-empty">{emptyText}</li>}
            {filtered.map((o, i) => {
              const isSel = o.value === value
              return (
                <li
                  key={o.value}
                  id={`om-opt-${i}`}
                  role="option"
                  aria-selected={isSel}
                  className={'om-combo-opt' + (i === active ? ' on' : '') + (isSel ? ' sel' : '')}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => select(o.value)}
                >
                  <span className="om-combo-label">{o.label}</span>
                  {isSel && (
                    <span className="om-combo-check" aria-hidden="true">
                      <MorphIcon icon={IconCheck} size={14} strokeWidth={2} />
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
