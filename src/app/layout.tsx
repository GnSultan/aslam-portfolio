import { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import { siteConfig } from "@/config/site";
import RootLayoutClient from "./layout-client";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Designer & Developer Portfolio`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} - Designer & Developer`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Portfolio`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Designer & Developer`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.jpg`],
    creator: "@aslam"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  },
  metadataBase: new URL(siteConfig.url)
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
