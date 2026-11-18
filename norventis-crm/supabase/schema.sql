-- ============================================================================
-- Norventis CRM · esquema Postgres (Supabase)
-- Cada tabla corresponde a una colección del estado de la demo (src/store.jsx):
--   leads → leads · activities → actividades · docs → documentos
-- Uso interno: solo dos socios autenticados (RLS al final).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------- Tipos ----------
create type etapa_lead as enum (
  'frio', 'llamada', 'contacto', 'reunion', 'presupuesto', 'activo', 'recurrente', 'perdido'
);
create type tipo_actividad as enum ('llamada', 'whatsapp', 'email', 'reunion');
create type resultado_actividad as enum (
  'no_contesta', 'buzon', 'llamar_luego', 'interesado', 'no_interesa', 'cerrado'
);
create type tipo_documento as enum ('presupuesto', 'factura');
create type estado_documento as enum (
  'borrador', 'enviada', 'pagada', 'vencida',        -- facturas
  'enviado', 'aceptado', 'rechazado'                 -- presupuestos
);

-- ---------- Socios (perfil ligado a auth.users) ----------
create table socios (
  id          uuid primary key references auth.users on delete cascade,
  nombre      text not null,                       -- "Socio 1", "Socio 2"
  creado_en   timestamptz not null default now()
);

-- ---------- Leads / clientes ----------
create table leads (
  id                    uuid primary key default gen_random_uuid(),
  empresa               text not null,
  sector                text,
  contacto              text,
  telefono              text not null,
  email                 text,
  web                   text,
  maps_url              text,                      -- Google Maps / redes
  etapa                 etapa_lead not null default 'frio',
  responsable_id        uuid references socios(id),
  proximo_seguimiento   date,                      -- alimenta la agenda del día
  auditoria_notas       text,
  creado_en             timestamptz not null default now(),
  actualizado_en        timestamptz not null default now()
);
create index on leads (etapa);
create index on leads (proximo_seguimiento) where proximo_seguimiento is not null;
create index on leads (responsable_id);

-- Auditoría previa: puntos de mejora estructurados ("No tienen web", "Stock en papel"…)
create table lead_auditoria (
  id        uuid primary key default gen_random_uuid(),
  lead_id   uuid not null references leads(id) on delete cascade,
  texto     text not null
);
create index on lead_auditoria (lead_id);

-- ---------- Historial de actividad (llamadas, WhatsApp, email, reuniones) ----------
create table actividades (
  id                    uuid primary key default gen_random_uuid(),
  lead_id               uuid not null references leads(id) on delete cascade,
  tipo                  tipo_actividad not null default 'llamada',
  resultado             resultado_actividad,
  notas                 text,
  proximo_seguimiento   date,
  responsable_id        uuid references socios(id),
  fecha                 timestamptz not null default now()
);
create index on actividades (lead_id, fecha desc);
create index on actividades (fecha desc);                -- KPIs de llamadas hoy / semana

-- ---------- Alcance del proyecto (si pasa a cliente) ----------
create table servicios_contratados (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references leads(id) on delete cascade,
  servicio    text not null check (servicio in ('landing', 'corporativa', 'bd', 'dominio')),
  entregado   boolean not null default false,
  detalle     text[] default '{}',                 -- p. ej. {'Clientes','Stock','Citas / reservas'} para 'bd'
  unique (lead_id, servicio)
);

-- Enlaces y credenciales. En producción guarda solo el enlace y las claves en un gestor de secretos.
create table enlaces_proyecto (
  id        uuid primary key default gen_random_uuid(),
  lead_id   uuid not null references leads(id) on delete cascade,
  etiqueta  text not null,
  valor     text not null
);

-- ---------- Presupuestos y facturas ----------
create table documentos (
  id             uuid primary key default gen_random_uuid(),
  lead_id        uuid not null references leads(id) on delete cascade,
  tipo           tipo_documento not null,
  numero         text not null unique,             -- F-2026-021 / P-2026-014
  concepto       text,
  total          numeric(12,2) not null check (total >= 0),
  pagado         numeric(12,2) not null default 0 check (pagado >= 0 and pagado <= total),
  emision        date not null default current_date,
  vencimiento    date,
  estado         estado_documento not null default 'borrador',
  archivo_path   text,                             -- ruta en Supabase Storage (bucket "documentos")
  archivo_nombre text,
  archivo_bytes  integer,
  creado_en      timestamptz not null default now()
);
create index on documentos (lead_id);
create index on documentos (tipo, estado);

-- "Vencida" se deriva: una factura enviada, con vencimiento pasado e importe pendiente.
create view documentos_v as
select d.*,
       (d.total - d.pagado) as pendiente,
       case when d.tipo = 'factura' and d.estado = 'enviada'
                 and d.vencimiento < current_date and d.pagado < d.total
            then 'vencida'::estado_documento else d.estado end as estado_efectivo
from documentos d;

-- ---------- Vistas para el dashboard ----------
create view kpi_finanzas as
select coalesce(sum(total) filter (where estado <> 'borrador'), 0)                  as facturado,
       coalesce(sum(pagado) filter (where estado <> 'borrador'), 0)                 as cobrado,
       coalesce(sum(total - pagado) filter (where estado <> 'borrador'), 0)         as pendiente
from documentos where tipo = 'factura';

create view agenda_hoy as
select * from leads
where proximo_seguimiento <= current_date and etapa <> 'perdido'
order by proximo_seguimiento;

-- ---------- Triggers ----------
create or replace function touch_actualizado() returns trigger language plpgsql as $$
begin new.actualizado_en = now(); return new; end $$;
create trigger leads_touch before update on leads for each row execute function touch_actualizado();

-- ---------- Seguridad (RLS): solo socios autenticados ----------
alter table socios                enable row level security;
alter table leads                 enable row level security;
alter table lead_auditoria        enable row level security;
alter table actividades           enable row level security;
alter table servicios_contratados enable row level security;
alter table enlaces_proyecto      enable row level security;
alter table documentos            enable row level security;

do $$
declare t text;
begin
  foreach t in array array['socios','leads','lead_auditoria','actividades','servicios_contratados','enlaces_proyecto','documentos']
  loop
    execute format('create policy "solo socios" on %I for all to authenticated
                    using (exists (select 1 from socios s where s.id = auth.uid()))
                    with check (exists (select 1 from socios s where s.id = auth.uid()))', t);
  end loop;
end $$;

-- Storage: crea un bucket privado "documentos" y limita el acceso a los socios.
