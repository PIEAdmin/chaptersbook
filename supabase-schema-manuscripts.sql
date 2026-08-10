-- ============================================================
-- Manuscript to Market — Supabase Schema
-- Run in Supabase SQL Editor after the base schema
-- ============================================================

-- Manuscripts table (one row per uploaded book)
CREATE TABLE IF NOT EXISTS manuscripts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  author_name     TEXT,
  status          TEXT NOT NULL DEFAULT 'uploaded',
  -- status values: uploaded | diagnosing | polishing | compiling | metadata | complete | error
  tone_dna        JSONB,
  total_chapters  INTEGER NOT NULL DEFAULT 0,
  polished_count  INTEGER NOT NULL DEFAULT 0,
  final_markdown  TEXT,
  kdp_metadata    JSONB,
  error_message   TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Individual chapters (one row per chapter)
CREATE TABLE IF NOT EXISTS manuscript_chapters (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id   UUID NOT NULL REFERENCES manuscripts(id) ON DELETE CASCADE,
  chapter_number  INTEGER NOT NULL,
  chapter_title   TEXT,
  raw_text        TEXT NOT NULL,
  polished_text   TEXT,
  word_count      INTEGER,
  status          TEXT NOT NULL DEFAULT 'pending',
  -- status values: pending | polishing | complete | error
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(manuscript_id, chapter_number)
);

-- Auto-update updated_at on manuscripts
CREATE OR REPLACE FUNCTION update_manuscripts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS manuscripts_updated_at ON manuscripts;
CREATE TRIGGER manuscripts_updated_at
  BEFORE UPDATE ON manuscripts
  FOR EACH ROW EXECUTE FUNCTION update_manuscripts_updated_at();

-- ========================
-- Row Level Security
-- ========================
ALTER TABLE manuscripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE manuscript_chapters ENABLE ROW LEVEL SECURITY;

-- Manuscripts: users own their rows
CREATE POLICY "manuscripts_select" ON manuscripts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "manuscripts_insert" ON manuscripts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "manuscripts_update" ON manuscripts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "manuscripts_delete" ON manuscripts FOR DELETE USING (auth.uid() = user_id);

-- Chapters: access via parent manuscript ownership
CREATE POLICY "chapters_select" ON manuscript_chapters FOR SELECT USING (
  EXISTS (SELECT 1 FROM manuscripts m WHERE m.id = manuscript_id AND m.user_id = auth.uid())
);
CREATE POLICY "chapters_insert" ON manuscript_chapters FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM manuscripts m WHERE m.id = manuscript_id AND m.user_id = auth.uid())
);
CREATE POLICY "chapters_update" ON manuscript_chapters FOR UPDATE USING (
  EXISTS (SELECT 1 FROM manuscripts m WHERE m.id = manuscript_id AND m.user_id = auth.uid())
);
CREATE POLICY "chapters_delete" ON manuscript_chapters FOR DELETE USING (
  EXISTS (SELECT 1 FROM manuscripts m WHERE m.id = manuscript_id AND m.user_id = auth.uid())
);
