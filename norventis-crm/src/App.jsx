import { useState } from 'react'
import { LayoutDashboard, KanbanSquare, PhoneCall, RotateCcw, Search, Wallet } from 'lucide-react'
import Dashboard from './components/Dashboard'
import Pipeline from './components/Pipeline'
import Finance from './components/Finance'
import LeadDrawer from './components/LeadDrawer'
import QuickCall from './components/QuickCall'
import { Toast } from './components/ui'
import { useStore } from './store'
import { SOCIOS } from './constants'

const NAV = [
  ['dashboard', 'Dashboard', LayoutDashboard],
  ['pipeline', 'Pipeline', KanbanSquare],
  ['finanzas', 'Finanzas', Wallet],
]

export default function App() {
  const { me, setMe, resetDemo, notify } = useStore()
  const [view, setView] = useState(() => localStorage.getItem('norventis-nav') || 'dashboard')
  const [openLead, setOpenLead] = useState(null)
  const [quick, setQuick] = useState(null) // { leadId } | null
  const [search, setSearch] = useState('')

  const go = (v) => {
    setView(v)
    localStorage.setItem('norventis-nav', v)
  }
  const onQuickCall = (leadId) => setQuick({ leadId })

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 13V3l10 10V3" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" /></svg>
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900">Norventis</p>
            <p className="text-[11px] text-slate-400">CRM interno</p>
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 px-3">
          {NAV.map(([id, label, Icon]) => (
            <button key={id} onClick={() => go(id)} className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${view === id ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>
        <div className="space-y-2 border-t border-slate-100 p-4">
          <span className="label">Sesión como</span>
          <select className="input" value={me} onChange={(e) => setMe(e.target.value)}>
            {SOCIOS.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button
            className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600"
            onClick={() => { if (confirm('¿Restaurar los datos de ejemplo? Se perderán los cambios actuales.')) { resetDemo(); notify('Datos de ejemplo restaurados') } }}
          >
            <RotateCcw size={11} /> Restaurar datos demo
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 md:px-8">
          <div className="flex gap-1 md:hidden">
            {NAV.map(([id, , Icon]) => (
              <button key={id} onClick={() => go(id)} className={`rounded-lg p-2 ${view === id ? 'bg-brand-50 text-brand-700' : 'text-slate-500'}`}><Icon size={18} /></button>
            ))}
          </div>
          <div className="relative max-w-md flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="input pl-9"
              placeholder="Buscar negocio, contacto o teléfono…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); if (view !== 'pipeline' && e.target.value) go('pipeline') }}
            />
          </div>
          <button className="btn-primary ml-auto" onClick={() => onQuickCall(null)}>
            <PhoneCall size={15} /> <span className="hidden sm:inline">Registrar llamada</span>
          </button>
        </header>

        <main className={`min-h-0 flex-1 px-4 py-6 md:px-8 ${view === 'pipeline' ? 'overflow-hidden' : 'overflow-y-auto'}`}>
          {view === 'dashboard' && <Dashboard onOpenLead={setOpenLead} onQuickCall={onQuickCall} />}
          {view === 'pipeline' && <Pipeline onOpenLead={setOpenLead} onQuickCall={onQuickCall} globalQuery={search} />}
          {view === 'finanzas' && <Finance onOpenLead={setOpenLead} />}
        </main>
      </div>

      {openLead && <LeadDrawer leadId={openLead} onClose={() => setOpenLead(null)} />}
      {quick && <QuickCall leadId={quick.leadId} onClose={() => setQuick(null)} onOpenLead={setOpenLead} />}
      <Toast />
    </div>
  )
}
