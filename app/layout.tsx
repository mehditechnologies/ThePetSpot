// app/layout.tsx
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import Navbar from "@/Components/Navbar";
import Footer from "@/Components/LandingPage/Footer";

// Load Raleway via Next.js font optimization
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
});

// SEO Metadata
export const metadata: Metadata = {
  title: "Mr n Mrs Pet | Trusted Pet Care & Marketplace in India",
  description:
    "Mr n Mrs Pet offers trusted pet care services, adoption support, and a wide range of pets and pet products across India.",
  keywords: [
    "Mr n Mrs Pet",
    "pet care India",
    "pets for sale",
    "dog grooming",
    "cat care",
    "pet adoption",
    "pet products online",
    "pet services",
  ],
  authors: [{ name: "Mr n Mrs Pet", url: "https://www.mrnmrspet.com" }],
  creator: "Mr n Mrs Pet",
  publisher: "Mr n Mrs Pet",
  openGraph: {
    title: "Mr n Mrs Pet | Trusted Pet Care & Marketplace in India",
    description:
      "Discover Mr n Mrs Pet — trusted pet care, adoption support, and a marketplace for pets and pet products across India.",
    url: "https://www.mrnmrspet.com",
    siteName: "Mr n Mrs Pet",
    images: [{ url: "/aboutBg.webp", width: 1200, height: 630, alt: "Mr n Mrs Pet" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr n Mrs Pet | Trusted Pet Care & Marketplace in India",
    description:
      "Explore trusted pet care, adoption support, and a wide range of pets and pet products at Mr n Mrs Pet.",
    images: ["/aboutBg.webp"],
    creator: "@mrnmrspet",
  },
  alternates: { canonical: "https://www.mrnmrspet.com" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD structured data for Organization
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mr n Mrs Pet",
    url: "https://www.mrnmrspet.com",
    logo: "https://www.mrnmrspet.com/logo.png",
    sameAs: [
      "https://www.facebook.com/mrnmrspet",
      "https://www.instagram.com/mrnmrspet",
      "https://twitter.com/mrnmrspet",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+919257022415",
        contactType: "Customer Service",
        email: "support@mrnmrspet.com",
        areaServed: "IN",
      },
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
      <body className={`${raleway.variable} antialiased`}>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
