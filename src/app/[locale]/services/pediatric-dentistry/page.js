import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import CTA from '@/components/cta-buttons';

// Static Generation Configuration
export const revalidate = 604800; // Revalidate every week

// SEO Metadata for Pediatric Dentistry Page
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations('pediatricDentistry.metadata');

    const baseUrl = 'https://toothmatedental.com';
    const canonicalPath = locale === 'ar' ? '/طب-أسنان-الأطفال/خدماتنا' : '/our-services/pediatric-dentistry';

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
                    url: `${baseUrl}/images/child.webp`,
                    width: 1200,
                    height: 630,
                    alt: locale === 'ar' ? 'طب أسنان الأطفال في عيادة توث ميت' : 'Pediatric Dentistry at Tooth Mate Clinic'
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: [`${baseUrl}/images/child.webp`],
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

export default async function PediatricDentistryService({ params }) {
    const { locale } = await params;
    const t = await getTranslations('pediatricDentistry');

    const baseUrl = 'https://toothmatedental.com';
    const canonicalPath = locale === 'ar' ? '/طب-أسنان-الأطفال/خدماتنا' : '/our-services/pediatric-dentistry';

    // Structured Data for Pediatric Dentistry Service
    const pediatricStructuredData = {
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
            "medicalSpecialty": "PediatricDentistry"
        },
        "areaServed": locale === 'ar' ? "القاهرة، مصر" : "Cairo, Egypt",
        "serviceType": "Pediatric Dentistry",
        "audience": {
            "@type": "PeopleAudience",
            "suggestedMinAge": 0,
            "suggestedMaxAge": 16
        },
        "category": "MedicalProcedure"
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
                "name": locale === 'ar' ? "متى يجب أن أحضر طفلي لأول زيارة لطبيب الأسنان؟" : "When should I bring my child for their first dental visit?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "يوصى بأول زيارة عند ظهور أول سن أو في عمر سنة واحدة، أيهما يأتي أولاً" : "First visit is recommended when first tooth appears or by first birthday, whichever comes first"
                }
            },
            {
                "@type": "Question",
                "name": locale === 'ar' ? "هل علاجات الفلورايد آمنة للأطفال؟" : "Are fluoride treatments safe for children?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "نعم، علاجات الفلورايد آمنة وفعالة عندما تُطبق بالكميات المناسبة تحت إشراف طبي" : "Yes, fluoride treatments are safe and effective when applied in appropriate amounts under professional supervision"
                }
            },
            {
                "@type": "Question",
                "name": locale === 'ar' ? "كيف يمكنني تحضير طفلي لزيارة طبيب الأسنان؟" : "How can I prepare my child for a dental visit?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'ar' ? "تحدث بإيجابية عن الزيارة، اقرأ قصصاً عن طبيب الأسنان، وتجنب استخدام كلمات مخيفة" : "Talk positively about the visit, read stories about dentists, and avoid using scary words"
                }
            }
        ]
    };

    return (
        <section className='bg-[#D3F3FF]'>
            {/* Structured Data Scripts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pediatricStructuredData) }}
                key="pediatric-service-schema"
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
                className="relative bg-[url('/images/child.webp')] bg-cover bg-center h-[400px] w-full flex justify-center items-center text-white font-bold"
                role="banner"
                aria-label={t('hero.ariaLabel')}
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
                        src="/images/child.webp"
                        alt={t('images.mainImageAlt')}
                        fill
                        className="object-cover"
                        priority
                        itemProp="image"
                    />
                </div>

                {/* What Is Pediatric Dentistry Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6" itemProp="name">
                        {t('whatIsPediatricDentistry.title')}
                    </h2>
                    <ul className="space-y-6">
                        {[1, 2, 3, 4].map((item) => (
                            <li key={item} className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-3 flex-shrink-0"></div>
                                <p className="text-[18px] md:text-2xl leading-relaxed" itemProp="description">
                                    {t(`whatIsPediatricDentistry.point${item}`)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* When to Visit Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('whenToVisit.title')}
                    </h2>
                    <ul className="space-y-6">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <li key={item} className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-[#0178A3] rounded-full mt-3 flex-shrink-0"></div>
                                <p className="text-[18px] md:text-2xl leading-relaxed">
                                    {t(`whenToVisit.reason${item}`)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('services.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Preventive Care */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/prevention.png"
                                    width={50}
                                    height={50}
                                    alt={t('services.preventive.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]">
                                    {t('services.preventive.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4">
                                {t('services.preventive.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`services.preventive.service${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Restorative Care */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/reconstruction.png"
                                    width={50}
                                    height={50}
                                    alt={t('services.restorative.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]">
                                    {t('services.restorative.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4">
                                {t('services.restorative.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`services.restorative.service${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Emergency Care */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/emergency-call.png"
                                    width={50}
                                    height={50}
                                    alt={t('services.emergency.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]">
                                    {t('services.emergency.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4">
                                {t('services.emergency.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`services.emergency.service${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Specialized Care */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    src="/icons/care.png"
                                    width={50}
                                    height={50}
                                    alt={t('services.specialized.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-xl font-bold text-[#0178A3]">
                                    {t('services.specialized.title')}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-4">
                                {t('services.specialized.description')}
                            </p>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#0178A3] rounded-full"></div>
                                        <span className="text-sm">{t(`services.specialized.service${item}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Age-Specific Care Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('ageSpecificCare.title')}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Babies (0-2 years) */}
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Image
                                    src="/icons/baby.png"
                                    width={40}
                                    height={40}
                                    alt={t('ageSpecificCare.babies.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-lg font-bold text-[#0178A3]">
                                    {t('ageSpecificCare.babies.title')}
                                </h3>
                            </div>
                            <ul className="space-y-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-[#0178A3] rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-sm">{t(`ageSpecificCare.babies.care${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Children (3-6 years) */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Image
                                    src="/icons/care (1).png"
                                    width={40}
                                    height={40}
                                    alt={t('ageSpecificCare.children.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-lg font-bold text-[#0178A3]">
                                    {t('ageSpecificCare.children.title')}
                                </h3>
                            </div>
                            <ul className="space-y-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-[#0178A3] rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-sm">{t(`ageSpecificCare.children.care${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Teens (7-16 years) */}
                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Image
                                    src="/icons/acne.png"
                                    width={40}
                                    height={40}
                                    alt={t('ageSpecificCare.teens.iconAlt')}
                                    itemProp="image"
                                />
                                <h3 className="text-lg font-bold text-[#0178A3]">
                                    {t('ageSpecificCare.teens.title')}
                                </h3>
                            </div>
                            <ul className="space-y-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-[#0178A3] rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-sm">{t(`ageSpecificCare.teens.care${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
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

                {/* Why Choose Pediatric Dentistry Banner */}
                <div className="relative bg-[url('/images/implant-show.webp')] bg-cover bg-center py-11 lg:py-14 w-full text-white font-bold rounded-4xl my-10">
                    <div className="absolute inset-0 bg-[#0178A3EB] z-0 rounded-4xl"></div>

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
                                    itemProp="image"
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
                                    itemProp="image"
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
                                itemProp="image"
                            />
                            <p className="text-[17px] md:text-[20px] lg:text-[24px] font-semibold leading-6 text-center">
                                {t('whyChoose.reason3')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* First Visit Experience Section */}
                <div className="my-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        {t('firstVisit.title')}
                    </h2>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-[#0178A3] mb-4">
                                    {t('firstVisit.whatToExpect')}
                                </h3>
                                <ul className="space-y-4">
                                    {[1, 2, 3, 4].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <Image
                                                src="/icons/check.png"
                                                width={20}
                                                height={20}
                                                alt={locale === 'ar' ? "أيقونة التأكيد" : "Check icon"}
                                                itemProp="image"
                                            />
                                            <span className="text-gray-700">{t(`firstVisit.expectation${item}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0178A3] mb-4">
                                    {t('firstVisit.preparation')}
                                </h3>
                                <ul className="space-y-4">
                                    {[1, 2, 3, 4].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <Image
                                                src="/icons/tip-icon.png"
                                                width={20}
                                                height={20}
                                                alt={locale === 'ar' ? "أيقونة النصيحة" : "Tip icon"}
                                                itemProp="image"
                                            />
                                            <span className="text-gray-700">{t(`firstVisit.tip${item}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
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
                                    itemProp="image"
                                />
                                <p className="text-[16px] md:text-[20px]">
                                    {t(`features.point${item}`)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className={`flex justify-center items-center gap-3 order-1 lg:order-2 ${locale === 'en' ? 'lg:mr-9' : 'lg:ml-9'}`}>
                        <Image
                            src="/images/child-smile-2.webp"
                            width={137}
                            height={112}
                            alt={t('images.sideImage1Alt')}
                            className="rounded-2xl mt-18 xl:mt-30 mb-9 md:mb-[-20px] md:w-[200px] md:h-[200px] xl:w-[300px] xl:h-[250px]"
                            itemProp="image"
                        />
                        <Image
                            src="/images/child-smile-3.webp"
                            width={186}
                            height={180}
                            alt={t('images.sideImage2Alt')}
                            className="rounded-2xl md:w-[300px] md:h-[300px] xl:w-[400px] xl:h-[400px]"
                            itemProp="image"
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