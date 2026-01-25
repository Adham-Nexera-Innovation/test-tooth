import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import CTA from '@/components/cta-buttons';

// Static Generation Configuration
export const revalidate = 604800; // Revalidate every week

// SEO Metadata for General Anesthesia Page
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations('generalAnesthesia.metadata');

    const baseUrl = 'https://toothmatedental.com';
    const canonicalPath = locale === 'ar' ? '/التخدير-الكلي/خدماتنا' : '/our-services/general-anesthesia';

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        alternates: {
            canonical: `${baseUrl}${canonicalPath}`,
            languages: {
                'ar': `${baseUrl}/ar${canonicalPath}`,
                'en': `${baseUrl}/en${canonicalPath}`,
                'x-default': `${baseUrl}/ar${canonicalPath}`
            }
        },
        openGraph: {
            title: t('ogTitle'),
            description: t('ogDescription'),
            type: 'website',
            locale: locale === 'ar' ? 'ar_EG' : 'en_US',
            url: `${baseUrl}/${locale}${canonicalPath}`,
            siteName: 'Tooth Mate Dental Clinic',
            images: [
                {
                    url: `${baseUrl}/images/general-anesthesia.jpeg`,
                    width: 1200,
                    height: 630,
                    alt: locale === 'ar' ? 'التخدير الكلي في عيادة توث ميت' : 'General Anesthesia at Tooth Mate Clinic'
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: [`${baseUrl}/images/general-anesthesia.jpeg`],
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
            }
        },
    };
}

