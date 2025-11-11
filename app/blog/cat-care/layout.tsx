import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cat Care Tips & Guides | Mr n Mrs Pet",
  description:
    "Discover expert tips and guides for cat care, grooming, feeding, and health on Mr n Mrs Pet's Cat Care blog.",
  keywords: [
    "cat care tips",
    "cat grooming",
    "cat health",
    "cat feeding",
    "cat blog",
    "Mr n Mrs Pet cat blog",
  ],
  authors: [{ name: "Mr n Mrs Pet", url: "https://www.mrnmrspet.com" }],
  creator: "Mr n Mrs Pet",
  publisher: "Mr n Mrs Pet",
  openGraph: {
    title: "Cat Care Tips & Guides | Mr n Mrs Pet",
    description:
      "Read our blogs for expert advice on taking care of your cat, including grooming, feeding, and health tips.",
    url: "https://www.mrnmrspet.com/cat-care",
    siteName: "Mr n Mrs Pet",
    images: [
      {
        url: "/cats-care-hero.webp",
        width: 1200,
        height: 630,
        alt: "Cat Care Blog - Mr n Mrs Pet",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cat Care Tips & Guides | Mr n Mrs Pet",
    description:
      "Expert cat care guides on grooming, feeding, health, and more at Mr n Mrs Pet.",
    images: ["/cats-care-hero.webp"],
    creator: "@mrnmrspet",
  },
  alternates: {
    canonical: "https://www.mrnmrspet.com/cat-care",
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "Cat Care Blog",
};

export default function CatCareLayout({ children }: { children: React.ReactNode }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Cat Care Tips & Guides | Mr n Mrs Pet",
    url: "https://www.mrnmrspet.com/cat-care",
    publisher: {
      "@type": "Organization",
      name: "Mr n Mrs Pet",
      url: "https://www.mrnmrspet.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mrnmrspet.com/logo.png",
      },
    },
    mainEntityOfPage: children
      ? React.Children.map(children, (child, index) => ({
          "@type": "BlogPosting",
          headline: (child as any).props?.title || `Cat Blog Post ${index + 1}`,
          datePublished: (child as any).props?.date || new Date().toISOString(),
          url: `https://www.mrnmrspet.com/cat-care#${index + 1}`,
        }))
      : [],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
