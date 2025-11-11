import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Mr n Mrs Pet",
  description:
    "Read the official Terms of Use for Mr n Mrs Pet. Learn about the rules, responsibilities, and conditions that govern the use of our website, services, and pet-related offerings.",
  keywords: [
    "Mr n Mrs Pet Terms of Use",
    "pet service agreement",
    "Mr n Mrs Pet policy",
    "pet adoption terms",
    "pet care India",
    "online pet store rules",
  ],
  authors: [{ name: "Mr n Mrs Pet", url: "https://www.mrnmrspet.com" }],
  creator: "Mr n Mrs Pet",
  publisher: "Mr n Mrs Pet",
  openGraph: {
    title: "Terms of Use | Mr n Mrs Pet",
    description:
      "Review Mr n Mrs Pet’s Terms of Use to understand your rights and responsibilities when accessing our pet services and platform.",
    url: "https://www.mrnmrspet.com/terms-of-use",
    siteName: "Mr n Mrs Pet",
    images: [
      {
        url: "/terms.webp",
        width: 1200,
        height: 630,
        alt: "Mr n Mrs Pet Terms of Use",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | Mr n Mrs Pet",
    description:
      "Official Terms of Use for Mr n Mrs Pet — covering website access, service usage, and legal obligations.",
    images: ["/terms.webp"],
    creator: "@mrnmrspet",
  },
  alternates: {
    canonical: "https://www.mrnmrspet.com/terms-of-use",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "Pet Services",
};

export default function TermsOfUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Use | Mr n Mrs Pet",
    url: "https://www.mrnmrspet.com/terms-of-use",
    description:
      "Mr n Mrs Pet Terms of Use — outlining the legal terms for using our pet services, website, and digital offerings.",
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
      "@type": "Organization",
      name: "Mr n Mrs Pet",
      sameAs: [
        "https://www.facebook.com/mrnmrspet",
        "https://www.instagram.com/mrnmrspet",
        "https://twitter.com/mrnmrspet",
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
