'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const weaponIcons = [
  '/weapons/bullets-ammo-svgrepo-com.svg',
  '/weapons/gas-mask-svgrepo-com.svg',
  '/weapons/helicopter-svgrepo-com.svg',
  '/weapons/knife-miscellaneous-svgrepo-com.svg',
  '/weapons/launcher-bazooka-svgrepo-com.svg',
  '/weapons/machine-gun-shoot-svgrepo-com.svg',
  '/weapons/medal-reward-svgrepo-com.svg',
  '/weapons/molotov-cocktail-svgrepo-com.svg',
  '/weapons/parachute-svgrepo-com.svg',
  '/weapons/rifle-gun-svgrepo-com (1).svg',
  '/weapons/rifle-gun-svgrepo-com.svg',
  '/weapons/rifle-war-svgrepo-com.svg',
  '/weapons/tank-canon-svgrepo-com.svg',
  '/weapons/tank-svgrepo-com.svg',
]

interface RandomWeaponIconProps {
  size?: number
  className?: string
}

export function RandomWeaponIcon({ size = 64, className = '' }: RandomWeaponIconProps) {
  const [iconPath, setIconPath] = useState<string>('')

  useEffect(() => {
    // Select a random weapon icon
    const randomIndex = Math.floor(Math.random() * weaponIcons.length)
    setIconPath(weaponIcons[randomIndex])
  }, [])

  if (!iconPath) {
    return null
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src={iconPath}
        alt="Weapon icon"
        fill
        className="object-contain"
      />
    </div>
  )
}
