-- =====================================================
-- SCRIPT PARA CONFIGURAR SUPABASE (Ejecutar en SQL Editor)
-- =====================================================

-- 1. Agregar columnas de usuario a forum_posts
ALTER TABLE forum_posts ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE forum_posts ADD COLUMN IF NOT EXISTS user_email TEXT;
ALTER TABLE forum_posts ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT false;

-- 2. Crear tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'Estudiante',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Crear tabla de materiales compartidos (reemplaza localStorage)
CREATE TABLE IF NOT EXISTS shared_materials (
  id TEXT PRIMARY KEY,
  subject_id TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  file_size TEXT DEFAULT '',
  downloads INTEGER DEFAULT 0,
  link TEXT DEFAULT '#',
  timestamp TEXT DEFAULT '',
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Crear tabla de fuentes RSS (configurables desde admin)
CREATE TABLE IF NOT EXISTS rss_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  section TEXT DEFAULT 'Noticias',
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Seed: fuentes RSS iniciales
INSERT INTO rss_sources (name, url, section) VALUES
  ('Infocampo', 'https://www.infocampo.com.ar/feed/', 'Noticias'),
  ('Bichos de Campo', 'https://bichosdecampo.com/feed/', 'Noticias'),
  ('TodoAgro', 'https://www.todoagro.com.ar/rss-feed-de-noticias/', 'Noticias'),
  ('Campo News', 'https://camponews.com.ar/feed/', 'Noticias'),
  ('LA NACION', 'https://www.lanacion.com.ar/arc/outboundfeeds/rss/category/economia/campo/', 'Economía'),
  ('Agritotal', 'https://www.agritotal.com/rss', 'Economía'),
  ('Agroecología en Red', 'https://agroecologia.net.ar/feed/', 'Agroecología'),
  ('INTA', 'https://inta.gob.ar/rss.xml', 'Investigación'),
  ('FAO', 'https://www.fao.org/feeds/fao-newsroom-rss', 'Investigación')
ON CONFLICT (url) DO NOTHING;

-- 6. Seed: materiales iniciales
INSERT INTO shared_materials (id, subject_id, title, category, author, file_size, downloads, link, timestamp) VALUES
  ('mat-f1', 'edafologia-suelos', 'Guía de Determinación de Humedad del Suelo por Gravimetría', 'Guía Práctica', 'Cátedra de Edafología', '1.2 MB', 145, '#', '15 May 2026'),
  ('mat-f2', 'edafologia-suelos', 'Apunte Teoría de Coloides y Capacidad de Intercambio Catiónico (CIC)', 'Apunte', 'Santiago Rossi', '3.4 MB', 210, '#', '12 Jun 2026'),
  ('mat-f3', 'climatologia-fenologia', 'Recopilación de Efemérides de Heladas en Hurlingham (2010-2025)', 'Resumen', 'Ing. Climatología', '850 KB', 98, '#', '02 Jun 2026'),
  ('mat-f4', 'quimica-general', 'Modelo de examen libre y respuestas - Química General', 'Examen', 'Matias G.', '2.1 MB', 320, '#', '28 May 2026'),
  ('mat-f5', 'manejo-adversidades', 'Ficha Técnica: Manejo Agroecológico de Malezas en el Cinturón Hortícola', 'Guía Práctica', 'Programa Extensión UNAHUR', '4.8 MB', 184, '#', '20 Jun 2026')
ON CONFLICT (id) DO NOTHING;

-- 7. Habilitar Row Level Security en forum_posts
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE rss_sources ENABLE ROW LEVEL SECURITY;

-- 8. Políticas para forum_posts
CREATE POLICY "Anyone can read forum_posts"
  ON forum_posts FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own posts"
  ON forum_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON forum_posts FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'admin'));

CREATE POLICY "Users can delete own posts"
  ON forum_posts FOR DELETE
  USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'admin'));

-- 9. Políticas para user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read profiles"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- 10. Políticas para shared_materials
CREATE POLICY "Anyone can read materials"
  ON shared_materials FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert materials"
  ON shared_materials FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete any material"
  ON shared_materials FOR DELETE
  USING (auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'admin'));

CREATE POLICY "Users can delete own materials"
  ON shared_materials FOR DELETE
  USING (auth.uid() = user_id);

-- 11. Políticas para rss_sources (solo admins pueden modificar)
CREATE POLICY "Anyone can read rss sources"
  ON rss_sources FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert rss sources"
  ON rss_sources FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'admin'));

CREATE POLICY "Admins can update rss sources"
  ON rss_sources FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'admin'));

CREATE POLICY "Admins can delete rss sources"
  ON rss_sources FOR DELETE
  USING (auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'admin'));

-- 12. Función para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'Usuario'),
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- 13. Trigger: al crear usuario en auth.users -> crear perfil
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
