-- ============================================================
-- Bluesky Study Abroad — Course Finder Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. UNIVERSITIES TABLE
CREATE TABLE universities (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name            TEXT NOT NULL,
  country         TEXT NOT NULL,
  city            TEXT NOT NULL,
  status          TEXT CHECK (status IN ('partner', 'verified')) NOT NULL,
  logo_url        TEXT,
  world_ranking   INTEGER,
  website         TEXT,
  last_verified   DATE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROGRAMMES TABLE
CREATE TABLE programmes (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  university_id         UUID REFERENCES universities(id) ON DELETE CASCADE,
  name                  TEXT NOT NULL,
  level                 TEXT CHECK (level IN ('foundation', 'bachelor', 'master', 'mba', 'phd', 'diploma')) NOT NULL,
  field_of_study        TEXT NOT NULL,
  duration              TEXT,
  tuition_fee_amount    DECIMAL(10,2),
  tuition_fee_currency  TEXT DEFAULT 'GBP',
  tuition_fee_per       TEXT DEFAULT 'year',
  entry_requirements    TEXT,
  ielts_score           DECIMAL(3,1),
  toefl_score           INTEGER,
  intake_dates          TEXT[],
  application_deadline  TEXT,
  application_fee       DECIMAL(10,2),
  scholarship           BOOLEAN DEFAULT FALSE,
  scholarship_type      TEXT,
  programme_link        TEXT,
  gap_year_accepted     TEXT DEFAULT 'not_stated',
  last_verified         DATE,
  verified_source       TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- 3. LEADS / CRM TABLE
CREATE TABLE leads (
  id                     UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name           TEXT NOT NULL,
  phone                  TEXT,
  email                  TEXT NOT NULL,
  course_interest        TEXT,
  university_interest    TEXT,
  grades                 TEXT,
  test_scores            TEXT,
  budget_range           TEXT,
  destination_preference TEXT,
  status                 TEXT DEFAULT 'new',
  created_at             TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES for fast search/filter queries
-- ============================================================
CREATE INDEX idx_universities_country  ON universities(country);
CREATE INDEX idx_universities_status   ON universities(status);
CREATE INDEX idx_programmes_level      ON programmes(level);
CREATE INDEX idx_programmes_field      ON programmes(field_of_study);
CREATE INDEX idx_programmes_uni        ON programmes(university_id);

-- ============================================================
-- ROW LEVEL SECURITY (public read, no public write)
-- ============================================================
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE programmes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads        ENABLE ROW LEVEL SECURITY;

-- Anyone can read universities and programmes
CREATE POLICY "Public read universities" ON universities FOR SELECT USING (true);
CREATE POLICY "Public read programmes"   ON programmes   FOR SELECT USING (true);

-- Anyone can insert a lead (enquiry form), but cannot read others' leads
CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true);

-- ============================================================
-- SAMPLE DATA — 3 Partner universities + 2 Verified Listings
-- Delete after you populate from real data
-- ============================================================
INSERT INTO universities (name, country, city, status, world_ranking, website, last_verified) VALUES
  ('Nottingham Trent University', 'United Kingdom', 'Nottingham', 'partner', 801, 'https://www.ntu.ac.uk', CURRENT_DATE),
  ('Queen''s University Belfast',  'United Kingdom', 'Belfast',    'partner', 601, 'https://www.qub.ac.uk', CURRENT_DATE),
  ('Trinity College Dublin',       'Ireland',        'Dublin',     'partner', 164, 'https://www.tcd.ie',   CURRENT_DATE),
  ('University of Oxford',         'United Kingdom', 'Oxford',     'verified',  4, 'https://www.ox.ac.uk', CURRENT_DATE),
  ('University of Toronto',        'Canada',         'Toronto',    'verified', 21, 'https://www.utoronto.ca', CURRENT_DATE);
