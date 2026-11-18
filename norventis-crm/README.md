# Norventis · CRM interno

CRM y gestor operativo a medida (prospección en frío → seguimiento → proyecto → facturación).
React 18 + Vite + Tailwind CSS 3 + lucide-react. Sin backend: los datos viven en `localStorage`
(con datos de ejemplo realistas) para poder probar toda la interfaz al instante.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # producción en dist/
```

"Restaurar datos demo" (barra lateral) vuelve a los datos de ejemplo.

## Qué incluye

- **Dashboard**: KPIs (leads activos, llamadas hoy/semana, conversión a reunión y cierre, proyectos activos,
  facturación cobrada vs pendiente), agenda de seguimientos del día (con atrasados), cola de prospección en frío,
  embudo y llamadas de los últimos 7 días.
- **Pipeline**: Kanban con arrastrar y soltar (8 etapas) o tabla ordenable; filtros por texto, responsable y sector.
- **Ficha del lead** (panel lateral): acciones rápidas (llamar, copiar teléfono, WhatsApp, email), guion de auditoría,
  registro de actividad, historial, datos editables, alcance del proyecto y finanzas del cliente.
- **Registro en <10 s**: botón global "Registrar llamada" → elegir negocio → pulsar resultado (rellena el
  seguimiento sugerido) → `Ctrl/⌘+Enter`. El resultado mueve la etapa automáticamente
  (Interesado → Contacto establecido, No interesa → Descartado, Cerrado → Cliente activo…).
- **Finanzas**: presupuestos y facturas con dropzone de PDF, importe total / pagado / pendiente, vencimiento y estado
  (las facturas "Enviada" pasadas de fecha se muestran como "Vencida").

## Migrar a Supabase

`supabase/schema.sql` contiene el esquema completo (tablas, enums, vistas de KPIs y RLS solo para socios).
Las acciones de `src/store.jsx` (`addLead`, `addActivity`, `saveDoc`…) son el único punto a sustituir por llamadas
a `@supabase/supabase-js`; los PDFs pasarían a Supabase Storage (`documentos.archivo_path`).

> Los nombres de socios se definen en `src/constants.js` (`SOCIOS`).
