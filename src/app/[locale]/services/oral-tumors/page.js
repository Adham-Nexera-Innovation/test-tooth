import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import CTA from '@/components/cta-buttons';

// Static Generation Configuration
export const revalidate = 604800; // Revalidate every week

// SEO Metadata for Oral Tumors Surgery Page
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations('oralTumorsSurgery.metadata');

    const baseUrl = 'https://toothmatedental.com';
    const canonicalPath = locale === 'ar' ? '/جراحة-أورام-الفم/خدماتنا' : '/our-services/oral-tumors-surgery';

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
                    url: `${baseUrl}/images/oralTumorSurgery.avif`,
                    width: 1200,
                    height: 630,
                    alt: locale === 'ar' ? 'جراحة أورام الفم في عيادة توث ميت' : 'Oral Tumors Surgery at Tooth Mate Clinic'
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: [`${baseUrl}/images/oralTumorSurgery.avif`],
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

export default async function OralTumorsSurgeryService({ params }) {
    const { locale } = await params;
    const t = await getTranslations('oralTumorsSurgery');

    const baseUrl = 'https://toothmatedental.com';
    const canonicalPath = locale === 'ar' ? '/جراحة-أورام-الفم/خدماتنا' : '/our-services/oral-tumors-surgery';

    // Structured Data for Oral Tumors Surgery Service
    const oralTumorsStructuredData = {
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
        "serviceType": "Oral Tumors Surgery",
        "category": "MedicalProcedure",
        "offers": {
            "@type": "Offer",
            "description": locale === 'ar' ? "خدمات جراحة أورام الفم المتخصصة" : "Specialized oral tumors surgery services"
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
                "name": locale === 'ar' ? "ما هي أعراض أورام الفم التي تستدعي التدخل الجراحي؟" : "What are the symptoms of oral tumors that require surgical intervention?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "تقرحات لا تلتئم، كتل في الفم، صعوبة في البلع، نزف غير مبرر، وتغيرات في الصوت" : "Non-healing ulcers, lumps in the mouth, difficulty swallowing, unexplained bleeding, and voice changes"
                }
            },
            {
                "@type": "Question",
                "name": locale === 'ar' ? "كم تستغرق عملية استئصال ورم الفم؟" : "How long does oral tumor removal surgery take?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "تختلف حسب حجم وموقع الورم، وقد تتراوح من ساعة إلى عدة ساعات" : "Varies depending on tumor size and location, ranging from one hour to several hours"
                }
            },
            {
                "@type": "Question",
                "name": locale === 'ar' ? "ما مدة التعافي بعد جراحة أورام الفم؟" : "What is the recovery period after oral tumor surgery?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "التعافي الأولي 2-3 أسابيع، والتعافي الكامل قد يستغرق عدة أشهر حسب الحالة" : "Initial recovery 2-3 weeks, complete recovery may take several months depending on the case"
                }
            }
        ]
    };

    return (
        <section className='bg-[#D3F3FF]'>

            {/* Structured Data Scripts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(oralTumorsStructuredData) }}
                key="oral-tumors-service-schema"
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
                className="relative bg-[url('/images/oralTumorSurgery.avif')] bg-cover bg-center h-[400px] w-full flex justify-center items-center text-white font-bold"
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
                        src="/images/oralTumorSurgery.avif"
                        alt={t('images.mainImageAlt')}
                        fill
                        quality={90}
                        className="object-cover"
                        priority
                        itemProp="image"
                    />
                </div>

                {/* What Are Oral Tumors Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6" itemProp="name">
                        {t('whatAreOralTumors.title')}
                    </h2>
                    <ul className="space-y-6">
                        {[1, 2, 3, 4].map((item) => (
                            <li key={item} className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-3 flex-shrink-0"></div>
                                <p className="text-[18px] md:text-2xl leading-relaxed" itemProp="description">
                                    {t(`whatAreOralTumors.point${item}`)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Symptoms Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('symptoms.title')}
                    </h2>
                    <ul className="space-y-6">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <li key={item} className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-3 flex-shrink-0"></div>
                                <p className="text-[18px] md:text-2xl leading-relaxed">
                                    {t(`symptoms.symptom${item}`)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Types of Oral Tumors Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('types.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Benign Tumors */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/benign-tumor.png"
                                    width={50}
                                    height={50}
                                    alt={t('types.benign.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                    {t('types.benign.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4" itemProp="description">
                                {t('types.benign.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`types.benign.type${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Malignant Tumors */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/malignant-tumor.png"
                                    width={50}
                                    height={50}
                                    alt={t('types.malignant.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                    {t('types.malignant.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4" itemProp="description">
                                {t('types.malignant.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`types.malignant.type${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Precancerous Lesions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/cancer.png"
                                    width={50}
                                    height={50}
                                    alt={t('types.precancerous.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                    {t('types.precancerous.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4" itemProp="description">
                                {t('types.precancerous.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`types.precancerous.type${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cysts */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/mouth-cancer.png"
                                    width={50}
                                    height={50}
                                    alt={t('types.cysts.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                    {t('types.cysts.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4" itemProp="description">
                                {t('types.cysts.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`types.cysts.type${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Diagnostic Methods Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('diagnosis.title')}
                    </h2>
                    <ul className="space-y-6">
                        {[1, 2, 3, 4].map((item) => (
                            <li key={item} className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-3 flex-shrink-0"></div>
                                <p className="text-[18px] md:text-2xl leading-relaxed">
                                    {t(`diagnosis.method${item}`)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Treatment Methods Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('treatmentMethods.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Surgical Treatment */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/surgical.png"
                                    width={50}
                                    height={50}
                                    alt={t('treatmentMethods.surgical.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                    {t('treatmentMethods.surgical.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4" itemProp="description">
                                {t('treatmentMethods.surgical.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`treatmentMethods.surgical.type${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reconstructive Surgery */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/plastic-surgery.png"
                                    width={50}
                                    height={50}
                                    alt={t('treatmentMethods.reconstructive.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                    {t('treatmentMethods.reconstructive.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4" itemProp="description">
                                {t('treatmentMethods.reconstructive.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`treatmentMethods.reconstructive.type${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recovery Timeline Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('recoveryTimeline.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Initial Recovery */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/hospital-recovery.png"
                                    width={50}
                                    height={50}
                                    alt={t('recoveryTimeline.initial.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                    {t('recoveryTimeline.initial.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4" itemProp="description">
                                {t('recoveryTimeline.initial.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`recoveryTimeline.initial.point${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Long-term Recovery */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/long-term-care.png"
                                    width={50}
                                    height={50}
                                    alt={t('recoveryTimeline.longTerm.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                    {t('recoveryTimeline.longTerm.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4" itemProp="description">
                                {t('recoveryTimeline.longTerm.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`recoveryTimeline.longTerm.point${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Oral Tumors Surgery Banner */}
                <div className="relative bg-[url('/images/oralTumorSurgery.avif')] bg-cover bg-center py-11 lg:py-14 w-full text-white font-bold rounded-4xl my-10">
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
                            <div className="flex flex-col lg:flex-row justify-center items-center gap-1 p-4 w-full lg:w-[48%] rounded-4xl border border-[#31C1B9]">
                                <Image
                                    src="/icons/why-implant.svg"
                                    width={50}
                                    height={50}
                                    alt={t('whyChoose.icon1Alt')}
                                    className="xl:w-[60px] xl:h-[60px]"
                                />
                                <p className="text-[17px] md:text-[20px] lg:text-[24px] text-center font-semibold leading-6">
                                    {t('whyChoose.reason1')}
                                </p>
                            </div>

                            <div className="flex flex-col lg:flex-row justify-center items-center gap-1 p-4 w-full lg:w-[48%] rounded-4xl border border-[#31C1B9]">
                                <Image
                                    src="/icons/why-implant-icon.svg"
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
        </section >
    );
}