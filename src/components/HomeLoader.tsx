'use client'

import Lottie from 'lottie-react'
import akmAnimation from '@/../public/akm.json'

export function HomeLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-64 h-64 md:w-96 md:h-96">
        <Lottie animationData={akmAnimation} loop={true} />
      </div>
    </div>
  )
}
