'use client'

import React from 'react'
import { RandomWeaponIcon } from './RandomWeaponIcon'

interface SectionTitleProps {
  children: React.ReactNode
  href?: string
  iconSize?: number
  showIcons?: boolean
}

export function SectionTitle({
  children,
  href,
  iconSize = 40,
  showIcons = true
}: SectionTitleProps) {
  const titleContent = (
    <h2
      className="text-2xl uppercase font-bold text-brand-orange"
      style={{ textShadow: '0 2px 4px rgba(225, 138, 62, 0.4)' }}
    >
      {children}
    </h2>
  )

  const content = (
    <div className="flex items-center justify-between mb-6">
      {href ? (
        <a href={href} className="no-underline">
          {titleContent}
        </a>
      ) : (
        titleContent
      )}
      {showIcons && <RandomWeaponIcon size={iconSize} className="opacity-70" />}
    </div>
  )

  return content
}
