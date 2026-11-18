import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, LayoutGrid, List, Phone, PhoneCall, Plus, Search } from 'lucide-react'
import { Avatar, CopyButton, EmptyState, FollowUp, Modal, PageHeader, ResultBadge } from './ui'
import { lastActivityOf, useStore } from '../store'
import { SOCIOS, STAGES } from '../constants'
import { relDay, telHref } from '../utils'

export default function Pipeline({ onOpenLead, onQuickCall, globalQuery }) {
  const { leads, activities, moveLead, notify, me } = useStore()
  const [view, setView] = useState(() => localStorage.getItem('norventis-view') || 'kanban')
  const [q, setQ] = useState('')
  const [resp, setResp] = useState('todos')
  const [sector, setSector] = useState('todos')
  const [stage, setStage] = useState('todos')
  const [showNew, setShowNew] = useState(false)
  const [sort, setSort] = useState({ key: 'proximoSeguimiento', dir: 1 })

  const setViewP = (v) => {
    setView(v)
    localStorage.setItem('norventis-view', v)
  }

  const sectors = useMemo(() => [...new Set(leads.map((l) => l.sector).filter(Boolean))].sort(), [leads])
  const text = (q || globalQuery || '').trim().toLowerCase()

  const filtered = useMemo(
    () =>
      leads.filter(
        (l) =>
          (resp === 'todos' || l.responsable === resp) &&
          (sector === 'todos' || l.sector === sector) &&
          (stage === 'todos' || l.etapa === stage) &&
          (!text || [l.empresa, l.contacto, l.telefono, l.sector, l.email].join(' ').toLowerCase().includes(text)),
      ),
    [leads, resp, sector, stage, text],
  )

  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Pipeline" subtitle={`${filtered.length} de ${leads.length} negocios`}>
        <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs">
          {[['kanban', 'Kanban', LayoutGrid], ['tabla', 'Tabla', List]].map(([id, label, Icon]) => (
            <button key={id} onClick={() => setViewP(id)} className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium ${view === id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>
        <button className="btn-primary" onClick={() => setShowNew(true)}>
          <Plus size={15} /> Nuevo lead
        </button>
      </PageHeader>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input !w-64 pl-8" placeholder="Filtrar por nombre, contacto, teléfono…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className="input !w-auto" value={resp} onChange={(e) => setResp(e.target.value)}>
          <option value="todos">Todos los responsables</option>
          {SOCIOS.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select className="input !w-auto" value={sector} onChange={(e) => setSector(e.target.value)}>
          <option value="todos">Todos los sectores</option>
          {sectors.map((s) => <option key={s}>{s}</option>)}
        </select>
        {view === 'tabla' && (
          <select className="input !w-auto" value={stage} onChange={(e) => setStage(e.target.value)}>
            <option value="todos">Todas las etapas</option>
            {STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        )}
        {resp !== me && <button className="text-xs text-brand-700 hover:underline" onClick={() => setResp(me)}>Solo mis leads</button>}
      </div>

      {view === 'kanban' ? (
        <Kanban leads={filtered} activities={activities} onOpenLead={onOpenLead} onQuickCall={onQuickCall} moveLead={moveLead} notify={notify} />
      ) : (
        <Table leads={filtered} activities={activities} onOpenLead={onOpenLead} onQuickCall={onQuickCall} sort={sort} setSort={setSort} moveLead={moveLead} />
      )}

      {showNew && <NewLeadModal onClose={() => setShowNew(false)} onCreated={(l) => onOpenLead(l.id)} />}
    </div>
  )
}

// ------------------------------------------------------------------ Kanban
function Kanban({ leads, activities, onOpenLead, onQuickCall, moveLead, notify }) {
  const [dragId, setDragId] = useState(null)
  const [over, setOver] = useState(null)

  const drop = (stageId) => {
    const l = leads.find((x) => x.id === dragId)
    if (l && l.etapa !== stageId) {
      moveLead(dragId, stageId)
      notify(`${l.empresa} → ${STAGES.find((s) => s.id === stageId).label}`)
    }
    setDragId(null)
    setOver(null)
  }

  return (
    <div className="-mx-1 flex min-h-0 flex-1 gap-3 overflow-x-auto px-1 pb-3">
      {STAGES.map((s) => {
        const items = leads.filter((l) => l.etapa === s.id)
        return (
          <div
            key={s.id}
            onDragOver={(e) => { e.preventDefault(); setOver(s.id) }}
            onDragLeave={() => setOver((o) => (o === s.id ? null : o))}
            onDrop={() => drop(s.id)}
            className={`flex w-[268px] shrink-0 flex-col rounded-xl border border-t-4 bg-slate-100/60 ${s.col} ${over === s.id ? 'border-x-brand-400 border-b-brand-400 bg-brand-50/60' : 'border-x-slate-200 border-b-slate-200'}`}
          >
            <div className="px-3 pb-2 pt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-semibold text-slate-800">{s.label}</h3>
                <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium tabular-nums text-slate-600 ring-1 ring-inset ring-slate-200">{items.length}</span>
              </div>
              {s.sub && <p className="text-[11px] text-slate-500">{s.sub}</p>}
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto px-2 pb-2">
              {items.map((l) => (
                <Card key={l.id} lead={l} last={lastActivityOf(activities, l.id)} dragging={dragId === l.id}
                  onDragStart={() => setDragId(l.id)} onDragEnd={() => { setDragId(null); setOver(null) }}
                  onOpen={() => onOpenLead(l.id)} onCall={() => onQuickCall(l.id)} />
              ))}
              {!items.length && <p className="rounded-lg border border-dashed border-slate-300 py-6 text-center text-xs text-slate-400">Arrastra aquí</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Card({ lead: l, last, dragging, onDragStart, onDragEnd, onOpen, onCall }) {
  return (
    <div
      draggable
      onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', l.id); onDragStart() }}
      onDragEnd={onDragEnd}
      onClick={onOpen}
      className={`group cursor-grab rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:border-brand-300 hover:shadow active:cursor-grabbing ${dragging ? 'opacity-40' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-snug text-slate-900">{l.empresa}</p>
        <Avatar name={l.responsable} />
      </div>
      <p className="mt-0.5 text-xs text-slate-500">{l.sector}</p>
      <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
        <span className="truncate">{l.contacto}</span>
        <span className="flex items-center">
          <span className="tabular-nums">{l.telefono}</span>
          <CopyButton text={l.telefono} label="Teléfono" />
        </span>
      </div>
      {l.auditoria[0] && <p className="mt-2 truncate rounded bg-slate-50 px-1.5 py-1 text-[11px] text-slate-500">⚑ {l.auditoria[0].text}</p>}
      <div className="mt-2.5 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          {last?.resultado && <ResultBadge id={last.resultado} />}
          {l.proximoSeguimiento && <FollowUp date={l.proximoSeguimiento} compact />}
        </div>
        <button
          title="Registrar llamada"
          onClick={(e) => { e.stopPropagation(); onCall() }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700 opacity-0 transition hover:bg-brand-600 hover:text-white group-hover:opacity-100"
        >
          <PhoneCall size={13} />
        </button>
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ Tabla
function Table({ leads, activities, onOpenLead, onQuickCall, sort, setSort, moveLead }) {
  const rows = useMemo(() => {
    const val = (l) => {
      if (sort.key === 'ultimo') return lastActivityOf(activities, l.id)?.fecha || ''
      if (sort.key === 'proximoSeguimiento') return l.proximoSeguimiento || '9999'
      return (l[sort.key] || '').toString().toLowerCase()
    }
    return [...leads].sort((a, b) => (val(a) < val(b) ? -1 : val(a) > val(b) ? 1 : 0) * sort.dir)
  }, [leads, activities, sort])

  const Th = ({ k, children, className = '' }) => (
    <th className={`px-4 py-2.5 text-left text-xs font-medium text-slate-500 ${className}`}>
      <button className="inline-flex items-center gap-1 hover:text-slate-800" onClick={() => setSort((s) => ({ key: k, dir: s.key === k ? -s.dir : 1 }))}>
        {children}
        {sort.key === k && (sort.dir === 1 ? <ArrowUp size={11} /> : <ArrowDown size={11} />)}
      </button>
    </th>
  )

  if (!rows.length) return <div className="card"><EmptyState icon={Search} title="Sin resultados" hint="Prueba a quitar algún filtro." /></div>

  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[960px] text-sm">
        <thead className="border-b border-slate-100 bg-slate-50/70">
          <tr>
            <Th k="empresa">Negocio</Th>
            <Th k="etapa">Etapa</Th>
            <Th k="contacto">Contacto</Th>
            <Th k="telefono">Teléfono</Th>
            <Th k="responsable">Resp.</Th>
            <Th k="ultimo">Último contacto</Th>
            <Th k="proximoSeguimiento">Seguimiento</Th>
            <th />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((l) => {
            const last = lastActivityOf(activities, l.id)
            return (
              <tr key={l.id} onClick={() => onOpenLead(l.id)} className="cursor-pointer hover:bg-slate-50/70">
                <td className="px-4 py-2.5">
                  <p className="font-medium text-slate-900">{l.empresa}</p>
                  <p className="text-xs text-slate-500">{l.sector}</p>
                </td>
                <td className="px-4 py-2.5" onClick={(e) => e.stopPropagation()}>
                  <select value={l.etapa} onChange={(e) => moveLead(l.id, e.target.value)} className="rounded-md border border-slate-200 bg-white py-1 pl-2 pr-6 text-xs font-medium text-slate-700 hover:border-slate-300">
                    {STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </td>
                <td className="px-4 py-2.5 text-slate-600">{l.contacto}</td>
                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center gap-0.5 tabular-nums text-slate-700">
                    {l.telefono}
                    <CopyButton text={l.telefono} label="Teléfono" />
                  </span>
                </td>
                <td className="px-4 py-2.5"><Avatar name={l.responsable} /></td>
                <td className="px-4 py-2.5">
                  {last ? (
                    <div className="flex flex-col items-start gap-0.5">
                      {last.resultado ? <ResultBadge id={last.resultado} /> : <span className="text-xs capitalize text-slate-500">{last.tipo}</span>}
                      <span className="text-[11px] text-slate-400">{relDay(last.fecha.slice(0, 10))}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </td>
                <td className="px-4 py-2.5"><FollowUp date={l.proximoSeguimiento} compact /></td>
                <td className="px-4 py-2.5 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="inline-flex gap-1">
                    <a href={telHref(l.telefono)} className="btn-secondary btn-sm" title="Llamar"><Phone size={12} /></a>
                    <button className="btn-primary btn-sm" onClick={() => onQuickCall(l.id)}>Registrar</button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ------------------------------------------------------------------ Nuevo lead
function NewLeadModal({ onClose, onCreated }) {
  const { addLead, me, notify } = useStore()
  const [f, setF] = useState({ empresa: '', sector: '', contacto: '', telefono: '', email: '', web: '', responsable: me })
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))
  const ok = f.empresa.trim() && f.telefono.trim()
  const submit = (e) => {
    e.preventDefault()
    if (!ok) return
    const l = addLead(f)
    notify('Lead creado')
    onClose()
    onCreated(l)
  }
  return (
    <Modal
      title="Nuevo lead"
      onClose={onClose}
      footer={<><button className="btn-ghost" onClick={onClose}>Cancelar</button><button className="btn-primary" disabled={!ok} onClick={submit}>Crear lead</button></>}
    >
      <form onSubmit={submit} className="grid grid-cols-2 gap-3">
        <div className="col-span-2"><span className="label">Nombre del negocio *</span><input autoFocus className="input" value={f.empresa} onChange={set('empresa')} /></div>
        <div><span className="label">Sector / nicho</span><input className="input" placeholder="Ej. Clínica dental" value={f.sector} onChange={set('sector')} /></div>
        <div><span className="label">Responsable</span>
          <select className="input" value={f.responsable} onChange={set('responsable')}>{SOCIOS.map((s) => <option key={s}>{s}</option>)}</select>
        </div>
        <div><span className="label">Persona de contacto</span><input className="input" value={f.contacto} onChange={set('contacto')} /></div>
        <div><span className="label">Teléfono *</span><input className="input" value={f.telefono} onChange={set('telefono')} /></div>
        <div><span className="label">Email</span><input type="email" className="input" value={f.email} onChange={set('email')} /></div>
        <div><span className="label">Web actual</span><input className="input" placeholder="Vacío si no tienen" value={f.web} onChange={set('web')} /></div>
        <button type="submit" className="hidden" />
      </form>
    </Modal>
  )
}
