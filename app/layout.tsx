import type { Metadata, Viewport } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import React from "react";

import MobileBottomNavigation from "@/components/layout/bottom-nav";
import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/providers/tansack-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import { MlTR } from "./fonts";

// General metadata for the entire application
export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "Feed Explorer - Latest News & Feeds",
    template: "%s | Feed Explorer",
  },
  description:
    "Stay updated with the latest news, articles, and feeds. Discover trending topics and breaking news from reliable sources.",

  // Keywords for SEO
  keywords: [
    "news",
    "feeds",
    "articles",
    "breaking news",
    "trending topics",
    "latest updates",
    "journalism",
    "media",
  ],

  // Author and creator information
  authors: [{ name: "Feed Explorer Team" }],
  creator: "Feed Explorer",
  publisher: "Feed Explorer",

  // Open Graph metadata
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yoursite.com",
    siteName: "Feed Explorer",
    title: "Feed Explorer - Latest News & Feeds",
    description:
      "Stay updated with the latest news, articles, and feeds. Discover trending topics and breaking news from reliable sources.",
    images: [
      {
        url: "https://yoursite.com/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Feed Explorer - Latest News & Feeds",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Feed Explorer - Latest News & Feeds",
    description: "Stay updated with the latest news, articles, and feeds.",
    site: "@yourtwitterhandle",
    creator: "@yourtwitterhandle",
    images: ["https://yoursite.com/assets/images/twitter-image.png"],
  },

  // Additional metadata
  category: "news",
  classification: "News and Media",

  // Robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },

  // Manifest
  // manifest: "/site.webmanifest",

  // App-specific metadata
  applicationName: "Feed Explorer",
  referrer: "origin-when-cross-origin",

  // Alternate languages (if applicable)
  alternates: {
    canonical: "https://yoursite.com",
    languages: {
      "en-US": "https://yoursite.com",
      "es-ES": "https://yoursite.com/es",
      // Add more languages as needed
    },
  },

  // Other metadata
  metadataBase: new URL("https://yoursite.com"),
};

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

// JSON-LD structured data for better SEO
export function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Feed Explorer",
    description: "Stay updated with the latest news, articles, and feeds.",
    url: "https://yoursite.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://yoursite.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Feed Explorer",
      logo: {
        "@type": "ImageObject",
        url: "https://yoursite.com/logo.png",
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateJsonLd();

  return (
    <html lang="en">
      <body className={`${MlTR.variable} ${MlTR.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <NextTopLoader color="#216015" showSpinner={false} />

            <Toaster richColors expand />

            <main className="size-full">
              <Navbar />
              {children}
            </main>
            <Footer />
            {/* <BackToTop /> */}
            <MobileBottomNavigation />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
