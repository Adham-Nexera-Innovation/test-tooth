import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import CTA from '@/components/cta-buttons';

// Static Generation Configuration
export const revalidate = 604800; // Revalidate every week

// SEO Metadata for Hollywood Smile Page
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations('hollywood.metadata');

    const baseUrl = 'https://toothmatedental.com';
    const canonicalPath = locale === 'ar' ? '/هوليوود-سمايل/خدماتنا' : '/our-services/hollywood-smile';

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
                    url: `${baseUrl}/images/hollywood-hero.webp`,
                    width: 1200,
                    height: 630,
                    alt: locale === 'ar' ? 'هوليوود سمايل في عيادة توث ميت' : 'Hollywood Smile at Tooth Mate Clinic'
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: [`${baseUrl}/images/hollywood-hero.webp`],
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

export default async function HollywoodSmileService({ params }) {
    const { locale } = await params;
    const t = await getTranslations('hollywood');

    const baseUrl = 'https://toothmatedental.com';
    const canonicalPath = locale === 'ar' ? '/هوليوود-سمايل/خدماتنا' : '/our-services/hollywood-smile';

    // Structured Data for Hollywood Smile Service
    const hollywoodStructuredData = {
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
        "serviceType": "Hollywood Smile",
        "category": "CosmeticDentistry",
        "offers": {
            "@type": "Offer",
            "description": locale === 'ar' ? "خدمات هوليوود سمايل المتكاملة" : "Comprehensive Hollywood Smile services"
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
                "name": locale === 'ar' ? "كم تستغرق عملية هوليوود سمايل؟" : "How long does Hollywood Smile procedure take?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "تتراوح المدة من أسبوع إلى 3 أسابيع حسب الحالة ونوع العلاج المختار" : "Duration ranges from 1 to 3 weeks depending on the case and chosen treatment type"
                }
            },
            {
                "@type": "Question",
                "name": locale === 'ar' ? "هل هوليوود سمايل مؤلم؟" : "Is Hollywood Smile painful?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "نستخدم التخدير الموضعي لتوفير راحة كاملة خلال العملية" : "We use local anesthesia to ensure complete comfort during the procedure"
                }
            },
            {
                "@type": "Question",
                "name": locale === 'ar' ? "كم تدوم نتائج هوليوود سمايل؟" : "How long do Hollywood Smile results last?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "يمكن أن تدوم من 10 إلى 15 سنة مع العناية المناسبة" : "Can last from 10 to 15 years with proper care"
                }
            }
        ]
    };

    return (
        <section className='bg-[#D3F3FF]'>
            {/* Structured Data Scripts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hollywoodStructuredData) }}
                key="hollywood-service-schema"
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

            <section itemScope itemType="https://schema.org/Service">
                {/* Hero Section */}
                <div
                    className="relative bg-[url('/images/hollywood-hero.webp')] bg-cover bg-center h-[400px] w-full flex justify-center items-center text-white font-bold"
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
                            src="/images/hollywood-main.webp"
                            alt={t('images.mainImageAlt')}
                            fill
                            className="object-cover"
                            priority
                            itemProp="image"
                        />
                    </div>

                    {/* What Is Hollywood Smile Section */}
                    <div className="my-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6" itemProp="name">
                            {t('whatIsHollywood.title')}
                        </h2>
                        <ul className="space-y-6">
                            {[1, 2, 3, 4].map((item) => (
                                <li key={item} className="flex items-start gap-4">
                                    <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-3 flex-shrink-0"></div>
                                    <p className="text-[18px] md:text-2xl leading-relaxed" itemProp="description">
                                        {t(`whatIsHollywood.point${item}`)}
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

                    {/* Types of Hollywood Smile Section */}
                    <div className="my-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            {t('types.title')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Veneers */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src="/icons/veneers.png"
                                        width={50}
                                        height={50}
                                        alt={t('types.veneers.iconAlt')}
                                        itemProp="image"
                                    />
                                    <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                        {t('types.veneers.title')}
                                    </h3>
                                </div>
                                <p className="text-gray-700 mb-4" itemProp="description">
                                    {t('types.veneers.description')}
                                </p>
                                <div className="space-y-2">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                            <span className="text-sm">{t(`types.veneers.feature${item}`)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Lumineers */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src="/icons/lumineers.png"
                                        width={50}
                                        height={50}
                                        alt={t('types.lumineers.iconAlt')}
                                        itemProp="image"
                                    />
                                    <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                        {t('types.lumineers.title')}
                                    </h3>
                                </div>
                                <p className="text-gray-700 mb-4" itemProp="description">
                                    {t('types.lumineers.description')}
                                </p>
                                <div className="space-y-2">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                            <span className="text-sm">{t(`types.lumineers.feature${item}`)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Zirconia Crowns */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src="/icons/zirconia.png"
                                        width={50}
                                        height={50}
                                        alt={t('types.zirconia.iconAlt')}
                                        itemProp="image"
                                    />
                                    <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                        {t('types.zirconia.title')}
                                    </h3>
                                </div>
                                <p className="text-gray-700 mb-4" itemProp="description">
                                    {t('types.zirconia.description')}
                                </p>
                                <div className="space-y-2">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                            <span className="text-sm">{t(`types.zirconia.feature${item}`)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Teeth Whitening */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src="/icons/whitening.png"
                                        width={50}
                                        height={50}
                                        alt={t('types.whitening.iconAlt')}
                                        itemProp="image"
                                    />
                                    <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                        {t('types.whitening.title')}
                                    </h3>
                                </div>
                                <p className="text-gray-700 mb-4" itemProp="description">
                                    {t('types.whitening.description')}
                                </p>
                                <div className="space-y-2">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                            <span className="text-sm">{t(`types.whitening.feature${item}`)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Candidacy Section */}
                    <div className="my-12 bg-purple-50 rounded-2xl p-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0178A3]">
                            {t('candidacy.title')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-[#0178A3] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                    <p className="text-[16px] md:text-[18px]">
                                        {t(`candidacy.candidate${item}`)}
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

                    {/* Maintenance Section */}
                    <div className="my-12 bg-yellow-50 rounded-2xl p-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0178A3]">
                            {t('maintenance.title')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">{t('maintenance.careTitle')}</h3>
                                <ul className="space-y-3">
                                    {[1, 2, 3, 4].map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>{t(`maintenance.care${item}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-red-600">{t('maintenance.avoidTitle')}</h3>
                                <ul className="space-y-3">
                                    {[1, 2, 3, 4].map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>{t(`maintenance.avoid${item}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Why Choose Hollywood Smile Banner */}
                    <div className="relative bg-[url('/images/hollywood-hero.webp')] bg-cover bg-center py-11 lg:py-14 w-full text-white font-bold rounded-4xl my-10">
                        <div className="absolute inset-0 bg-[#0178A3EB] z-0 rounded-4xl"></div>

                        {/* العنوان - في المنتصف دائمًا */}
                        <div className="absolute top-4 left-0 right-0 flex justify-center z-10 pt-6 lg:pt-12">
                            <h3 className="text-[20px] md:text-[24px] lg:text-[32px] text-center">
                                {t('whyChoose.title')}
                            </h3>
                        </div>

                        {/* المحتوى الرئيسي */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-6 px-4 pt-15 lg:pt-22">

                            <div className="flex flex-col lg:flex-row justify-center items-center gap-4 w-full">
                                <div className="flex flex-col lg:flex-row justify-center items-center gap-3 p-4 w-full lg:w-[48%] rounded-4xl border border-[#31C1B9]">
                                    <Image
                                        src="/icons/why-implant-icon.svg"
                                        width={50}
                                        height={50}
                                        alt={t('whyChoose.icon1Alt')}
                                        className="xl:w-[60px] xl:h-[60px]"
                                    />
                                    <p className="text-[17px] md:text-[20px] lg:text-[24px] text-center font-semibold leading-6">
                                        {t('whyChoose.reason1')}
                                    </p>
                                </div>

                                <div className="flex flex-col lg:flex-row justify-center items-center gap-4 p-4 w-full lg:w-[48%] rounded-4xl border border-[#31C1B9]">
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
                                    <p className={`text-[16px] md:text-[20px] ${locale === 'en' ? 'xl:max-w-[550px]' : ''} ${locale === 'en' ? 'lg:max-w-[450px]' : ''} `}>
                                        {t(`features.point${item}`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className={`flex justify-center items-center gap-3 order-1 lg:order-2 ${locale === 'en' ? 'lg:mr-9' : 'lg:ml-9'}`}>
                            <Image
                                src="/images/hollywood-hero.webp"
                                width={137}
                                height={112}
                                alt={t('images.sideImage1Alt')}
                                className="rounded-2xl mt-18 xl:mt-30 mb-9 md:mb-[-20px] md:w-[200px] md:h-[200px] xl:w-[300px] xl:h-[250px]"
                            />
                            <Image
                                src="/images/hollywood-main.webp"
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
                    <div className="container-custom">
                        <h5 className="py-3 text-[20px] md:text-[28px] font-bold">
                            {t('cta.title')}
                        </h5>
                        <p className="pb-4 text-[16px] md:text-[20px]" itemProp="description">
                            {t('cta.description')}
                        </p>
                    </div>
                </div>
            </section>
        </section>
    );
}