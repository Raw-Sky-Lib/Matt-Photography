UPDATE pages
SET sections = jsonb_set(
  sections,
  '{testimonials}',
  '{
    "headline": "What clients say",
    "items": [
      {
        "quote": "I can only recommend Matt, working with him is simply perfect every time. His calm, reflective and reserved manner is very pleasant and he knows his craft. When taking photos and videos, only work with him as a partner. He is completely professional and has the necessary passion.",
        "author": "Markus Bauer",
        "role": "Co Founder — Design You",
        "avatar_url": null
      },
      {
        "quote": "Excellent location scout and photographer. It was an utmost pleasure working together. I can only say, I was blown away by both quality and also the great composition and backgrounds. This gives us a lot to work with and is really a treasure. We have already used the photos on our website, in newsletters, LinkedIn posts and presentations. Many thanks for the great pictures!",
        "author": "Roman Fleischhackl",
        "role": "Co Founder — Akademie 120:80",
        "avatar_url": null
      }
    ]
  }'::jsonb
)
WHERE slug = 'home';
