import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Pagination from '@/components/Pagination';
import CTA from '@/components/cta-buttons';

export const revalidate = 604800; // Revalidate every week

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blogs' });

    const localizedPath = locale === 'ar' ? '/مقالاتنا' : '/our-blogs';

    const metadata = {
        title: t('metadata.title'),
        description: t('metadata.description'),
        keywords: t('metadata.keywords'),
        alternates: {
            canonical: `https://toothmatedental.com/${locale}${localizedPath}`,
            languages: {
                'ar': `https://toothmatedental.com/ar${localizedPath}`,
                'en': `https://toothmatedental.com/en${localizedPath}`,
                'x-default': `https://toothmatedental.com/ar${localizedPath}`
            }
        },
        openGraph: {
            title: t('metadata.ogTitle'),
            description: t('metadata.ogDescription'),
            type: 'website',
            locale: locale === 'ar' ? 'ar_EG' : 'en_US',
            images: [
                {
                    url: '//https://toothmatedental.com/icons/logo.png',
                    width: 1200,
                    height: 630,
                    alt: t('metadata.ogImageAlt')
                }
            ],
            siteName: 'Tooth Mate Dental Clinic'
        },
        twitter: {
            card: 'summary_large_image',
            title: t('metadata.ogTitle'),
            description: t('metadata.ogDescription'),
            image: 'https://https://toothmatedental.com/icons/logo.png'
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
        authors: [{ name: locale === 'ar' ? 'الدكتور محمد سليم العبد' : 'Dr. Mohamed Selim El-Abd' }],
        publisher: 'Tooth Mate Dental Clinic',
        formatDetection: {
            telephone: true,
            date: true,
            address: true,
            email: true,
        },
        category: 'health'
    };

    return metadata;
}

