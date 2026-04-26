-- ============================================================
-- Matt Banton Photography — Full Schema + Seed
-- ============================================================


-- ── 001: site_settings ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
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
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 002: pages ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT,
  sections     JSONB NOT NULL DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 003: posts ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  excerpt         TEXT,
  content         TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  author_name     TEXT,
  is_published    BOOLEAN NOT NULL DEFAULT false,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 004: nav_items ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS nav_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label         TEXT NOT NULL,
  url           TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_external   BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 005: form_submissions ────────────────────────────────────
CREATE TABLE IF NOT EXISTS form_submissions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  project_type TEXT,
  message      TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 006: media ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS media (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url        TEXT NOT NULL,
  alt_text   TEXT,
  file_name  TEXT,
  file_size  INT,
  mime_type  TEXT,
  width      INT,
  height     INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 007: RLS — base tables ───────────────────────────────────
ALTER TABLE site_settings   ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages            ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts            ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_items        ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE media            ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_read"   ON site_settings   FOR SELECT TO anon USING (true);
CREATE POLICY "anon_read"   ON pages           FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "anon_read"   ON posts           FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "anon_read"   ON nav_items       FOR SELECT TO anon USING (true);
CREATE POLICY "anon_read"   ON media           FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert" ON form_submissions FOR INSERT TO anon WITH CHECK (true);


-- ── 010: categories ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  description     TEXT,
  cover_image_url TEXT,
  display_order   INT NOT NULL DEFAULT 0,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 011: gallery_images ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT,
  alt_text      TEXT NOT NULL,
  image_url     TEXT NOT NULL,
  category_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
  project_id    UUID,
  is_featured   BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  width         INT,
  height        INT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS gallery_images_category_idx ON gallery_images(category_id);
CREATE INDEX IF NOT EXISTS gallery_images_featured_idx ON gallery_images(is_featured);

-- ── 012: projects ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  subtitle        TEXT,
  description     TEXT,
  cover_image_url TEXT NOT NULL DEFAULT '',
  category_id     UUID REFERENCES categories(id) ON DELETE SET NULL,
  client_name     TEXT,
  year            INT,
  is_featured     BOOLEAN NOT NULL DEFAULT false,
  is_published    BOOLEAN NOT NULL DEFAULT false,
  display_order   INT NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS projects_category_idx  ON projects(category_id);
CREATE INDEX IF NOT EXISTS projects_published_idx ON projects(is_published);

-- ── 013: project_images ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS project_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url     TEXT NOT NULL,
  alt_text      TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  width         INT,
  height        INT
);
CREATE INDEX IF NOT EXISTS project_images_project_idx ON project_images(project_id);

-- ── 014: RLS — photography tables ───────────────────────────
ALTER TABLE categories     ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects       ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_read_active"    ON categories     FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "anon_read"           ON gallery_images  FOR SELECT TO anon USING (true);
CREATE POLICY "anon_read_published" ON projects        FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "anon_read"           ON project_images  FOR SELECT TO anon USING (true);


-- ============================================================
-- SEED DATA
-- ============================================================

-- ── site_settings ────────────────────────────────────────────
INSERT INTO site_settings (
  site_name, tagline, tagline_meta, booking_status,
  seo_title, seo_description,
  contact_email, location, coverage,
  contact_project_types
) VALUES (
  'Matt Banton',
  'Portrait & Editorial Photography',
  'PORTRAIT & EDITORIAL PHOTOGRAPHY',
  '2026',
  'Matt Banton — Portrait & Editorial Photographer',
  'Portrait and editorial photographer based in Vienna. Available for commissions worldwide.',
  'hello@mattbanton.com',
  'Vienna, Austria',
  null,
  '["Portrait Session", "Editorial", "Commercial / Brand", "Other"]'::jsonb
);

-- ── nav_items ────────────────────────────────────────────────
INSERT INTO nav_items (label, url, display_order, is_external) VALUES
  ('Home',     '/',         1, false),
  ('Projects', '/projects', 2, false),
  ('Gallery',  '/gallery',  3, false),
  ('About',    '/about',    4, false),
  ('Journal',  '/journal',  5, false),
  ('Contact',  '/contact',  6, false);

-- ── categories ───────────────────────────────────────────────
INSERT INTO categories (name, slug, display_order) VALUES
  ('Portrait',   'portrait',   1),
  ('Editorial',  'editorial',  2),
  ('Commercial', 'commercial', 3),
  ('Personal',   'personal',   4);

