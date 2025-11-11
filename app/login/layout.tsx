import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Mr n Mrs Pet",
  description:
    "Login to your Mr n Mrs Pet account to explore verified pets for sale, adoption, grooming, and more. Manage your profile and enjoy personalized pet care services.",
  keywords: [
    "login",
    "Mr n Mrs Pet",
    "pet store login",
    "pet adoption India",
    "buy pets online",
    "pet marketplace account",
    "pet care services",
  ],
  authors: [{ name: "Mr n Mrs Pet", url: "https://www.mrnmrspet.com" }],
  creator: "Mr n Mrs Pet",
  publisher: "Mr n Mrs Pet",
  openGraph: {
    title: "Login | Mr n Mrs Pet",
    description:
      "Access your Mr n Mrs Pet account — your trusted platform for buying, adopting, and caring for pets.",
    url: "https://www.mrnmrspet.com/login",
    siteName: "Mr n Mrs Pet",
    images: [
      {
        url: "/signup-bg.webp",
        width: 1200,
        height: 630,
        alt: "Login - Mr n Mrs Pet",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login | Mr n Mrs Pet",
    description:
      "Login to your Mr n Mrs Pet account and discover thousands of verified pets and services near you.",
    images: ["/signup-bg.webp"],
    creator: "@mrnmrspet",
  },
  alternates: {
    canonical: "https://www.mrnmrspet.com/login",
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

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Login | Mr n Mrs Pet",
    url: "https://www.mrnmrspet.com/login",
    description:
      "Login securely to your Mr n Mrs Pet account to manage your pets, explore services, and connect with verified breeders and pet parents.",
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
      name: "Mr n Mrs Pet User Account",
      description:
        "Registered users can access pet listings, manage their profiles, and post pet ads on Mr n Mrs Pet.",
      url: "https://www.mrnmrspet.com/login",
      sameAs: [
        "https://www.facebook.com/mrnmrspet",
        "https://www.instagram.com/mrnmrspet",
        "https://x.com/mrnmrspet",
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
