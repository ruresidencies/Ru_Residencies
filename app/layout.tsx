import './globals.css'
import { inter, playfair } from '@/lib/fonts'
import Navbar from '@/components/layout/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Navbar />
        <main className="pt-24">
          {children}
        </main>
      </body>
    </html>
  )
}
