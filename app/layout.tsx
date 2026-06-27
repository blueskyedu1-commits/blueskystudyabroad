import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bluesky Study Abroad — Global Course Finder',
  description: 'Find the right university and course for you. Search 1,000+ programmes worldwide — from partner universities with full application support to top global institutions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* HEADER */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="font-bold text-gray-900 text-lg">Bluesky Study Abroad</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                <Link href="/courses" className="hover:text-blue-600 transition-colors">Find Courses</Link>
                <Link href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</Link>
                <Link href="#contact" className="hover:text-blue-600 transition-colors">Talk to a Counsellor</Link>
              </nav>
              <Link href="/courses" className="btn-primary text-sm hidden md:block">
                Search Courses
              </Link>
            </div>
          </div>
        </header>

        <main>{children}</main>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-gray-400 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">B</span>
                  </div>
                  <span className="text-white font-bold">Bluesky Study Abroad</span>
                </div>
                <p className="text-sm leading-relaxed">
                  Powered by Bluesky Educational Services Pvt Ltd. Part of the RoadToCareers network.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Platform</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/courses" className="hover:text-white transition-colors">Find Courses</Link></li>
                  <li><Link href="/courses?status=partner" className="hover:text-white transition-colors">Partner Universities</Link></li>
                  <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Get Help</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#contact" className="hover:text-white transition-colors">Free Counselling</Link></li>
                  <li><a href="mailto:info@blueskystudyabroad.com" className="hover:text-white transition-colors">info@blueskystudyabroad.com</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-center">
              © {new Date().getFullYear()} Bluesky Educational Services Pvt Ltd. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
