import { createClient } from '@supabase/supabase-js'
import { pad, toISODate } from './utils'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

/** Sin variables de entorno la app funciona en modo demo (localStorage). */
export const isRemote = Boolean(url && key)
export const sb = isRemote ? createClient(url, key) : null

// ---------- Mapeo app (camelCase) <-> base de datos (snake_case) ----------
const LEAD_COLS = {
  empresa: 'empresa', sector: 'sector', contacto: 'contacto', telefono: 'telefono', email: 'email', web: 'web',
  maps: 'maps', etapa: 'etapa', responsable: 'responsable', proximoSeguimiento: 'proximo_seguimiento',
  auditoria: 'auditoria', auditoriaNotas: 'auditoria_notas', servicios: 'servicios', enlaces: 'enlaces', creadoEn: 'creado_en',
}
export const leadPatchToRow = (patch) =>
  Object.fromEntries(Object.entries(patch).filter(([k]) => LEAD_COLS[k]).map(([k, v]) => [LEAD_COLS[k], v === '' && k === 'proximoSeguimiento' ? null : v]))
export const leadToRow = (l) => ({ id: l.id, ...leadPatchToRow(l) })
const rowToLead = (r) => ({
  id: r.id, empresa: r.empresa, sector: r.sector || '', contacto: r.contacto || '', telefono: r.telefono || '', email: r.email || '',
  web: r.web || '', maps: r.maps || '', etapa: r.etapa, responsable: r.responsable, proximoSeguimiento: r.proximo_seguimiento,
  auditoria: r.auditoria || [], auditoriaNotas: r.auditoria_notas || '', servicios: r.servicios, enlaces: r.enlaces || [], creadoEn: r.creado_en,
})

// La app usa fechas locales "YYYY-MM-DDTHH:mm:ss" sin zona; la BD usa timestamptz.
const toLocalISO = (iso) => {
  const d = new Date(iso)
  return `${toISODate(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}
export const actToRow = (a) => ({
  id: a.id, lead_id: a.leadId, tipo: a.tipo, resultado: a.resultado, notas: a.notas || '',
  proximo_seguimiento: a.proximoSeguimiento || null, responsable: a.responsable, fecha: new Date(a.fecha).toISOString(),
})
const rowToAct = (r) => ({
  id: r.id, leadId: r.lead_id, tipo: r.tipo, resultado: r.resultado, notas: r.notas || '',
  proximoSeguimiento: r.proximo_seguimiento, responsable: r.responsable, fecha: toLocalISO(r.fecha),
})
export const docToRow = (d) => ({
  id: d.id, lead_id: d.leadId, tipo: d.tipo, numero: d.numero, concepto: d.concepto || '', total: d.total, pagado: d.pagado,
  emision: d.emision, vencimiento: d.vencimiento || null, estado: d.estado, archivo: d.archivo || null,
})
const rowToDoc = (r) => ({
  id: r.id, leadId: r.lead_id, tipo: r.tipo, numero: r.numero, concepto: r.concepto || '', total: Number(r.total), pagado: Number(r.pagado),
  emision: r.emision, vencimiento: r.vencimiento, estado: r.estado, archivo: r.archivo,
})

// ---------- Operaciones ----------
const must = ({ data, error }) => {
  if (error) throw error
  return data
}

export async function fetchAll() {
  const [l, a, d] = await Promise.all([
    sb.from('leads').select('*').order('creado_en', { ascending: false }).then(must),
    sb.from('actividades').select('*').order('fecha', { ascending: false }).then(must),
    sb.from('documentos').select('*').order('emision', { ascending: false }).then(must),
  ])
  return { leads: l.map(rowToLead), activities: a.map(rowToAct), docs: d.map(rowToDoc) }
}

export const fetchProfile = async (userId) =>
  must(await sb.from('socios').select('nombre').eq('id', userId).maybeSingle())

export const insertLead = (l) => sb.from('leads').insert(leadToRow(l))
export const patchLead = (id, patch) => sb.from('leads').update(leadPatchToRow(patch)).eq('id', id)
export const removeLead = (id) => sb.from('leads').delete().eq('id', id)
export const insertActivity = (a) => sb.from('actividades').insert(actToRow(a))
export const removeActivity = (id) => sb.from('actividades').delete().eq('id', id)
export const upsertDoc = (d) => sb.from('documentos').upsert(docToRow(d))
export const removeDoc = (d) => {
  if (d?.archivo?.path) sb.storage.from('documentos').remove([d.archivo.path])
  return sb.from('documentos').delete().eq('id', d.id)
}

export async function uploadPdf(path, file) {
  const { error } = await sb.storage.from('documentos').upload(path, file, { upsert: true, contentType: 'application/pdf' })
  if (error) throw error
}
export async function signedUrl(path) {
  const { data, error } = await sb.storage.from('documentos').createSignedUrl(path, 120)
  if (error) throw error
  return data.signedUrl
}
