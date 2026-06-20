-- SmartzConnect Supabase Schema v3
-- Run this in Supabase SQL editor: https://supabase.com/dashboard

-- ── Extensions ─────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ── Profiles ───────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  username      text unique,
  full_name     text,
  avatar_url    text,
  cover_url     text,
  bio           text,
  location      text,
  country       text,
  age           int,
  gender        text,
  occupation    text,
  education     text,
  relationship_goal text,
  languages     text[],
  interests     text[],
  height_cm     int,
  is_verified   boolean default false,
  is_vip        boolean default false,
  is_premium    boolean default false,
  is_online     boolean default false,
  last_seen     timestamptz,
  push_token    text,
  language_pref text default 'en',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "Public profiles viewable" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);

-- ── Team Members ────────────────────────────────────────────────────────────
create table if not exists public.team_members (
  id            uuid primary key default uuid_generate_v4(),
  full_name     text not null,
  role          text not null,
  photo_url     text,
  country       text,
  bio           text,
  skills        text[],
  linkedin_url  text,
  twitter_url   text,
  joined_year   text,
  is_advisor    boolean default false,
  is_active     boolean default true,
  display_order int default 0,
  organization  text,
  created_at    timestamptz default now()
);

alter table public.team_members enable row level security;
create policy "Team members public read" on public.team_members for select using (true);

-- Insert CEO
insert into public.team_members (full_name, role, photo_url, country, bio, skills, is_active, display_order)
values (
  'Shedrick K. Nungehn',
  'Founder & CEO',
  '/ceo-shedrick.jpg',
  'Liberia',
  'Visionary entrepreneur and founder of SmartzConnect — Africa''s #1 social and dating platform.',
  array['Leadership','Product Vision','Strategy','Technology','African Markets'],
  true,
  0
) on conflict do nothing;

-- ── Blog Posts ──────────────────────────────────────────────────────────────
create table if not exists public.blog_posts (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  slug          text unique,
  excerpt       text,
  content       text,
  author_name   text,
  author_role   text,
  image_url     text,
  category      text,
  tags          text[],
  status        text default 'draft' check (status in ('draft','published','archived')),
  featured      boolean default false,
  views_count   int default 0,
  likes_count   int default 0,
  read_time     text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.blog_posts enable row level security;
create policy "Published posts public read" on public.blog_posts for select using (status = 'published');

-- ── Ad Campaigns ────────────────────────────────────────────────────────────
create table if not exists public.ad_campaigns (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  advertiser    text,
  type          text default 'banner' check (type in ('banner','video','sponsored')),
  budget_usd    numeric(10,2) default 0,
  spent_usd     numeric(10,2) default 0,
  impressions   int default 0,
  clicks        int default 0,
  status        text default 'pending' check (status in ('active','paused','pending','ended')),
  placement     text,
  image_url     text,
  start_date    date,
  end_date      date,
  created_at    timestamptz default now()
);

alter table public.ad_campaigns enable row level security;

-- ── User Reports ────────────────────────────────────────────────────────────
create table if not exists public.user_reports (
  id              uuid primary key default uuid_generate_v4(),
  reporter_id     uuid references auth.users(id) on delete set null,
  reported_user_id uuid references auth.users(id) on delete set null,
  reason          text not null,
  details         text,
  status          text default 'pending' check (status in ('pending','reviewed','dismissed','actioned')),
  admin_notes     text,
  created_at      timestamptz default now()
);

alter table public.user_reports enable row level security;
create policy "Users create reports" on public.user_reports for insert with check (auth.uid() = reporter_id);
create policy "Users read own reports" on public.user_reports for select using (auth.uid() = reporter_id);

-- ── User Blocks ─────────────────────────────────────────────────────────────
create table if not exists public.user_blocks (
  id              uuid primary key default uuid_generate_v4(),
  blocker_id      uuid references auth.users(id) on delete cascade,
  blocked_user_id uuid references auth.users(id) on delete cascade,
  created_at      timestamptz default now(),
  unique(blocker_id, blocked_user_id)
);

alter table public.user_blocks enable row level security;
create policy "Users manage own blocks" on public.user_blocks
  using (auth.uid() = blocker_id) with check (auth.uid() = blocker_id);

-- ── Invoices ────────────────────────────────────────────────────────────────
create table if not exists public.invoices (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users(id) on delete cascade,
  plan          text not null,
  amount_usd    numeric(10,2),
  currency      text default 'USD',
  payment_method text,
  transaction_id text,
  status        text default 'pending' check (status in ('pending','paid','failed','refunded')),
  issued_at     timestamptz default now(),
  paid_at       timestamptz
);

alter table public.invoices enable row level security;
create policy "Users read own invoices" on public.invoices for select using (auth.uid() = user_id);

-- ── Video Calls ──────────────────────────────────────────────────────────────
create table if not exists public.video_calls (
  id            uuid primary key default uuid_generate_v4(),
  caller_id     uuid references auth.users(id),
  callee_id     uuid references auth.users(id),
  jitsi_room    text not null,
  status        text default 'ringing' check (status in ('ringing','active','ended','missed')),
  started_at    timestamptz,
  ended_at      timestamptz,
  duration_sec  int,
  created_at    timestamptz default now()
);

alter table public.video_calls enable row level security;
create policy "Participants view calls" on public.video_calls
  for select using (auth.uid() = caller_id or auth.uid() = callee_id);

-- ── Anonymous Chats ──────────────────────────────────────────────────────────
create table if not exists public.anonymous_chats (
  id            uuid primary key default uuid_generate_v4(),
  session_token text unique not null default gen_random_uuid()::text,
  user_id       uuid references auth.users(id),
  matched_with  uuid references auth.users(id),
  status        text default 'active' check (status in ('active','ended')),
  created_at    timestamptz default now()
);

alter table public.anonymous_chats enable row level security;

-- ── Push Notifications ───────────────────────────────────────────────────────
create table if not exists public.push_notifications (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users(id) on delete cascade,
  title         text not null,
  body          text,
  data          jsonb,
  sent          boolean default false,
  read          boolean default false,
  created_at    timestamptz default now()
);

alter table public.push_notifications enable row level security;
create policy "Users read own notifications" on public.push_notifications
  for select using (auth.uid() = user_id);

-- ── Storage Bucket (run once) ─────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('user-uploads', 'user-uploads', true)
on conflict (id) do nothing;

create policy "Authenticated users upload" on storage.objects
  for insert with check (bucket_id = 'user-uploads' and auth.role() = 'authenticated');
create policy "Public read user uploads" on storage.objects
  for select using (bucket_id = 'user-uploads');
