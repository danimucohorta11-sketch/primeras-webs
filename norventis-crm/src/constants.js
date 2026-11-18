import { Phone, MessageCircle, Mail, Users } from 'lucide-react'

// Nombres de los socios. Configurables con VITE_SOCIOS="Ana,Luis" (deben coincidir con socios.nombre en la BD).
export const SOCIOS = (import.meta.env.VITE_SOCIOS || 'Socio 1,Socio 2').split(',').map((s) => s.trim()).filter(Boolean)

// Las clases de Tailwind deben escribirse completas (no concatenadas) para que el compilador las detecte.
export const STAGES = [
  { id: 'frio', label: 'Lead frío', sub: 'Sin contactar', dot: 'bg-slate-400', badge: 'bg-slate-100 text-slate-700 ring-slate-200', col: 'border-t-slate-400' },
  { id: 'llamada', label: 'Llamada realizada', sub: 'Sin respuesta', dot: 'bg-amber-400', badge: 'bg-amber-50 text-amber-800 ring-amber-200', col: 'border-t-amber-400' },
  { id: 'contacto', label: 'Contacto establecido', sub: 'Interesado', dot: 'bg-sky-500', badge: 'bg-sky-50 text-sky-800 ring-sky-200', col: 'border-t-sky-500' },
  { id: 'reunion', label: 'Reunión / Demo', sub: 'Agendada', dot: 'bg-violet-500', badge: 'bg-violet-50 text-violet-800 ring-violet-200', col: 'border-t-violet-500' },
  { id: 'presupuesto', label: 'Presupuesto enviado', sub: 'Esperando respuesta', dot: 'bg-orange-500', badge: 'bg-orange-50 text-orange-800 ring-orange-200', col: 'border-t-orange-500' },
  { id: 'activo', label: 'Cliente activo', sub: 'En desarrollo', dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-800 ring-emerald-200', col: 'border-t-emerald-500' },
  { id: 'recurrente', label: 'Cliente recurrente', sub: 'Mantenimiento', dot: 'bg-teal-500', badge: 'bg-teal-50 text-teal-800 ring-teal-200', col: 'border-t-teal-500' },
  { id: 'perdido', label: 'Descartado / Perdido', sub: '', dot: 'bg-rose-400', badge: 'bg-rose-50 text-rose-700 ring-rose-200', col: 'border-t-rose-400' },
]
export const STAGE_BY_ID = Object.fromEntries(STAGES.map((s) => [s.id, s]))
export const OPEN_STAGES = ['frio', 'llamada', 'contacto', 'reunion', 'presupuesto'] // "leads activos"
export const CLIENT_STAGES = ['activo', 'recurrente']

export const RESULTADOS = [
  { id: 'no_contesta', label: 'No contesta', badge: 'bg-slate-100 text-slate-700 ring-slate-200', chip: 'hover:bg-slate-100 data-[on=true]:bg-slate-700 data-[on=true]:text-white data-[on=true]:border-slate-700', nextDays: 1 },
  { id: 'buzon', label: 'Buzón', badge: 'bg-amber-50 text-amber-800 ring-amber-200', chip: 'hover:bg-amber-50 data-[on=true]:bg-amber-500 data-[on=true]:text-white data-[on=true]:border-amber-500', nextDays: 1 },
  { id: 'llamar_luego', label: 'Pide llamar luego', badge: 'bg-sky-50 text-sky-800 ring-sky-200', chip: 'hover:bg-sky-50 data-[on=true]:bg-sky-500 data-[on=true]:text-white data-[on=true]:border-sky-500', nextDays: 1 },
  { id: 'interesado', label: 'Interesado', badge: 'bg-emerald-50 text-emerald-800 ring-emerald-200', chip: 'hover:bg-emerald-50 data-[on=true]:bg-emerald-600 data-[on=true]:text-white data-[on=true]:border-emerald-600', nextDays: 3 },
  { id: 'no_interesa', label: 'No interesa', badge: 'bg-rose-50 text-rose-700 ring-rose-200', chip: 'hover:bg-rose-50 data-[on=true]:bg-rose-500 data-[on=true]:text-white data-[on=true]:border-rose-500', nextDays: null },
  { id: 'cerrado', label: 'Cerrado', badge: 'bg-brand-50 text-brand-700 ring-brand-200', chip: 'hover:bg-brand-50 data-[on=true]:bg-brand-600 data-[on=true]:text-white data-[on=true]:border-brand-600', nextDays: null },
]
export const RESULTADO_BY_ID = Object.fromEntries(RESULTADOS.map((r) => [r.id, r]))

export const TIPOS = [
  { id: 'llamada', label: 'Llamada', icon: Phone },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'reunion', label: 'Reunión', icon: Users },
]
export const TIPO_BY_ID = Object.fromEntries(TIPOS.map((t) => [t.id, t]))

export const AUDIT_PRESETS = [
  'No tienen web',
  'Web no responsive',
  'Web lenta / desactualizada',
  'Reservas / citas en papel',
  'Stock en papel o Excel',
  'Sin base de datos de clientes',
  'Sin Google Business',
  'Sin redes sociales',
  'Sin formulario de contacto',
]

export const SERVICIOS = [
  { id: 'landing', label: 'Landing Page' },
  { id: 'corporativa', label: 'Web corporativa' },
  { id: 'bd', label: 'Mini base de datos a medida' },
  { id: 'dominio', label: 'Dominio y hosting' },
]
export const BD_TIPOS = ['Clientes', 'Stock', 'Citas / reservas', 'Pedidos']

export const DOC_TIPOS = [
  { id: 'presupuesto', label: 'Presupuesto', prefix: 'P' },
  { id: 'factura', label: 'Factura', prefix: 'F' },
]
export const DOC_ESTADOS = {
  factura: ['Borrador', 'Enviada', 'Pagada', 'Vencida'],
  presupuesto: ['Borrador', 'Enviado', 'Aceptado', 'Rechazado'],
}
export const DOC_ESTADO_BADGE = {
  Borrador: 'bg-slate-100 text-slate-700 ring-slate-200',
  Enviada: 'bg-sky-50 text-sky-800 ring-sky-200',
  Enviado: 'bg-sky-50 text-sky-800 ring-sky-200',
  Pagada: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  Aceptado: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  Vencida: 'bg-rose-50 text-rose-700 ring-rose-200',
  Rechazado: 'bg-rose-50 text-rose-700 ring-rose-200',
}
