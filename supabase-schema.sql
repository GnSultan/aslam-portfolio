-- Create projects table
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  category TEXT NOT NULL CHECK (category IN ('web', 'mobile', 'branding', 'ui-ux', 'other')),
  tags JSONB DEFAULT '[]'::jsonb,
  technologies JSONB DEFAULT '[]'::jsonb,
  year INTEGER NOT NULL,
  client TEXT,
  role TEXT NOT NULL,
  duration TEXT,
  status TEXT NOT NULL CHECK (status IN ('completed', 'in-progress', 'concept')),
  featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  live_url TEXT,
  github_url TEXT,
  behance_url TEXT,
  website_embed TEXT,

  -- Modern client-friendly fields
  challenge TEXT,
  approach_bullets JSONB DEFAULT '[]'::jsonb,
  value_delivered JSONB DEFAULT '[]'::jsonb,
  testimonial JSONB,
  relevance_note TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_year ON projects(year);
CREATE INDEX idx_projects_order ON projects("order");

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT
  USING (true);

-- Create policy to allow all operations (you can restrict this later)
CREATE POLICY "Allow all operations" ON projects
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
