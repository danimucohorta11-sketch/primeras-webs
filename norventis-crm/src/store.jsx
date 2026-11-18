import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { buildSeed } from './data/seed'
import { ls, nowISO, today, uid } from './utils'
import { STAGE_BY_ID } from './constants'
import * as remote from './supabase'

/**
 * Estado global. Dos modos:
 *  - Demo (sin VITE_SUPABASE_*): persiste en localStorage con datos de ejemplo.
 *  - Remoto (Supabase): login, datos compartidos entre socios, tiempo real y PDF en Storage.
 * Las acciones actualizan la interfaz al instante (optimista) y escriben en segundo plano;
 * si la escritura falla se avisa y se recarga el estado real desde el servidor.
 */
const KEY = 'norventis-crm-v1'
const ME_KEY = 'norventis-crm-me'
const Ctx = createContext(null)
const { isRemote } = remote
const EMPTY = { leads: [], activities: [], docs: [] }

function load() {
  if (isRemote) return EMPTY
  try {
    const raw = ls.get(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* datos corruptos: se regenera la demo */
  }
  return buildSeed()
}

/** Estado efectivo: una factura "Enviada" con vencimiento pasado se muestra como "Vencida". */
export const effectiveEstado = (doc) =>
  doc.tipo === 'factura' && doc.estado === 'Enviada' && doc.vencimiento && doc.vencimiento < today() && doc.pagado < doc.total
    ? 'Vencida'
    : doc.estado

const newServicios = () => ({
  landing: { contratado: false, entregado: false },
  corporativa: { contratado: false, entregado: false },
  bd: { contratado: false, entregado: false, tipos: [] },
  dominio: { contratado: false, entregado: false },
})

export function StoreProvider({ children }) {
  const [db, setDb] = useState(load)
  const dbRef = useRef(db)
  const [me, setMeState] = useState(() => ls.get(ME_KEY) || 'Socio 1')
  const [toast, setToast] = useState(null)
  const [confirmState, setConfirmState] = useState(null)
  const toastTimer = useRef()

  // Auth (solo modo remoto)
  const [session, setSession] = useState(undefined) // undefined = comprobando, null = sin sesión
  const [profile, setProfile] = useState(undefined) // undefined = cargando, null = sin acceso
  const [loading, setLoading] = useState(isRemote)

  const notify = useCallback((message, tone = 'ok') => {
    clearTimeout(toastTimer.current)
    setToast({ message, tone, id: Date.now() })
    toastTimer.current = setTimeout(() => setToast(null), 3200)
  }, [])
  const askConfirm = useCallback((message, onYes) => setConfirmState({ message, onYes }), [])

  /** Aplica un cambio al estado de forma síncrona (varias acciones seguidas no se pisan). */
  const commit = useCallback((fn) => {
    const next = fn(dbRef.current)
    dbRef.current = next
    setDb(next)
  }, [])

  // ---------- Persistencia ----------
  useEffect(() => {
    if (!isRemote) ls.set(KEY, JSON.stringify(db))
  }, [db])

  const reload = useCallback(async () => {
    try {
      const data = await remote.fetchAll()
      dbRef.current = data
      setDb(data)
    } catch (e) {
      console.error(e)
      notify('No se pudieron cargar los datos: ' + e.message, 'err')
    }
  }, [notify])

  const pending = useRef({}) // leadId -> { patch, timer }
  const skippedReload = useRef(false)

  /** Ejecuta una escritura remota; si falla avisa y resincroniza. */
  const write = useCallback(
    async (promise) => {
      if (!isRemote) return
      try {
        const { error } = await promise
        if (error) throw error
      } catch (e) {
        console.error(e)
        notify('Error al guardar: ' + (e.message || e), 'err')
        reload()
      }
    },
    [notify, reload],
  )

  /** Los cambios de ficha (se escribe tecla a tecla) se agrupan y se guardan 600 ms después de la última. */
  const queuePatch = useCallback(
    (id, patch) => {
      if (!isRemote) return
      const cur = pending.current[id] || { patch: {} }
      clearTimeout(cur.timer)
      cur.patch = { ...cur.patch, ...patch }
      cur.timer = setTimeout(async () => {
        const p = cur.patch
        delete pending.current[id]
        await write(remote.patchLead(id, p))
        if (skippedReload.current && !Object.keys(pending.current).length) {
          skippedReload.current = false
          reload()
        }
      }, 600)
      pending.current[id] = cur
    },
    [write, reload],
  )

  // Sesión
  useEffect(() => {
    if (!isRemote) return
    remote.sb.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = remote.sb.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  // Perfil + datos + tiempo real al iniciar sesión
  useEffect(() => {
    if (!isRemote) return
    if (!session) {
      setProfile(undefined)
      dbRef.current = EMPTY
      setDb(EMPTY)
      setLoading(session === undefined)
      return
    }
    let cancelled = false
    let timer
    let channel
    ;(async () => {
      setLoading(true)
      try {
        const p = await remote.fetchProfile(session.user.id)
        if (cancelled) return
        setProfile(p || null)
        if (p) {
          await reload()
          const onChange = () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
              if (Object.keys(pending.current).length) skippedReload.current = true
              else reload()
            }, 400)
          }
          channel = remote.sb.channel('crm-sync').on('postgres_changes', { event: '*', schema: 'public' }, onChange).subscribe()
        }
      } catch (e) {
        console.error(e)
        notify('Error de conexión: ' + e.message, 'err')
      }
      if (!cancelled) setLoading(false)
    })()
    return () => {
      cancelled = true
      clearTimeout(timer)
      if (channel) remote.sb.removeChannel(channel)
    }
  }, [session, reload, notify])

  const signIn = async (email, password) => {
    const { error } = await remote.sb.auth.signInWithPassword({ email, password })
    if (error) throw error
  }
  const signOut = () => remote.sb.auth.signOut()

  const setMe = (v) => {
    setMeState(v)
    ls.set(ME_KEY, v)
  }
  const currentMe = isRemote ? profile?.nombre || me : me

  // ---------- Leads ----------
  const addLead = useCallback(
    (data) => {
      const lead = {
        id: uid('l'), empresa: '', sector: '', contacto: '', telefono: '', email: '', web: '', maps: '',
        etapa: 'frio', responsable: currentMe, auditoria: [], auditoriaNotas: '', proximoSeguimiento: null,
        servicios: newServicios(), enlaces: [], creadoEn: today(), ...data,
      }
      commit((d) => ({ ...d, leads: [lead, ...d.leads] }))
      if (isRemote) write(remote.insertLead(lead))
      return lead
    },
    [commit, write, currentMe],
  )

  const updateLead = useCallback(
    (id, patch) => {
      commit((d) => ({ ...d, leads: d.leads.map((l) => (l.id === id ? { ...l, ...patch } : l)) }))
      queuePatch(id, patch)
    },
    [commit, queuePatch],
  )

  const moveLead = useCallback(
    (id, etapa) => {
      commit((d) => ({ ...d, leads: d.leads.map((l) => (l.id === id ? { ...l, etapa } : l)) }))
      if (isRemote) write(remote.patchLead(id, { etapa }))
    },
    [commit, write],
  )

  const deleteLead = useCallback(
    (id) => {
      const docs = dbRef.current.docs.filter((x) => x.leadId === id)
      commit((d) => ({
        leads: d.leads.filter((l) => l.id !== id),
        activities: d.activities.filter((a) => a.leadId !== id),
        docs: d.docs.filter((x) => x.leadId !== id),
      }))
      if (isRemote) {
        docs.forEach((x) => x.archivo?.path && remote.sb.storage.from('documentos').remove([x.archivo.path]))
        write(remote.removeLead(id))
      }
    },
    [commit, write],
  )

  // ---------- Actividad ----------
  /**
   * Registra una interacción. Reglas automáticas (para anotar en <10 s):
   *  - Registrar algo cierra el seguimiento pendiente; solo queda uno nuevo si se indica fecha.
   *  - El resultado propone un movimiento de etapa.
   * Devuelve un texto describiendo el cambio de etapa (si lo hubo).
   */
  const addActivity = useCallback(
    (a) => {
      const activity = { id: uid('c'), fecha: nowISO(), notas: '', resultado: null, proximoSeguimiento: null, ...a }
      const lead = dbRef.current.leads.find((l) => l.id === activity.leadId)
      if (!lead) return ''
      let etapa = lead.etapa
      const r = activity.resultado
      if (r === 'cerrado' && !['activo', 'recurrente'].includes(etapa)) etapa = 'activo'
      else if (r === 'interesado' && ['frio', 'llamada'].includes(etapa)) etapa = 'contacto'
      else if (['no_contesta', 'buzon', 'llamar_luego'].includes(r) && etapa === 'frio') etapa = 'llamada'
      else if (r === 'no_interesa' && etapa !== 'perdido') etapa = 'perdido'
      const proximoSeguimiento = activity.proximoSeguimiento || null
      commit((d) => ({
        ...d,
        activities: [activity, ...d.activities],
        leads: d.leads.map((l) => (l.id === lead.id ? { ...l, etapa, proximoSeguimiento } : l)),
      }))
      if (isRemote) {
        write(remote.insertActivity(activity))
        write(remote.patchLead(lead.id, { etapa, proximoSeguimiento }))
      }
      return etapa !== lead.etapa ? `movido a «${STAGE_BY_ID[etapa].label}»` : ''
    },
    [commit, write],
  )

  const deleteActivity = useCallback(
    (id) => {
      commit((d) => ({ ...d, activities: d.activities.filter((a) => a.id !== id) }))
      if (isRemote) write(remote.removeActivity(id))
    },
    [commit, write],
  )

  // ---------- Documentos (presupuestos y facturas) ----------
  /** Guarda un documento. En modo remoto sube el PDF a Storage (puede lanzar error). */
  const saveDoc = useCallback(
    async (doc) => {
      const d = { ...doc, id: doc.id || uid('d') }
      if (d.archivo) {
        const { file, dataUrl, ...meta } = d.archivo
        if (isRemote) {
          if (file) {
            const safe = file.name.replace(/[^\w.\-]+/g, '_')
            meta.path = `${d.leadId}/${d.id}-${safe}`
            await remote.uploadPdf(meta.path, file)
          }
          d.archivo = meta
        } else {
          d.archivo = { ...meta, dataUrl: dataUrl || null }
        }
      }
      const exists = dbRef.current.docs.some((x) => x.id === d.id)
      commit((s) => ({ ...s, docs: exists ? s.docs.map((x) => (x.id === d.id ? d : x)) : [d, ...s.docs] }))
      if (isRemote) await write(remote.upsertDoc(d))
    },
    [commit, write],
  )

  const deleteDoc = useCallback(
    (id) => {
      const doc = dbRef.current.docs.find((x) => x.id === id)
      commit((d) => ({ ...d, docs: d.docs.filter((x) => x.id !== id) }))
      if (isRemote && doc) write(remote.removeDoc(doc))
    },
    [commit, write],
  )

  const openDocFile = useCallback(
    async (doc) => {
      try {
        const url = await remote.signedUrl(doc.archivo.path)
        window.open(url, '_blank', 'noopener')
      } catch (e) {
        notify('No se pudo abrir el PDF: ' + e.message, 'err')
      }
    },
    [notify],
  )

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

  const resetDemo = useCallback(() => {
    if (!isRemote) commit(() => buildSeed())
  }, [commit])

  const value = useMemo(
    () => ({
      ...db, me: currentMe, setMe, toast, notify, askConfirm, confirmState, setConfirmState,
      isRemote, session, profile, loading, signIn, signOut,
      addLead, updateLead, moveLead, deleteLead, addActivity, deleteActivity, saveDoc, deleteDoc, openDocFile, nextDocNumber, resetDemo,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [db, currentMe, toast, notify, askConfirm, confirmState, session, profile, loading, addLead, updateLead, moveLead, deleteLead, addActivity, deleteActivity, saveDoc, deleteDoc, openDocFile, nextDocNumber, resetDemo],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useStore = () => useContext(Ctx)

/** Última actividad de un lead. */
export const lastActivityOf = (activities, leadId) =>
  activities.filter((a) => a.leadId === leadId).sort((a, b) => b.fecha.localeCompare(a.fecha))[0]