-- ── pages: home ──────────────────────────────────────────────
INSERT INTO pages (slug, title, is_published, sections) VALUES (
  'home',
  'Home',
  true,
  $json${
    "hero": {
      "headline": "Stories told\nin light.",
      "subheadline": "Portrait and editorial photography. Capturing character, not just composition.",
      "cta_label": "View Projects",
      "cta_url": "/projects",
      "secondary_cta_label": "Book a Session",
      "secondary_cta_url": "/contact",
      "background_image_url": null
    },
    "client_marquee": {
      "clients": ["National Portrait Gallery", "Condé Nast", "The Guardian", "Vogue", "British Journal of Photography", "Magnum Photos", "Dazed", "British Council", "Tate"]
    },
    "featured_work": {
      "headline": "Selected Work.",
      "subheadline": "Recent portraits, editorials and campaigns."
    },
    "about_preview": {
      "headline": "Matt Banton",
      "body": "Portrait and editorial photographer with a focus on the unguarded — the stillness before the pose, the weight in an empty room. Based in Vienna, working internationally with brands, publications, and individuals who believe a great photograph is the one you keep.",
      "image_url": null,
      "cta_label": "More about Matt",
      "cta_url": "/about"
    },
    "testimonials": {
      "headline": "What clients say",
      "items": [
        {
          "quote": "Calm, reflective, and reserved. He knows his craft.",
          "author": "Creative Director",
          "role": "Condé Nast",
          "avatar_url": null
        },
        {
          "quote": "Matt delivered work that outperformed the brief, quietly.",
          "author": "Brand Lead",
          "role": "National Portrait Gallery",
          "avatar_url": null
        },
        {
          "quote": "Exacting on set, generous in edit. Rare combination.",
          "author": "Art Director",
          "role": "The Guardian",
          "avatar_url": null
        }
      ]
    },
    "cta": {
      "headline": "Let's make something\nworth remembering.",
      "subheadline": "Portrait, editorial, or commercial — tell me about your project.",
      "button_label": "Get in touch",
      "button_url": "/contact",
      "secondary_button_label": null,
      "secondary_button_url": null,
      "email": "hello@mattbanton.com",
      "phone": null
    }
  }$json$::jsonb
);

-- ── pages: about ─────────────────────────────────────────────
INSERT INTO pages (slug, title, is_published, sections) VALUES (
  'about',
  'About',
  true,
  $json${
    "hero": {
      "headline": "The eye behind the lens.",
      "portrait_image_url": null
    },
    "bio": {
      "body": "<p>Matt Banton is a portrait and editorial photographer based in Vienna. For over a decade, he has worked with creative directors, art editors, and independent clients to make images that resist the ordinary. His approach is built on two things: patience and presence. The best photographs aren't taken — they're waited for.</p>"
    },
    "philosophy": {
      "headline": "How I work.",
      "body": "Every shoot begins with a conversation. Before I know what I'm going to photograph, I want to understand what you're trying to say. That conversation shapes everything — the light, the pace, the edit. The result should feel inevitable, not accidental."
    },
    "cta": {
      "headline": "Ready to work together?",
      "subheadline": "Portrait, editorial, or commercial — I'd love to hear about your project.",
      "button_label": "Get in touch",
      "button_url": "/contact",
      "secondary_button_label": null,
      "secondary_button_url": null,
      "email": null,
      "phone": null
    }
  }$json$::jsonb
);

-- ── pages: contact ───────────────────────────────────────────
INSERT INTO pages (slug, title, is_published, sections) VALUES (
  'contact',
  'Contact',
  true,
  $json${
    "hero": {
      "headline": "Get in touch.",
      "subheadline": "Tell me about your project. I respond to all enquiries within 48 hours."
    }
  }$json$::jsonb
);

-- ── home page: add faq section ────────────────────────────────
UPDATE pages
SET sections = sections || $faq${
  "faq": {
    "headline": "Common questions.",
    "items": [
      {
        "question": "How far in advance should I book?",
        "answer": "Most shoots are booked 4–6 weeks ahead, though I keep limited availability for shorter-notice work. For commercial or editorial projects with specific dates, earlier is always better."
      },
      {
        "question": "Do you travel for shoots?",
        "answer": "Yes — I'm based in Vienna but work internationally. Travel costs are discussed and agreed in advance, and I'm comfortable working across most of Europe at short notice."
      },
      {
        "question": "What's included in a portrait session?",
        "answer": "A pre-shoot call, the session itself (typically 2–3 hours), and a curated selection of edited images delivered via private gallery within 10 working days."
      },
      {
        "question": "Can I request a specific look or mood?",
        "answer": "Always. Every shoot starts with a brief — your references, your ideas, what you want to feel when you look at the images. The more specific you are, the better the result."
      },
      {
        "question": "Do you license images for commercial use?",
        "answer": "Yes. Licensing terms depend on usage — print, digital, duration, exclusivity. We'll agree everything in writing before any shoot begins."
      }
    ]
  }
}$faq$::jsonb
WHERE slug = 'home';

