-- ── Add video cover fields to projects ───────────────────────
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS cover_video_url TEXT,
  ADD COLUMN IF NOT EXISTS is_video_cover  BOOLEAN NOT NULL DEFAULT false;

-- ── Evolve project_images to support mixed media ──────────────
ALTER TABLE project_images
  ADD COLUMN IF NOT EXISTS media_type TEXT NOT NULL DEFAULT 'image',
  ADD COLUMN IF NOT EXISTS video_url  TEXT,
  ADD COLUMN IF NOT EXISTS span_full  BOOLEAN NOT NULL DEFAULT false;

-- image_url is now optional (video rows won't have one)
ALTER TABLE project_images ALTER COLUMN image_url DROP NOT NULL;

-- ── Fix project name ──────────────────────────────────────────
UPDATE projects
SET title = 'Der Hirt Winery',
    slug  = 'der-hirt-winery'
WHERE slug = 'der-hirt';

-- ── Tag video cover projects ──────────────────────────────────
UPDATE projects SET is_video_cover = true, cover_video_url = 'h07MZ3GiEhI' WHERE slug = 'soul-over-body';
UPDATE projects SET is_video_cover = true, cover_video_url = 'NetQR7u816w' WHERE slug = 'der-hirt-winery';
UPDATE projects SET is_video_cover = true, cover_video_url = 'dEGWKO6wHVw' WHERE slug = 'interior-eclectics';
UPDATE projects SET is_video_cover = true, cover_video_url = 'LXfE3SU2-sU' WHERE slug = 'nineteen';

-- ── Fix home page hero label ──────────────────────────────────
UPDATE pages
SET sections = jsonb_set(sections, '{hero,videos,1,label}', '"DER HIRT WINERY"')
WHERE slug = 'home';
