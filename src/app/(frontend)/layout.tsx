import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SnakeBackground } from '@/components/SnakeBackground'
import '@/styles/global.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between bg-background text-foreground relative">
        <SnakeBackground />
        <div className="relative z-10 min-h-screen flex flex-col justify-between">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
