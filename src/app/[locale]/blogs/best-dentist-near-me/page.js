import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import CTA from '@/components/cta-buttons';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blog-best-dental-cosmetic-doctor' });

    const baseUrl = 'https://toothmatedental.com';
    const articlePath = locale === 'ar' ? '/أفضل-دكتور-اسنان-قريب-منك-في-المعادي/مقالاتنا' : '/our-blogs/best-dentist-near-you-maadi';

    return {
        title: t('title'),
        description: t('intro'),
        keywords: "أفضل دكتور أسنان, طبيب أسنان متخصص, عيادة أسنان المعادي, الدكتور محمد سليم العبد, توث ميت, زراعة الأسنان, تبييض الأسنان, تقويم الأسنان, حشوات تجميلية, علاج عصب, best dentist, dental clinic, teeth whitening, dental implants, orthodontics, root canal treatment, cosmetic dentistry, Maadi dentist, Cairo dental specialist",
        alternates: {
            canonical: `${baseUrl}/${locale}${articlePath}`,
            languages: {
                'ar': `${baseUrl}/ar${articlePath}`,
                'en': `${baseUrl}/en${articlePath}`,
                'x-default': `${baseUrl}/ar${articlePath}`
            }
        },
        openGraph: {
            title: t('title'),
            description: t('intro'),
            type: 'article',
            locale: locale === 'ar' ? 'ar_EG' : 'en_US',
            publishedTime: new Date().toISOString(),
            modifiedTime: new Date().toISOString(),
            authors: ['عيادة توث ميت'],
            url: `${baseUrl}/${locale}${articlePath}`,
            siteName: 'Tooth Mate Dental Clinic',
            images: [
                {
                    url: `${baseUrl}/images/contact-us.webp`,
                    width: 1200,
                    height: 630,
                    alt: locale === 'ar' ? 'الدكتور محمد سليم العبد - أفضل دكتور أسنان في القاهرة' : 'Dr. Mohamed Selim Al-Abd - Best Dentist in Cairo'
                }
            ],
            tags: ["طبيب الأسنان", "عيادة الأسنان", "الدكتور محمد سليم"]
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('intro'),
            images: [`${baseUrl}/images/contact-us.webp`],
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
        authors: [{ name: 'عيادة توث ميت' }],
        publisher: 'Tooth Mate Dental Clinic',
        category: 'health'
    };
}

// Static generation with weekly rebuild
export const revalidate = 604800; // 7 days in seconds

