import { AboutUs } from '@/components/AboutUs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company and what we do',
}

export default function AboutUsPage() {
  return <AboutUs />
}
