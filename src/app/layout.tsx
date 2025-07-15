import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react'
import { QueryClientContext } from "@/providers/queryclient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apoia-dev",
  description: "Apoia-dev é uma plataforma para criadores receberem doações e apoios de sua comunidade de forma simples, segura e integrada ao Stripe. Ideal para desenvolvedores, streamers e produtores de conteúdo que desejam monetizar seu trabalho online.",
  keywords: [
    "doação", "criadores de conteúdo", "Stripe", "monetização", "apoio", "streamer", "desenvolvedor", "produtor de conteúdo", "pagamento online", "financiamento coletivo"
  ],
  authors: [{ name: "Equipe Apoia-dev", url: "https://apoia.dev" }],
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: "Apoia-dev | Monetize seu conteúdo com doações",
    description: "Receba doações e apoios de sua comunidade de forma simples, segura e integrada ao Stripe. Ideal para criadores, desenvolvedores e streamers.",
    url: "https://apoia.dev",
    siteName: "Apoia-dev",
    images: [
      {
        url: "/public/globe.svg",
        width: 1200,
        height: 630,
        alt: "Apoia-dev - Plataforma para criadores de conteúdo"
      }
    ],
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Apoia-dev | Monetize seu conteúdo com doações",
    description: "Receba doações e apoios de sua comunidade de forma simples, segura e integrada ao Stripe.",
    images: ["/public/globe.svg"],
    creator: "@apoia_dev"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  },
  metadataBase: new URL("https://apoia.dev"),
  alternates: {
    canonical: "https://apoia.dev"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <SessionProvider>
          <QueryClientContext>
            {children}
            <Toaster
              duration={3000}
            />
          </QueryClientContext>
        </SessionProvider>
      </body>
    </html>
  );
}
