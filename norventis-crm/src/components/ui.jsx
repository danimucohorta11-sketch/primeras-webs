import { useEffect, useState } from 'react'
import { Check, Copy, X } from 'lucide-react'
import { DOC_ESTADO_BADGE, RESULTADO_BY_ID, STAGE_BY_ID } from '../constants'
import { copyText, diffDays, fmtDate, initials, relDay, today } from '../utils'
import { useStore } from '../store'

export const Badge = ({ className = '', children }) => (
  <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${className}`}>
    {children}
  </span>
)

export const StageBadge = ({ id }) => {
  const s = STAGE_BY_ID[id]
  return (
    <Badge className={s.badge}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </Badge>
  )
}

export const ResultBadge = ({ id }) => {
  const r = RESULTADO_BY_ID[id]
  return r ? <Badge className={r.badge}>{r.label}</Badge> : null
}

export const DocBadge = ({ estado }) => <Badge className={DOC_ESTADO_BADGE[estado]}>{estado}</Badge>

/** Fecha de próximo seguimiento con color según urgencia. */
export const FollowUp = ({ date, compact = false }) => {
  if (!date) return <span className="text-xs text-slate-400">Sin seguimiento</span>
  const n = diffDays(date, today())
  const tone = n < 0 ? 'bg-rose-50 text-rose-700 ring-rose-200' : n === 0 ? 'bg-amber-50 text-amber-800 ring-amber-200' : 'bg-slate-50 text-slate-600 ring-slate-200'
  return (
    <Badge className={tone}>
      {n < 0 ? 'Atrasado · ' : ''}
      {compact ? relDay(date) : `${relDay(date)} · ${fmtDate(date)}`}
    </Badge>
  )
}

export const Avatar = ({ name, size = 'sm' }) => {
  const tone = name === 'Socio 1' ? 'bg-brand-100 text-brand-700' : 'bg-emerald-100 text-emerald-700'
  const sz = size === 'sm' ? 'h-6 w-6 text-[10px]' : 'h-8 w-8 text-xs'
  return (
    <span title={name} className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${tone} ${sz}`}>
      {name?.startsWith('Socio ') ? `S${name.slice(6)}` : initials(name)}
    </span>
  )
}

/** Botón de copiar con confirmación visual. */
export const CopyButton = ({ text, label, className = '' }) => {
  const [ok, setOk] = useState(false)
  const { notify } = useStore()
  if (!text) return null
  return (
    <button
      type="button"
      title={`Copiar ${label || text}`}
      onClick={async (e) => {
        e.stopPropagation()
        await copyText(text)
        setOk(true)
        notify(`${label || 'Texto'} copiado`)
        setTimeout(() => setOk(false), 1200)
      }}
      className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 ${className}`}
    >
      {ok ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
    </button>
  )
}

export function Modal({ title, onClose, children, width = 'max-w-lg', footer }) {
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 pt-[8vh] backdrop-blur-[2px] animate-fadeIn" onMouseDown={onClose}>
      <div className={`card w-full ${width} animate-pop`} onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3 rounded-b-xl">{footer}</div>}
      </div>
    </div>
  )
}

export const Toast = () => {
  const { toast } = useStore()
  if (!toast) return null
  return (
    <div key={toast.id} className="pointer-events-none fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 animate-pop">
      <div className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white shadow-lg">
        <Check size={14} className="text-emerald-400" />
        {toast.message}
      </div>
    </div>
  )
}

export const EmptyState = ({ icon: Icon, title, hint }) => (
  <div className="flex flex-col items-center justify-center gap-1 py-10 text-center">
    {Icon && <Icon size={22} className="text-slate-300" />}
    <p className="text-sm font-medium text-slate-600">{title}</p>
    {hint && <p className="text-xs text-slate-400">{hint}</p>}
  </div>
)

export const PageHeader = ({ title, subtitle, children }) => (
  <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
    <div>
      <h1 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h1>
      {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
    </div>
    <div className="flex items-center gap-2">{children}</div>
  </div>
)
