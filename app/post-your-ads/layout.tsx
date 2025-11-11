import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pets for Sale | Mr n Mrs Pet",
  description:
    "Find adorable pets for sale at Mr n Mrs Pet. Browse verified listings of dogs, cats, birds, and more from trusted pet parents and breeders across India.",
  keywords: [
    "pets for sale",
    "dogs for sale",
    "cats for sale",
    "birds for sale",
    "Mr n Mrs Pet",
    "buy pets online",
    "pet adoption India",
    "pet marketplace",
  ],
  authors: [{ name: "Mr n Mrs Pet", url: "https://www.mrnmrspet.com" }],
  creator: "Mr n Mrs Pet",
  publisher: "Mr n Mrs Pet",
  openGraph: {
    title: "Pets for Sale | Mr n Mrs Pet",
    description:
      "Explore a wide range of verified pets for sale including dogs, cats, and other adorable companions at Mr n Mrs Pet.",
    url: "https://www.mrnmrspet.com/pet-for-sale",
    siteName: "Mr n Mrs Pet",
    images: [
      {
        url: "/aboutBg.webp",
        width: 1200,
        height: 630,
        alt: "Pets for Sale - Mr n Mrs Pet",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pets for Sale | Mr n Mrs Pet",
    description:
      "Buy or adopt your next furry friend from trusted pet parents and breeders on Mr n Mrs Pet.",
    images: ["/aboutBg.webp"],
    creator: "@mrnmrspet",
  },
  alternates: {
    canonical: "https://www.mrnmrspet.com/pet-for-sale",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  category: "Pet Marketplace",
};

export default function PetForSaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pets for Sale | Mr n Mrs Pet",
    url: "https://www.mrnmrspet.com/pet-for-sale",
    description:
      "Find verified pets for sale at Mr n Mrs Pet — dogs, cats, birds, and more from responsible pet owners and breeders across India.",
    publisher: {
      "@type": "Organization",
      name: "Mr n Mrs Pet",
      url: "https://www.mrnmrspet.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mrnmrspet.com/logo.png",
      },
    },
    mainEntity: {
      "@type": "OfferCatalog",
      name: "Pet Listings",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Dog for Sale",
            category: "Pets",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Cat for Sale",
            category: "Pets",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Bird for Sale",
            category: "Pets",
          },
        },
      ],
    },
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