import Reviews from '@/landing-page-components/reviews';
import Image from "next/image";
import CTA from '@/components/cta-buttons';
import CasesGallery from './cases-images';
import { getTranslations } from 'next-intl/server';

export const revalidate = 604800; // Revalidate every week

// SEO Metadata
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'cases' });

    return {
        title: locale === 'ar' ? 'تحويل الابتسامة: قبل وبعد - ToothMate' : 'Smile Makeover: Before & After - ToothMate',
        description: locale === 'ar'
            ? 'شاهد نتائج تحولات الابتسامة الحقيقية قبل وبعد مع ToothMate. زراعة الأسنان، قشور الأسنان، تقويم الأسنان والمزيد.'
            : 'View real smile transformation results before and after with ToothMate. Dental implants, veneers, braces, and more.',
        keywords: locale === 'ar'
            ? 'قبل بعد زراعة أسنان, قشور أسنان, تقويم أسنان, تبييض أسنان, تيجان أسنان, حشو تجميلي'
            : 'before after dental implants, teeth veneers, braces, teeth whitening, dental crowns, composite bonding',
        openGraph: {
            title: locale === 'ar' ? 'تحويل الابتسامة: قبل وبعد' : 'Smile Makeover: Before & After',
            description: locale === 'ar'
                ? 'شاهد تحولات الابتسامة الحقيقية مع ToothMate'
                : 'View real smile transformations with ToothMate',
            images: ['/images/cases.webp'],
            locale: locale === 'ar' ? 'ar_EG' : 'en_US',
            type: 'website',
        },
    };
}

// Structured Data for SEO
function generateStructuredData(locale, baseUrl) {
    const isArabic = locale === 'ar';

    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        'name': isArabic ? 'تحويل الابتسامة: قبل وبعد' : 'Smile Makeover: Before & After',
        'description': isArabic
            ? 'معرض نتائج تحولات الابتسامة قبل وبعد لعلاجات الأسنان المختلفة'
            : 'Gallery of before and after smile transformation results for various dental treatments',
        'url': `${baseUrl}/${locale}/before-and-after`,
        'publisher': {
            '@type': 'DentalPractice',
            'name': 'ToothMate Dental Clinic',
            'telephone': '+20-100-329-4050',
            'address': {
                '@type': 'PostalAddress',
                'addressCountry': 'EG'
            }
        },
        'mainEntity': {
            '@type': 'ItemList',
            'numberOfItems': 6,
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': 1,
                    'item': {
                        '@type': 'MedicalProcedure',
                        'name': isArabic ? 'زراعة الأسنان' : 'Dental Implants',
                        'description': isArabic ? 'زراعة الأسنان الدائمة' : 'Permanent dental implants'
                    }
                },
                {
                    '@type': 'ListItem',
                    'position': 2,
                    'item': {
                        '@type': 'MedicalProcedure',
                        'name': isArabic ? 'فينير الأسنان' : 'Dental Veneers',
                        'description': isArabic ? 'فينير الأسنان التجميلية' : 'Cosmetic dental veneers'
                    }
                }
            ]
        }
    };
}

