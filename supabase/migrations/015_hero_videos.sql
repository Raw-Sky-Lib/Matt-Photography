-- Add hero background videos (Supabase Storage) to the home page sections
UPDATE pages
SET sections = jsonb_set(
  sections,
  '{hero,videos}',
  '[
    {"video_url": "https://lkjgboiyxxarrapilgqk.supabase.co/storage/v1/object/public/photography/hero/soul-over-body.mp4", "label": "SOUL OVER BODY"},
    {"video_url": "https://lkjgboiyxxarrapilgqk.supabase.co/storage/v1/object/public/photography/hero/der-hirt.mp4", "label": "DER HIRT"},
    {"video_url": "https://lkjgboiyxxarrapilgqk.supabase.co/storage/v1/object/public/photography/hero/interior-eclectics.mp4", "label": "INTERIOR ECLECTICS"},
    {"video_url": "https://lkjgboiyxxarrapilgqk.supabase.co/storage/v1/object/public/photography/hero/nineteen.mp4", "label": "NINETEEN"}
  ]'::jsonb,
  true
)
WHERE slug = 'home';
