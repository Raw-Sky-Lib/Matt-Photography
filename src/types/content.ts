// ─── Standard template types ──────────────────────────────────────────────────

export interface SiteSettings {
  id: string
  site_name: string
  tagline: string | null
  tagline_meta: string | null      // "PHOTO & VIDEO · EST. 2015" style meta label
  booking_status: string | null    // "2026 — open"
  seo_title: string | null
  seo_description: string | null
  logo_url: string | null
  og_image_url: string | null
  contact_email: string | null
  contact_phone: string | null
  location: string | null          // "Vienna, Austria"
  coverage: string | null          // "Across Europe"
  social_instagram: string | null
  social_vimeo: string | null
  social_twitter: string | null
  social_facebook: string | null
  analytics_id: string | null
  contact_project_types: string[] | null
}

export interface NavItem {
  id: string
  label: string
  url: string
  display_order: number
  is_external: boolean
}

export interface PostSummary {
  id: string
  slug: string
  title: string
  excerpt: string | null
  cover_image_url: string | null
  author_name: string | null
  published_at: string
}

export interface Post extends PostSummary {
  content: string
}

export interface Page {
  id: string
  slug: string
  title: string | null
  sections: Record<string, unknown>
  is_published: boolean
}

// ─── Photography types ────────────────────────────────────────────────────────

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  cover_image_url: string | null
  display_order: number
}

export interface GalleryImage {
  id: string
  title: string | null
  alt_text: string
  image_url: string
  category_id: string | null
  project_id: string | null
  is_featured: boolean
  display_order: number
  width: number | null
  height: number | null
}

export interface ProjectSummary {
  id: string
  slug: string
  title: string
  subtitle: string | null
  cover_image_url: string
  category_id: string | null
  category?: Category
  client_name: string | null
  year: number | null
  is_featured: boolean
  display_order: number
}

export interface Project extends ProjectSummary {
  description: string | null
  images: ProjectImage[]
}

export interface ProjectImage {
  id: string
  image_url: string
  alt_text: string
  display_order: number
  width: number | null
  height: number | null
}

// ─── Page section types — Home ────────────────────────────────────────────────

export interface HeroSection {
  headline: string             // "Stories told in light."
  subheadline: string          // paragraph description text
  cta_label: string
  cta_url: string
  secondary_cta_label: string | null
  secondary_cta_url: string | null
  background_image_url: string | null
}

export interface ClientMarqueeSection {
  clients: string[]
}

export interface FeaturedWorkSection {
  headline: string
  subheadline: string | null
}

export interface TestimonialItem {
  quote: string
  author: string
  role: string | null
  avatar_url: string | null
}

export interface TestimonialsSection {
  headline: string
  items: TestimonialItem[]
}

export interface CTASection {
  headline: string
  subheadline: string
  button_label: string
  button_url: string
  secondary_button_label?: string | null
  secondary_button_url?: string | null
  email?: string | null
  phone?: string | null
}

export interface HomePageSections {
  hero: HeroSection
  client_marquee: ClientMarqueeSection
  featured_work: FeaturedWorkSection
  about_preview: AboutPreviewSection
  testimonials: TestimonialsSection
  cta: CTASection
}

// ─── Page section types — About ───────────────────────────────────────────────

export interface AboutHeroSection {
  headline: string
  portrait_image_url: string | null
}

export interface BioSection {
  body: string
}

export interface PhilosophySection {
  headline: string
  body: string
}

export interface AboutPreviewSection {
  headline: string
  body: string
  image_url: string | null
  cta_label: string
  cta_url: string
}

export interface AboutPageSections {
  hero: AboutHeroSection
  bio: BioSection
  philosophy: PhilosophySection
  cta: CTASection
}

// ─── Page section types — Contact ─────────────────────────────────────────────

export interface ContactHeroSection {
  headline: string
  subheadline: string
}

export interface ContactPageSections {
  hero: ContactHeroSection
}
