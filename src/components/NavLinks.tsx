'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, MapPin } from 'lucide-react'

interface NavLinksProps {
  phoneNumber?: string
  showroomLink?: string
}

export function NavLinks({ phoneNumber, showroomLink }: NavLinksProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '/news', label: 'News' },
    { href: '/events', label: 'Events' },
    { href: '/rules', label: 'Rules' },
    { href: '/shop', label: 'Shop' },
  ]

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6">
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
      </div>

      {/* Mobile Burger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white hover:text-gray-200 transition-colors z-50"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-brand-charcoal z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundImage: 'url(/camo.svg)',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'left top',
        }}
      >
        <nav className="flex flex-col h-full p-8 pt-24">
          {/* Navigation Links */}
          <div className="flex flex-col gap-4 flex-1">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`nav-link text-white hover:text-brand-orange transition-colors py-3 border-b border-white/10 ${
                    isActive ? 'text-brand-orange' : ''
                  }`}
                >
                  <span className="font-normal text-lg uppercase">{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
            {phoneNumber && (
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-3 text-white hover:text-brand-orange transition-colors"
              >
                <Phone size={24} />
                <span className="font-normal text-sm">{phoneNumber}</span>
              </a>
            )}
            {showroomLink && (
              <a
                href={showroomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-brand-orange transition-colors"
              >
                <MapPin size={24} />
                <span className="font-normal text-sm">Showroom</span>
              </a>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}
