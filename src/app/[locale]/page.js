import Head from 'next/head';
import AboutDoctor from '@/landing-page-components/about-doctor';
import AboutClinic from '@/landing-page-components/about-clinic';
import LandingPageServices from '@/landing-page-components/clinic-services';
import WhyToothMate from '@/landing-page-components/why-toothmate';
import ToothMateTeam from '@/landing-page-components/toothmate-team';
import States from '@/landing-page-components/states';
import Booking from '@/landing-page-components/booking';
import FQS from '@/landing-page-components/FQS';
import Blogs from '@/landing-page-components/blogs';
import CtaButtons from '@/components/cta-buttons';
import ServiceBar from '@/landing-page-components/services-bar';
import Reviews from '@/landing-page-components/reviews';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'landingPage.metadata' });

  const baseUrl = 'https://toothmatedental.com';

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'ar': `${baseUrl}/ar`,
        'en': `${baseUrl}/en`,
        'x-default': `${baseUrl}/ar`
      }
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `${baseUrl}/${locale}`,
      siteName: t('siteName'),
      images: [
        {
          url: `${baseUrl}/images/Doctor.webp`,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt')
        }
      ],
      type: 'website',
      locale: locale === 'ar' ? 'ar_EG' : 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [`${baseUrl}/images/Doctor.webp`]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://toothmatedental.com';

  // فقط الـ Structured Data الأساسية للصفحة الرئيسية
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tooth Mate Dental Clinic",
    "alternateName": ["Tooth Mate", "عيادة توث ميت"],
    "url": baseUrl,
    "description": locale === 'ar'
      ? "أفضل عيادة أسنان في القاهرة تقدم خدمات متكاملة من تجميل الأسنان إلى الجراحات المتقدمة"
      : "Best dental clinic in Cairo offering comprehensive services from cosmetic dentistry to advanced surgeries",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "inLanguage": [locale === 'ar' ? "ar-EG" : "en-US"]
  };

  // Breadcrumb للصفحة الرئيسية فقط
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'ar' ? 'الرئيسية' : 'Home',
        "item": `${baseUrl}/${locale}`
      }
    ]
  };

  return (
    <>
      <Head>
        {/* فقط الـ Structured Data الخاصة بالصفحة الرئيسية */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
          key="website-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
          key="breadcrumb-schema"
        />
      </Head>

      <section itemScope itemType="https://schema.org/DentalClinic" className='bg-[#D3F3FF]' >
        <AboutDoctor />
        <AboutClinic />
        <LandingPageServices />
        <WhyToothMate />
        <ToothMateTeam />
        <States id="cases" />
        <Booking />
        <ServiceBar />
        <CtaButtons />
        <FQS />
        <Reviews />
        <Blogs />
      </section>
    </>
  );
}