import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grievance Redressal Policy | Mr n Mrs Pet",
  description:
    "Learn about the Grievance Redressal Policy of Mr n Mrs Pet. Contact the Grievance Officer for any complaints or service-related issues and understand the resolution process.",
  keywords: [
    "grievance redressal",
    "complaint policy",
    "Mr n Mrs Pet",
    "pet marketplace",
    "customer support",
    "pet services complaint",
  ],
  authors: [{ name: "Mr n Mrs Pet", url: "https://www.mrnmrspet.com" }],
  creator: "Mr n Mrs Pet",
  publisher: "Mr n Mrs Pet",
  openGraph: {
    title: "Grievance Redressal Policy | Mr n Mrs Pet",
    description:
      "Access the Grievance Redressal Policy of Mr n Mrs Pet to understand complaint handling and resolution procedures for all pet-related services and products.",
    url: "https://www.mrnmrspet.com/grievance-redressal",
    siteName: "Mr n Mrs Pet",
    images: [
      {
        url: "/terms.webp",
        width: 1200,
        height: 630,
        alt: "Grievance Redressal Policy - Mr n Mrs Pet",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grievance Redressal Policy | Mr n Mrs Pet",
    description:
      "Review our Grievance Redressal Policy and reach out to the Grievance Officer for any complaints or service concerns at Mr n Mrs Pet.",
    images: ["/terms.webp"],
    creator: "@mrnmrspet",
  },
  alternates: {
    canonical: "https://www.mrnmrspet.com/grievance-redressal",
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
  category: "Pet Marketplace",
};

export default function GrievanceRedressalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Grievance Redressal Policy | Mr n Mrs Pet",
    url: "https://www.mrnmrspet.com/grievance-redressal",
    description:
      "Grievance Redressal Policy of Mr n Mrs Pet: process for handling complaints related to pets, services, and products on the platform.",
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
      "@type": "ContactPoint",
      contactType: "Customer Service",
      name: "Grievance Officer",
      email: "support@mrnmrspet.com",
      telephone: "+919257022415",
      areaServed: "IN",
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
