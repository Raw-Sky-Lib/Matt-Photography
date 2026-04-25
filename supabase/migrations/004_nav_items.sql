CREATE TABLE nav_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label         TEXT NOT NULL,
  url           TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_external   BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE nav_items ENABLE ROW LEVEL SECURITY;

INSERT INTO nav_items (label, url, display_order) VALUES
  ('Home',     '/',          1),
  ('Projects', '/projects',  2),
  ('Gallery',  '/gallery',   3),
  ('About',    '/about',     4),
  ('Journal',  '/journal',   5),
  ('Contact',  '/contact',   6);
