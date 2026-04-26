-- Add hero background videos to the home page sections
UPDATE pages
SET sections = jsonb_set(
  sections,
  '{hero,videos}',
  '[
    {"video_id": "h07MZ3GiEhI", "label": "SOUL OVER BODY"},
    {"video_id": "NetQR7u816w", "label": "DIR HIRT"},
    {"video_id": "dEGWKO6wHVw", "label": "INTERIOR ECLECTICS"},
    {"video_id": "LXfE3SU2-sU", "label": "NINETEEN"}
  ]'::jsonb,
  true
)
WHERE slug = 'home';
