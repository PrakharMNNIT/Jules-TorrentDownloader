
-- PROFILES: Gamification & User Stats
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  username TEXT UNIQUE,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_count INTEGER DEFAULT 0,
  last_active_date DATE DEFAULT CURRENT_DATE,
  bio_mood INTEGER DEFAULT 50, -- 0-100
  bio_energy INTEGER DEFAULT 50, -- 0-100
  bio_confidence INTEGER DEFAULT 50, -- 0-100
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- PROJECTS: Hierarchical structure (Project -> Subproject)
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  parent_id UUID REFERENCES projects(id), -- Null if root project
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'completed')),
  properties JSONB DEFAULT '{}'::jsonb, -- Flexible attributes (Notion-like)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TASKS: Enhanced attributes
CREATE TABLE tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  project_id UUID REFERENCES projects(id), -- Optional: Tasks can belong to a project
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  energy_level TEXT DEFAULT 'medium' CHECK (energy_level IN ('low', 'medium', 'high')),
  estimated_time INTEGER DEFAULT 30, -- In minutes
  due_date TIMESTAMP WITH TIME ZONE,
  properties JSONB DEFAULT '{}'::jsonb, -- Custom fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TASK DEPENDENCIES: Adjacency List for Dependency Graph
CREATE TABLE task_dependencies (
  blocker_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  blocked_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (blocker_id, blocked_id)
);

-- PHASES: Existing structure (keeping for backward compatibility/Roadmap view)
CREATE TABLE phases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'locked' CHECK (status IN ('locked', 'active', 'completed')),
  progress INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