export default async function Blogs({ params, searchParams }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blogs' });
    const search_params = await searchParams;

    const baseDomain = 'https://toothmatedental.com';
    const localizedPath = locale === 'ar' ? '/مقالاتنا' : '/our-blogs';

    // Get current page from search params, default to 1
    const currentPage = parseInt(search_params?.page) || 1;
    const blogsPerPage = 9;

    const allBlogs = [
        {
            title: t('blog11.title'),
            desc: t('blog11.desc'),
            publishDate: t('blog11.publishDate'),
            link: t('blog11.link'),
            alt: t('blog11.imageAlt'),
            img: '/images/root-canal-photo.webp'
        },
        {
            title: t('blog8.title'),
            desc: t('blog8.desc'),
            publishDate: t('blog8.publishDate'),
            link: t('blog8.link'),
            alt: t('blog8.imageAlt'),
            img: '/images/dental-implant.webp'
        },
        {
            title: t('blog17.title'),
            desc: t('blog17.desc'),
            publishDate: t('blog17.publishDate'),
            link: t('blog17.link'),
            alt: t('blog17.imageAlt'),
            img: '/images/prosthetics.jpg'
        },
        {
            title: t('blog18.title'),
            desc: t('blog18.desc'),
            publishDate: t('blog18.publishDate'),
            link: t('blog18.link'),
            alt: t('blog18.imageAlt'),
            img: '/images/fixed-dental-prosthesis.jpeg'
        },
        {
            title: t('blog1.title'),
            desc: t('blog1.desc'),
            publishDate: t('blog1.publishDate'),
            link: t('blog1.link'),
            alt: t('blog1.imageAlt'),
            img: '/images/general-anesthesia.jpeg'
        },
        {
            title: t('blog3.title'),
            desc: t('blog3.desc'),
            publishDate: t('blog3.publishDate'),
            link: t('blog3.link'),
            alt: t('blog3.imageAlt'),
            img: '/images/cosmetic.jpg'
        },
        {
            title: t('blog2.title'),
            desc: t('blog2.desc'),
            publishDate: t('blog2.publishDate'),
            alt: t('blog2.imageAlt'),
            link: t('blog2.link'),
            img: '/images/teeth-white.jpeg'
        },
        {
            title: t('blog6.title'),
            desc: t('blog6.desc'),
            publishDate: t('blog6.publishDate'),
            link: t('blog6.link'),
            alt: t('blog6.imageAlt'),
            img: '/images/braces-cost.png'
        },
        {
            title: t('blog9.title'),
            desc: t('blog9.desc'),
            publishDate: t('blog9.publishDate'),
            link: t('blog9.link'),
            alt: t('blog9.imageAlt'),
            img: '/images/poster-toothmate.webp'
        },
        {
            title: t('blog16.title'),
            desc: t('blog16.desc'),
            publishDate: t('blog16.publishDate'),
            link: t('blog16.link'),
            alt: t('blog16.imageAlt'),
            img: '/images/toothmate-team.jpg'
        }
    ];

    // Calculate pagination
    const totalPages = Math.ceil(allBlogs.length / blogsPerPage);
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    const currentBlogs = allBlogs.slice(startIndex, endIndex);

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": t('structuredData.blogName'),
        "description": t('structuredData.blogDescription'),
        "url": `${baseDomain}/${locale}${localizedPath}`,
        "inLanguage": locale === 'ar' ? 'ar-EG' : 'en-US',
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": currentBlogs.length,
            "itemListElement": currentBlogs.map((blog, index) => ({
                "@type": "ListItem",
                "position": startIndex + index + 1,
                "item": {
                    "@type": "BlogPosting",
                    "headline": blog.title,
                    "description": blog.desc,
                    "datePublished": blog.publishDate,
                    "url": `${baseDomain}/${locale}${blog.link}`,
                    "author": {
                        "@type": "Person",
                        "name": locale === 'ar' ? 'الدكتور محمد سليم العبد' : 'Dr. Mohamed Selim El-Abd',
                        "jobTitle": locale === 'ar' ? 'استشاري طب الأسنان' : 'Dental Consultant'
                    },
                    "image": `${baseDomain}${blog.img}`,
                    "publisher": {
                        "@type": "Organization",
                        "name": "Tooth Mate Dental Clinic",
                        "logo": {
                            "@type": "ImageObject",
                            "url": `${baseDomain}/icons/logo.png`
                        }
                    }
                }
            }))
        }
    };

    const breadcrumbStructuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": locale === 'ar' ? 'الرئيسية' : 'Home',
                "item": `${baseDomain}/${locale}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": locale === 'ar' ? 'المقالات' : 'Blogs',
                "item": `${baseDomain}/${locale}${localizedPath}`
            }
        ]
    };

    return (
        <section className='bg-[#D3F3FF]'>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
            />

            <section itemScope itemType="https://schema.org/Blog">
                {/* Hero Section */}
                <div
                    className="relative bg-[url('/images/blogs-photo.webp')] bg-cover bg-center h-[400px] w-full flex justify-center items-center text-4xl text-white font-bold"
                    role="banner"
                    aria-labelledby="blogs-heading"
                >
                    <strong id="blogs-heading" className="absolute z-10" itemProp="name">
                        {t('sectionTitle')}
                    </strong>
                    <div className="absolute inset-0 bg-[#004E6AAD] z-0"></div>
                </div>

                <CTA />

                {/* Section Highlight */}
                <section itemProp="mainContentOfPage" className='pb-16'>
                    <h1 className='text-2xl sm:text-[28px] xl:text-[32px] font-bold text-center mt-12 mb-7 px-8 md:px-0'>
                        {t("title")} <strong className='text-black'>{t("subtitle")}</strong>
                    </h1>
                    <p className='container-custom lg:px-3 mb-9 text-center text-[16px] sm:text-[20px] xl:text-2xl'>{t("heroTitle")}</p>

                    {/* Blogs Grid */}
                    <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10 mx-auto lg:mx-[20px] xl:mx-[170px]"
                        role="list"
                        aria-label={t('blogsGridLabel')}>
                        {currentBlogs.map((blog, idx) => (
                            <div
                                key={startIndex + idx}
                                className="group bg-[#E9FFFE] rounded-xl shadow-md text-center relative w-[320px] xl:w-[390px] h-[320px] xl:h-[370px] mx-auto border border-transparent hover:border-[#0178A3] transition-all duration-300"
                                role="listitem"
                                itemScope
                                itemType="https://schema.org/BlogPosting"
                            >
                                {/* Blog Image */}
                                <div className="relative w-[318px] xl:w-[388px] h-[190px] xl:h-[220px] mx-auto overflow-hidden rounded-t-xl">
                                    <Image
                                        src={blog.img}
                                        alt={blog.alt}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transform group-hover:scale-110 transition-transform duration-300"
                                        priority={idx < 3}
                                        loading={idx >= 3 ? "lazy" : "eager"}
                                        itemProp="image"
                                        sizes="(max-width: 768px) 260px, (max-width: 1200px) 300px, 405px"
                                    />
                                </div>

                                {/* Publish Date */}
                                <div className={`flex justify-center items-center gap-3 ${locale === 'en' ? 'pr-[40%]' : 'pl-[50%]'} my-3`}>
                                    <Image src="/icons/date.svg" alt={t('publishDateAlt')} width={20} height={20} />
                                    <time itemProp="datePublished">{blog.publishDate}</time>
                                </div>

                                {/* Blog Title */}
                                <h2 className="text-[16px] xl:text-[19px] xl:text-2xl font-semibold leading-relaxed px-6 group-hover:text-[#0178A3] group-hover:underline transition-all duration-300">
                                    <Link href={blog.link} itemProp="url" prefetch={true}>
                                        <span itemProp="headline">{blog.title}</span>
                                    </Link>
                                </h2>

                                {/* Blog Description */}
                                <p className="sr-only" itemProp="description">
                                    {blog.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            locale={locale}
                            basePath={`/${locale}${localizedPath}`}
                        />
                    )}
                </section>
            </section>
        </section>
    );
}