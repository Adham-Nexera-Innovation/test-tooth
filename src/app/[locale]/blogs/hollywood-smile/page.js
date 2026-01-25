import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import CTA from '@/components/cta-buttons';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blog-hollywood-smile' });

    const baseUrl = 'https://toothmatedental.com';
    const articlePath = locale === 'ar' ? '/ابتسامة-هوليود-في-مصر/مقالاتنا' : '/our-blogs/hollywood-smile-egypt';

    return {
        title: t('title'),
        description: t('intro'),
        keywords: "ابتسامة هوليود في مصر, سعر ابتسامة هوليود, فينير الأسنان, تبييض الأسنان, تجميل الأسنان, عيادات تجميل الأسنان المعادي, هوليود سمايل, Hollywood smile Egypt, dental veneers Cairo, teeth whitening Egypt, cosmetic dentistry, smile design, dental aesthetics",
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
            authors: ['خبير تجميل الأسنان'],
            url: `${baseUrl}/${locale}${articlePath}`,
            siteName: 'Tooth Mate Dental Clinic',
            images: [
                {
                    url: `${baseUrl}/images/hollywood-smile-hero.webp`,
                    width: 1200,
                    height: 630,
                    alt: t('title')
                }
            ],
            tags: ["ابتسامة هوليود", "تجميل الأسنان", "الفينير"]
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('intro'),
            images: [`${baseUrl}/images/hollywood-smile-hero.webp`],
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
        authors: [{ name: 'خبير تجميل الأسنان' }],
        publisher: 'Tooth Mate Dental Clinic',
        category: 'health'
    };
}

// Static generation with weekly rebuild
export const revalidate = 604800; // 7 days in seconds

export default async function HollywoodSmileBlog({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blog-hollywood-smile' });

    // Get sections data from translations
    const sections = t.raw('sections');
    const ctaData = t.raw('cta');
    const contactData = t.raw('contact');
    const faqData = t.raw('faq');

    const baseUrl = 'https://toothmatedental.com';
    const articlePath = locale === 'ar' ? '/ابتسامة-هوليود-في-مصر/مقالاتنا' : '/our-blogs/hollywood-smile-egypt';
    const blogPath = locale === 'ar' ? '/مقالاتنا' : '/our-blogs';

    // Structured Data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": t('title'),
        "description": t('intro'),
        "image": `${baseUrl}/images/hollywood-smile-hero.webp`,
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "author": {
            "@type": "Person",
            "name": "خبير تجميل الأسنان",
            "jobTitle": "خبير تجميل الأسنان",
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
        "keywords": "ابتسامة هوليود في مصر, سعر ابتسامة هوليود, فينير الأسنان, تبييض الأسنان",
        "articleSection": "تجميل الأسنان",
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
        <>
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
                    bg-[url('/images/Hollywood.jpg')] 
                    bg-cover bg-center 
                    h-[400px] w-full 
                    flex justify-center 
                    items-center
                    text-white"
                aria-label={locale === 'ar' ? 'دليل شامل لابتسامة هوليود في مصر' : 'Comprehensive Guide to Hollywood Smile in Egypt'}
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

                {/* Main article image */}
                <div className='w-full h-[350px] md:h-[450px] lg:h-[500px] relative rounded-4xl overflow-hidden my-12'>
                    <Image
                        src={'/images/Hollywood.jpg'}
                        alt={locale === 'ar'
                            ? 'مقارنة بين أنواع ابتسامة هوليود المختلفة'
                            : 'Comparison between different types of Hollywood smile'
                        }
                        fill
                        className='object-cover'
                        priority
                        itemProp="image"
                    />
                </div>

                {/* Dynamic sections rendering with support for lists and subsections */}
                {Object.keys(sections).map((sectionKey, index) => {
                    const section = sections[sectionKey];

                    return (
                        <div key={sectionKey} className="mb-12">
                            <h3 className='text-[20px] md:text-[28px] font-bold my-6 text-[#004E6A]'>
                                {section.title}
                            </h3>

                            {/* Render regular paragraphs */}
                            {section.content && section.content.map((paragraph, pIndex) => (
                                <p
                                    key={`para-${pIndex}`}
                                    className={`text-[18px] md:text-[20px] mb-4 leading-8 ${locale === 'en' ? 'blog-paragraph-left' : 'blog-paragraph-right'}`}
                                    itemProp="articleBody"
                                >
                                    {paragraph}
                                </p>
                            ))}

                            {/* Render bullet lists */}
                            {section.list && (
                                <ul className={`mb-6 ${locale === 'en' ? 'blog-paragraph-left' : 'blog-paragraph-right'}`}>
                                    {section.list.map((item, listIndex) => (
                                        <li key={`list-${listIndex}`} className="flex items-start mb-3 text-[18px] md:text-[20px]">
                                            <span className={`text-[#004E6A] ${locale === 'ar' ? 'ml-2' : 'mr-2'} mt-1 hidden lg:block `}>-</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Render subsections */}
                            {section.subsections && section.subsections.map((subsection, subIndex) => (
                                <div key={`sub-${subIndex}`} className="mb-8 ml-4">
                                    <h4 className="text-[18px] md:text-[22px] font-bold my-4 text-[#006B8E]">
                                        {subsection.title}
                                    </h4>
                                    {subsection.list && (
                                        <ul className={`mb-4 ${locale === 'en' ? 'blog-paragraph-left' : 'blog-paragraph-right'}`}>
                                            {subsection.list.map((item, itemIndex) => (
                                                <li key={`sub-list-${itemIndex}`} className="flex items-start mb-2 text-[16px] md:text-[18px]">
                                                    <span className={`text-[#004E6A] ${locale === 'ar' ? 'ml-2' : 'mr-2'} mt-1 hidden lg:block `}>-</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    );
                })}

                {/* CTA Section - Hollywood Smile Consultation */}
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
                                    ? 'استشارة ابتسامة هوليود في عيادة توث ميت بالمعادي'
                                    : 'Hollywood smile consultation at Tooth Mate clinic in Maadi'
                                }
                                fill
                                className='object-cover'
                            />
                            <div className='absolute inset-0 bg-[#004E6A] opacity-20'></div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                {faqData && (
                    <div className='bg-[#F8F9FA] rounded-3xl p-8 my-12'>
                        <h4 className='text-[24px] md:text-[28px] font-bold mb-8 text-[#004E6A] text-center'>
                            {faqData.title}
                        </h4>
                        <div className='space-y-6'>
                            {faqData.questions.map((item, index) => (
                                <div key={index} className='border-b border-gray-200 pb-6 last:border-0'>
                                    <h5 className='text-[18px] md:text-[20px] font-bold mb-3 text-[#006B8E] flex items-start'>
                                        {item.q}
                                    </h5>
                                    <p className='text-[16px] md:text-[18px] text-gray-700 leading-7'>
                                        {item.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Conclusion section */}
                <div className='bg-[#E8F4F8] p-8 rounded-3xl my-12 border-l-4 border-[#004E6A]'>
                    <h4 className='text-[20px] md:text-[28px] font-bold my-5 text-[#004E6A]'>
                        {t('conclusion.title')}
                    </h4>
                    <p className='text-[18px] md:text-[20px] leading-8'>
                        {t('conclusion.content')}
                    </p>
                </div>

            </article>
        </>
    );
}