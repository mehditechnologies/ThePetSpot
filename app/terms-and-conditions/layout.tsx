import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Mr n Mrs Pet",
  description:
    "Read the official Terms and Conditions of Mr n Mrs Pet – governing your use of our pet services, including grooming, adoption, training, and accessories. Stay informed and safe.",
  keywords: [
    "Mr n Mrs Pet Terms and Conditions",
    "pet adoption terms",
    "pet grooming policy",
    "Mr n Mrs Pet legal",
    "refund policy pets",
    "pet care services India",
  ],
  authors: [{ name: "Mr n Mrs Pet", url: "https://www.mrnmrspet.com" }],
  creator: "Mr n Mrs Pet",
  publisher: "Mr n Mrs Pet",
  openGraph: {
    title: "Terms & Conditions | Mr n Mrs Pet",
    description:
      "These Terms and Conditions govern the use of Mr n Mrs Pet’s platform and services including grooming, training, and pet adoption support.",
    url: "https://www.mrnmrspet.com/terms-and-conditions",
    siteName: "Mr n Mrs Pet",
    images: [
      {
        url: "/terms.webp",
        width: 1200,
        height: 630,
        alt: "Mr n Mrs Pet Terms & Conditions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Mr n Mrs Pet",
    description:
      "Learn more about Mr n Mrs Pet’s Terms & Conditions – your trusted pet care and adoption partner.",
    images: ["/terms.webp"],
    creator: "@mrnmrspet",
  },
  alternates: {
    canonical: "https://the-pet-spot-v1.vercel.app/terms-and-conditions",
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

// ✅ Schema.org structured data (for rich results)
export default function TermsAndConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions | Mr n Mrs Pet",
    url: "https://www.mrnmrspet.com/terms-and-conditions",
    description:
      "Official Terms & Conditions outlining the policies, legal disclaimers, and service rules for Mr n Mrs Pet users.",
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
