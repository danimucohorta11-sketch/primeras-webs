import { useEffect, useMemo, useState } from 'react'
import {
  Check, ExternalLink, Eye, EyeOff, Globe, Link2, Mail, MapPin, MessageCircle, Phone, Plus, Trash2, X,
} from 'lucide-react'
import { Avatar, CopyButton, DocBadge, FollowUp, Modal, ResultBadge, StageBadge } from './ui'
import LogForm from './LogForm'
import { DocModal, DocTable, TotalsStrip, useFinanceTotals } from './Finance'
import { useStore } from '../store'
import { AUDIT_PRESETS, BD_TIPOS, SERVICIOS, SOCIOS, STAGES, TIPO_BY_ID } from '../constants'
import { fmtDateTime, telHref, uid, waHref } from '../utils'

const TABS = [
  ['actividad', 'Actividad'],
  ['ficha', 'Ficha y auditoría'],
  ['proyecto', 'Proyecto'],
  ['finanzas', 'Finanzas'],
]

export default function LeadDrawer({ leadId, onClose }) {
  const { leads, activities, docs, updateLead, moveLead, deleteLead, notify } = useStore()
  const lead = leads.find((l) => l.id === leadId)
  const [tab, setTab] = useState('actividad')
  const [confirmDel, setConfirmDel] = useState(false)

  useEffect(() => setTab('actividad'), [leadId])
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && !document.querySelector('.fixed.z-\\[60\\]') && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const leadActs = useMemo(() => activities.filter((a) => a.leadId === leadId).sort((a, b) => b.fecha.localeCompare(a.fecha)), [activities, leadId])
  const leadDocs = useMemo(() => docs.filter((d) => d.leadId === leadId).sort((a, b) => b.emision.localeCompare(a.emision)), [docs, leadId])
  if (!lead) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 animate-fadeIn" onMouseDown={onClose}>
      <aside className="flex h-full w-full max-w-[760px] flex-col bg-white shadow-2xl animate-slideIn" onMouseDown={(e) => e.stopPropagation()}>
        {/* Cabecera con acciones rápidas */}
        <header className="border-b border-slate-200 px-6 pb-3 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-slate-900">{lead.empresa}</h2>
              <p className="text-sm text-slate-500">{lead.sector || 'Sin sector'} · {lead.contacto || 'Sin contacto'}</p>
            </div>
            <button onClick={onClose} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={18} /></button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a href={telHref(lead.telefono)} className="btn-primary btn-sm"><Phone size={13} /> {lead.telefono}</a>
            <CopyButtonLabeled text={lead.telefono} />
            {lead.telefono && <a href={waHref(lead.telefono)} target="_blank" rel="noreferrer" className="btn-secondary btn-sm"><MessageCircle size={13} /> WhatsApp</a>}
            {lead.email && <a href={`mailto:${lead.email}`} className="btn-secondary btn-sm"><Mail size={13} /> Email</a>}
            <div className="ml-auto flex items-center gap-2">
              <FollowUp date={lead.proximoSeguimiento} />
              <select
                value={lead.etapa}
                onChange={(e) => { moveLead(lead.id, e.target.value); notify('Etapa actualizada') }}
                className="input !w-auto !py-1.5 text-xs font-medium"
              >
                {STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <nav className="-mb-3 mt-3 flex gap-5">
            {TABS.map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} className={`border-b-2 pb-2.5 text-sm font-medium transition ${tab === id ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
                {label}
                {id === 'actividad' && <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 text-[10px] text-slate-600">{leadActs.length}</span>}
                {id === 'finanzas' && leadDocs.length > 0 && <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 text-[10px] text-slate-600">{leadDocs.length}</span>}
              </button>
            ))}
          </nav>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
          {tab === 'actividad' && <ActivityTab lead={lead} acts={leadActs} />}
          {tab === 'ficha' && <FichaTab lead={lead} update={(p) => updateLead(lead.id, p)} onDelete={() => setConfirmDel(true)} />}
          {tab === 'proyecto' && <ProyectoTab lead={lead} update={(p) => updateLead(lead.id, p)} />}
          {tab === 'finanzas' && <FinanzasTab lead={lead} docs={leadDocs} />}
        </div>
      </aside>

      {confirmDel && (
        <Modal title="Eliminar lead" onClose={() => setConfirmDel(false)} footer={
          <><button className="btn-ghost" onClick={() => setConfirmDel(false)}>Cancelar</button>
            <button className="btn bg-rose-600 text-white hover:bg-rose-700" onClick={() => { deleteLead(lead.id); setConfirmDel(false); onClose(); notify('Lead eliminado') }}>Eliminar definitivamente</button></>}>
          <p className="text-sm text-slate-600">Se eliminarán <b>{lead.empresa}</b>, su historial de actividad y sus documentos. Esta acción no se puede deshacer.</p>
        </Modal>
      )}
    </div>
  )
}

const CopyButtonLabeled = ({ text }) => (
  <span className="inline-flex items-center rounded-lg border border-slate-200 bg-white"><CopyButton text={text} label="Teléfono" className="!h-7 !w-7" /></span>
)

const Section = ({ title, hint, children, action }) => (
  <section className="card mb-4">
    <header className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
      </div>
      {action}
    </header>
    <div className="p-4">{children}</div>
  </section>
)

// ------------------------------------------------------------------ Actividad
function ActivityTab({ lead, acts }) {
  const { deleteActivity, askConfirm } = useStore()
  const [formKey, setFormKey] = useState(0)
  return (
    <>
      {(lead.auditoria.length > 0 || lead.auditoriaNotas) && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-800">Guion de llamada · auditoría previa</p>
          <div className="flex flex-wrap gap-1.5">
            {lead.auditoria.map((a) => <span key={a.id} className="rounded-md bg-white px-2 py-1 text-xs text-amber-900 ring-1 ring-inset ring-amber-200">{a.text}</span>)}
          </div>
          {lead.auditoriaNotas && <p className="mt-2 text-sm text-amber-900/80">{lead.auditoriaNotas}</p>}
        </div>
      )}

      <Section title="Registrar interacción" hint="Resultado → fecha de seguimiento → Guardar">
        <LogForm key={formKey} lead={lead} onDone={() => setFormKey((k) => k + 1)} />
      </Section>

      <Section title="Historial" hint={`${acts.length} interacciones`}>
        {acts.length === 0 ? (
          <p className="py-4 text-center text-sm text-slate-400">Aún no hay interacciones registradas.</p>
        ) : (
          <ol className="relative space-y-4 border-l border-slate-200 pl-5">
            {acts.map((a) => {
              const T = TIPO_BY_ID[a.tipo]
              return (
                <li key={a.id} className="group relative">
                  <span className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-slate-200"><T.icon size={11} className="text-slate-500" /></span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-slate-800">{T.label}</span>
                    {a.resultado && <ResultBadge id={a.resultado} />}
                    <span className="text-xs text-slate-400">{fmtDateTime(a.fecha)}</span>
                    <span className="flex items-center gap-1 text-xs text-slate-500"><Avatar name={a.responsable} />{a.responsable}</span>
                    <button onClick={() => askConfirm('¿Eliminar esta interacción?', () => deleteActivity(a.id))} className="ml-auto text-slate-300 opacity-0 hover:text-rose-500 group-hover:opacity-100" title="Eliminar"><Trash2 size={13} /></button>
                  </div>
                  {a.notas && <p className="mt-1 whitespace-pre-line text-sm text-slate-600">{a.notas}</p>}
                  {a.proximoSeguimiento && <p className="mt-1 text-xs text-slate-500">Seguimiento programado: <FollowUp date={a.proximoSeguimiento} /></p>}
                </li>
              )
            })}
          </ol>
        )}
      </Section>
    </>
  )
}

// ------------------------------------------------------------------ Ficha + auditoría
function FichaTab({ lead, update, onDelete }) {
  const [custom, setCustom] = useState('')
  const field = (k, label, props = {}) => (
    <div>
      <span className="label">{label}</span>
      <input className="input" value={lead[k] || ''} onChange={(e) => update({ [k]: e.target.value })} {...props} />
    </div>
  )
  const has = (text) => lead.auditoria.some((a) => a.text === text)
  const toggle = (text) => update({ auditoria: has(text) ? lead.auditoria.filter((a) => a.text !== text) : [...lead.auditoria, { id: uid('a'), text }] })
  const addCustom = () => {
    const t = custom.trim()
    if (t && !has(t)) update({ auditoria: [...lead.auditoria, { id: uid('a'), text: t }] })
    setCustom('')
  }
  const externalLinks = [
    lead.web && { href: lead.web.startsWith('http') ? lead.web : `https://${lead.web}`, icon: Globe, label: 'Web' },
    lead.maps && { href: lead.maps, icon: MapPin, label: 'Google Maps' },
  ].filter(Boolean)

  return (
    <>
      <Section title="Datos del negocio">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">{field('empresa', 'Nombre de la empresa')}</div>
          {field('sector', 'Sector / nicho')}
          {field('contacto', 'Persona de contacto')}
          {field('telefono', 'Teléfono')}
          {field('email', 'Email', { type: 'email' })}
          {field('web', 'Web actual', { placeholder: 'Vacío si no tienen' })}
          {field('maps', 'Enlace Google Maps / redes')}
          <div>
            <span className="label">Responsable</span>
            <select className="input" value={lead.responsable} onChange={(e) => update({ responsable: e.target.value })}>
              {SOCIOS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <span className="label">Próximo seguimiento</span>
            <input type="date" className="input" value={lead.proximoSeguimiento || ''} onChange={(e) => update({ proximoSeguimiento: e.target.value || null })} />
          </div>
        </div>
        {externalLinks.length > 0 && (
          <div className="mt-3 flex gap-2">
            {externalLinks.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="btn-secondary btn-sm"><l.icon size={13} />{l.label}<ExternalLink size={11} className="text-slate-400" /></a>
            ))}
          </div>
        )}
      </Section>

      <Section title="Auditoría previa" hint="Qué les falla — úsalo como guion antes de llamar">
        <div className="flex flex-wrap gap-1.5">
          {AUDIT_PRESETS.map((p) => (
            <button key={p} onClick={() => toggle(p)} className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${has(p) ? 'border-amber-400 bg-amber-50 text-amber-900' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>
              {has(p) && <Check size={12} />}{p}
            </button>
          ))}
          {lead.auditoria.filter((a) => !AUDIT_PRESETS.includes(a.text)).map((a) => (
            <button key={a.id} onClick={() => toggle(a.text)} title="Quitar" className="inline-flex items-center gap-1 rounded-lg border border-amber-400 bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-900">
              <Check size={12} />{a.text}<X size={11} className="text-amber-600" />
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input className="input" placeholder="Añadir otro punto de mejora…" value={custom} onChange={(e) => setCustom(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCustom()} />
          <button className="btn-secondary" onClick={addCustom}><Plus size={14} /></button>
        </div>
        <span className="label mt-4">Notas de la auditoría</span>
        <textarea rows={3} className="input resize-none" placeholder="Contexto, oportunidades, propuesta de valor para este negocio…" value={lead.auditoriaNotas || ''} onChange={(e) => update({ auditoriaNotas: e.target.value })} />
      </Section>

      <div className="flex justify-between text-xs text-slate-400">
        <span>Creado el {lead.creadoEn}</span>
        <button onClick={onDelete} className="text-rose-500 hover:underline">Eliminar lead</button>
      </div>
    </>
  )
}

// ------------------------------------------------------------------ Alcance del proyecto
function ProyectoTab({ lead, update }) {
  const [label, setLabel] = useState('')
  const [value, setValue] = useState('')
  const [shown, setShown] = useState({})
  const { notify } = useStore()
  const s = lead.servicios
  const setSvc = (id, patch) => update({ servicios: { ...s, [id]: { ...s[id], ...patch } } })
  const contratados = SERVICIOS.filter((x) => s[x.id].contratado)
  const entregados = contratados.filter((x) => s[x.id].entregado).length
  const pct = contratados.length ? Math.round((entregados / contratados.length) * 100) : 0

  const addLink = () => {
    if (!label.trim() || !value.trim()) return
    update({ enlaces: [...lead.enlaces, { id: uid('e'), label: label.trim(), value: value.trim() }] })
    setLabel('')
    setValue('')
  }
  const isSecret = (l) => /contrase|password|pass|clave|token/i.test(l.label)

  return (
    <>
      <Section title="Servicios contratados" hint={contratados.length ? `${entregados} de ${contratados.length} entregados` : 'Marca lo que se ha vendido'}>
        {contratados.length > 0 && (
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} /></div>
        )}
        <ul className="divide-y divide-slate-100">
          {SERVICIOS.map((sv) => (
            <li key={sv.id} className="py-3">
              <div className="flex items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-800">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" checked={s[sv.id].contratado} onChange={(e) => setSvc(sv.id, { contratado: e.target.checked, entregado: e.target.checked ? s[sv.id].entregado : false })} />
                  {sv.label}
                </label>
                <label className={`flex items-center gap-1.5 text-xs ${s[sv.id].contratado ? 'cursor-pointer text-slate-600' : 'pointer-events-none text-slate-300'}`}>
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" checked={s[sv.id].entregado} onChange={(e) => setSvc(sv.id, { entregado: e.target.checked })} />
                  Entregado
                </label>
              </div>
              {sv.id === 'bd' && s.bd.contratado && (
                <div className="ml-6 mt-2 flex flex-wrap gap-1.5">
                  {BD_TIPOS.map((t) => {
                    const on = s.bd.tipos.includes(t)
                    return (
                      <button key={t} onClick={() => setSvc('bd', { tipos: on ? s.bd.tipos.filter((x) => x !== t) : [...s.bd.tipos, t] })} className={`rounded-md border px-2 py-1 text-xs ${on ? 'border-brand-400 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'}`}>{t}</button>
                    )
                  })}
                </div>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Enlaces y credenciales" hint="Staging, hosting, repositorio, accesos…">
        {lead.enlaces.length === 0 && <p className="mb-3 text-sm text-slate-400">Aún no hay enlaces guardados.</p>}
        <ul className="mb-3 space-y-1.5">
          {lead.enlaces.map((l) => {
            const secret = isSecret(l)
            const visible = !secret || shown[l.id]
            const isUrl = /^https?:\/\//.test(l.value)
            return (
              <li key={l.id} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                <Link2 size={14} className="shrink-0 text-slate-400" />
                <span className="w-36 shrink-0 truncate text-xs font-medium text-slate-500">{l.label}</span>
                {isUrl && visible ? <a href={l.value} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate text-brand-700 hover:underline">{l.value}</a> : <span className="min-w-0 flex-1 truncate font-mono text-xs text-slate-700">{visible ? l.value : '••••••••••'}</span>}
                {secret && <button onClick={() => setShown((x) => ({ ...x, [l.id]: !x[l.id] }))} className="text-slate-400 hover:text-slate-700">{visible ? <EyeOff size={14} /> : <Eye size={14} />}</button>}
                <CopyButton text={l.value} label={l.label} />
                <button onClick={() => update({ enlaces: lead.enlaces.filter((x) => x.id !== l.id) })} className="text-slate-300 hover:text-rose-500"><Trash2 size={14} /></button>
              </li>
            )
          })}
        </ul>
        <div className="flex gap-2">
          <input className="input !w-40" placeholder="Etiqueta" value={label} onChange={(e) => setLabel(e.target.value)} />
          <input className="input" placeholder="URL, usuario o valor" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addLink()} />
          <button className="btn-secondary" onClick={addLink}><Plus size={14} /></button>
        </div>
        <p className="mt-2 text-[11px] text-slate-400">Demo: se guardan en el navegador. En producción usa un gestor de secretos (Bitwarden, 1Password) y guarda solo el enlace.</p>
      </Section>
    </>
  )
}

// ------------------------------------------------------------------ Finanzas del cliente
function FinanzasTab({ lead, docs }) {
  const [creating, setCreating] = useState(false)
  const totals = useFinanceTotals(docs)
  return (
    <>
      <div className="mb-4"><TotalsStrip totals={totals} /></div>
      <Section title="Presupuestos y facturas" action={<button className="btn-primary btn-sm" onClick={() => setCreating(true)}><Plus size={13} /> Nuevo</button>}>
        <div className="-m-4"><DocTable docs={docs} /></div>
      </Section>
      {creating && <DocModal leadId={lead.id} onClose={() => setCreating(false)} />}
    </>
  )
}