export default async function GeneralAnesthesiaService({ params }) {
    const { locale } = await params;
    const t = await getTranslations('generalAnesthesia');

    const baseUrl = 'https://toothmatedental.com';
    const canonicalPath = locale === 'ar' ? '/التخدير-الكلي/خدماتنا' : '/our-services/general-anesthesia';

    // Structured Data for General Anesthesia Service
    const anesthesiaStructuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": t('structuredData.serviceName'),
        "description": t('structuredData.serviceDescription'),
        "url": `${baseUrl}/${locale}${canonicalPath}`,
        "provider": {
            "@type": "DentalClinic",
            "name": "Tooth Mate Dental Clinic",
            "url": baseUrl,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": locale === 'ar' ? "شارع 263، المعادي الجديدة" : "Street 263, New Maadi",
                "addressLocality": locale === 'ar' ? "القاهرة" : "Cairo",
                "addressCountry": "EG"
            },
            "telephone": "+20-100-123-4567",
            "areaServed": locale === 'ar' ? "القاهرة، مصر" : "Cairo, Egypt"
        },
        "serviceType": "General Anesthesia for Dental Procedures",
        "category": "MedicalProcedure",
        "offers": {
            "@type": "Offer",
            "description": locale === 'ar' ? "خدمات التخدير الكلي لعمليات الأسنان" : "General anesthesia services for dental procedures"
        }
    };

    // Breadcrumb Structured Data
    const breadcrumbStructuredData = {
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
                "name": locale === 'ar' ? 'الخدمات' : 'Services',
                "item": `${baseUrl}/${locale}${locale === 'ar' ? '/الخدمات' : '/services'}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": t('structuredData.serviceName'),
                "item": `${baseUrl}/${locale}${canonicalPath}`
            }
        ]
    };

    // FAQ Structured Data
    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": locale === 'ar' ? "هل التخدير الكلي آمن لعمليات الأسنان؟" : "Is general anesthesia safe for dental procedures?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "نعم، مع فريق طبي متخصص وأجهزة مراقبة متطورة نضمن أعلى معايير الأمان" : "Yes, with a specialized medical team and advanced monitoring equipment, we ensure the highest safety standards"
                }
            },
            {
                "@type": "Question",
                "name": locale === 'ar' ? "كم تستغرق فترة التعافي من التخدير الكلي؟" : "How long does recovery from general anesthesia take?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "معظم المرضى يتعافون تماماً خلال 24 ساعة مع اتباع التعليمات الطبية" : "Most patients recover completely within 24 hours by following medical instructions"
                }
            },
            {
                "@type": "Question",
                "name": locale === 'ar' ? "ما الإجراءات المطلوبة قبل التخدير الكلي؟" : "What preparations are needed before general anesthesia?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "الصيام لمدة 6-8 ساعات والتقييم الطبي الشامل قبل العملية" : "Fasting for 6-8 hours and comprehensive medical evaluation before the procedure"
                }
            }
        ]
    };

    return (
        <section className='bg-[#D3F3FF]'>
            {/* Structured Data Scripts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(anesthesiaStructuredData) }}
                key="anesthesia-service-schema"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
                key="breadcrumb-schema"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
                key="faq-schema"
            />

            {/* Hero Section */}
            <div
                className="relative bg-[url('/images/general-anesthesia.jpeg')] bg-cover bg-center h-[400px] w-full flex justify-center items-center text-white font-bold"
                role="banner"
                aria-label={t('hero.ariaLabel')}
                itemScope
                itemType="https://schema.org/MedicalClinic"
            >
                <h1 className="absolute z-10 text-2xl md:text-4xl text-center px-4" itemProp="name">
                    {t('hero.title')}
                </h1>
                <div className="absolute inset-0 bg-[#004E6AAD] z-0"></div>
            </div>

            <CTA />

            {/* Main Content Section */}
            <section className="container-custom" itemScope itemProp="mainContentOfPage">

                {/* Introduction Section */}
                <div className="my-8 text-center">
                    <p className="text-2xl md:text-[28px] font-bold mb-4">
                        {t('introduction.title')} <span className="text-black">{t('introduction.highlight')}</span>
                    </p>
                    <p className="text-[20px] md:text-2xl" itemProp="description">
                        {t('introduction.description')}
                    </p>
                </div>

                {/* Main Service Image */}
                <div className="w-full h-[300px] md:h-[600px] relative rounded-4xl overflow-hidden my-8">
                    <Image
                        src="/images/general-anesthesia-main.avif"
                        alt={t('images.mainImageAlt')}
                        fill
                        className="object-cover"
                        priority
                        itemProp="image"
                    />
                </div>

                {/* What Is General Anesthesia Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6" itemProp="name">
                        {t('whatIsAnesthesia.title')}
                    </h2>
                    <ul className="space-y-6">
                        {[1, 2, 3].map((item) => (
                            <li key={item} className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-3 flex-shrink-0"></div>
                                <p className="text-[18px] md:text-2xl leading-relaxed" itemProp="description">
                                    {t(`whatIsAnesthesia.point${item}`)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* When Needed Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('whenNeeded.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-[#0178A3] mb-4">
                                {t('whenNeeded.medicalCases')}
                            </h3>
                            <ul className="space-y-3">
                                {[1, 2, 3, 4].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-700">
                                            {t(`whenNeeded.medicalCase${item}`)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-[#0178A3] mb-4">
                                {t('whenNeeded.procedureTypes')}
                            </h3>
                            <ul className="space-y-3">
                                {[1, 2, 3, 4].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-700">
                                            {t(`whenNeeded.procedure${item}`)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Safety and Monitoring Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('safety.title')}
                    </h2>
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-[#0178A3] mb-4">
                                    {t('safety.monitoring')}
                                </h3>
                                <ul className="space-y-3">
                                    {[1, 2, 3, 4].map((item) => (
                                        <li key={item} className="flex items-center gap-3">
                                            <Image
                                                src="/icons/safety-check.png"
                                                width={20}
                                                height={20}
                                                alt="Safety check icon"
                                                itemProp="image"
                                            />
                                            <span className="text-gray-700">{t(`safety.monitoringPoint${item}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0178A3] mb-4">
                                    {t('safety.team')}
                                </h3>
                                <ul className="space-y-3">
                                    {[1, 2, 3].map((item) => (
                                        <li key={item} className="flex items-center gap-3">
                                            <Image
                                                src="/icons/medical-team.png"
                                                width={20}
                                                height={20}
                                                alt="Medical team icon"
                                                itemProp="image"
                                            />
                                            <span className="text-gray-700">{t(`safety.teamMember${item}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Procedure Steps Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('procedure.title')}
                    </h2>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-[#0178A3] text-white rounded-full flex items-center justify-center font-bold">
                                    {item}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#0178A3] mb-2">
                                        {t(`procedure.step${item}Title`)}
                                    </h3>
                                    <p className="text-gray-700">
                                        {t(`procedure.step${item}Description`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recovery Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('recovery.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <h3 className="text-xl font-bold text-[#0178A3] mb-4">
                                {t('recovery.immediateCare')}
                            </h3>
                            <ul className="space-y-3">
                                {[1, 2, 3, 4].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-gray-700">{t(`recovery.carePoint${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <h3 className="text-xl font-bold text-[#0178A3] mb-4">
                                {t('recovery.timeline')}
                            </h3>
                            <ul className="space-y-3">
                                {[1, 2, 3].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-gray-700">{t(`recovery.timelinePoint${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                        {t('features.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 text-center">
                                <div className="w-12 h-12 bg-[#0178A3] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Image
                                        src="/icons/check-white.png"
                                        width={24}
                                        height={24}
                                        alt="Feature icon"
                                        itemProp="image"
                                    />
                                </div>
                                <p className="text-gray-700 font-semibold">
                                    {t(`features.point${item}`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preparation Guidelines Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('preparation.title')}
                    </h2>
                    <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-[#0178A3] mb-4">
                                    {t('preparation.beforeProcedure')}
                                </h3>
                                <ul className="space-y-3">
                                    {[1, 2, 3, 4].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-gray-700">{t(`preparation.guideline${item}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0178A3] mb-4">
                                    {t('preparation.dayOfProcedure')}
                                </h3>
                                <ul className="space-y-3">
                                    {[1, 2, 3].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-gray-700">{t(`preparation.dayGuideline${item}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#4DC0C1] from-[20%] to-[#04729A] to-[100%] text-white">
                <div className="container-custom py-8">
                    <h5 className="text-[20px] md:text-[28px] font-bold mb-4">
                        {t('cta.title')}
                    </h5>
                    <p className="pb-4 text-[16px] md:text-[20px] mb-6" itemProp="description">
                        {t('cta.description')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/contact-us" prefetch={true}>
                            <button className="bg-white text-[#0178A3] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300 cursor-pointer">
                                {locale === 'ar' ? 'احجز استشارتك الآن' : 'Book Your Consultation Now'}
                            </button>
                        </Link>
                        <Link href='/'>
                            <button className="bg-transparent cursor-pointer border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-[#0178A3] transition duration-300">
                                {locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}