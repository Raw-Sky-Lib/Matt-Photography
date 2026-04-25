CREATE TABLE project_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url     TEXT NOT NULL,
  alt_text      TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  width         INT,
  height        INT
);

CREATE INDEX project_images_project_idx ON project_images (project_id);

ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- Add deferred FK from gallery_images to projects (created in 012)
ALTER TABLE gallery_images
  ADD CONSTRAINT gallery_images_project_id_fkey
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL;
