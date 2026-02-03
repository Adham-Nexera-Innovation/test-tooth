import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Location from '@/components/location';
import ConditionalContact from '@/components/conditional-contact';
import "../globals.css";
import { Cairo, Poppins } from 'next/font/google';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-cairo',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
  display: 'swap',
});


// Static generation for better performance
export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ar' }
  ];
}

// Base SEO metadata (per-page canonicals are handled automatically by Next.js)
export const metadata = {
  metadataBase: new URL('https://toothmatedental.com'),
  title: {
    default: 'Tooth Mate Dental Clinic - Best Dentist in Maadi, Cairo',
    template: '%s | Tooth Mate Dental Clinic'
  },
  description: 'Professional dental care and cosmetic dentistry services in Maadi, Cairo. Dental implants, Hollywood smile, braces, root canal treatment, and all dental services.',
  keywords: 'dental clinic, dentist, Maadi, Cairo, dental implants, braces, Hollywood smile, root canal, teeth whitening',
  authors: [{ name: 'Tooth Mate Dental Clinic' }],
  creator: 'Tooth Mate Dental Clinic',
  publisher: 'Tooth Mate Dental Clinic',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Tooth Mate Dental Clinic',
    title: 'Tooth Mate Dental Clinic - Best Dentist in Maadi, Cairo',
    description: 'Professional dental care and cosmetic dentistry services in Maadi, Cairo',
    url: 'https://toothmatedental.com',
    images: [
      {
        url: 'https://toothmatedental.com/icons/logo.png',
        width: 1200,
        height: 630,
        alt: 'Tooth Mate Dental Clinic - Best Dental Care in Maadi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tooth Mate Dental Clinic - Best Dentist in Maadi, Cairo',
    description: 'Professional dental care and cosmetic dentistry services in Maadi, Cairo',
    images: ['https://toothmatedental.com/icons/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'bLsbexabyBF4ql71rraXmhYYmzoAGmdQyY0PM2aqycI',
  },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;


  // Validate locale - default to Arabic
  const validLocale = ['ar', 'en'].includes(locale) ? locale : 'ar';

  // Get messages for the specific locale
  const messages = await getMessages({ locale: validLocale });

  // Structured Data for Dental Clinic
  const dentalClinicStructuredData = {
    "@context": "https://schema.org",
    "@type": "DentalClinic",
    "@id": "https://toothmatedental.com/#dental-clinic",
    "name": "Tooth Mate Dental Clinic",
    "alternateName": ["Tooth Mate", "عيادة توث ميت لطب الأسنان"],
    "url": "https://toothmatedental.com",
    "logo": "https://toothmatedental.com/images/logo.svg",
    "description": "Professional dental care and cosmetic dentistry services in Maadi, Cairo. Best dentist in Maadi offering dental implants, Hollywood smile, braces, and comprehensive dental treatments.",
    "medicalSpecialty": ["Dentistry", "CosmeticDentistry", "Orthodontics", "OralSurgery"],
    "priceRange": "$$",
    "currenciesAccepted": "EGP",
    "paymentAccepted": "Cash, Credit Card",
    "openingHours": [
      "Mo-Th 10:00-22:00",
      "Sa 10:00-22:00",
      "Su 10:00-22:00"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "263 Street - New Maadi",
      "addressLocality": "Cairo",
      "addressRegion": "Cairo Governorate",
      "postalCode": "11742",
      "addressCountry": "EG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.9596,
      "longitude": 31.2590
    },
    "telephone": "+20-100-329-4050",
    "email": "info@toothmatedental.com",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+20-100-329-4050",
        "contactType": "customer service",
        "availableLanguage": ["ar", "en"]
      }
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 29.9596,
        "longitude": 31.2590
      },
      "geoRadius": "20000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dental Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Dental Implants",
            "description": "Professional dental implant services with latest technology"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hollywood Smile",
            "description": "Cosmetic dentistry for perfect Hollywood smile"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Dental Braces",
            "description": "Orthodontic treatment with modern braces"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100063527632794&mibextid=wwXIfr&rdid=N52igTj1CEpfaoj3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16cett3Mem%2F%3Fmibextid%3DwwXIfr#",
      "https://www.instagram.com/toothmate_dental_clinic/?igsh=MW5jMnEzcGFvMHU1cg%3D%3D#"
    ]
  };

  // Website Structured Data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://toothmatedental.com/#website",
    "url": "https://toothmatedental.com",
    "name": "Tooth Mate Dental Clinic",
    "description": "Best dental clinic in Maadi, Cairo offering comprehensive dental care services",
    "publisher": {
      "@id": "https://toothmatedental.com/#dental-clinic"
    },
    "inLanguage": ["ar", "en"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://toothmatedental.com/{locale}/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang={validLocale} dir={validLocale === 'ar' ? 'rtl' : 'ltr'} className={`${cairo.variable} ${poppins.variable}`}>
      <Head>
        {/* Essential Meta */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#04729A" />

        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />


        {/* ✅ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dentalClinicStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
      </Head>

      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider
          locale={validLocale}
          messages={messages}
          timeZone="Africa/Cairo"
        >
          <main className="flex-1">
            <Header />
            {children}
            <ConditionalContact />
            <Location />
            <Footer />
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}