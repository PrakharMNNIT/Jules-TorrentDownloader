-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Public user data)
create table profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  xp integer default 0,
  streak integer default 0,
  level integer default 1,
  bio_mood integer default 80,       -- 0-100
  bio_energy integer default 80,     -- 0-100
  bio_confidence integer default 80, -- 0-100
  updated_at timestamp with time zone,

  constraint username_length check (char_length(username) >= 3)
);

-- MISSIONS (High level operations)
create table missions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  title text not null,
  description text,
  status text check (status in ('active', 'completed', 'archived')) default 'active',
  progress integer default 0,
  created_at timestamp with time zone default now()
);

-- PHASES (Stages within a mission)
create table phases (
  id uuid default uuid_generate_v4() primary key,
  mission_id uuid references missions(id) on delete cascade not null,
  title text not null,
  status text check (status in ('locked', 'active', 'completed')) default 'locked',
  order_index integer not null,
  progress integer default 0
);

-- TASKS (Weekly Battle Plan items)
create table tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  phase_id uuid references phases(id), -- Optional link to phase
  title text not null,
  description text,
  status text check (status in ('pending', 'in_progress', 'completed')) default 'pending',
  is_critical boolean default false,
  tags text[],
  created_at timestamp with time zone default now()
);

-- DAILY LOGS (Black Box Data)
create table daily_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  entry_date date default current_date,
  content text,
  type text check (type in ('mission_win', 'struggle', 'learning')),
  created_at timestamp with time zone default now()
);

-- RLS POLICIES (Security)
alter table profiles enable row level security;
alter table missions enable row level security;
alter table phases enable row level security;
alter table tasks enable row level security;
alter table daily_logs enable row level security;

-- Profiles: Public read, Self update
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Missions: Self only
create policy "Users can manage own missions." on missions
  for all using (auth.uid() = user_id);

-- Phases: Self only (via Mission)
create policy "Users can manage phases of own missions." on phases
  for all using (
    exists (
      select 1 from missions
      where missions.id = phases.mission_id
      and missions.user_id = auth.uid()
    )
  );

-- Tasks: Self only
create policy "Users can manage own tasks." on tasks
  for all using (auth.uid() = user_id);

-- Logs: Self only
create policy "Users can manage own logs." on daily_logs
  for all using (auth.uid() = user_id);
