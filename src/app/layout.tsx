import "./globals.css"
import {ThemeProvider} from "next-themes"
import React from "react";

export const metadata = {
    title: 'Kiedy Wakacje?',
    description: 'Odliczanie do zasłużonego odpoczynku od Szkoły',
    keywords: [
        'Odliczanie', 'do', 'wakacji', 'końca', 'roku', 'szkolnego',
        'wakacje', 'wolne', 'odpoczynek', 'ferie', 'zimowe',
        'weekend', 'ile', '2025', '2025/2026'
    ],
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    openGraph: {
        title: 'Kiedywakacje.com - Odliczanie do wakacji!',
        description: 'Ile jeszcze zostało wakacji? My wiemy! :)',
        url: 'https://kiedywakacje.com/',
        siteName: 'Kiedy Wakacje',
        images: [
            {
                url: '/android-chrome-192x192.png',
                width: 1200,
                height: 630,
                alt: 'Zegar odliczający do wakacji',
            },
        ],
        type: 'website',
        locale: 'pl_PL',

    },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pl" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" enableSystem defaultTheme="system">{children}</ThemeProvider>
            </body>
        </html>
    );
}
