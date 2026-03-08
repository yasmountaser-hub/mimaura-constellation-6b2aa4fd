-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'Anonymous',
  avatar_emoji TEXT NOT NULL DEFAULT '🌸',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, avatar_emoji)
  VALUES (NEW.id, 'Anonymous', '🌸');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create community experiences table
CREATE TABLE public.community_experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  glossary_term TEXT NOT NULL,
  body TEXT NOT NULL,
  upvotes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.community_experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Experiences are viewable by everyone"
  ON public.community_experiences FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create experiences"
  ON public.community_experiences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own experiences"
  ON public.community_experiences FOR DELETE
  USING (auth.uid() = user_id);

-- Create upvotes table
CREATE TABLE public.experience_upvotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  experience_id UUID NOT NULL REFERENCES public.community_experiences(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, experience_id)
);

ALTER TABLE public.experience_upvotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Upvotes are viewable by everyone"
  ON public.experience_upvotes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can upvote"
  ON public.experience_upvotes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own upvote"
  ON public.experience_upvotes FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update upvote count
CREATE OR REPLACE FUNCTION public.update_experience_upvotes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_experiences SET upvotes = upvotes + 1 WHERE id = NEW.experience_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_experiences SET upvotes = upvotes - 1 WHERE id = OLD.experience_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_upvote_change
  AFTER INSERT OR DELETE ON public.experience_upvotes
  FOR EACH ROW EXECUTE FUNCTION public.update_experience_upvotes();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes
CREATE INDEX idx_experiences_term ON public.community_experiences(glossary_term);
CREATE INDEX idx_experiences_user ON public.community_experiences(user_id);
CREATE INDEX idx_upvotes_experience ON public.experience_upvotes(experience_id);
CREATE INDEX idx_upvotes_user ON public.experience_upvotes(user_id);