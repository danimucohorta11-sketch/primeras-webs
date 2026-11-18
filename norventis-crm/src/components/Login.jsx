import { useState } from 'react'
import { Loader2, LogOut } from 'lucide-react'
import { useStore } from '../store'

const Logo = () => (
  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M3 13V3l10 10V3" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" /></svg>
  </span>
)

const Shell = ({ children }) => (
  <div className="flex h-full items-center justify-center p-4">
    <div className="card w-full max-w-sm p-7">
      <div className="mb-6 flex items-center gap-3">
        <Logo />
        <div className="leading-tight">
          <p className="text-base font-semibold text-slate-900">Norventis</p>
          <p className="text-xs text-slate-500">CRM interno · acceso restringido</p>
        </div>
      </div>
      {children}
    </div>
  </div>
)

export const Splash = () => (
  <Shell><div className="flex items-center justify-center gap-2 py-6 text-sm text-slate-500"><Loader2 size={16} className="animate-spin" /> Cargando…</div></Shell>
)

export function NoAccess() {
  const { signOut, session } = useStore()
  return (
    <Shell>
      <p className="text-sm text-slate-700">
        Has iniciado sesión como <b>{session?.user?.email}</b>, pero este usuario no está dado de alta como socio.
      </p>
      <p className="mt-2 text-xs text-slate-500">Añádelo a la tabla <code>socios</code> en Supabase (ver README) y recarga.</p>
      <button className="btn-secondary mt-5 w-full" onClick={signOut}><LogOut size={14} /> Cerrar sesión</button>
    </Shell>
  )
}

export default function Login() {
  const { signIn } = useStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await signIn(email.trim(), password)
    } catch (err) {
      setError(/invalid/i.test(err.message) ? 'Email o contraseña incorrectos.' : err.message)
      setBusy(false)
    }
  }

  return (
    <Shell>
      <form onSubmit={submit} className="space-y-3">
        <div><span className="label">Email</span><input type="email" autoFocus required autoComplete="username" className="input" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div><span className="label">Contraseña</span><input type="password" required autoComplete="current-password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700 ring-1 ring-inset ring-rose-200">{error}</p>}
        <button type="submit" className="btn-primary w-full" disabled={busy}>{busy ? 'Entrando…' : 'Entrar'}</button>
      </form>
    </Shell>
  )
}
