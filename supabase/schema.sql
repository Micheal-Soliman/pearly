create table if not exists public.products (
  id text primary key,
  name text not null,
  description text not null default '',
  price numeric(10,2) not null check (price >= 0),
  original_price numeric(10,2) check (original_price is null or original_price >= 0),
  image text not null default '',
  images jsonb not null default '[]'::jsonb,
  category text not null,
  in_stock boolean not null default true,
  featured boolean not null default false,
  best_seller boolean not null default false,
  is_shade boolean not null default false,
  bundle_steps jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_featured_idx on public.products (featured) where featured = true;
create index if not exists products_in_stock_idx on public.products (in_stock);

alter table public.products enable row level security;
-- The dashboard writes through a server-only service role key. Public clients receive no table policy.

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products
for each row execute function public.set_updated_at();
