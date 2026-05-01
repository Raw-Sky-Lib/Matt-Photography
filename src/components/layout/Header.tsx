import { getSiteSettings, getNavItems } from '@/lib/queries'
import HeaderClient from './HeaderClient'

export default async function Header() {
  const [settings, allNavItems] = await Promise.all([getSiteSettings(), getNavItems()])
  const navItems = allNavItems.filter(item => ![ '/journal', '/about' ].includes(item.url))
  return <HeaderClient settings={settings} navItems={navItems} />
}
