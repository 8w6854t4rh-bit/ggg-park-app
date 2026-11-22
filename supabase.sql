-- Einmal im Supabase-Projekt ausführen: SQL Editor -> New query -> einfügen -> Run.
create table if not exists public.reservations (
  id          text primary key,              -- Datum_Platz_Hälfte, z. B. 2026-11-23_P07_am
  date        text not null,                 -- JJJJ-MM-TT
  spot        text not null,                 -- P01 ... P20
  half        text not null check (half in ('am','pm')),
  plate       text not null,
  who         text not null default '',
  device      text not null,                 -- zufällige Geräte-Kennung aus der App
  full_day    boolean not null default false,
  created_at  timestamptz not null default now(),
  unique (date, spot, half)                  -- verhindert Doppelbuchungen
);
create index if not exists reservations_date on public.reservations(date);

alter table public.reservations enable row level security;

-- Alle dürfen den Belegungsplan lesen.
drop policy if exists "lesen" on public.reservations;
create policy "lesen" on public.reservations for select using (true);

-- Eintragen und Stornieren nur mit der eigenen Geräte-Kennung.
drop policy if exists "eintragen" on public.reservations;
create policy "eintragen" on public.reservations for insert
  with check (device = coalesce(current_setting('request.headers', true)::json->>'x-device',''));
drop policy if exists "stornieren" on public.reservations;
create policy "stornieren" on public.reservations for delete
  using (device = coalesce(current_setting('request.headers', true)::json->>'x-device',''));

-- Alte Einträge aufräumen (optional, z. B. einmal im Monat ausführen):
-- delete from public.reservations where date < to_char(now() - interval '30 days','YYYY-MM-DD');