-- ── projects ──────────────────────────────────────────────────
INSERT INTO projects (slug, title, subtitle, description, cover_image_url, category_id, year, is_featured, is_published, display_order) VALUES
  (
    'the-quiet-watch',
    'The Quiet Watch',
    'Portrait series',
    'A study in stillness. Shot over three days in a converted warehouse in Vienna, this series explores the moment before self-consciousness sets in — where subject and photographer reach a kind of mutual agreement.',
    '',
    (SELECT id FROM categories WHERE slug = 'portrait'),
    2024, true, true, 1
  ),
  (
    'borderline',
    'Borderline',
    'Editorial commission',
    'Shot for a European arts publication, Borderline examines identity at the edges — people who live and work between cultures, languages, and definitions of home.',
    '',
    (SELECT id FROM categories WHERE slug = 'editorial'),
    2024, true, true, 2
  ),
  (
    'still-life-no-4',
    'Still Life No. 4',
    'Portrait series',
    'The fourth in an ongoing series. Where the first three were about movement, this is about its absence — subjects photographed in spaces that belong to them, in the hour before they leave.',
    '',
    (SELECT id FROM categories WHERE slug = 'portrait'),
    2023, true, true, 3
  ),
  (
    'open-season',
    'Open Season',
    'Commercial campaign',
    'Brand campaign for an outdoor clothing label. Photographed across three locations in the Austrian Alps over five days. The brief asked for authenticity; we delivered it without apology.',
    '',
    (SELECT id FROM categories WHERE slug = 'commercial'),
    2024, true, true, 4
  ),
  (
    'the-weight-of-light',
    'The Weight of Light',
    'Editorial series',
    'A personal project turned editorial commission. Twelve portraits made in natural light, each in a different city, each subject chosen for the particular way they carry themselves in a room.',
    '',
    (SELECT id FROM categories WHERE slug = 'editorial'),
    2023, true, true, 5
  ),
  (
    'after-hours',
    'After Hours',
    'Portrait series',
    'Portraits made between midnight and 4am across six European cities. A study in the particular honesty of exhaustion — people who have stopped performing for the day.',
    '',
    (SELECT id FROM categories WHERE slug = 'portrait'),
    2023, true, true, 6
  );

-- ── posts (journal) ───────────────────────────────────────────
INSERT INTO posts (slug, title, excerpt, content, author_name, is_published, published_at) VALUES
  (
    'on-patience-and-the-portrait',
    'On patience and the portrait',
    'The best portraits are not made in the first ten minutes. They happen somewhere around the forty-fifth, when the subject has forgotten why they came.',
    '<p>The best portraits are not made in the first ten minutes. They happen somewhere around the forty-fifth, when the subject has forgotten why they came.</p><p>I have spent a lot of time watching people become comfortable. It is a specific kind of watching — patient, non-committal, occasionally boring. The camera is up but not urgent. The light is set. There is nowhere else to be.</p><p>Most photographers I know talk about the decisive moment as though it arrives fully formed. In my experience, it has to be waited out. The subject has to move through their repertoire of poses, their ideas about how they should look, before something less considered surfaces. That is the photograph.</p><p>This is not a technique. It is a disposition. You either have the patience for it or you do not. If you find waiting uncomfortable, portraiture will be a series of compromises.</p><p>The work I am most proud of happened when I had no particular agenda. When I was interested in the person in front of me more than in the image I was going to make. That interest — genuine, unhurried — is the only thing that produces the portrait you keep returning to.</p>',
    'Matt Banton',
    true,
    NOW() - INTERVAL '30 days'
  ),
  (
    'what-i-look-for-before-i-look-through-the-lens',
    'What I look for before I look through the lens',
    'Before any shoot, there is a period I think of as reading the room — the atmosphere, the quality of light, the posture of the subject, what they have already decided about the day.',
    '<p>Before any shoot, there is a period I think of as reading the room. Not the physical room — the atmosphere. The quality of the light, yes, but also the mood of the space, the posture of the subject, what they have already decided about the day.</p><p>People arrive to shoots with a version of themselves they have prepared. Sometimes it is the right version. More often it is the version they believe the photographer wants — composed, presentable, slightly elevated. My job in the first twenty minutes is to make that version unnecessary.</p><p>I ask questions. Not about the shoot — about the person. What they did that morning. Whether the journey was easy. What they are working on. The questions are not particularly important; the rhythm of conversation is. It loosens something.</p><p>I look for the moment the shoulders drop. That is usually when we begin.</p><p>The technical decisions — focal length, aperture, whether to use a reflector — are made quickly and then forgotten. They are the grammar of the image, not the sentence. The sentence is always about the person.</p>',
    'Matt Banton',
    true,
    NOW() - INTERVAL '14 days'
  ),
  (
    'notes-from-vienna-working-in-changing-light',
    'Notes from Vienna: working in changing light',
    'Vienna in winter has a particular quality of light I have not found anywhere else. Low, lateral, almost architectural — it lands on faces differently than the light of summer, or of the south.',
    '<p>Vienna in winter has a particular quality of light that I have not found anywhere else. Low, lateral, almost architectural — it lands on faces differently than the light of summer, or of the south.</p><p>I moved here two years ago, partly for personal reasons, partly because I wanted to work in a city where the light would challenge me. Cities with beautiful, reliable light can make you lazy. You find the angle that works and return to it. Changing light forces decisions.</p><p>The Ringstraße in early afternoon. The Naschmarkt at dusk. The interior of the Kunsthistorisches Museum, which has windows placed as though by a photographer. These are not backdrops — they are collaborators.</p><p>I have been making a series of portraits of people who have lived in Vienna for more than twenty years but were not born here. There is something specific about that position — long enough to belong, always slightly outside. The light seems to suit it.</p><p>The series is not finished. It may not be for some time. That is fine.</p>',
    'Matt Banton',
    true,
    NOW() - INTERVAL '7 days'
  );
