import { useMemo, useState } from 'react'
import { Download, FileText, Pencil, Plus, Receipt, Trash2, CheckCircle2 } from 'lucide-react'
import { DocBadge, EmptyState, Modal, PageHeader } from './ui'
import Dropzone from './Dropzone'
import { effectiveEstado, useStore } from '../store'
import { DOC_ESTADOS, DOC_TIPOS } from '../constants'
import { addDays, fmtDateFull, fmtMoney, today } from '../utils'

// ------------------------------------------------------------------ Modal crear / editar documento
export function DocModal({ doc, leadId, onClose }) {
  const { leads, saveDoc, nextDocNumber, notify } = useStore()
  const editing = !!doc
  const [f, setF] = useState(() =>
    doc || {
      leadId: leadId || leads[0]?.id, tipo: 'factura', numero: nextDocNumber('factura'), concepto: '', total: '', pagado: 0,
      emision: today(), vencimiento: addDays(today(), 15), estado: 'Borrador', archivo: null,
    },
  )
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }))
  const total = Number(f.total) || 0
  const pagado = Number(f.pagado) || 0
  const pendiente = Math.max(0, total - pagado)

  const changeTipo = (tipo) =>
    setF((s) => ({ ...s, tipo, numero: editing ? s.numero : nextDocNumber(tipo), estado: DOC_ESTADOS[tipo].includes(s.estado) ? s.estado : 'Borrador', pagado: tipo === 'presupuesto' ? 0 : s.pagado }))

  const ok = f.leadId && total > 0 && f.numero.trim()
  const submit = () => {
    if (!ok) return
    saveDoc({ ...f, total, pagado: Math.min(pagado, total) })
    notify(editing ? 'Documento actualizado' : `${f.tipo === 'factura' ? 'Factura' : 'Presupuesto'} creado`)
    onClose()
  }

  return (
    <Modal
      title={editing ? `Editar ${f.numero}` : 'Nuevo presupuesto / factura'}
      onClose={onClose}
      width="max-w-xl"
      footer={<><button className="btn-ghost" onClick={onClose}>Cancelar</button><button className="btn-primary" disabled={!ok} onClick={submit}>{editing ? 'Guardar cambios' : 'Crear'}</button></>}
    >
      <div className="grid grid-cols-2 gap-3">
        {!leadId && (
          <div className="col-span-2">
            <span className="label">Cliente</span>
            <select className="input" value={f.leadId} onChange={(e) => set('leadId', e.target.value)}>
              {leads.map((l) => <option key={l.id} value={l.id}>{l.empresa}</option>)}
            </select>
          </div>
        )}
        <div>
          <span className="label">Tipo</span>
          <div className="flex rounded-lg bg-slate-100 p-0.5 text-sm">
            {DOC_TIPOS.map((t) => (
              <button key={t.id} type="button" onClick={() => changeTipo(t.id)} className={`flex-1 rounded-md px-3 py-1.5 font-medium ${f.tipo === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>{t.label}</button>
            ))}
          </div>
        </div>
        <div><span className="label">Número</span><input className="input" value={f.numero} onChange={(e) => set('numero', e.target.value)} /></div>
        <div className="col-span-2"><span className="label">Concepto</span><input className="input" placeholder="Ej. Anticipo 50% — Web corporativa + BD de clientes" value={f.concepto} onChange={(e) => set('concepto', e.target.value)} /></div>
        <div><span className="label">Importe total (€)</span><input type="number" min="0" step="0.01" className="input" value={f.total} onChange={(e) => set('total', e.target.value)} /></div>
        {f.tipo === 'factura' ? (
          <div>
            <span className="label">Importe pagado (€)</span>
            <input type="number" min="0" step="0.01" className="input" value={f.pagado} onChange={(e) => set('pagado', e.target.value)} />
            <div className="mt-1 flex gap-1">
              <button type="button" className="rounded border border-slate-200 px-1.5 py-0.5 text-[11px] text-slate-600 hover:bg-slate-50" onClick={() => set('pagado', total / 2)}>50%</button>
              <button type="button" className="rounded border border-slate-200 px-1.5 py-0.5 text-[11px] text-slate-600 hover:bg-slate-50" onClick={() => { set('pagado', total); set('estado', 'Pagada') }}>100%</button>
            </div>
          </div>
        ) : <div />}
        <div><span className="label">Fecha de emisión</span><input type="date" className="input" value={f.emision} onChange={(e) => set('emision', e.target.value)} /></div>
        <div><span className="label">{f.tipo === 'factura' ? 'Vencimiento' : 'Válido hasta'}</span><input type="date" className="input" value={f.vencimiento} onChange={(e) => set('vencimiento', e.target.value)} /></div>
        <div>
          <span className="label">Estado</span>
          <select className="input" value={f.estado} onChange={(e) => set('estado', e.target.value)}>
            {DOC_ESTADOS[f.tipo].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        {f.tipo === 'factura' && (
          <div className="flex items-end">
            <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
              Pendiente: <span className={`font-semibold ${pendiente > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>{fmtMoney(pendiente, 2)}</span>
            </p>
          </div>
        )}
        <div className="col-span-2">
          <span className="label">Archivo PDF</span>
          <Dropzone value={f.archivo} onChange={(v) => set('archivo', v)} />
        </div>
      </div>
    </Modal>
  )
}

// ------------------------------------------------------------------ Tabla de documentos (reutilizable)
export function DocTable({ docs, showClient = false, onOpenLead }) {
  const { leads, saveDoc, deleteDoc, notify } = useStore()
  const [editing, setEditing] = useState(null)
  const nameOf = (id) => leads.find((l) => l.id === id)?.empresa || '—'

  const markPaid = (d) => {
    saveDoc({ ...d, pagado: d.total, estado: 'Pagada' })
    notify(`${d.numero} marcada como pagada`)
  }

  if (!docs.length) return <EmptyState icon={Receipt} title="Sin documentos" hint="Crea un presupuesto o una factura para este cliente." />

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/70 text-xs font-medium text-slate-500">
            <tr>
              <th className="px-4 py-2.5 text-left">Documento</th>
              {showClient && <th className="px-4 py-2.5 text-left">Cliente</th>}
              <th className="px-4 py-2.5 text-right">Total</th>
              <th className="px-4 py-2.5 text-right">Pagado</th>
              <th className="px-4 py-2.5 text-right">Pendiente</th>
              <th className="px-4 py-2.5 text-left">Emisión / Venc.</th>
              <th className="px-4 py-2.5 text-left">Estado</th>
              <th />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {docs.map((d) => {
              const est = effectiveEstado(d)
              const pend = d.tipo === 'factura' ? Math.max(0, d.total - d.pagado) : null
              return (
                <tr key={d.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-2.5">
                    <p className="font-medium text-slate-900">{d.numero} <span className="text-xs font-normal capitalize text-slate-400">· {d.tipo}</span></p>
                    <p className="max-w-[260px] truncate text-xs text-slate-500" title={d.concepto}>{d.concepto}</p>
                    {d.archivo && (
                      d.archivo.dataUrl ? (
                        <a href={d.archivo.dataUrl} download={d.archivo.name} className="mt-0.5 inline-flex items-center gap-1 text-xs text-brand-700 hover:underline"><Download size={11} />{d.archivo.name}</a>
                      ) : (
                        <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-slate-400"><FileText size={11} />{d.archivo.name}</span>
                      )
                    )}
                  </td>
                  {showClient && (
                    <td className="px-4 py-2.5">
                      <button className="text-left text-slate-700 hover:text-brand-700 hover:underline" onClick={() => onOpenLead?.(d.leadId)}>{nameOf(d.leadId)}</button>
                    </td>
                  )}
                  <td className="px-4 py-2.5 text-right font-medium tabular-nums">{fmtMoney(d.total, 2)}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-emerald-700">{d.tipo === 'factura' ? fmtMoney(d.pagado, 2) : '—'}</td>
                  <td className={`px-4 py-2.5 text-right tabular-nums ${pend > 0 ? 'font-medium text-amber-700' : 'text-slate-400'}`}>{pend === null ? '—' : fmtMoney(pend, 2)}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-500">
                    {fmtDateFull(d.emision)}
                    <br />
                    <span className={est === 'Vencida' ? 'font-medium text-rose-600' : ''}>{fmtDateFull(d.vencimiento)}</span>
                  </td>
                  <td className="px-4 py-2.5"><DocBadge estado={est} /></td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="inline-flex gap-0.5">
                      {d.tipo === 'factura' && d.pagado < d.total && d.estado !== 'Borrador' && (
                        <button title="Marcar como pagada" onClick={() => markPaid(d)} className="rounded-md p-1.5 text-slate-400 hover:bg-emerald-50 hover:text-emerald-700"><CheckCircle2 size={15} /></button>
                      )}
                      <button title="Editar" onClick={() => setEditing(d)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Pencil size={15} /></button>
                      <button title="Eliminar" onClick={() => confirm(`¿Eliminar ${d.numero}?`) && deleteDoc(d.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {editing && <DocModal doc={editing} onClose={() => setEditing(null)} />}
    </>
  )
}

// ------------------------------------------------------------------ Resumen económico
export function useFinanceTotals(docs) {
  return useMemo(() => {
    const facturas = docs.filter((d) => d.tipo === 'factura' && d.estado !== 'Borrador')
    const facturado = facturas.reduce((s, d) => s + d.total, 0)
    const cobrado = facturas.reduce((s, d) => s + d.pagado, 0)
    const vencido = facturas.filter((d) => effectiveEstado(d) === 'Vencida').reduce((s, d) => s + d.total - d.pagado, 0)
    const presupuestado = docs.filter((d) => d.tipo === 'presupuesto' && d.estado === 'Enviado').reduce((s, d) => s + d.total, 0)
    return { facturado, cobrado, pendiente: facturado - cobrado, vencido, presupuestado }
  }, [docs])
}

export const TotalsStrip = ({ totals }) => (
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
    {[
      ['Facturado', totals.facturado, 'text-slate-900'],
      ['Cobrado', totals.cobrado, 'text-emerald-700'],
      ['Pendiente de cobro', totals.pendiente, 'text-amber-700'],
      ['De ello, vencido', totals.vencido, 'text-rose-700'],
      ['Presupuestos en juego', totals.presupuestado, 'text-sky-700'],
    ].map(([label, v, tone]) => (
      <div key={label} className="rounded-lg border border-slate-200 bg-white px-4 py-3">
        <p className="text-xs text-slate-500">{label}</p>
        <p className={`mt-0.5 text-lg font-semibold tabular-nums ${tone}`}>{fmtMoney(v)}</p>
      </div>
    ))}
  </div>
)

// ------------------------------------------------------------------ Pestaña global de Finanzas
export default function Finance({ onOpenLead }) {
  const { docs } = useStore()
  const [tipo, setTipo] = useState('todos')
  const [estado, setEstado] = useState('todos')
  const [creating, setCreating] = useState(false)
  const totals = useFinanceTotals(docs)

  const list = docs
    .filter((d) => tipo === 'todos' || d.tipo === tipo)
    .filter((d) => estado === 'todos' || effectiveEstado(d) === estado)
    .sort((a, b) => b.emision.localeCompare(a.emision))

  const allEstados = [...new Set(Object.values(DOC_ESTADOS).flat())]

  return (
    <div>
      <PageHeader title="Finanzas" subtitle="Presupuestos y facturas de todos los clientes">
        <button className="btn-primary" onClick={() => setCreating(true)}><Plus size={15} /> Nuevo documento</button>
      </PageHeader>
      <TotalsStrip totals={totals} />
      <div className="card mt-5">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3">
          <select className="input !w-auto" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="todos">Presupuestos y facturas</option>
            <option value="presupuesto">Solo presupuestos</option>
            <option value="factura">Solo facturas</option>
          </select>
          <select className="input !w-auto" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="todos">Cualquier estado</option>
            {allEstados.map((s) => <option key={s}>{s}</option>)}
          </select>
          <span className="ml-auto text-xs text-slate-400">{list.length} documentos</span>
        </div>
        <DocTable docs={list} showClient onOpenLead={onOpenLead} />
      </div>
      {creating && <DocModal onClose={() => setCreating(false)} />}
    </div>
  )
}
