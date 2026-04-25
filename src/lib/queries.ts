import { createServerClient } from '@/lib/supabase/server'
import type {
  SiteSettings,
  NavItem,
  PostSummary,
  Post,
  Page,
  Category,
  GalleryImage,
  ProjectSummary,
  Project,
  HomePageSections,
  AboutPageSections,
  ContactPageSections,
} from '@/types/content'
import {
  mockSiteSettings,
  mockNavItems,
  mockHomePageSections,
  mockAboutPageSections,
  mockContactPageSections,
} from '@/lib/mock-data'

const IS_PLACEHOLDER = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder')

// ─── Standard template queries ───────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings> {
  if (IS_PLACEHOLDER) return mockSiteSettings
  const supabase = createServerClient()
  const { data, error } = await supabase.from('site_settings').select('*').single()
  if (error || !data) throw new Error('Failed to load site settings')
  return data as SiteSettings
}

export async function getNavItems(): Promise<NavItem[]> {
  if (IS_PLACEHOLDER) return mockNavItems
  const supabase = createServerClient()
  const { data } = await supabase
    .from('nav_items')
    .select('*')
    .order('display_order', { ascending: true })
  return (data ?? []) as NavItem[]
}

export async function getPublishedPosts(): Promise<PostSummary[]> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('posts')
    .select('id, slug, title, excerpt, cover_image_url, author_name, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
  return (data ?? []) as PostSummary[]
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  return (data ?? null) as Post | null
}

export async function getPostSlugs(): Promise<string[]> {
  const supabase = createServerClient()
  const { data } = await supabase.from('posts').select('slug').eq('is_published', true)
  return data?.map((p) => p.slug) ?? []
}

export async function getPublishedPages(): Promise<Page[]> {
  const supabase = createServerClient()
  const { data } = await supabase.from('pages').select('*').eq('is_published', true)
  return (data ?? []) as Page[]
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  return (data ?? null) as Page | null
}

export async function getPageSlugs(): Promise<string[]> {
  const supabase = createServerClient()
  const { data } = await supabase.from('pages').select('slug').eq('is_published', true)
  return data?.map((p) => p.slug) ?? []
}

// ─── Photography queries ──────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  return (data ?? []) as Category[]
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  return (data ?? null) as Category | null
}

export async function getFeaturedImages(): Promise<GalleryImage[]> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('is_featured', true)
    .order('display_order', { ascending: true })
  return (data ?? []) as GalleryImage[]
}

export async function getGalleryImages(categorySlug?: string): Promise<GalleryImage[]> {
  const supabase = createServerClient()
  let query = supabase
    .from('gallery_images')
    .select('*, categories(id, name, slug)')
    .order('display_order', { ascending: true })
  if (categorySlug) {
    const cat = await getCategoryBySlug(categorySlug)
    if (cat) query = query.eq('category_id', cat.id)
  }
  const { data } = await query
  return (data ?? []) as GalleryImage[]
}

export async function getPublishedProjects(): Promise<ProjectSummary[]> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('projects')
    .select('*, categories(id, name, slug)')
    .eq('is_published', true)
    .order('display_order', { ascending: true })
  return (data ?? []) as ProjectSummary[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createServerClient()
  const { data: project } = await supabase
    .from('projects')
    .select('*, categories(id, name, slug)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  if (!project) return null
  const { data: images } = await supabase
    .from('project_images')
    .select('*')
    .eq('project_id', project.id)
    .order('display_order', { ascending: true })
  return { ...project, images: images ?? [] } as Project
}

export async function getProjectSlugs(): Promise<string[]> {
  const supabase = createServerClient()
  const { data } = await supabase.from('projects').select('slug').eq('is_published', true)
  return data?.map((p) => p.slug) ?? []
}

// ─── Page section queries ─────────────────────────────────────────────────────

export async function getHomePageSections(): Promise<HomePageSections> {
  if (IS_PLACEHOLDER) return mockHomePageSections
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('pages')
    .select('sections')
    .eq('slug', 'home')
    .single()
  if (error || !data) throw new Error('Failed to load home page sections')
  return data.sections as HomePageSections
}

export async function getAboutPageSections(): Promise<AboutPageSections> {
  if (IS_PLACEHOLDER) return mockAboutPageSections
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('pages')
    .select('sections')
    .eq('slug', 'about')
    .single()
  if (error || !data) throw new Error('Failed to load about page sections')
  return data.sections as AboutPageSections
}

export async function getContactPageSections(): Promise<ContactPageSections> {
  if (IS_PLACEHOLDER) return mockContactPageSections
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('pages')
    .select('sections')
    .eq('slug', 'contact')
    .single()
  if (error || !data) throw new Error('Failed to load contact page sections')
  return data.sections as ContactPageSections
}