export default async function BestDentistBlog({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blog-best-dental-cosmetic-doctor' });

    // Get sections data from translations
    const sections = t.raw('sections');
    const ctaData = t.raw('cta');

    const baseUrl = 'https://toothmatedental.com';
    const articlePath = locale === 'ar' ? '/افضل-دكتور-اسنان/مقالاتنا' : '/our-blogs/best-dentist-near-you-maadi';
    const blogPath = locale === 'ar' ? '/مقالاتنا' : '/our-blogs';

    // Structured Data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": t('title'),
        "description": t('intro'),
        "image": [
            `${baseUrl}/images/contact-us.webp`,
            `${baseUrl}/images/about-clinic-photo-2.webp`,
            `${baseUrl}/images/about-clinic-photo-3.webp`,
            `${baseUrl}/images/about-clinic-photo-1.webp`,
            `${baseUrl}/images/about-clinic-photo-4.webp`
        ],
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "author": {
            "@type": "Person",
            "name": "الدكتور محمد سليم العبد",
            "jobTitle": "استشاري طب الأسنان",
        },
        "publisher": {
            "@type": "Organization",
            "name": "Tooth Mate Dental Clinic",
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/icons/logo.png`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${baseUrl}/${locale}${articlePath}`
        },
        "keywords": "أفضل دكتور أسنان, طبيب أسنان متخصص, الدكتور محمد سليم العبد",
        "articleSection": "أطباء الأسنان والتخصصات",
        "inLanguage": locale === 'ar' ? 'ar-EG' : 'en-US'
    };

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
                "name": locale === 'ar' ? 'المقالات' : 'Blogs',
                "item": `${baseUrl}/${locale}${blogPath}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": t('title'),
                "item": `${baseUrl}/${locale}${articlePath}`
            }
        ]
    };

    return (
        <section className='bg-[#D3F3FF]'>

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
            />

            {/* Hero Section with optimized image and semantic HTML */}
            <section
                className="relative
                bg-[url('/images/contact-us.webp')] 
                bg-cover bg-center 
                h-[400px] w-full 
                flex justify-center 
                items-center
                text-white"
                aria-label={locale === 'ar' ? 'دليل شامل لأفضل أطباء تجميل الأسنان في مصر' : 'Comprehensive Guide to Best Cosmetic Dentists in Egypt'}
            >
                <h1 className='text-2xl md:text-3xl lg:text-4xl text-center absolute z-10 px-4 max-w-4xl'>
                    {t('title')}
                </h1>
                <div
                    className="absolute inset-0 bg-[#004E6AAD] z-0"
                    aria-hidden="true"
                ></div>
            </section>

            <CTA />

            <article className='container-custom max-w-6xl mx-auto' itemScope itemType="https://schema.org/Article">

                <p className='text-center text-[13px] md:text-[16px] font-semibold my-8 text-[#BEBEBE]'>
                    {t('readingTime')}
                </p>

                {/* Article introduction */}
                <div className='my-6 text-center'>
                    <h2 className='text-[16px] md:text-2xl leading-8' itemProp="description">
                        {t('intro')}
                    </h2>
                </div>

                {/* Main article image with optimized attributes */}
                <div className='w-full h-[300px] md:h-[550px] lg:h-[690px] relative rounded-4xl overflow-hidden my-12'>
                    <Image
                        src={'/images/poster-toothmate.webp'}
                        alt={locale === 'ar'
                            ? 'الدكتور محمد سليم العبد في عيادة توث ميت يقدم أفضل خدمات طب الأسنان المتكاملة'
                            : 'Dr. Mohamed Selim Al-Abd at Tooth Mate clinic providing the best comprehensive dental services'
                        }
                        fill
                        className='object-cover'
                        priority
                        itemProp="image"
                    />
                </div>

                {/* Dynamic sections rendering */}
                {Object.keys(sections).map((sectionKey, index) => (
                    <div key={sectionKey} className="mb-12">
                        <h3 className='text-[20px] md:text-[28px] font-bold my-6 text-black'>
                            {sections[sectionKey].title}
                        </h3>

                        {sections[sectionKey].content.map((paragraph, pIndex) => (
                            <p
                                key={pIndex}
                                className={`text-[18px] md:text-[20px] mb-4 leading-8 ${locale === 'en' ? 'blog-paragraph-left' : 'blog-paragraph-right'}`}
                                itemProp="articleBody"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                ))}

                {/* CTA Section - Free Consultation */}
                <div className='bg-gradient-to-r from-[#004E6A] to-[#006B8E] rounded-3xl p-8 md:p-12 my-16 text-white'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
                        <div>
                            <h3 className='text-2xl md:text-3xl font-bold mb-4'>
                                {ctaData.title}
                            </h3>
                            <p className='text-xl mb-4 text-[#B3E0FF]'>
                                {ctaData.subtitle}
                            </p>
                            <p className='text-lg mb-6 leading-8'>
                                {ctaData.description}
                            </p>

                            <ul className='space-y-3 mb-8'>
                                {ctaData.features.map((feature, index) => (
                                    <li key={index} className='flex items-start'>
                                        <span className='text-[#00D4FF] mr-3 text-xl'>✓</span>
                                        <span className='text-lg'>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className='bg-[#002D40] p-4 rounded-2xl mb-6'>
                                <p className='text-lg text-center text-[#80D6FF]'>
                                    {ctaData.guarantee}
                                </p>
                            </div>

                            <Link
                                href="/contact-us"
                                className='bg-[#00D4FF] hover:bg-[#00B8E6] text-[#004E6A] font-bold text-lg py-4 px-8 rounded-2xl inline-block text-center transition-colors duration-300 w-full md:w-auto'
                            >
                                {ctaData.buttonText}
                            </Link>
                        </div>

                        <div className='relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden'>
                            <Image
                                src={'/images/about-clinic-photo-3.webp'}
                                alt={locale === 'ar'
                                    ? 'جولة داخل عيادة توث ميت بالمعادي للاطلاع على أحدث تقنيات تجميل الأسنان'
                                    : 'Tour inside Tooth Mate clinic in Maadi to explore the latest cosmetic dentistry technologies'
                                }
                                fill
                                className='object-cover'
                                priority
                            />
                            <div className='absolute inset-0 bg-[#004E6A] opacity-20'></div>
                        </div>
                    </div>
                </div>

                {/* Images section with optimized alt texts */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-12'>
                    <div className='relative h-[250px] md:h-[350px] rounded-2xl overflow-hidden'>
                        <Image
                            src={'/images/about-clinic-photo-1.webp'}
                            alt={locale === 'ar'
                                ? 'عملية تصميم الابتسامة الرقمي في أفضل عيادات تجميل الأسنان في مصر'
                                : 'Digital smile design process in the best cosmetic dental clinics in Egypt'
                            }
                            fill
                            className='object-cover'
                        />
                    </div>
                    <div className='relative h-[250px] md:h-[350px] rounded-2xl overflow-hidden'>
                        <Image
                            src={'/images/about-clinic-photo-4.webp'}
                            alt={locale === 'ar'
                                ? 'نتائج مذهلة لتجميل الأسنان في عيادات مصر المتميزة'
                                : 'Amazing results of cosmetic dentistry in distinguished Egyptian clinics'
                            }
                            fill
                            className='object-cover'
                        />
                    </div>
                </div>

                {/* Conclusion section */}
                <div className='bg-[#F8F9FA] p-8 rounded-3xl py-15 border-l-4 border-[#004E6A]'>
                    <h4 className='text-[20px] md:text-[28px] font-bold my-5 text-[#004E6A]'>
                        {t('conclusion.title')}
                    </h4>
                    <p className='text-[18px] md:text-[20px] leading-8'>
                        {t('conclusion.content')}
                    </p>
                </div>

                {/* Additional CTA for mobile emphasis */}
                <div className='lg:hidden bg-[#00D4FF] text-[#004E6A] p-6 rounded-2xl text-center my-8'>
                    <h5 className='text-xl font-bold mb-3'>{ctaData.title}</h5>
                    <p className='text-sm mb-4'>{ctaData.subtitle}</p>
                    <Link
                        href="/contact-us"
                        className='bg-[#004E6A] hover:bg-[#00334D] text-white font-bold py-3 px-6 rounded-xl inline-block transition-colors duration-300'
                    >
                        {ctaData.buttonText}
                    </Link>
                </div>
            </article>
        </section>
    );
}