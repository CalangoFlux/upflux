import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AideaFlux - Descubra as Melhores Ferramentas de IA",
  description:
    "Explore mais de 95+ ferramentas de inteligência artificial organizadas em 10 categorias especializadas. Encontre a solução perfeita para suas necessidades com IA.",
  keywords: "inteligência artificial, IA, ferramentas AI, tecnologia, automação, produtividade, inovação",
  authors: [{ name: "AideaFlux Team" }],
  creator: "AideaFlux",
  publisher: "AideaFlux",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.aidea.flux.xyz",
    siteName: "AideaFlux",
    title: "AideaFlux - Descubra as Melhores Ferramentas de IA",
    description:
      "Explore mais de 95+ ferramentas de inteligência artificial organizadas em 10 categorias especializadas. Encontre a solução perfeita para suas necessidades com IA.",
    images: [
      {
        url: "/images/aideaflux-logo.png",
        width: 1200,
        height: 630,
        alt: "AideaFlux - Plataforma de Ferramentas de IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AideaFlux - Descubra as Melhores Ferramentas de IA",
    description:
      "Explore mais de 95+ ferramentas de inteligência artificial organizadas em 10 categorias especializadas.",
    images: ["/images/aideaflux-logo.png"],
    creator: "@aideaflux",
  },
  icons: {
    icon: "/images/AIdeaFlux_icon.png",
    shortcut: "/images/AIdeaFlux_icon.png",
    apple: "/images/AIdeaFlux_icon.png",
  },
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="canonical" href="https://www.aidea.flux.xyz" />
        <meta name="theme-color" content="#06b6d4" />
        <meta name="msapplication-TileColor" content="#06b6d4" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
