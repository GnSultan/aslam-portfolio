import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL('https://aslam-portfolio.vercel.app'),
  title: "Aslam - Art Director & Product Designer",
  description: "I'm Aslam, an art director and product designer based in London. With my background in visual arts and technology, I specialize in creating engaging user experiences through interactive design.",
  keywords: ["art director", "product designer", "UX designer", "UI designer", "creative director", "portfolio", "design", "London"],
  authors: [{ name: "Aslam" }],
  creator: "Aslam",
  publisher: "Aslam",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aslam-portfolio.vercel.app',
    siteName: 'Aslam Portfolio',
    title: 'Aslam - Art Director & Product Designer',
    description: 'I\'m Aslam, an art director and product designer based in London. With my background in visual arts and technology, I specialize in creating engaging user experiences through interactive design.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aslam - Art Director & Product Designer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aslam - Art Director & Product Designer',
    description: 'I\'m Aslam, an art director and product designer based in London. With my background in visual arts and technology, I specialize in creating engaging user experiences through interactive design.',
    images: ['/og-image.jpg'],
  },
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
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
