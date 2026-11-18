-- ============================================================================
-- Norventis CRM · esquema Postgres para Supabase
-- Pégalo entero en  Supabase → SQL Editor → New query → Run.
-- Uso interno: solo los usuarios dados de alta en la tabla "socios" pueden leer/escribir.
-- ============================================================================

-- ---------- Socios (perfil de cada usuario de Authentication) ----------
create table if not exists public.socios (
  id         uuid primary key references auth.users on delete cascade,
  nombre     text not null,                      -- debe coincidir con VITE_SOCIOS (p. ej. "Socio 1")
  creado_en  timestamptz not null default now()
);

-- ---------- Leads / clientes ----------
create table if not exists public.leads (
  id                   uuid primary key default gen_random_uuid(),
  empresa              text not null,
  sector               text default '',
  contacto             text default '',
  telefono             text default '',
  email                text default '',
  web                  text default '',
  maps                 text default '',
  etapa                text not null default 'frio'
    check (etapa in ('frio','llamada','contacto','reunion','presupuesto','activo','recurrente','perdido')),
  responsable          text not null default 'Socio 1',
  proximo_seguimiento  date,
  auditoria            jsonb not null default '[]',   -- [{id, text}]
  auditoria_notas      text default '',
  servicios            jsonb not null default '{}',   -- {landing:{contratado,entregado}, bd:{..., tipos:[]}, ...}
  enlaces              jsonb not null default '[]',   -- [{id, label, value}]
  creado_en            date not null default current_date
);
create index if not exists leads_etapa_idx on public.leads (etapa);
create index if not exists leads_seguimiento_idx on public.leads (proximo_seguimiento) where proximo_seguimiento is not null;

-- ---------- Historial de actividad ----------
create table if not exists public.actividades (
  id                   uuid primary key default gen_random_uuid(),
  lead_id              uuid not null references public.leads(id) on delete cascade,
  tipo                 text not null default 'llamada' check (tipo in ('llamada','whatsapp','email','reunion')),
  resultado            text check (resultado in ('no_contesta','buzon','llamar_luego','interesado','no_interesa','cerrado')),
  notas                text default '',
  proximo_seguimiento  date,
  responsable          text not null default 'Socio 1',
  fecha                timestamptz not null default now()
);
create index if not exists actividades_lead_idx on public.actividades (lead_id, fecha desc);
create index if not exists actividades_fecha_idx on public.actividades (fecha desc);

-- ---------- Presupuestos y facturas ----------
create table if not exists public.documentos (
  id           uuid primary key default gen_random_uuid(),
  lead_id      uuid not null references public.leads(id) on delete cascade,
  tipo         text not null check (tipo in ('presupuesto','factura')),
  numero       text not null unique,                 -- F-2026-021 / P-2026-014
  concepto     text default '',
  total        numeric(12,2) not null check (total >= 0),
  pagado       numeric(12,2) not null default 0 check (pagado >= 0 and pagado <= total),
  emision      date not null default current_date,
  vencimiento  date,
  estado       text not null default 'Borrador'
    check (estado in ('Borrador','Enviada','Pagada','Vencida','Enviado','Aceptado','Rechazado')),
  archivo      jsonb,                                -- {name, size, path} · path = ruta en Storage (bucket "documentos")
  creado_en    timestamptz not null default now()
);
create index if not exists documentos_lead_idx on public.documentos (lead_id);

-- ---------- Seguridad: solo socios ----------
create or replace function public.es_socio() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.socios where id = auth.uid())
$$;

alter table public.socios      enable row level security;
alter table public.leads       enable row level security;
alter table public.actividades enable row level security;
alter table public.documentos  enable row level security;

drop policy if exists "ver mi perfil" on public.socios;
create policy "ver mi perfil" on public.socios for select to authenticated using (id = auth.uid());

drop policy if exists "solo socios" on public.leads;
create policy "solo socios" on public.leads for all to authenticated using (public.es_socio()) with check (public.es_socio());
drop policy if exists "solo socios" on public.actividades;
create policy "solo socios" on public.actividades for all to authenticated using (public.es_socio()) with check (public.es_socio());
drop policy if exists "solo socios" on public.documentos;
create policy "solo socios" on public.documentos for all to authenticated using (public.es_socio()) with check (public.es_socio());

-- ---------- Storage: bucket privado para los PDF ----------
insert into storage.buckets (id, name, public) values ('documentos', 'documentos', false) on conflict (id) do nothing;

drop policy if exists "socios gestionan PDF" on storage.objects;
create policy "socios gestionan PDF" on storage.objects for all to authenticated
  using (bucket_id = 'documentos' and public.es_socio())
  with check (bucket_id = 'documentos' and public.es_socio());

-- ---------- Tiempo real (sincroniza lo que hace el otro socio) ----------
do $$ begin
  alter publication supabase_realtime add table public.leads, public.actividades, public.documentos;
exception when duplicate_object then null; end $$;

-- ============================================================================
-- PASO FINAL (ejecútalo aparte, cambiando los emails por los de los dos usuarios
-- que creaste en Authentication → Users):
--
--   insert into public.socios (id, nombre)
--   select id, case email when 'TU_EMAIL@ejemplo.com' then 'Socio 1' else 'Socio 2' end
--   from auth.users
--   where email in ('TU_EMAIL@ejemplo.com', 'EMAIL_DE_TU_SOCIO@ejemplo.com');
-- ============================================================================
