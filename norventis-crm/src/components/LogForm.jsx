import { useState } from 'react'
import { CalendarClock, CornerDownLeft } from 'lucide-react'
import { RESULTADOS, SOCIOS, TIPOS } from '../constants'
import { addDays, today } from '../utils'
import { useStore } from '../store'

/**
 * Formulario de registro rápido de actividad.
 * Flujo de 10 s: pulsar resultado (rellena la fecha de seguimiento sugerida) -> Ctrl/⌘+Enter o "Guardar".
 */
export default function LogForm({ lead, onDone, autoFocus = false }) {
  const { addActivity, me, notify } = useStore()
  const [tipo, setTipo] = useState('llamada')
  const [resultado, setResultado] = useState(null)
  const [notas, setNotas] = useState('')
  const [next, setNext] = useState('')
  const [nextTouched, setNextTouched] = useState(false)
  const [responsable, setResponsable] = useState(lead.responsable || me)

  const pickResultado = (r) => {
    const value = resultado === r.id ? null : r.id
    setResultado(value)
    if (!nextTouched) setNext(value && r.nextDays ? addDays(today(), r.nextDays) : '')
  }

  const canSave = tipo !== 'llamada' || resultado

  const save = () => {
    if (!canSave) return
    const stageMsg = addActivity({ leadId: lead.id, tipo, resultado, notas: notas.trim(), proximoSeguimiento: next || null, responsable })
    notify(`Registrado${stageMsg ? ' · ' + stageMsg : ''}`)
    onDone?.()
  }

  const quick = [
    ['Mañana', 1],
    ['+3 días', 3],
    ['+1 sem', 7],
    ['+2 sem', 14],
  ]

  return (
    <div className="space-y-3" onKeyDown={(e) => (e.metaKey || e.ctrlKey) && e.key === 'Enter' && save()}>
      <div className="flex flex-wrap gap-1.5">
        {TIPOS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTipo(t.id)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
              tipo === t.id ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <t.icon size={13} />
            {t.label}
          </button>
        ))}
      </div>

      <div>
        <span className="label">Resultado {tipo === 'llamada' && <span className="text-rose-500">*</span>}</span>
        <div className="flex flex-wrap gap-1.5">
          {RESULTADOS.map((r) => (
            <button
              key={r.id}
              type="button"
              data-on={resultado === r.id}
              onClick={() => pickResultado(r)}
              className={`rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition ${r.chip}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="label">Notas</span>
        <textarea
          autoFocus={autoFocus}
          rows={3}
          className="input resize-none"
          placeholder="¿Qué se habló? Objeciones, decisor, presupuesto orientativo…"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <span className="label">Próximo seguimiento</span>
          <div className="flex flex-wrap items-center gap-1.5">
            <input
              type="date"
              className="input !w-auto"
              value={next}
              min={today()}
              onChange={(e) => {
                setNext(e.target.value)
                setNextTouched(true)
              }}
            />
            {quick.map(([label, n]) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setNext(addDays(today(), n))
                  setNextTouched(true)
                }}
                className="rounded-md border border-slate-200 px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
              >
                {label}
              </button>
            ))}
            {next && (
              <button type="button" onClick={() => { setNext(''); setNextTouched(true) }} className="text-xs text-slate-400 hover:text-slate-600">
                Quitar
              </button>
            )}
          </div>
        </div>
        <div>
          <span className="label">Responsable</span>
          <select className="input" value={responsable} onChange={(e) => setResponsable(e.target.value)}>
            {SOCIOS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <p className="flex items-center gap-1 text-[11px] text-slate-400">
          <CalendarClock size={12} /> Al guardar se actualiza la etapa y el seguimiento
        </p>
        <button type="button" className="btn-primary" disabled={!canSave} onClick={save}>
          Guardar
          <kbd className="ml-1 hidden items-center gap-0.5 rounded bg-white/20 px-1 text-[10px] sm:inline-flex">
            ⌘<CornerDownLeft size={9} />
          </kbd>
        </button>
      </div>
    </div>
  )
}
