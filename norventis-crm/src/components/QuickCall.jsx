import { useMemo, useState } from 'react'
import { ExternalLink, Phone, Search } from 'lucide-react'
import { Avatar, CopyButton, Modal, StageBadge } from './ui'
import LogForm from './LogForm'
import { useStore } from '../store'
import { telHref } from '../utils'

/** Modal global "Registrar llamada": elegir lead (por nombre, contacto o teléfono) + formulario rápido. */
export default function QuickCall({ leadId, onClose, onOpenLead }) {
  const { leads } = useStore()
  const [selected, setSelected] = useState(leadId || null)
  const [q, setQ] = useState('')

  const lead = leads.find((l) => l.id === selected)
  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    const pool = leads.filter((l) => l.etapa !== 'perdido')
    return (s ? pool.filter((l) => [l.empresa, l.contacto, l.telefono, l.sector].join(' ').toLowerCase().includes(s)) : pool).slice(0, 7)
  }, [leads, q])

  return (
    <Modal title="Registrar llamada" onClose={onClose} width="max-w-xl">
      {!lead ? (
        <div>
          <div className="relative mb-3">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input autoFocus className="input pl-9" placeholder="Buscar negocio, contacto o teléfono…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200">
            {results.map((l) => (
              <li key={l.id}>
                <button onClick={() => setSelected(l.id)} className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left hover:bg-slate-50">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">{l.empresa}</p>
                    <p className="truncate text-xs text-slate-500">
                      {l.contacto} · {l.telefono}
                    </p>
                  </div>
                  <StageBadge id={l.etapa} />
                </button>
              </li>
            ))}
            {!results.length && <li className="px-3 py-6 text-center text-sm text-slate-400">Sin resultados</li>}
          </ul>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex items-start justify-between gap-3 rounded-lg bg-slate-50 p-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Avatar name={lead.responsable} />
                <p className="truncate text-sm font-semibold text-slate-900">{lead.empresa}</p>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {lead.contacto} · {lead.sector}
              </p>
              <div className="mt-1.5 flex items-center gap-1">
                <a href={telHref(lead.telefono)} className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline">
                  <Phone size={13} /> {lead.telefono}
                </a>
                <CopyButton text={lead.telefono} label="Teléfono" />
              </div>
              {lead.auditoria.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {lead.auditoria.map((a) => (
                    <span key={a.id} className="rounded bg-white px-1.5 py-0.5 text-[11px] text-slate-600 ring-1 ring-inset ring-slate-200">
                      {a.text}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <StageBadge id={lead.etapa} />
              <button onClick={() => { onClose(); onOpenLead(lead.id) }} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-brand-700">
                Ficha <ExternalLink size={11} />
              </button>
              {!leadId && (
                <button onClick={() => setSelected(null)} className="text-xs text-slate-400 hover:text-slate-600">
                  Cambiar
                </button>
              )}
            </div>
          </div>
          <LogForm lead={lead} autoFocus onDone={onClose} />
        </div>
      )}
    </Modal>
  )
}