export default async function BeforeAndAfter({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'cases' });

    const baseUrl = "https://toothmatedental.com";

    // Services array with translations - Updated structure with before/after pairs
    const services = [
        {
            title: t('implant2.title'),
            desc: t('implant2.desc'),
            alt: t('implant2.imageAlt'),
            cases: [
                {
                    before: '/images/dental-implant-before-case-2.webp',
                    after: '/images/dental-implant-after-case-2.webp',
                    caseNumber: 1
                },
                {
                    before: '/images/dental-implant-before-case.webp',
                    after: '/images/dental-implant-after-case.webp',
                    caseNumber: 2
                }
            ],
            serviceType: "DentalImplants"
        },
        {
            title: t('veener.title'),
            desc: t('veener.desc'),
            alt: t('veener.imageAlt'),
            cases: [
                {
                    before: '/images/veneer-before-case-1.webp',
                    after: '/images/veneer-after-case-1.webp',
                    caseNumber: 1
                },
                {
                    before: '/images/veneer-before-case-2.webp',
                    after: '/images/veneer-after-case-2.webp',
                    caseNumber: 2
                }
            ],
            serviceType: "CosmeticDentistry"
        },
        {
            title: t('braces2.title'),
            desc: t('braces2.desc'),
            alt: t('braces2.imageAlt'),
            cases: [
                {
                    before: '/images/orthodontic-braces-before-case-1.webp',
                    after: '/images/orthodontic-braces-after-case-1.webp',
                    caseNumber: 1
                },
                {
                    before: '/images/orthodontic-braces-before-case-2.webp',
                    after: '/images/orthodontic-braces-after-case-2.webp',
                    caseNumber: 2
                },
                {
                    before: '/images/orthodontic-braces-before-case-3.webp',
                    after: '/images/orthodontic-braces-after-case-3.webp',
                    caseNumber: 3
                }
            ],
            serviceType: "Orthodontics"
        },
        {
            title: t('whitening.title'),
            desc: t('whitening.desc'),
            alt: t('whitening.imageAlt'),
            cases: [
                {
                    before: '/images/teeth-whitening-before-case-1.webp',
                    after: '/images/teeth-whitening-after-case-1.webp',
                    caseNumber: 1
                }
            ],
            serviceType: "TeethWhitening"
        },
        {
            title: t('crown.title'),
            desc: t('crown.desc'),
            alt: t('crown.imageAlt'),
            cases: [
                {
                    before: '/images/crown-before-case-1.webp',
                    after: '/images/crown-after-case-1.webp',
                    caseNumber: 1
                },
                {
                    before: '/images/crown-before-case-2.webp',
                    after: '/images/crown-after-case-2.webp',
                    caseNumber: 2
                },
                {
                    before: '/images/crown-before-case-3.webp',
                    after: '/images/crown-after-case-3.webp',
                    caseNumber: 3
                }
            ],
            serviceType: "DentalCrowns"
        },
        {
            title: t('compositeBonding.title'),
            desc: t('compositeBonding.desc'),
            alt: t('compositeBonding.imageAlt'),
            cases: [
                {
                    before: '/images/composite-bonding-before-case-1.webp',
                    after: '/images/composite-bonding-after-case-1.webp',
                    caseNumber: 1
                },
                {
                    before: '/images/composite-bonding-before-case-2.webp',
                    after: '/images/composite-bonding-after-case-2.webp',
                    caseNumber: 2
                },
                {
                    before: '/images/composite-bonding-before-case-3.webp',
                    after: '/images/composite-bonding-after-case-3.webp',
                    caseNumber: 3
                }
            ],
            serviceType: "CompositeBonding"
        }
    ];

    return (
        <section className='bg-[#D3F3FF]'>

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData(locale, baseUrl)) }}
            />

            {/* Hero Section */}
            <div
                className="relative bg-[url('/images/cases.webp')] bg-cover bg-center h-[400px] w-full flex justify-center items-center"
                role="banner"
            >
                <h1 className='sr-only'>
                    {t('hero.title')}
                </h1>
                <strong className="absolute text-center z-10 text-2xl md:text-3xl lg:text-4xl text-white font-bold px-4">
                    {t('hero.title')}
                </strong>
                <div
                    className="absolute inset-0 bg-[#004E6AAD] z-0"
                    aria-hidden="true"
                />
            </div>

            <CTA />

            {/* Services Grid Section */}
            <section className="mt-20 mb-10 container-custom">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-19">
                    {services.map((service, index) => (
                        <div key={index}>
                            <h2 className="text-center text-2xl font-bold md:mb-5 text-[#004E6A] min-h-[60px] flex items-center justify-center">
                                {service.title}
                            </h2>
                            <p className="sr-only">
                                {service.desc}
                            </p>

                            <CasesGallery service={service} locale={locale} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Video and Image Section */}
            <section className="my-12 container-custom bg-[#D3F3FF]">
                <div className=" rounded-4xl px-4 py-8">
                    <h2 className="text-center text-2xl font-bold md:text-4xl mb-8 text-black">
                        {t('video.title')}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                            <div className="relative aspect-video">
                                <video
                                    className="w-full h-full object-cover"
                                    controls
                                    preload="metadata"
                                    poster="/images/poster-toothmate.webp"
                                    aria-label={locale === 'ar' ? 'فيديو يوضح فريق ToothMate في العمل' : 'ToothMate team in action video'}
                                    playsInline
                                    loading="lazy"
                                >
                                    <source src="/videos/toothmate.mp4" type="video/mp4" />
                                    <source src="/videos/toothmate.webm" type="video/webm" />
                                    <p className="text-white text-center p-4">
                                        {locale === 'ar'
                                            ? 'متصفحك لا يدعم تشغيل الفيديو. حمّل الفيديو'
                                            : 'Your browser does not support the video tag. Download the video'}
                                    </p>
                                </video>
                            </div>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <div className="relative aspect-video">
                                <Image
                                    src="/images/toothmate-team.jpg"
                                    alt={locale === 'ar' ? 'فريق ToothMate المحترف' : 'Professional ToothMate team'}
                                    fill
                                    className="object-cover rounded-2xl"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Reviews />
        </section>
    );
}