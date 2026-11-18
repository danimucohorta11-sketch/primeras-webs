import { useRef, useState } from 'react'
import { FileText, UploadCloud, X } from 'lucide-react'
import { fmtSize, readFileAsDataUrl } from '../utils'

// En localStorage solo se guardan archivos pequeños; con Supabase Storage / Firebase Storage se sube el binario
// y aquí solo se guardaría la URL/ruta (ver supabase/schema.sql, columna documentos.archivo_path).
const MAX_INLINE = 1.5 * 1024 * 1024

export default function Dropzone({ value, onChange }) {
  const input = useRef()
  const [over, setOver] = useState(false)
  const [error, setError] = useState('')

  const take = async (file) => {
    if (!file) return
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Solo se admiten archivos PDF.')
      return
    }
    setError('')
    const dataUrl = file.size <= MAX_INLINE ? await readFileAsDataUrl(file) : null
    onChange({ name: file.name, size: file.size, dataUrl })
  }

  if (value) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
        <FileText size={18} className="shrink-0 text-rose-500" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-800">{value.name}</p>
          <p className="text-xs text-slate-500">
            {fmtSize(value.size)}
            {!value.dataUrl && ' · demo: archivo no almacenado (supera 1,5 MB o es dato de ejemplo)'}
          </p>
        </div>
        <button type="button" onClick={() => onChange(null)} className="rounded-md p-1 text-slate-400 hover:bg-white hover:text-slate-700" title="Quitar archivo">
          <X size={15} />
        </button>
      </div>
    )
  }

  return (
    <div>
      <div
        onClick={() => input.current.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true) }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); take(e.dataTransfer.files[0]) }}
        className={`flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-dashed px-4 py-5 text-center transition ${
          over ? 'border-brand-500 bg-brand-50' : 'border-slate-300 bg-slate-50 hover:border-brand-400 hover:bg-brand-50/40'
        }`}
      >
        <UploadCloud size={22} className="text-slate-400" />
        <p className="text-sm text-slate-600">
          Arrastra el PDF aquí o <span className="font-medium text-brand-700">selecciónalo</span>
        </p>
        <p className="text-xs text-slate-400">Factura o presupuesto emitido (.pdf)</p>
        <input ref={input} type="file" accept="application/pdf,.pdf" hidden onChange={(e) => take(e.target.files[0])} />
      </div>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  )
}
