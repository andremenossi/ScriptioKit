-- Create the 'templates' table
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  is_premium BOOLEAN DEFAULT FALSE,
  file_path TEXT, -- Path to the file in Supabase Storage or public URL for free templates
  gumroad_link TEXT, -- Link to Gumroad product for premium templates
  icon VARCHAR(50) -- Name of Lucide React icon (e.g., 'FileText', 'Lock')
);

-- Create the 'purchases' table
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  template_id UUID NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  FOREIGN KEY (template_id) REFERENCES public.templates(id) ON DELETE CASCADE
);

-- Enable Row Level Security (RLS) for 'templates' and 'purchases'
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Policies for 'templates' table
-- Allow public read access to all users
DROP POLICY IF EXISTS "Enable read access for all users" ON public.templates;
CREATE POLICY "Enable read access for all users" ON public.templates
  FOR SELECT USING (TRUE);

-- Policies for 'purchases' table
-- Allow users to read their own purchases
DROP POLICY IF EXISTS "Enable read access for authenticated users on their own purchases" ON public.purchases;
CREATE POLICY "Enable read access for authenticated users on their own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Allow authenticated users to insert purchases (e.g., after a Gumroad webhook)
-- This policy might need to be more restrictive in a real-world scenario,
-- possibly tied to a server-side function or webhook.
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.purchases;
CREATE POLICY "Enable insert for authenticated users" ON public.purchases
  FOR INSERT WITH CHECK (auth.uid() = user_id);
