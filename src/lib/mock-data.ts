import type {
  SiteSettings,
  NavItem,
  HomePageSections,
  AboutPageSections,
  ContactPageSections,
} from '@/types/content'

export const mockSiteSettings: SiteSettings = {
  id: 'mock',
  site_name: 'Matt Banton',
  tagline: 'Portrait & Editorial Photography',
  tagline_meta: 'PHOTO & VIDEO · EST. 2015',
  booking_status: '2026 — open',
  seo_title: 'Matt Banton — Portrait & Editorial Photographer',
  seo_description: 'Portrait and editorial photographer based in London. Available for commissions worldwide.',
  logo_url: null,
  og_image_url: null,
  contact_email: 'hello@mattbanton.com',
  contact_phone: '+44 7700 900000',
  location: 'Vienna, Austria',
  coverage: null,
  social_instagram: null,
  social_vimeo: null,
  social_twitter: null,
  social_facebook: null,
  analytics_id: null,
  contact_project_types: ['Portrait Session', 'Editorial', 'Commercial / Brand', 'Other'],
}

export const mockNavItems: NavItem[] = [
  { id: '1', label: 'Home',     url: '/',         display_order: 1, is_external: false },
  { id: '2', label: 'Projects', url: '/projects', display_order: 2, is_external: false },
  { id: '3', label: 'Gallery',  url: '/gallery',  display_order: 3, is_external: false },
  { id: '4', label: 'About',    url: '/about',    display_order: 4, is_external: false },
  { id: '5', label: 'Journal',  url: '/journal',  display_order: 5, is_external: false },
  { id: '6', label: 'Contact',  url: '/contact',  display_order: 6, is_external: false },
]

export const mockHomePageSections: HomePageSections = {
  hero: {
    headline: 'Stories told\nin light.',
    subheadline: 'Portrait and editorial photography. Capturing character, not just composition.',
    cta_label: 'View Projects',
    cta_url: '/projects',
    secondary_cta_label: 'Book a Session',
    secondary_cta_url: '/contact',
    background_image_url: null,
  },
  client_marquee: {
    clients: ['National Portrait Gallery', 'Condé Nast', 'The Guardian', 'Vogue', 'British Journal of Photography', 'Magnum Photos', 'Dazed', 'British Council', 'Tate'],
  },
  featured_work: {
    headline: 'Selected Work.',
    subheadline: 'Recent portraits, editorials and campaigns.',
  },
  about_preview: {
    headline: 'Matt Banton',
    body: 'Portrait and editorial photographer with a focus on the unguarded — the stillness before the pose, the weight in an empty room. Based in London, working internationally with brands, publications, and individuals who believe a great photograph is the one you keep.',
    image_url: null,
    cta_label: 'More about Matt',
    cta_url: '/about',
  },
  testimonials: {
    headline: 'What clients say',
    items: [
      { quote: 'Calm, reflective, and reserved. He knows his craft.',         author: 'Creative Director', role: 'Condé Nast',               avatar_url: null },
      { quote: 'Matt delivered work that outperformed the brief, quietly.',   author: 'Brand Lead',         role: 'National Portrait Gallery', avatar_url: null },
      { quote: 'Exacting on set, generous in edit. Rare combination.',        author: 'Art Director',       role: 'The Guardian',              avatar_url: null },
    ],
  },
  faq: {
    headline: 'Common questions.',
    items: [
      { question: 'How far in advance should I book?', answer: 'Most shoots are booked 4–6 weeks ahead, though I keep limited availability for shorter-notice work. For commercial or editorial projects with specific dates, earlier is always better.' },
      { question: 'Do you travel for shoots?', answer: "Yes — I'm based in Vienna but work internationally. Travel costs are discussed and agreed in advance, and I'm comfortable working across most of Europe at short notice." },
      { question: "What's included in a portrait session?", answer: 'A pre-shoot call, the session itself (typically 2–3 hours), and a curated selection of edited images delivered via private gallery within 10 working days.' },
      { question: 'Can I request a specific look or mood?', answer: 'Always. Every shoot starts with a brief — your references, your ideas, what you want to feel when you look at the images. The more specific you are, the better the result.' },
      { question: 'Do you license images for commercial use?', answer: "Yes. Licensing terms depend on usage — print, digital, duration, exclusivity. We'll agree everything in writing before any shoot begins." },
    ],
  },
  cta: {
    headline: "Let's make something\nworth remembering.",
    subheadline: 'Portrait, editorial, or commercial — tell me about your project.',
    button_label: 'Get in touch',
    button_url: '/contact',
    secondary_button_label: null,
    secondary_button_url: null,
    email: 'hello@mattbanton.com',
    phone: null,
  },
}

export const mockAboutPageSections: AboutPageSections = {
  hero: {
    headline: 'The eye behind the lens.',
    portrait_image_url: null,
  },
  bio: {
    body: '<p>Matt Banton is a portrait and editorial photographer based in London. For over a decade, he has worked with creative directors, art editors, and independent clients to make images that resist the ordinary. His approach is built on two things: patience and presence. The best photographs aren\'t taken — they\'re waited for.</p>',
  },
  philosophy: {
    headline: 'How I work.',
    body: 'Every shoot begins with a conversation. Before I know what I\'m going to photograph, I want to understand what you\'re trying to say. That conversation shapes everything — the light, the pace, the edit. The result should feel inevitable, not accidental.',
  },
  cta: {
    headline: 'Ready to work together?',
    subheadline: 'Portrait, editorial, or commercial — I\'d love to hear about your project.',
    button_label: 'Get in touch',
    button_url: '/contact',
  },
}

export const mockContactPageSections: ContactPageSections = {
  hero: {
    headline: 'Get in touch.',
    subheadline: 'Tell me about your project. I respond to all enquiries within 48 hours.',
  },
}
