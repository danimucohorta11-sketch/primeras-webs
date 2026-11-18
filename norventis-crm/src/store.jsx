import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { buildSeed } from './data/seed'
import { nowISO, today, uid } from './utils'
import { STAGE_BY_ID } from './constants'

/**
 * Estado global persistido en localStorage.
 * Cada colección (leads, activities, docs) se corresponde 1:1 con una tabla de supabase/schema.sql,
 * así que migrar a Supabase/Firebase es sustituir las acciones de abajo por llamadas a la API.
 */
const KEY = 'norventis-crm-v1'
const ME_KEY = 'norventis-crm-me'
const Ctx = createContext(null)

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* datos corruptos: se regenera la demo */
  }
  return buildSeed()
}

/** Estado efectivo de un documento: una factura "Enviada" con vencimiento pasado se muestra como "Vencida". */
export const effectiveEstado = (doc) =>
  doc.tipo === 'factura' && doc.estado === 'Enviada' && doc.vencimiento && doc.vencimiento < today() && doc.pagado < doc.total
    ? 'Vencida'
    : doc.estado

export function StoreProvider({ children }) {
  const [db, setDb] = useState(load)
  const [me, setMeState] = useState(() => localStorage.getItem(ME_KEY) || 'Socio 1')
  const [toast, setToast] = useState(null)
  const toastTimer = useRef()

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(db))
    } catch (e) {
      console.warn('No se pudo guardar en localStorage', e)
    }
  }, [db])

  const setMe = (v) => {
    setMeState(v)
    localStorage.setItem(ME_KEY, v)
  }

  const notify = useCallback((message, tone = 'ok') => {
    clearTimeout(toastTimer.current)
    setToast({ message, tone, id: Date.now() })
    toastTimer.current = setTimeout(() => setToast(null), 3200)
  }, [])

  // ---------- Leads ----------
  const addLead = useCallback((data) => {
    const lead = {
      id: uid('l'), empresa: '', sector: '', contacto: '', telefono: '', email: '', web: '', maps: '',
      etapa: 'frio', responsable: 'Socio 1', auditoria: [], auditoriaNotas: '', proximoSeguimiento: null,
      servicios: {
        landing: { contratado: false, entregado: false },
        corporativa: { contratado: false, entregado: false },
        bd: { contratado: false, entregado: false, tipos: [] },
        dominio: { contratado: false, entregado: false },
      },
      enlaces: [], creadoEn: today(), ...data,
    }
    setDb((d) => ({ ...d, leads: [lead, ...d.leads] }))
    return lead
  }, [])

  const updateLead = useCallback((id, patch) => {
    setDb((d) => ({ ...d, leads: d.leads.map((l) => (l.id === id ? { ...l, ...patch } : l)) }))
  }, [])

  const moveLead = useCallback((id, etapa) => {
    setDb((d) => ({ ...d, leads: d.leads.map((l) => (l.id === id ? { ...l, etapa } : l)) }))
  }, [])

  const deleteLead = useCallback((id) => {
    setDb((d) => ({
      leads: d.leads.filter((l) => l.id !== id),
      activities: d.activities.filter((a) => a.leadId !== id),
      docs: d.docs.filter((x) => x.leadId !== id),
    }))
  }, [])

  // ---------- Actividad ----------
  /**
   * Registra una interacción. Reglas automáticas (para anotar en <10 s):
   *  - Registrar algo cierra el seguimiento pendiente; solo queda uno nuevo si se indica fecha.
   *  - Resultado => movimiento de etapa sugerido (ver abajo).
   * Devuelve un texto describiendo el cambio de etapa (si lo hubo).
   */
  const addActivity = useCallback((a) => {
    const activity = { id: uid('c'), fecha: nowISO(), notas: '', resultado: null, proximoSeguimiento: null, ...a }
    let stageMsg = ''
    setDb((d) => {
      const lead = d.leads.find((l) => l.id === activity.leadId)
      if (!lead) return d
      let etapa = lead.etapa
      const r = activity.resultado
      if (r === 'cerrado' && !['activo', 'recurrente'].includes(etapa)) etapa = 'activo'
      else if (r === 'interesado' && ['frio', 'llamada'].includes(etapa)) etapa = 'contacto'
      else if (['no_contesta', 'buzon', 'llamar_luego'].includes(r) && etapa === 'frio') etapa = 'llamada'
      else if (r === 'no_interesa' && etapa !== 'perdido') etapa = 'perdido'
      if (etapa !== lead.etapa) stageMsg = `movido a «${STAGE_BY_ID[etapa].label}»`
      return {
        ...d,
        activities: [activity, ...d.activities],
        leads: d.leads.map((l) => (l.id === lead.id ? { ...l, etapa, proximoSeguimiento: activity.proximoSeguimiento || null } : l)),
      }
    })
    return stageMsg
  }, [])

  const deleteActivity = useCallback((id) => {
    setDb((d) => ({ ...d, activities: d.activities.filter((a) => a.id !== id) }))
  }, [])

  // ---------- Documentos (presupuestos y facturas) ----------
  const saveDoc = useCallback((doc) => {
    setDb((d) => {
      const exists = d.docs.some((x) => x.id === doc.id)
      return { ...d, docs: exists ? d.docs.map((x) => (x.id === doc.id ? doc : x)) : [{ ...doc, id: doc.id || uid('d') }, ...d.docs] }
    })
  }, [])
  const deleteDoc = useCallback((id) => setDb((d) => ({ ...d, docs: d.docs.filter((x) => x.id !== id) })), [])

  const nextDocNumber = useCallback(
    (tipo) => {
      const prefix = tipo === 'factura' ? 'F' : 'P'
      const year = new Date().getFullYear()
      const max = db.docs
        .filter((x) => x.tipo === tipo)
        .map((x) => parseInt(x.numero.split('-').pop(), 10) || 0)
        .reduce((a, b) => Math.max(a, b), 0)
      return `${prefix}-${year}-${String(max + 1).padStart(3, '0')}`
    },
    [db.docs],
  )

  const resetDemo = useCallback(() => setDb(buildSeed()), [])

  const value = useMemo(
    () => ({
      ...db, me, setMe, toast, notify,
      addLead, updateLead, moveLead, deleteLead, addActivity, deleteActivity, saveDoc, deleteDoc, nextDocNumber, resetDemo,
    }),
    [db, me, toast, notify, addLead, updateLead, moveLead, deleteLead, addActivity, deleteActivity, saveDoc, deleteDoc, nextDocNumber, resetDemo],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useStore = () => useContext(Ctx)

/** Última actividad de un lead (las actividades se guardan de más nueva a más antigua). */
export const lastActivityOf = (activities, leadId) =>
  activities.filter((a) => a.leadId === leadId).sort((a, b) => b.fecha.localeCompare(a.fecha))[0]
