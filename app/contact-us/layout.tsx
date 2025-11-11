import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Mr n Mrs Pet",
  description:
    "Get in touch with Mr n Mrs Pet for inquiries, feedback, or support. Reach out via email, phone, or visit our office in Jaipur, Rajasthan.",
  keywords: [
    "contact Mr n Mrs Pet",
    "pet support",
    "pet service contact",
    "feedback",
    "customer support",
  ],
  authors: [{ name: "Mr n Mrs Pet", url: "https://www.mrnmrspet.com" }],
  creator: "Mr n Mrs Pet",
  publisher: "Mr n Mrs Pet",
  openGraph: {
    title: "Contact Us | Mr n Mrs Pet",
    description:
      "Reach out to Mr n Mrs Pet for inquiries, support, or feedback regarding our pet services and products.",
    url: "https://www.mrnmrspet.com/contact",
    siteName: "Mr n Mrs Pet",
    images: [
      {
        url: "/contact.webp",
        width: 1200,
        height: 630,
        alt: "Contact Mr n Mrs Pet",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Mr n Mrs Pet",
    description:
      "Contact Mr n Mrs Pet via email, phone, or visit our office in Jaipur, Rajasthan for pet-related inquiries.",
    images: ["/contact.webp"],
    creator: "@mrnmrspet",
  },
  alternates: {
    canonical: "https://www.mrnmrspet.com/contact",
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
  category: "Contact Page",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mr n Mrs Pet",
    url: "https://www.mrnmrspet.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.mrnmrspet.com/logo.png",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+919257022415",
      contactType: "customer support",
      email: "support@mrnmrspet.com",
      areaServed: "IN",
    },
    sameAs: [
      "https://www.facebook.com/mrnmrspet",
      "https://www.instagram.com/mrnmrspet",
      "https://twitter.com/mrnmrspet",
    ],
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
