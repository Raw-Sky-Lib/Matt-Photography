import type { Metadata } from 'next'
import { Anton, Oswald, Archivo, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { getSiteSettings } from '@/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--loaded-font-display',
  display: 'swap',
})

const oswald = Oswald({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--loaded-font-condensed',
  display: 'swap',
})

const archivo = Archivo({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--loaded-font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--loaded-font-mono',
  display: 'swap',
})

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: {
      default: settings.seo_title ?? settings.site_name,
      template: `%s | ${settings.site_name}`,
    },
    description: settings.seo_description,
    openGraph: {
      images: settings.og_image_url ? [settings.og_image_url] : [],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${oswald.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
