CREATE TABLE gallery_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT,
  alt_text      TEXT NOT NULL,
  image_url     TEXT NOT NULL,
  category_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
  project_id    UUID, -- FK to projects added in 013 after projects table exists
  is_featured   BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  width         INT,
  height        INT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX gallery_images_category_idx ON gallery_images (category_id);
CREATE INDEX gallery_images_featured_idx ON gallery_images (is_featured);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
