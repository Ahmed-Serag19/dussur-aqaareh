import type React from "react";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "./providers";
import { LookupPreloader } from "@/components/performance/lookup-preloader";

const cairoFont = Cairo({ subsets: ["arabic", "latin"] });

export const metadata: Metadata = {
  title: {
    default: "دُسر العقارية | أفضل منصة للعقارات في السعودية",
    template: "%s | دُسر العقارية",
  },
  description:
    "اكتشف أفضل الشقق، الفلل، المحلات، والأراضي للإيجار في المملكة العربية السعودية مع دُسر العقارية. خدمات تأجير شاملة ومواقع مميزة.",
  keywords:
    "عقارات السعودية, تأجير شقق, تأجير فلل, تأجير محلات, تأجير أراضي, دُسر العقارية, عقارات الرياض, عقارات جدة, عقارات الدمام",
  authors: [{ name: "دُسر العقارية" }],
  creator: "دُسر العقارية",
  publisher: "دُسر العقارية",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aqaar.dussur.sa"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://aqaar.dussur.sa",
    siteName: "دُسر العقارية",
    title: "دُسر العقارية | أفضل منصة للعقارات في السعودية",
    description:
      "اكتشف أفضل الشقق، الفلل، المحلات، والأراضي للإيجار في المملكة العربية السعودية مع دُسر العقارية.",
    images: [
      {
        url: "/images/main-layout-logo.png",
        width: 98,
        height: 98,
        alt: "دُسر العقارية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "دُسر العقارية | أفضل منصة للعقارات في السعودية",
    description:
      "اكتشف أفضل الشقق، الفلل، المحلات، والأراضي للإيجار في المملكة العربية السعودية مع دُسر العقارية.",
    images: ["/images/main-layout-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "دُسر العقارية",
              url: "https://aqaar.dussur.sa",
              logo: "https://aqaar.dussur.sa/images/main-layout-logo.png",
              description:
                "أفضل منصة للعقارات في السعودية - تأجير شقق، فلل، محلات، وأراضي",
              address: {
                "@type": "PostalAddress",
                addressCountry: "SA",
                addressRegion: "الرياض",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+966582906777",
                  contactType: "customer service",
                  areaServed: "SA",
                  availableLanguage: ["Arabic", "English"],
                },
              ],
              areaServed: {
                "@type": "Country",
                name: "Saudi Arabia",
              },
              serviceType: "Real Estate Rental",
              sameAs: ["https://aqaar.dussur.sa"],
            }),
          }}
        />
      </head>
      <body
        className={`${cairoFont.className} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <LookupPreloader />
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
