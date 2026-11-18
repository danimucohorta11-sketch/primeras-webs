import { useMemo, useState } from 'react'
import { AlertTriangle, CalendarCheck, FolderKanban, PhoneCall, PhoneOutgoing, Target, TrendingUp, Wallet } from 'lucide-react'
import { Avatar, Badge, CopyButton, EmptyState, FollowUp, PageHeader, ResultBadge } from './ui'
import { effectiveEstado, lastActivityOf, useStore } from '../store'
import { CLIENT_STAGES, OPEN_STAGES, STAGES } from '../constants'
import { addDays, diffDays, fmtDate, fmtMoney, startOfWeek, telHref, today } from '../utils'

const Kpi = ({ icon: Icon, label, value, sub, tone = 'text-brand-600 bg-brand-50', children }) => (
  <div className="card p-4">
    <div className="flex items-center justify-between">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${tone}`}>
        <Icon size={15} />
      </span>
    </div>
    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
    {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
    {children}
  </div>
)

export default function Dashboard({ onOpenLead, onQuickCall }) {
  const { leads, activities, docs, me } = useStore()
  const [scope, setScope] = useState('todos')
  const t = today()

  const k = useMemo(() => {
    const calls = activities.filter((a) => a.tipo === 'llamada')
    const wk = startOfWeek(t)
    const callsToday = calls.filter((a) => a.fecha.slice(0, 10) === t).length
    const callsWeek = calls.filter((a) => a.fecha.slice(0, 10) >= wk).length
    const contacted = leads.filter((l) => l.etapa !== 'frio').length
    const reached = leads.filter((l) => ['reunion', 'presupuesto', ...CLIENT_STAGES].includes(l.etapa)).length
    const clients = leads.filter((l) => CLIENT_STAGES.includes(l.etapa)).length
    const facturas = docs.filter((d) => d.tipo === 'factura' && d.estado !== 'Borrador')
    const cobrado = facturas.reduce((s, d) => s + d.pagado, 0)
    const pendiente = facturas.reduce((s, d) => s + Math.max(0, d.total - d.pagado), 0)
    const vencido = facturas.filter((d) => effectiveEstado(d) === 'Vencida').reduce((s, d) => s + (d.total - d.pagado), 0)
    // últimos 7 días
    const days = Array.from({ length: 7 }, (_, i) => addDays(t, i - 6))
    const perDay = days.map((d) => ({ d, n: calls.filter((a) => a.fecha.slice(0, 10) === d).length }))
    return {
      leadsActivos: leads.filter((l) => OPEN_STAGES.includes(l.etapa)).length,
      callsToday, callsWeek,
      convReunion: contacted ? Math.round((reached / contacted) * 100) : 0,
      convCierre: contacted ? Math.round((clients / contacted) * 100) : 0,
      proyectos: leads.filter((l) => l.etapa === 'activo').length,
      cobrado, pendiente, vencido, perDay,
    }
  }, [leads, activities, docs, t])

  const agenda = useMemo(
    () =>
      leads
        .filter((l) => l.proximoSeguimiento && l.proximoSeguimiento <= t && l.etapa !== 'perdido')
        .filter((l) => scope === 'todos' || l.responsable === me)
        .sort((a, b) => a.proximoSeguimiento.localeCompare(b.proximoSeguimiento)),
    [leads, scope, me, t],
  )
  const upcoming = useMemo(
    () => leads.filter((l) => l.proximoSeguimiento && l.proximoSeguimiento > t && l.proximoSeguimiento <= addDays(t, 7)).sort((a, b) => a.proximoSeguimiento.localeCompare(b.proximoSeguimiento)),
    [leads, t],
  )
  const coldQueue = useMemo(() => leads.filter((l) => l.etapa === 'frio').slice(0, 5), [leads])
  const funnel = STAGES.filter((s) => s.id !== 'perdido').map((s) => ({ ...s, n: leads.filter((l) => l.etapa === s.id).length }))
  const maxFunnel = Math.max(1, ...funnel.map((f) => f.n))
  const maxCalls = Math.max(1, ...k.perDay.map((x) => x.n))
  const hour = new Date().getHours()
  const greet = hour < 13 ? 'Buenos días' : hour < 20 ? 'Buenas tardes' : 'Buenas noches'
  const totalFact = k.cobrado + k.pendiente

  return (
    <div>
      <PageHeader
        title={`${greet}, ${me}`}
        subtitle={new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Kpi icon={Target} label="Leads activos" value={k.leadsActivos} sub="En prospección y negociación" />
        <Kpi icon={PhoneOutgoing} label="Llamadas" value={k.callsToday} sub={`hoy · ${k.callsWeek} esta semana`} tone="text-sky-600 bg-sky-50" />
        <Kpi icon={TrendingUp} label="Conversión a reunión" value={`${k.convReunion}%`} sub={`${k.convCierre}% cierre sobre contactados`} tone="text-violet-600 bg-violet-50" />
        <Kpi icon={FolderKanban} label="Proyectos en desarrollo" value={k.proyectos} sub="Clientes activos" tone="text-emerald-600 bg-emerald-50" />
        <Kpi icon={Wallet} label="Facturación" value={fmtMoney(totalFact)} sub={`${fmtMoney(k.cobrado)} cobrado · ${fmtMoney(k.pendiente)} pendiente`} tone="text-amber-600 bg-amber-50">
          <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-amber-100">
            <div className="bg-emerald-500" style={{ width: `${totalFact ? (k.cobrado / totalFact) * 100 : 0}%` }} />
          </div>
        </Kpi>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Agenda */}
        <section className="card xl:col-span-2">
          <header className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
            <div className="flex items-center gap-2">
              <CalendarCheck size={16} className="text-brand-600" />
              <h2 className="text-sm font-semibold text-slate-900">Agenda de hoy · seguimientos</h2>
              <Badge className="bg-brand-50 text-brand-700 ring-brand-200">{agenda.length}</Badge>
            </div>
            <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs">
              {[['todos', 'Todos'], ['mios', 'Míos']].map(([id, label]) => (
                <button key={id} onClick={() => setScope(id)} className={`rounded-md px-2.5 py-1 font-medium ${scope === id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
                  {label}
                </button>
              ))}
            </div>
          </header>
          {agenda.length === 0 ? (
            <EmptyState icon={CalendarCheck} title="Agenda despejada" hint="No quedan seguimientos para hoy. Buen momento para prospectar en frío." />
          ) : (
            <ul className="divide-y divide-slate-100">
              {agenda.map((l) => {
                const last = lastActivityOf(activities, l.id)
                const late = diffDays(l.proximoSeguimiento, t) < 0
                return (
                  <li key={l.id} className="group flex items-center gap-3 px-5 py-3 hover:bg-slate-50/70">
                    <Avatar name={l.responsable} size="md" />
                    <button onClick={() => onOpenLead(l.id)} className="min-w-0 flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-slate-900">{l.empresa}</p>
                        {late && <AlertTriangle size={13} className="shrink-0 text-rose-500" />}
                        <FollowUp date={l.proximoSeguimiento} compact />
                      </div>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {l.contacto} · {l.sector}
                        {last?.notas ? ` — “${last.notas}”` : ''}
                      </p>
                    </button>
                    {last?.resultado && <span className="hidden md:block"><ResultBadge id={last.resultado} /></span>}
                    <div className="flex shrink-0 items-center gap-1">
                      <CopyButton text={l.telefono} label="Teléfono" />
                      <a href={telHref(l.telefono)} className="btn-secondary btn-sm" title={`Llamar a ${l.telefono}`}>
                        {l.telefono}
                      </a>
                      <button className="btn-primary btn-sm" onClick={() => onQuickCall(l.id)}>
                        Registrar
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
          {upcoming.length > 0 && (
            <div className="border-t border-slate-100 px-5 py-3">
              <p className="mb-2 text-xs font-medium text-slate-500">Próximos 7 días</p>
              <div className="flex flex-wrap gap-1.5">
                {upcoming.map((l) => (
                  <button key={l.id} onClick={() => onOpenLead(l.id)} className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50">
                    <span className="font-medium text-slate-800">{fmtDate(l.proximoSeguimiento)}</span> · {l.empresa}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="space-y-5">
          {/* Cola de prospección */}
          <section className="card">
            <header className="border-b border-slate-100 px-5 py-3.5">
              <h2 className="text-sm font-semibold text-slate-900">Cola de prospección en frío</h2>
              <p className="text-xs text-slate-500">Próximos leads sin contactar</p>
            </header>
            {coldQueue.length === 0 ? (
              <EmptyState title="Sin leads fríos" hint="Añade nuevos leads desde Pipeline." />
            ) : (
              <ul className="divide-y divide-slate-100">
                {coldQueue.map((l) => (
                  <li key={l.id} className="flex items-center gap-2 px-5 py-2.5">
                    <button onClick={() => onOpenLead(l.id)} className="min-w-0 flex-1 text-left">
                      <p className="truncate text-sm font-medium text-slate-800">{l.empresa}</p>
                      <p className="truncate text-xs text-slate-500">{l.sector} · {l.auditoria[0]?.text || 'Sin auditoría'}</p>
                    </button>
                    <button className="btn-secondary btn-sm" onClick={() => onQuickCall(l.id)}>
                      <PhoneCall size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Embudo */}
          <section className="card p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">Embudo</h2>
            <ul className="space-y-2">
              {funnel.map((f) => (
                <li key={f.id} className="flex items-center gap-2 text-xs">
                  <span className="w-32 shrink-0 truncate text-slate-600">{f.label}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${f.dot}`} style={{ width: `${(f.n / maxFunnel) * 100}%` }} />
                  </div>
                  <span className="w-4 text-right font-medium tabular-nums text-slate-700">{f.n}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Llamadas por día */}
          <section className="card p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">Llamadas · últimos 7 días</h2>
            <div className="flex h-24 items-end gap-2">
              {k.perDay.map(({ d, n }) => (
                <div key={d} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] font-medium tabular-nums text-slate-500">{n || ''}</span>
                  <div className="flex w-full flex-1 items-end">
                    <div className={`w-full rounded-t ${d === t ? 'bg-brand-600' : 'bg-brand-200'}`} style={{ height: `${Math.max(4, (n / maxCalls) * 100)}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-400">{new Date(d + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'narrow' })}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {k.vencido > 0 && (
        <p className="mt-5 flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-2.5 text-sm text-rose-700 ring-1 ring-inset ring-rose-200">
          <AlertTriangle size={15} /> Tienes {fmtMoney(k.vencido)} en facturas vencidas pendientes de cobro.
        </p>
      )}
    </div>
  )
}
