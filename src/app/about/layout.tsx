import React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
    metadataBase: new URL('https://kiedywakacje.com'),
    title: 'O nas – kiedywakacje.com',
    description: 'Dowiedz się więcej o kiedywakacje.com – stronie z odliczaniem do wakacji, ferii i końca roku szkolnego.',
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'O nas – kiedywakacje.com',
        description: 'Dowiedz się więcej o kiedywakacje.com.',
        url: 'https://kiedywakacje.com/about',
        siteName: 'Kiedy Wakacje',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Odliczanie do wakacji – kiedywakacje.com',
            },
        ],
        type: 'website',
        locale: 'pl_PL',
    },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
                {children}
            <Analytics />
        </ThemeProvider>
    )
}