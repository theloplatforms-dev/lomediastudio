import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LazyWhatsApp from "./components/LazyWhatsApp";
import { CONTACT, DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Video Production, Photography & Branding in Ottawa`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Creative Media Studio in Ottawa`,
    description: SITE_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 675, alt: `${SITE_NAME} creative workspace` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Creative Media Studio in Ottawa`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  description: SITE_DESCRIPTION,
  email: CONTACT.email,
  telephone: CONTACT.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.street,
    addressLocality: CONTACT.city,
    addressRegion: CONTACT.region,
    postalCode: CONTACT.postalCode,
    addressCountry: CONTACT.country,
  },
  areaServed: [{ "@type": "City", name: "Ottawa" }, { "@type": "Country", name: "Canada" }],
  knowsAbout: [
    "Video production",
    "Photography",
    "Brand storytelling",
    "Visual brand development",
    "Digital marketing",
    "Email marketing",
    "Creative direction",
    "Media content creation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <Suspense>
          <Navbar />
        </Suspense>
        <div id="main-content" className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
        <LazyWhatsApp />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
