-- Migration 017 incorrectly applied the "DER HIRT WINERY" label to index 1
-- (interior-eclectics.mp4) instead of index 3 (der-hirt.mp4).
-- Restore index 1 to its correct label and fix index 3.

UPDATE pages
SET sections = jsonb_set(
  jsonb_set(sections, '{hero,videos,1,label}', '"INTERIOR ECLECTICS"'),
  '{hero,videos,3,label}', '"DER HIRT WINERY"'
)
WHERE slug = 'home';
