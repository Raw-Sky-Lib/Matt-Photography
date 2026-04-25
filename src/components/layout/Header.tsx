import { getSiteSettings, getNavItems } from '@/lib/queries'
import HeaderClient from './HeaderClient'

export default async function Header() {
  const [settings, navItems] = await Promise.all([getSiteSettings(), getNavItems()])
  return <HeaderClient settings={settings} navItems={navItems} />
}
