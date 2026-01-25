import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import CTA from '@/components/cta-buttons';

// Static Generation Configuration
export const revalidate = 604800; // Revalidate every week

// SEO Metadata for Cosmetic Page
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations('cosmetic.metadata');

    const baseUrl = 'https://toothmatedental.com';
    const canonicalPath = locale === 'ar' ? '/الحشوات-التجميلية/خدماتنا' : '/our-services/cosmetic-dentistry';

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
                    url: `${baseUrl}/images/cosmetic-main.webp`,
                    width: 1200,
                    height: 630,
                    alt: locale === 'ar' ? 'تجميل الأسنان في عيادة توث ميت' : 'Cosmetic Dentistry at Tooth Mate Clinic'
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: [`${baseUrl}/images/cosmetic-main.webp`],
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

export default async function CosmeticService({ params }) {
    const { locale } = await params;
    const t = await getTranslations('cosmetic');

    const baseUrl = 'https://toothmatedental.com';
    const canonicalPath = locale === 'ar' ? '/الحشوات-التجميلية/خدماتنا' : '/our-services/cosmetic-dentistry';

    // Structured Data for Cosmetic Dentistry Service
    const cosmeticStructuredData = {
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
            "telephone": "+20-100-123-4567"
        },
        "areaServed": locale === 'ar' ? "القاهرة، مصر" : "Cairo, Egypt",
        "serviceType": "Cosmetic Dentistry",
        "category": "DentalCare",
        "offers": {
            "@type": "Offer",
            "description": locale === 'ar' ? "خدمات تجميل الأسنان المتكاملة" : "Comprehensive cosmetic dental services"
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
                "name": locale === 'ar' ? "ما هي مدة علاج تجميل الأسنان؟" : "How long does cosmetic dental treatment take?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "تختلف المدة حسب نوع العلاج، فقد تتراوح من جلسة واحدة إلى عدة أسابيع" : "Duration varies by treatment type, ranging from a single session to several weeks"
                }
            },
            {
                "@type": "Question",
                "name": locale === 'ar' ? "هل تجميل الأسنان مؤلم؟" : "Is cosmetic dentistry painful?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "نستخدم أحدث تقنيات التخدير لتوفير راحة كاملة للمرضى" : "We use the latest anesthesia techniques to ensure complete patient comfort"
                }
            },
            {
                "@type": "Question",
                "name": locale === 'ar' ? "كم تدوم نتائج تجميل الأسنان؟" : "How long do cosmetic dentistry results last?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "تختلف حسب نوع العلاج والعناية، وقد تدوم من 5 إلى 15 سنة" : "Varies by treatment type and care, can last from 5 to 15 years"
                }
            }
        ]
    };

    return (
        <section className='bg-[#D3F3FF]'>

            {/* Structured Data Scripts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(cosmeticStructuredData) }}
                key="cosmetic-service-schema"
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

                <CTA />

                {/* Hero Section */}
                <div
                    className="relative bg-[url('/images/cosmetic-main.webp')] bg-cover bg-center h-[400px] w-full flex justify-center items-center text-white font-bold"
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
                            src="/images/cosmetic-main.webp"
                            alt={t('images.mainImageAlt')}
                            fill
                            className="object-cover"
                            priority
                            itemProp="image"
                        />
                    </div>

                    {/* What Is Cosmetic Dentistry Section */}
                    <div className="my-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6" itemProp="name">
                            {t('whatIsCosmetic.title')}
                        </h2>
                        <ul className="space-y-6">
                            {[1, 2, 3, 4].map((item) => (
                                <li key={item} className="flex items-start gap-4">
                                    <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-3 flex-shrink-0"></div>
                                    <p className="text-[18px] md:text-2xl leading-relaxed" itemProp="description">
                                        {t(`whatIsCosmetic.point${item}`)}
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
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Natural Appearance */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src="/icons/natural-appearance.png"
                                        width={50}
                                        height={50}
                                        alt={t('benefits.point1Alt')}
                                        itemProp="image"
                                    />
                                    <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                        {t('benefits.point1Title')}
                                    </h3>
                                </div>
                                <p className="text-gray-700" itemProp="description">
                                    {t('benefits.point1')}
                                </p>
                            </div>

                            {/* Quick Solution */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src="/icons/quick-solution.png"
                                        width={50}
                                        height={50}
                                        alt={t('benefits.point2Alt')}
                                        itemProp="image"
                                    />
                                    <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                        {t('benefits.point2Title')}
                                    </h3>
                                </div>
                                <p className="text-gray-700" itemProp="description">
                                    {t('benefits.point2')}
                                </p>
                            </div>

                            {/* High Durability */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src="/icons/durability.png"
                                        width={50}
                                        height={50}
                                        alt={t('benefits.point3Alt')}
                                        itemProp="image"
                                    />
                                    <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                        {t('benefits.point3Title')}
                                    </h3>
                                </div>
                                <p className="text-gray-700" itemProp="description">
                                    {t('benefits.point3')}
                                </p>
                            </div>

                            {/* Safe and Healthy */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src="/icons/safe-healthy.png"
                                        width={50}
                                        height={50}
                                        alt={t('benefits.point4Alt')}
                                        itemProp="image"
                                    />
                                    <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                        {t('benefits.point4Title')}
                                    </h3>
                                </div>
                                <p className="text-gray-700" itemProp="description">
                                    {t('benefits.point4')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Techniques Section */}
                    <div className="my-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            {t('techniques.title')}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Composite Fillings */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src="/icons/composite-filling.png"
                                        width={50}
                                        height={50}
                                        alt={t('techniques.bonding.iconAlt')}
                                        itemProp="image"
                                    />
                                    <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                        {t('techniques.bonding.title')}
                                    </h3>
                                </div>
                                <p className="text-gray-700 mb-4" itemProp="description">
                                    {t('techniques.bonding.description')}
                                </p>
                                <div className="space-y-2">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                            <span className="text-sm">{t(`techniques.bonding.feature${item}`)}</span>
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
                                        alt={t('techniques.whitening.iconAlt')}
                                        itemProp="image"
                                    />
                                    <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                        {t('techniques.whitening.title')}
                                    </h3>
                                </div>
                                <p className="text-gray-700 mb-4" itemProp="description">
                                    {t('techniques.whitening.description')}
                                </p>
                                <div className="space-y-2">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                            <span className="text-sm">{t(`techniques.whitening.feature${item}`)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dental Contouring */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" itemScope itemType="https://schema.org/Service">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src="/icons/dental-contouring.png"
                                        width={50}
                                        height={50}
                                        alt={t('techniques.contouring.iconAlt')}
                                        itemProp="image"
                                    />
                                    <h3 className="text-xl font-bold text-[#0178A3]" itemProp="name">
                                        {t('techniques.contouring.title')}
                                    </h3>
                                </div>
                                <p className="text-gray-700 mb-4" itemProp="description">
                                    {t('techniques.contouring.description')}
                                </p>
                                <div className="space-y-2">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                            <span className="text-sm">{t(`techniques.contouring.feature${item}`)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Before & After Section */}
                    <div className="my-12 bg-gray-50 rounded-2xl p-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0178A3]">
                            {t('beforeAfter.title')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-red-600">{t('beforeAfter.beforeTitle')}</h3>
                                <ul className="space-y-3">
                                    {[1, 2, 3].map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>{t(`beforeAfter.before${item}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-green-600">{t('beforeAfter.afterTitle')}</h3>
                                <ul className="space-y-3">
                                    {[1, 2, 3].map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>{t(`beforeAfter.after${item}`)}</span>
                                        </li>
                                    ))}
                                </ul>
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
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-[#0178A3] rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-white font-bold">1</span>
                                </div>
                                <h3 className="font-bold mb-2">{t('procedure.step1Title')}</h3>
                                <p className="text-sm">{t('procedure.step1')}</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-[#0178A3] rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-white font-bold">2</span>
                                </div>
                                <h3 className="font-bold mb-2">{t('procedure.step2Title')}</h3>
                                <p className="text-sm">{t('procedure.step2')}</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-[#0178A3] rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-white font-bold">3</span>
                                </div>
                                <h3 className="font-bold mb-2">{t('procedure.step3Title')}</h3>
                                <p className="text-sm">{t('procedure.step3')}</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-[#0178A3] rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-white font-bold">4</span>
                                </div>
                                <h3 className="font-bold mb-2">{t('procedure.step4Title')}</h3>
                                <p className="text-sm">{t('procedure.step4')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Why Choose Us Banner */}
                    <div className="relative bg-[url('/imagescosmetic-main.webp')] bg-cover bg-center py-11 lg:py-14 w-full text-white font-bold rounded-4xl my-10">
                        <div className="absolute inset-0 bg-[#0178A3EB] z-0 rounded-4xl"></div>

                        {/* العنوان - في المنتصف دائمًا */}
                        <div className="absolute top-4 left-0 right-0 flex justify-center z-10 pt-6 lg:pt-12">
                            <h3 className="text-[20px] md:text-[24px] lg:text-[32px] text-center">
                                {t('features.title')}
                            </h3>
                        </div>

                        {/* المحتوى الرئيسي */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-6 px-4 pt-15 lg:pt-22">

                            {/* الصف الأول - الاتنين جمب بعض في الكبيرة */}
                            <div className="flex flex-col lg:flex-row justify-center items-center gap-4 w-full">
                                <div className="flex flex-col lg:flex-row justify-center items-center gap-3 p-4 w-full lg:w-[48%] rounded-4xl border border-[#31C1B9]">
                                    <Image
                                        src="/icons/why-implant-icon.svg"
                                        width={50}
                                        height={50}
                                        alt={locale === 'ar' ? "أيقونة التقنيات الدولية" : "International techniques icon"}
                                        className="xl:w-[60px] xl:h-[60px]"
                                    />
                                    <p className="text-[17px] md:text-[20px] lg:text-[24px] text-center font-semibold leading-6">
                                        {t('features.point1')}
                                    </p>
                                </div>

                                <div className="flex flex-col lg:flex-row justify-center items-center gap-4 p-4 w-full lg:w-[48%] rounded-4xl border border-[#31C1B9]">
                                    <Image
                                        src="/icons/why-implant.svg"
                                        width={50}
                                        height={50}
                                        alt={locale === 'ar' ? "أيقونة الفريق الخبير" : "Expert team icon"}
                                        className="xl:w-[60px] xl:h-[60px]"
                                    />
                                    <p className="text-[17px] md:text-[20px] lg:text-[24px] font-semibold leading-6 text-center">
                                        {t('features.point2')}
                                    </p>
                                </div>
                            </div>

                            {/* الصف الثاني - التالت في النص تحتهم */}
                            <div className="flex flex-col lg:flex-row justify-center items-center gap-2 p-4 w-full lg:w-[80%] rounded-4xl border border-[#31C1B9]">
                                <Image
                                    src="/icons/why-implant-icon-2.svg"
                                    width={50}
                                    height={50}
                                    alt={locale === 'ar' ? "أيقونة النتائج الطبيعية" : "Natural results icon"}
                                    className="xl:w-[60px] xl:h-[60px]"
                                />
                                <p className="text-[17px] md:text-[20px] lg:text-[24px] font-semibold leading-6 text-center">
                                    {t('features.point3')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Features */}
                    <div className="my-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                        <div className="grid md:grid-cols-3 gap-6">
                            {[4, 5, 6].map((item) => (
                                <div key={item} className="text-center">
                                    <div className="w-16 h-16 bg-[#0178A3] rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Image
                                            src="/icons/features.png"
                                            width={30}
                                            height={30}
                                            alt={locale === 'ar' ? "أيقونة الميزات" : "Feature icon"}
                                        />
                                    </div>
                                    <p className="text-[16px] font-semibold">
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
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact-us" prefetch={true}>
                                <button className="bg-white text-[#0178A3] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300 cursor-pointer">
                                    {t('cta.button1')}
                                </button>
                            </Link>
                            <Link href='/'>
                                <button className="bg-transparent cursor-pointer border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-[#0178A3] transition duration-300">
                                    {t('cta.button2')}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}