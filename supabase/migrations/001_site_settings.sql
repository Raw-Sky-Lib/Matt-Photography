CREATE TABLE site_settings (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name             TEXT NOT NULL,
  tagline               TEXT,
  tagline_meta          TEXT,
  booking_status        TEXT,
  seo_title             TEXT,
  seo_description       TEXT,
  logo_url              TEXT,
  og_image_url          TEXT,
  contact_email         TEXT,
  contact_phone         TEXT,
  location              TEXT,
  coverage              TEXT,
  social_instagram      TEXT,
  social_vimeo          TEXT,
  social_twitter        TEXT,
  social_facebook       TEXT,
  analytics_id          TEXT,
  contact_project_types JSONB,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

INSERT INTO site_settings (
  site_name, tagline, tagline_meta, booking_status,
  seo_title, seo_description,
  contact_email, contact_phone,
  location, coverage,
  contact_project_types
) VALUES (
  'Matt Banton',
  'Portrait & Editorial Photography',
  'PHOTO & VIDEO · EST. 2015',
  '2026 — open',
  'Matt Banton — Portrait & Editorial Photographer',
  'Portrait and editorial photographer based in London. Available for commissions worldwide.',
  'hello@mattbanton.com',
  '+44 7700 900000',
  'London, UK',
  'Europe',
  '["Portrait Session", "Editorial", "Commercial / Brand", "Other"]'::jsonb
);
