// app/[locale]/about-clinic/page.js
import AboutComponent from './AboutComponent';
import Script from 'next/script';
import { getLocale } from 'next-intl/server';

// وظيفة لإنشاء Metadata
export async function generateMetadata({ params }) {
    const locale = await getLocale();

    const baseUrl = 'https://toothmatedental.com';
    const canonicalPath = locale === 'ar' ? '/عن-العيادة' : '/about-clinic';
    const canonicalUrl = `${baseUrl}/${locale}${canonicalPath}`;

    const pageTitle = locale === 'ar'
        ? 'عن عيادة توث ميت لطب الأسنان - أفضل عيادة في المعادي'
        : 'About ToothMate Dental Clinic - Best Clinic in Maadi';

    const pageDescription = locale === 'ar'
        ? 'تعرف على عيادة توث ميت لطب الأسنان، خبرة 20+ سنة، 2000+ مريض سعيد، فريق طبي متخصص في زراعة الأسنان، هوليود سمايل وتقويم الأسنان'
        : 'Learn about ToothMate Dental Clinic, 20+ years experience, 2000+ happy patients, specialized medical team in dental implants, Hollywood smile and orthodontics';

    return {
        title: pageTitle,
        description: pageDescription,
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'ar-EG': `${baseUrl}/ar/عن-العيادة`,
                'en-US': `${baseUrl}/en/about-clinic`,
                'x-default': `${baseUrl}`
            }
        },
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: canonicalUrl,
            type: 'website',
            locale: locale === 'ar' ? 'ar_EG' : 'en_US',
            siteName: 'ToothMate Dental Clinic',
            images: [
                {
                    url: `${baseUrl}/images/clinic-team.webp`,
                    width: 1200,
                    height: 630,
                    alt: locale === 'ar' ? 'فريق عيادة توث ميت' : 'ToothMate Dental Clinic Team'
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDescription,
            images: [`${baseUrl}/images/clinic-team.webp`]
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1
            }
        },
        verification: {
            google: 'your-google-verification-code',
            yandex: 'your-yandex-verification-code',
            yahoo: 'your-yahoo-verification-code'
        }
    };
}

