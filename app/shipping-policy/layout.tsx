import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Mr n Mrs Pet",
  description:
    "Learn about Mr n Mrs Pet’s Shipping Policy, including delivery timelines, coverage areas, logistics partners, and order tracking details for pet products and accessories.",
  keywords: [
    "Mr n Mrs Pet shipping policy",
    "pet product delivery India",
    "pet accessories shipping",
    "Mr n Mrs Pet logistics",
    "pet food delivery",
    "order tracking pets",
  ],
  authors: [{ name: "Mr n Mrs Pet", url: "https://www.mrnmrspet.com" }],
  creator: "Mr n Mrs Pet",
  publisher: "Mr n Mrs Pet",
  openGraph: {
    title: "Shipping Policy | Mr n Mrs Pet",
    description:
      "Understand Mr n Mrs Pet’s shipping and delivery policy — covering order processing, fulfillment timelines, and regional availability across India.",
    url: "https://www.mrnmrspet.com/shipping-policy",
    siteName: "Mr n Mrs Pet",
    images: [
      {
        url: "/terms.webp",
        width: 1200,
        height: 630,
        alt: "Shipping Policy - Mr n Mrs Pet",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping Policy | Mr n Mrs Pet",
    description:
      "Learn about shipping timelines, regions served, and delivery process at Mr n Mrs Pet – India’s trusted online pet care and product store.",
    images: ["/terms.webp"],
    creator: "@mrnmrspet",
  },
  alternates: {
    canonical: "https://www.mrnmrspet.com/shipping-policy",
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
  category: "Pet Services",
};

export default function ShippingPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Shipping Policy | Mr n Mrs Pet",
    url: "https://www.mrnmrspet.com/shipping-policy",
    description:
      "Official Shipping Policy of Mr n Mrs Pet outlining delivery timelines, order processing, and logistics coverage across India.",
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
    potentialAction: {
      "@type": "ReadAction",
      target: "https://www.mrnmrspet.com/shipping-policy",
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
