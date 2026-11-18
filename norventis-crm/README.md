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

## Puesta en producción (Supabase + Vercel)

1. **Supabase**: crea un proyecto (región UE). En *Authentication → Sign In / Providers* desactiva
   "Allow new users to sign up". En *Authentication → Users → Add user* crea los dos usuarios (Auto confirm).
2. En *SQL Editor* pega y ejecuta `supabase/schema.sql`. Después ejecuta el bloque "PASO FINAL" del final del
   archivo (con vuestros emails) para dar de alta a los dos socios.
3. En *Project Settings → API* copia la **Project URL** y la clave **anon public**
   (nunca uses la `service_role` en el frontend).
4. **Local**: `cp .env.example .env.local`, rellena los dos valores y `npm run dev`.
5. **Hosting (Vercel)**: importa el repo en vercel.com, *Root Directory* = `norventis-crm`, Framework = Vite,
   y añade `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en *Environment Variables*. Cada push despliega.
6. En Supabase, *Authentication → URL Configuration*: pon la URL de Vercel como *Site URL*.

Con las variables definidas la app pide login, comparte los datos entre socios en tiempo real y guarda los PDF
en un bucket privado (`documentos`). Sin ellas arranca en modo demo.

> Los nombres de socio por defecto son "Socio 1" / "Socio 2". Para usar nombres reales define `VITE_SOCIOS`
> y usa los mismos nombres en la tabla `socios`.
> Las credenciales de proyecto (pestaña Proyecto) se guardan en texto en la BD: para claves sensibles usa un
> gestor de contraseñas y guarda solo el enlace.