// وظيفة مساعدة لإنشاء Structured Data
const generateStructuredData = (locale) => {
    const baseUrl = 'https://toothmatedental.com';
    const currentDate = new Date().toISOString().split('T')[0];
    const canonicalPath = locale === 'ar' ? '/عن-العيادة' : '/about-clinic';

    return {
        // Medical Organization Schema
        organization: {
            "@context": "https://schema.org",
            "@type": "DentalClinic",
            "@id": `${baseUrl}/#dental-clinic`,
            "name": "Tooth Mate Dental Clinic",
            "alternateName": "عيادة توث ميت لطب الأسنان",
            "url": baseUrl,
            "logo": `${baseUrl}/icons/logo.svg`,
            "description": locale === 'ar'
                ? "عيادة متخصصة في زراعة الأسنان، التقويم، هوليود سمايل، تبييض الأسنان وعلاجات تجميل الأسنان باستخدام أحدث التقنيات الطبية في المعادي الجديدة."
                : "A specialized clinic in dental implants, orthodontics, Hollywood smile, teeth whitening and cosmetic dental treatments using the latest medical technologies in New Maadi.",
            "foundingDate": "2010",
            "founder": {
                "@type": "Person",
                "name": locale === 'ar' ? "دكتور محمد العبد" : "Dr. Mohamed Al-Abd"
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": locale === 'ar' ? "شارع 263 , المعادي الجديدة" : "Street 263, New Maadi",
                "addressLocality": locale === 'ar' ? "القاهرة" : "Cairo",
                "addressRegion": locale === 'ar' ? "القاهرة الكبرى" : "Greater Cairo",
                "postalCode": "11742",
                "addressCountry": "EG"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 30.0286,
                "longitude": 31.2810
            },
            "openingHours": locale === 'ar'
                ? "الاثنين-الخميس 15:00-22:00, السبت-الأحد 15:00-22:00, الجمعة 10:00-16:00"
                : "Mo-Th 15:00-22:00, Sa-Su 15:00-22:00, Fr 10:00-16:00",
            "telephone": "+20-100-329-4050",
            "priceRange": "$$",
            "medicalSpecialty": "Dentistry",
            "areaServed": locale === 'ar'
                ? ["القاهرة", "المعادي", "مصر الجديدة", "التجمع الخامس"]
                : ["Cairo", "Maadi", "New Cairo", "Fifth Settlement"],
            "knowsLanguage": ["ar", "en"],
            "award": locale === 'ar'
                ? ["أفضل عيادة أسنان في المعادي 2025", "شهادة التميز في طب الأسنان"]
                : ["Best Dental Clinic in Maadi 2025", "Excellence Certificate in Dentistry"],
            "employee": {
                "@type": "Person",
                "name": locale === 'ar' ? "دكتور محمد العبد" : "Dr. Mohamed Al-Abd",
                "jobTitle": locale === 'ar' ? "طبيب أسنان استشاري" : "Consultant Dentist"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "2000",
                "bestRating": "5",
                "worstRating": "1",
                "itemReviewed": {
                    "@type": "DentalClinic",
                    "name": "Tooth Mate Dental Clinic"
                }
            }
        },

        // Breadcrumb Schema
        breadcrumb: {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": locale === 'ar' ? 'الرئيسية' : 'Home',
                    "item": `${baseUrl}/${locale}`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": locale === 'ar' ? 'عن العيادة' : 'About Clinic',
                    "item": `${baseUrl}/${locale}${canonicalPath}`
                }
            ]
        },

        // FAQ Schema
        faq: {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": locale === 'ar' ? "كم سنة خبرة لدى العيادة؟" : "How many years of experience does the clinic have?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": locale === 'ar' ? "لدى العيادة أكثر من 20 سنة خبرة في مجال طب الأسنان" : "The clinic has over 20 years of experience in dentistry"
                    }
                },
                {
                    "@type": "Question",
                    "name": locale === 'ar' ? "ما هي الخدمات المقدمة؟" : "What services are provided?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": locale === 'ar' ? "نقدم زراعة الأسنان، هوليود سمايل، تقويم الأسنان، وعلاجات تجميلية متكاملة" : "We provide dental implants, Hollywood smile, orthodontics, and comprehensive cosmetic treatments"
                    }
                },
                {
                    "@type": "Question",
                    "name": locale === 'ar' ? "أين موقع العيادة؟" : "Where is the clinic located?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": locale === 'ar' ? "العيادة موجودة في شارع 263، المعادي الجديدة، القاهرة" : "The clinic is located at Street 263, New Maadi, Cairo"
                    }
                }
            ]
        },

        // AboutPage Schema
        aboutPage: {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": locale === 'ar' ? "عن عيادة توث ميت لطب الأسنان" : "About Tooth Mate Dental Clinic",
            "description": locale === 'ar' ? "تعرف على عيادة توث ميت لطب الأسنان، فريقنا الطبي، رسالتنا ورؤيتنا في تقديم أفضل خدمات طب الأسنان." : "Learn about Tooth Mate Dental Clinic, our medical team, mission and vision in providing the best dental services.",
            "url": `${baseUrl}/${locale}${canonicalPath}`,
            "mainEntity": {
                "@type": "DentalClinic",
                "name": "Tooth Mate Dental Clinic",
                "description": locale === 'ar'
                    ? "عيادة متخصصة في زراعة الأسنان، التقويم، هوليود سمايل، تبييض الأسنان وعلاجات تجميل الأسنان باستخدام أحدث التقنيات الطبية في المعادي الجديدة."
                    : "A specialized clinic in dental implants, orthodontics, Hollywood smile, teeth whitening and cosmetic dental treatments using the latest medical technologies in New Maadi."
            },
            "datePublished": "2024-01-01",
            "dateModified": currentDate,
            "publisher": {
                "@type": "Organization",
                "name": "Tooth Mate Dental Clinic"
            }
        },

        // Review Schema
        review: {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
                "@type": "DentalClinic",
                "name": "Tooth Mate Dental Clinic",
                "image": `${baseUrl}/images/clinic-team.webp`
            },
            "author": {
                "@type": "Person",
                "name": locale === 'ar' ? "محمد أحمد" : "Mohamed Ahmed"
            },
            "datePublished": "2024-01-15",
            "reviewBody": locale === 'ar' ? "تجربة رائعة وخدمة ممتازة، فريق طبي محترف جداً وأنصح الجميع بتجربة العيادة" : "Excellent experience and service, very professional medical team and I recommend everyone to try the clinic",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
            }
        },

        // AggregateRating Schema
        aggregateRating: {
            "@context": "https://schema.org",
            "@type": "AggregateRating",
            "itemReviewed": {
                "@type": "DentalClinic",
                "name": "Tooth Mate Dental Clinic",
                "image": `${baseUrl}/images/clinic-team.webp`
            },
            "ratingValue": "4.8",
            "ratingCount": "2000",
            "bestRating": "5",
            "worstRating": "1"
        },

        // Video Schema
        video: {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "ToothMate team in action",
            "description": "فيديو يوضح فريق ToothMate في العمل",
            "thumbnailUrl": `${baseUrl}/images/vid-poster.png`,
            "uploadDate": "2026-01-21",
            "contentUrl": `${baseUrl}/videos/toothmate.mp4`,
            "embedUrl": `${baseUrl}/videos/toothmate.mp4`,
            "publisher": {
                "@type": "Organization",
                "name": "Tooth Mate Dental Clinic",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/images/clinic-team.webp`
                }
            }

        }
    }
};

export default function AboutPage({ params }) {
    // استخراج locale من params
    const locale = getLocale();

    // توليد structured data
    const structuredData = generateStructuredData(locale);

    return (
        <>
            {/* إضافة Structured Data باستخدام Script component */}
            <Script
                id="organization-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.organization) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.breadcrumb) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.faq) }}
            />
            <Script
                id="about-page-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.aboutPage) }}
            />
            <Script
                id="review-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.review) }}
            />
            <Script
                id="aggregate-rating-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.aggregateRating) }}
            />

            <Script
                id="video-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData.video)
                }}
            />



            {/* استدعاء المكون الرئيسي */}
            <AboutComponent />
        </>
    );
}

