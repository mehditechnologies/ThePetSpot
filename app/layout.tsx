"use client";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

import Navbar from "@/Components/Navbar";
import Footer from "@/Components/LandingPage/Footer";

// Load Raleway via Next.js font optimization
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
});

// export const metadata: Metadata = {
//   title: "Find Healthy & Purebred Puppies",
//   description: "Using Raleway font",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';
  const isLogin = pathname === '/login';
  const isSignUp = pathname === '/sign-up';
  const isForgotPassword = pathname === '/forgot-password';
  const isResetPassword = pathname === '/reset-password';

  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <Toaster position="top-center" reverseOrder={false} />
        {!isLogin && !isSignUp && !isForgotPassword && !isResetPassword && <Navbar />}
        {children}
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}
