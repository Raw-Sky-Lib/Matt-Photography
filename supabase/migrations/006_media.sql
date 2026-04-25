CREATE TABLE media (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename   TEXT NOT NULL,
  url        TEXT NOT NULL,
  mime_type  TEXT,
  size       INT,
  alt_text   TEXT,
  bucket     TEXT NOT NULL DEFAULT 'photography',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;
