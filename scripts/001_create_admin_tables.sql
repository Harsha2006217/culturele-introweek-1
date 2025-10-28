-- Create admin profiles table
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Admin policies
CREATE POLICY "Admins can view their own profile"
  ON public.admin_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can update their own profile"
  ON public.admin_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create content management table for editable texts
CREATE TABLE IF NOT EXISTS public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  section TEXT NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read content
CREATE POLICY "Anyone can view content"
  ON public.site_content FOR SELECT
  USING (true);

-- Only admins can update content
CREATE POLICY "Admins can update content"
  ON public.site_content FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.admin_profiles));

-- Insert default content
INSERT INTO public.site_content (key, content, section) VALUES
  ('homepage_title', 'Culturele INTROWEEK MBO 2026', 'homepage'),
  ('homepage_subtitle', 'Laat je inspireren door het rijke culturele aanbod van Amsterdam', 'homepage'),
  ('homepage_intro', 'Welkom bij de Culturele INTROWEEK MBO 2026! Van 31 augustus t/m 4 september 2026 (week 36) ontdekken MBO-studenten het rijke culturele aanbod van Amsterdam.', 'homepage'),
  ('contact_email', 'cultureleintroweek@rocva.nl', 'contact'),
  ('registration_deadline', '1 maart 2026', 'general')
ON CONFLICT (key) DO NOTHING;

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
