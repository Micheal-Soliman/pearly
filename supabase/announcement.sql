create table if not exists public.site_settings (
  id text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, value) values
  ('announcement', '{"enabled":false,"text":"","linkUrl":"","linkLabel":"Shop now","backgroundColor":"#d6869d","textColor":"#ffffff","dismissible":true}'::jsonb)
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

