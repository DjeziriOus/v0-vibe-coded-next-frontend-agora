import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'
import { Sora } from 'next/font/google'
import { QueryProvider } from '@/lib/queryClient'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-mono',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-sora',
})

export const metadata: Metadata = {
  title: 'Agora | La marketplace multi-boutiques française',
  description: 'Découvrez Agora, la marketplace française qui connecte artisans et clients. Trouvez des produits uniques et soutenez les créateurs locaux.',
  keywords: ['marketplace', 'artisanat', 'français', 'boutique', 'e-commerce', 'fait main'],
  authors: [{ name: 'Agora' }],
  openGraph: {
    title: 'Agora | La marketplace multi-boutiques française',
    description: 'Découvrez des produits uniques créés par des artisans français.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#5C6BC0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${dmMono.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        <QueryProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <Toaster 
                position="top-right" 
                richColors 
                closeButton
                toastOptions={{
                  style: {
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                  },
                }}
              />
            </CartProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
