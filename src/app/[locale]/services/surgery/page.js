import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import CTA from '@/components/cta-buttons';

// Static Generation Configuration
export const revalidate = 604800; // Revalidate every week

// SEO Metadata for Dental Surgery Page
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations('surgery.metadata');

    const baseUrl = 'https://toothmatedental.com';
    const canonicalPath = locale === 'ar' ? '/جراحة-الأسنان/خدماتنا' : '/our-services/dental-surgery';

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
                    url: `${baseUrl}/images/surgery-toothmate.webp`,
                    width: 1200,
                    height: 630,
                    alt: locale === 'ar' ? 'جراحة الأسنان في عيادة توث ميت' : 'Dental Surgery at Tooth Mate Clinic'
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: [`${baseUrl}/images/surgery-toothmate.webp`],
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

export default async function SurgeryService({ params }) {
    const { locale } = await params;
    const t = await getTranslations('surgery');

    const baseUrl = 'https://toothmatedental.com';
    const canonicalPath = locale === 'ar' ? '/جراحة-الأسنان/خدماتنا' : '/our-services/dental-surgery';

    // Structured Data for Dental Surgery Service
    const surgeryStructuredData = {
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
        "serviceType": "Dental Surgery",
        "category": "MedicalProcedure",
        "offers": {
            "@type": "Offer",
            "description": locale === 'ar' ? "خدمات جراحة الأسنان المتكاملة" : "Comprehensive dental surgery services"
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
                "name": locale === 'ar' ? "ما هي أنواع جراحات الأسنان المتاحة؟" : "What types of dental surgeries are available?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "خلع ضروس العقل، زراعة الأسنان، علاج الجذور، جراحة اللثة، وخلع الأسنان المعقدة" : "Wisdom teeth removal, dental implants, root canal treatment, gum surgery, and complex tooth extractions"
                }
            },
            {
                "@type": "Question",
                "name": locale === 'ar' ? "كم تستغرق عملية التعافي بعد جراحة الأسنان؟" : "How long is recovery after dental surgery?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "تختلف حسب نوع الجراحة، من عدة أيام إلى أسابيع قليلة مع اتباع تعليمات العناية" : "Varies by surgery type, from a few days to several weeks with proper care instructions"
                }
            },
            {
                "@type": "Question",
                "name": locale === 'ar' ? "هل جراحة الأسنان مؤلمة؟" : "Is dental surgery painful?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "نستخدم التخدير الفعال للقضاء على الألم خلال العملية، مع مسكنات مناسبة لفترة التعافي" : "We use effective anesthesia to eliminate pain during the procedure, with appropriate pain management for recovery"
                }
            }
        ]
    };

    return (
        <section className='bg-[#D3F3FF]'>

            {/* Structured Data Scripts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(surgeryStructuredData) }}
                key="surgery-service-schema"
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
                className="relative bg-[url('/images/surgery-toothmate.webp')] bg-cover bg-center h-[400px] w-full flex justify-center items-center text-white font-bold"
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
                        src="/images/surgery-main.webp"
                        alt={t('images.mainImageAlt')}
                        fill
                        className="object-cover"
                        priority
                        itemProp="image"
                    />
                </div>

                {/* What Is Dental Surgery Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6" itemProp="name">
                        {t('whatIsSurgery.title')}
                    </h2>
                    <ul className="space-y-6">
                        {[1, 2, 3, 4].map((item) => (
                            <li key={item} className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-3 flex-shrink-0"></div>
                                <p className="text-[18px] md:text-2xl leading-relaxed" itemProp="description">
                                    {t(`whatIsSurgery.point${item}`)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Benefits Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('benefits.title')}
                    </h2>
                    <ul className="space-y-6">
                        {[1, 2, 3, 4].map((item) => (
                            <li key={item} className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-3 flex-shrink-0"></div>
                                <p className="text-[18px] md:text-2xl leading-relaxed">
                                    {t(`benefits.point${item}`)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Types of Dental Surgery Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('types.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Wisdom Teeth Removal */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/wisdom-teeth.png"
                                    width={50}
                                    height={50}
                                    alt={t('types.wisdom.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                    {t('types.wisdom.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4" itemProp="description">
                                {t('types.wisdom.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`types.wisdom.feature${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dental Implants Surgery */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/implant-surgery.png"
                                    width={50}
                                    height={50}
                                    alt={t('types.implant.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                    {t('types.implant.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4" itemProp="description">
                                {t('types.implant.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`types.implant.feature${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Root Canal Treatment */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/root-canal.png"
                                    width={50}
                                    height={50}
                                    alt={t('types.rootcanal.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                    {t('types.rootcanal.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4" itemProp="description">
                                {t('types.rootcanal.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`types.rootcanal.feature${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gum Surgery */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/gum-surgery.png"
                                    width={50}
                                    height={50}
                                    alt={t('types.gum.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                    {t('types.gum.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4" itemProp="description">
                                {t('types.gum.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`types.gum.feature${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* When You Need Surgery Section */}
                <div className="my-12 bg-blue-50 rounded-2xl p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0178A3]">
                        {t('whenNeeded.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-[#0178A3] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm">✓</span>
                                </div>
                                <p className="text-[16px] md:text-[18px]">
                                    {t(`whenNeeded.indication${item}`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Procedure Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('procedure.title')}
                    </h2>
                    <ul className="space-y-6">
                        {[1, 2, 3, 4].map((item) => (
                            <li key={item} className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-3 flex-shrink-0"></div>
                                <p className="text-[18px] md:text-2xl leading-relaxed">
                                    {t(`procedure.step${item}`)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Aftercare Section */}
                <div className="my-12 bg-green-50 rounded-2xl p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0178A3]">
                        {t('aftercare.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">{t('aftercare.doTitle')}</h3>
                            <ul className="space-y-3">
                                {[1, 2, 3, 4].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>{t(`aftercare.do${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-red-600">{t('aftercare.dontTitle')}</h3>
                            <ul className="space-y-3">
                                {[1, 2, 3, 4].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>{t(`aftercare.dont${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Why Choose Surgery Banner */}
                <div className="relative bg-[url('/images/surgery-toothmate.webp')] bg-cover bg-center py-11 lg:py-14 w-full text-white font-bold rounded-4xl my-10">
                    <div className="absolute inset-0 bg-[#0178A3EB] z-0 rounded-4xl"></div>

                    <div className="absolute top-4 left-0 right-0 flex justify-center z-10 pt-6 lg:pt-12">
                        <h3 className="text-[20px] md:text-[24px] lg:text-[32px] text-center">
                            {t('whyChoose.title')}
                        </h3>
                    </div>

                    {/* المحتوى الرئيسي */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center gap-6 px-4 pt-15 lg:pt-22">

                        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 w-full">
                            <div className="flex flex-col lg:flex-row justify-center items-center gap-4 p-4 w-full lg:w-[48%] rounded-4xl border border-[#31C1B9]">
                                <Image
                                    src="/icons/why-implant-icon.svg"
                                    width={50}
                                    height={50}
                                    alt={t('whyChoose.icon1Alt')}
                                    className="xl:w-[60px] xl:h-[60px]"
                                />
                                <p className="text-[17px] md:text-[20px] lg:text-[24px] font-semibold leading-6 text-center">
                                    {t('whyChoose.reason1')}
                                </p>
                            </div>

                            <div className={`flex flex-col lg:flex-row justify-center items-center gap-4 p-4 w-full lg:w-[48%] rounded-4xl border border-[#31C1B9] ${locale === 'en' ? 'h-[145px] lg:h-[100px]' : 'h-[125px] lg:h-[100px]'}`}>
                                <Image
                                    src="/icons/why-implant.svg"
                                    width={50}
                                    height={50}
                                    alt={t('whyChoose.icon2Alt')}
                                    className="xl:w-[60px] xl:h-[60px]"
                                />
                                <p className="text-[17px] md:text-[20px] lg:text-[24px] font-semibold leading-6 text-center">
                                    {t('whyChoose.reason2')}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row justify-center items-center gap-2 p-4 w-full lg:w-[80%] rounded-4xl border border-[#31C1B9]">
                            <Image
                                src="/icons/why-implant-icon-2.svg"
                                width={50}
                                height={50}
                                alt={t('whyChoose.icon3Alt')}
                                className="xl:w-[60px] xl:h-[60px]"
                            />
                            <p className="text-[17px] md:text-[20px] lg:text-[24px] font-semibold leading-6 text-center">
                                {t('whyChoose.reason3')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="flex flex-col lg:flex-row justify-between items-center md:container-custom my-10">
                    <div className="flex flex-col justify-start items-start gap-3 order-2 lg:order-1">
                        <h4 className="text-[20px] md:text-[28px] font-bold">
                            {t('features.title')} <strong className="text-[#0178A3]">{t('features.highlight')}</strong>
                        </h4>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex justify-center items-center gap-2">
                                <Image
                                    src="/icons/right-teeth.svg"
                                    width={25}
                                    height={25}
                                    alt={t('features.iconAlt')}
                                />
                                <p className="text-[16px] md:text-[20px]">
                                    {t(`features.point${item}`)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className={`flex justify-center items-center mb-8 gap-3 order-1 lg:order-2 ${locale === 'en' ? 'lg:mr-9' : 'lg:ml-9'}`}>
                        <Image
                            src="/images/surgery-toothmate.webp"
                            width={137}
                            height={120}
                            alt={t('images.sideImage1Alt')}
                            className="rounded-2xl mt-18 xl:mt-30 mb-9 md:mb-[-20px] md:w-[200px] md:h-[200px] xl:w-[300px] xl:h-[250px]"
                        />
                        <Image
                            src="/images/surgery-main.webp"
                            width={186}
                            height={180}
                            alt={t('images.sideImage2Alt')}
                            className="rounded-2xl md:w-[300px] md:h-[300px] xl:w-[400px] xl:h-[400px]"
                        />
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
                </div>
            </div>
        </section>
    );
}