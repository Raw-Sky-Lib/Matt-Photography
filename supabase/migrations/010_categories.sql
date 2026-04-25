CREATE TABLE categories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  description     TEXT,
  cover_image_url TEXT,
  display_order   INT NOT NULL DEFAULT 0,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

INSERT INTO categories (name, slug, display_order) VALUES
  ('Portrait',   'portrait',   1),
  ('Editorial',  'editorial',  2),
  ('Commercial', 'commercial', 3),
  ('Personal',   'personal',   4);
