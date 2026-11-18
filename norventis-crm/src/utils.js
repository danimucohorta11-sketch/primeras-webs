// ---------- Fechas (todas las fechas "de calendario" son strings YYYY-MM-DD en hora local) ----------
export const pad = (n) => String(n).padStart(2, '0')
export const toISODate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const today = () => toISODate(new Date())
export const nowISO = () => {
  const d = new Date()
  return `${toISODate(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}
export const parseDate = (iso) => {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  return new Date(y, m - 1, d)
}
export const addDays = (iso, n) => {
  const d = parseDate(iso)
  d.setDate(d.getDate() + n)
  return toISODate(d)
}
export const diffDays = (a, b) => Math.round((parseDate(a) - parseDate(b)) / 86400000)
export const startOfWeek = (iso = today()) => {
  const d = parseDate(iso)
  const day = (d.getDay() + 6) % 7 // lunes = 0
  d.setDate(d.getDate() - day)
  return toISODate(d)
}

export const fmtDate = (iso) =>
  iso ? parseDate(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }).replace('.', '') : '—'
export const fmtDateFull = (iso) =>
  iso ? parseDate(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '') : '—'
export const fmtDateTime = (iso) => {
  const d = new Date(iso)
  return `${fmtDate(toISODate(d))} · ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
export const fmtMoney = (n, decimals = 0) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: 'always',
  }).format(n || 0)

/** "Hoy", "Mañana", "Ayer", "hace 3 d", "en 4 d" */
export const relDay = (iso) => {
  if (!iso) return ''
  const n = diffDays(iso, today())
  if (n === 0) return 'Hoy'
  if (n === 1) return 'Mañana'
  if (n === -1) return 'Ayer'
  return n < 0 ? `hace ${-n} d` : `en ${n} d`
}

// ---------- Varios ----------
// UUID real: es el tipo de clave que usa la base de datos (Supabase).
export const uid = () =>
  globalThis.crypto?.randomUUID?.() ??
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 3) | 8).toString(16)
  })

export const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  }
}

export const initials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

export const telHref = (t = '') => `tel:${t.replace(/[^\d+]/g, '')}`
export const waHref = (t = '') => {
  const digits = t.replace(/[^\d]/g, '')
  return `https://wa.me/${digits.length === 9 ? '34' + digits : digits}`
}

export const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result)
    r.onerror = reject
    r.readAsDataURL(file)
  })

export const fmtSize = (b = 0) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`)

// localStorage puede no existir (iframes con sandbox): nunca debe romper la app.
export const ls = {
  get: (k) => { try { return localStorage.getItem(k) } catch { return null } },
  set: (k, v) => { try { localStorage.setItem(k, v) } catch { /* sin persistencia */ } },
}
