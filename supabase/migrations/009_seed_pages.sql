-- Home page — full landing page sections
INSERT INTO pages (slug, title, sections, is_published) VALUES (
  'home',
  'Home',
  '{
    "hero": {
      "portfolio_label": "/ PORTFOLIO — VOLUME 01",
      "subheadline": "Portrait and editorial photographer based in London. Quiet, honest work for brands, cultural institutions, and the people behind them.",
      "cta_label": "View the work",
      "cta_url": "/projects",
      "secondary_cta_label": "Start a project",
      "secondary_cta_url": "/contact",
      "background_image_url": null
    },
    "client_marquee": {
      "clients": ["National Portrait Gallery", "Condé Nast", "The Guardian", "Vogue", "British Journal of Photography", "Magnum Photos", "Dazed", "British Council", "Tate"]
    },
    "intro": {
      "line1": "I photograph",
      "line2": "people, places,",
      "line3": "and the quiet moments",
      "line4": "between them.",
      "body_left": "My work sits at the intersection of documentary and commercial. I shoot in natural light, in plain rooms, on borrowed streets. The result is considered rather than staged — the kind of frame you''d recognise but couldn''t quite describe.",
      "body_right": "For the past decade I''ve worked with agencies, mid-sized brands, and cultural institutions. I work alone on small jobs, and assemble a trusted freelance crew on larger ones."
    },
    "featured_spread": {
      "index_label": "FEATURED — (01 / 06)",
      "date_label": "LONDON · 2025",
      "kind": "Photography · Documentary",
      "headline": "The Quiet Watch.",
      "body": "A three-day commission shot on 35mm in natural light across three districts of London. Portraits of volunteers and the people they meet.",
      "frames_label": "14 frames\nselected",
      "cta_label": "Read the story"
    },
    "featured_work": {
      "headline": "Projects.",
      "subheadline": "Selected work — index"
    },
    "services": {
      "headline": "What I do.",
      "subheadline": "Four ways of working together. Most projects start with a conversation and settle into a shape from there. If you''re not sure which fits, write to me — we''ll figure it out.",
      "items": [
        { "title": "Brand films",      "blurb": "Short cinematic pieces that say what an ad cannot. Concept, direction, shoot, edit." },
        { "title": "Photography",      "blurb": "Portraits, lifestyle, architecture. Considered, not staged. Natural light, quiet rooms." },
        { "title": "Video production", "blurb": "End-to-end production with a trusted freelance crew. Planning, shoot days, post, delivery." },
        { "title": "Social content",   "blurb": "Short-form video and images built to travel. Lean crews, fast turnarounds, native formats." }
      ],
      "footer_note": "Rates on request · English spoken",
      "cta_label": "See full services"
    },
    "approach": {
      "headline": "A small, quiet process.",
      "subheadline": "Most of my projects run in four steps. No account managers, no creative theatre — just the shortest path between your brief and finished frames.",
      "steps": [
        { "title": "Brief",   "blurb": "A short call or email. What, who, when, why. No deck required." },
        { "title": "Plan",    "blurb": "I write back with an approach, a day-rate or project quote, and a proposed shoot window." },
        { "title": "Shoot",   "blurb": "One day or several. I work in natural light where I can, and in small crews when I can''t." },
        { "title": "Deliver", "blurb": "A shared folder of selects within a week. Final grade and edit to your spec." }
      ]
    },
    "spread": {
      "plate_label": "/ Plate 07 — B-side",
      "headline": "A frame is what gets left out.",
      "meta": "35mm · NATURAL LIGHT\nLONDON, EAST END\nMARCH 2025",
      "image_url": null
    },
    "testimonials": {
      "headline": "From the desk of",
      "items": [
        { "quote": "Calm, reflective, and reserved. He knows his craft.",         "author": "Creative Director", "role": "Condé Nast",               "avatar_url": null },
        { "quote": "Matt delivered a film that outperformed the brief, quietly.", "author": "Brand Lead",         "role": "National Portrait Gallery", "avatar_url": null },
        { "quote": "Exacting on set, generous in edit. Rare combination.",        "author": "Art Director",       "role": "The Guardian",             "avatar_url": null }
      ]
    },
    "info_grid": {
      "items": [
        { "label": "Based",   "value": "London, UK" },
        { "label": "Working", "value": "Across Europe" },
        { "label": "Formats", "value": "Photography · Video" },
        { "label": "Since",   "value": "2015 — 10 years" }
      ]
    },
    "cta": {
      "headline": "Have a project in mind?",
      "subheadline": "Let''s discuss and plan your next project together. No strings attached, no obligation to move forward. Most replies land within a working day.",
      "button_label": "Start a conversation",
      "button_url": "/contact",
      "secondary_button_label": "See more work",
      "secondary_button_url": "/projects",
      "email": "hello@mattbanton.com",
      "phone": "+44 7700 900000"
    }
  }'::jsonb,
  true
);

-- About page
INSERT INTO pages (slug, title, sections, is_published) VALUES (
  'about',
  'About',
  '{
    "hero": {
      "headline": "The eye behind the lens.",
      "portrait_image_url": null
    },
    "bio": {
      "body": "<p>Matt Banton is a portrait and editorial photographer based in London. For over a decade, he has worked with creative directors, art editors, and independent clients to make images that resist the ordinary. His approach is built on two things: patience and presence. The best photographs aren''t taken — they''re waited for.</p>"
    },
    "philosophy": {
      "headline": "How I work.",
      "body": "Every shoot begins with a conversation. Before I know what I''m going to photograph, I want to understand what you''re trying to say. That conversation shapes everything — the light, the pace, the edit. The result should feel inevitable, not accidental."
    },
    "cta": {
      "headline": "Ready to work together?",
      "subheadline": "Portrait, editorial, or commercial — I''d love to hear about your project.",
      "button_label": "Get in touch",
      "button_url": "/contact"
    }
  }'::jsonb,
  true
);

-- Contact page
INSERT INTO pages (slug, title, sections, is_published) VALUES (
  'contact',
  'Contact',
  '{
    "hero": {
      "headline": "Get in touch.",
      "subheadline": "Tell me about your project. I respond to all enquiries within 48 hours."
    }
  }'::jsonb,
  true
);
