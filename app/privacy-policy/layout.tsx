import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Mr n Mrs Pet",
  description:
    "Read the official Privacy Policy of Mr n Mrs Pet to learn how we collect, process, store, and protect your personal data in compliance with the Digital Personal Data Protection Act, 2023.",
  keywords: [
    "Mr n Mrs Pet privacy policy",
    "pet data protection",
    "pet service data usage",
    "Mr n Mrs Pet data privacy",
    "Digital Personal Data Protection Act compliance",
    "pet website privacy policy",
  ],
  authors: [{ name: "Mr n Mrs Pet", url: "https://www.mrnmrspet.com" }],
  creator: "Mr n Mrs Pet",
  publisher: "Mr n Mrs Pet",
  openGraph: {
    title: "Privacy Policy | Mr n Mrs Pet",
    description:
      "Mr n Mrs Pet’s Privacy Policy explains how we collect, use, and safeguard your information under India’s data protection laws.",
    url: "https://www.mrnmrspet.com/privacy-policy",
    siteName: "Mr n Mrs Pet",
    images: [
      {
        url: "/Blog/blog.webp",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Mr n Mrs Pet",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Mr n Mrs Pet",
    description:
      "Learn how Mr n Mrs Pet protects your privacy and manages your personal data responsibly and securely.",
    images: ["/Blog/blog.webp"],
    creator: "@mrnmrspet",
  },
  alternates: {
    canonical: "https://www.mrnmrspet.com/privacy-policy",
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
  category: "Privacy Policy",
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    name: "Privacy Policy | Mr n Mrs Pet",
    url: "https://www.mrnmrspet.com/privacy-policy",
    description:
      "Official Privacy Policy of Mr n Mrs Pet detailing how we handle, store, and use customer information in compliance with Indian data protection laws.",
    publisher: {
      "@type": "Organization",
      name: "Mr n Mrs Pet",
      url: "https://www.mrnmrspet.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mrnmrspet.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.mrnmrspet.com/privacy-policy",
    },
    potentialAction: {
      "@type": "ReadAction",
      target: "https://www.mrnmrspet.com/privacy-policy",
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
    