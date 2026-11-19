-- Run this once in the Supabase SQL editor for existing Pearly databases.
alter table public.categories
  add column if not exists homepage_visible boolean not null default true,
  add column if not exists homepage_order integer not null default 0;

with ordered as (
  select id, row_number() over (order by created_at, name) - 1 as position
  from public.categories
)
update public.categories as category
set homepage_order = ordered.position
from ordered
where category.id = ordered.id;
