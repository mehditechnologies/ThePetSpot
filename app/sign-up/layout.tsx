import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Mr n Mrs Pet",
  description:
    "Create your free account on Mr n Mrs Pet to book grooming, training, and pet care services. Join our trusted community of pet parents and professionals today.",
  keywords: [
    "Mr n Mrs Pet signup",
    "create pet account",
    "join Mr n Mrs Pet",
    "pet parent registration",
    "pet grooming booking",
    "pet care login",
  ],
  authors: [{ name: "Mr n Mrs Pet", url: "https://www.mrnmrspet.com" }],
  creator: "Mr n Mrs Pet",
  publisher: "Mr n Mrs Pet",
  openGraph: {
    title: "Sign Up | Mr n Mrs Pet",
    description:
      "Join Mr n Mrs Pet – India’s trusted pet platform for adoption, grooming, training, and more. Create your account today and start your pet journey.",
    url: "https://www.mrnmrspet.com/signup",
    siteName: "Mr n Mrs Pet",
    images: [
      {
        url: "/signup-bg.webp",
        width: 1200,
        height: 630,
        alt: "Sign Up - Mr n Mrs Pet",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up | Mr n Mrs Pet",
    description:
      "Join Mr n Mrs Pet – your one-stop platform for pet adoption, grooming, and care services across India.",
    images: ["/signup-bg.webp"],
    creator: "@mrnmrspet",
  },
  alternates: {
    canonical: "https://www.mrnmrspet.com/signup",
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

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sign Up | Mr n Mrs Pet",
    url: "https://www.mrnmrspet.com/signup",
    description:
      "User registration page for Mr n Mrs Pet – where pet lovers and service providers can join our growing community.",
    potentialAction: {
      "@type": "RegisterAction",
      target: "https://www.mrnmrspet.com/signup",
      name: "Sign Up",
    },
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
