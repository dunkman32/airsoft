'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavLinks() {
  const pathname = usePathname()

  const links = [
    { href: '/news', label: 'News' },
    { href: '/events', label: 'Events' },
    { href: '/rules', label: 'Rules' },
    { href: '/shop', label: 'Shop' },
  ]

  return (
    <>
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="font-normal text-xs uppercase">{link.label}</span>
          </Link>
        )
      })}
    </>
  )
}
