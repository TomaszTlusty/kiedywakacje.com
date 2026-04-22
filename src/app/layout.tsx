import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/next"
import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    metadataBase: new URL('https://kiedywakacje.com'),
    title: 'Kiedy Wakacje? – Odliczanie do wakacji i ferii 2025/2026',
    description: 'Nie możesz doczekać się wakacji? Sprawdź precyzyjne odliczanie do końca roku szkolnego, ferii zimowych i innych dni wolnych. Ile dni, godzin i minut zostało?',
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    openGraph: {
        title: 'Kiedy Wakacje? – Odliczanie do wakacji 2025/2026',
        description: 'Precyzyjne odliczanie do wakacji letnich, ferii zimowych i końca roku szkolnego.',
        url: 'https://kiedywakacje.com/',
        siteName: 'Kiedy Wakacje',
        images: [
            {
                url: '/og-image.png', //need to make thi one ... later
                width: 1200,
                height: 630,
                alt: 'Kiedywakacje.com - Odliczanie do wakacji!',
            },
        ],
        type: 'website',
        locale: 'pl_PL',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kiedy Wakacje? – Odliczanie do wakacji 2025/2026',
        description: 'Precyzyjne odliczanie do wakacji letnich, ferii zimowych i końca roku szkolnego.',
        images: ['/og-image.png'],
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pl" suppressHydrationWarning>
        <body className="dark:bg-black overflow-x-hidden">
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            {children}
        </ThemeProvider>
        <Analytics />
        </body>
        </html>
    )
}