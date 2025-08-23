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
  title: "Givoo",
  description: "Givoo é uma plataforma para criadores receberem doações e apoios de sua comunidade de forma simples, segura e integrada ao Stripe. Ideal para todos, streamers, produtores de conteúdo e vários outros que desejam monetizar seu trabalho online.",
  keywords: [
    "doação", "criadores de conteúdo", "Stripe", "monetização", "apoio", "streamer", "desenvolvedor", "produtor de conteúdo", "pagamento online", "financiamento coletivo"
  ],
  authors: [{ name: "Equipe Givoo", url: "https://givoo.vercel.app" }],
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: "Givoo | Monetize seu conteúdo com doações",
    description: "Receba doações e apoios de sua comunidade de forma simples, segura e integrada ao Stripe. Ideal para todos, streamers, produtores de conteúdo e vários outros que desejam monetizar seu trabalho online.",
    url: "https://givoo.vercel.app",
    siteName: "Givoo",
    images: [
      {
        url: "/public/globe.svg",
        width: 1200,
        height: 630,
        alt: "Givoo - Plataforma de doações"
      }
    ],
    locale: "pt_BR",
    type: "website"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  },
  metadataBase: new URL("https://givoo.vercel.app"),
  alternates: {
    canonical: "https://givoo.vercel.app"
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
