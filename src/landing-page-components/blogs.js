'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Blogs() {
    const locale = useLocale();
    const t = useTranslations('landingBlogs');
    const [activeIndex, setActiveIndex] = useState(0);

    const baseUrl = "https://www.toothmatedental.com";

    const blogs = [
        {
            title: t('blog17.title'),
            img: t('blog17.img'),
            publishDate: t('blog17.publishDate'),
            link: t('blog17.link'),
        },
        {
            title: t('blog11.title'),
            img: t('blog11.img'),
            publishDate: t('blog11.publishDate'),
            link: t('blog11.link'),
        },
        {
            title: t('blog9.title'),
            img: t('blog9.img'),
            publishDate: t('blog9.publishDate'),
            link: t('blog9.link'),
        }
    ];

    // Blog Structured Data
    const blogStructuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": locale === 'ar' ? "مقالات طبية عن طب الأسنان" : "Medical Articles About Dentistry",
        "description": locale === 'ar'
            ? "مجموعة من المقالات الطبية المتخصصة في طب الأسنان والتجميل من عيادة توث ميت"
            : "A collection of specialized medical articles about dentistry and cosmetics from Tooth Mate Clinic",
        "numberOfItems": blogs.length,
        "itemListElement": blogs.map((blog, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "BlogPosting",
                "headline": blog.title,
                "description": blog.description,
                "image": `${baseUrl}${blog.img}`,
                "datePublished": blog.publishDate,
                "author": {
                    "@type": "Person",
                    "name": locale === 'ar' ? "الدكتور محمد العبد" : "Dr. Mohamed Al-Abd"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Tooth Mate Dental Clinic",
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${baseUrl}/icons/logo.svg`
                    }
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `${baseUrl}/${locale}${blog.link}`
                },
                "url": `${baseUrl}/${locale}${blog.link}`,
                "inLanguage": locale === 'ar' ? "ar-EG" : "en-US"
            }
        }))
    };

    // Blog Collection Structured Data
    const blogCollectionStructuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": locale === 'ar' ? "مقالات طب الأسنان" : "Dental Articles",
        "description": locale === 'ar'
            ? "مجموعة مقالات طبية متخصصة في طب الأسنان والتجميل من عيادة توث ميت"
            : "Specialized medical articles collection about dentistry and cosmetics from Tooth Mate Clinic",
        "url": `${baseUrl}/${locale}/blogs`,
        "publisher": {
            "@type": "DentalClinic",
            "name": "Tooth Mate Dental Clinic",
            "url": baseUrl
        },
        "inLanguage": locale === 'ar' ? "ar-EG" : "en-US"
    };

    return (
        <section
            className="relative pt-16 w-[90%] mx-auto overflow-hidden rounded-4xl lg:px-10"
            aria-labelledby="services-title"
            itemScope
            itemType="https://schema.org/CollectionPage"
        >
            {/* Structured Data Scripts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
                key="blog-list-schema"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionStructuredData) }}
                key="blog-collection-schema"
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-12 relative z-10">
                <h6
                    id="services-title"
                    className="text-xl md:text-2xl font-bold text-black"
                    itemProp="name"
                >
                    {t('title')}{" "}
                    <strong className="text-black" itemProp="keywords">{t('highlight')}</strong>
                </h6>
                <Link
                    href="/blogs"
                    aria-label={t('viewAll')}
                    className="hidden group md:flex md:text-center items-center text-sm md:text-xl font-semibold gap-2 md:gap-0"
                    itemProp="url"
                    prefetch={true}
                >
                    <span
                        className={`border-b pb-0.5 text-black font-bold border-black 
                            group-hover:text-[#31C1B9] group-hover:border-[#31C1B9] 
                            ${locale === 'en' ? 'group-hover:translate-x-1' : 'group-hover:translate-x-[-5px]'} 
                            transition-transform duration-[100ms]`}
                    >
                        {t('viewAll')}
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 40 24"
                        className={`w-10 h-6 transition-colors duration-100 
                            ${locale === 'en' ? 'rotate-300' : 'rotate-220'}
                            mt-3
                            text-black group-hover:text-[#31C1B9] 
                            ${locale === 'en' ? 'group-hover:translate-x-[-8px]' : 'group-hover:translate-x-[8px]'} 
                            ${locale === 'en' ? 'group-hover:rotate-360' : 'group-hover:rotate-180'}`}
                    >
                        <line
                            x1="16"
                            y1="12"
                            x2="34"
                            y2="12"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <polyline
                            points="28,6 34,12 28,18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>

                </Link>
            </div>

            {/* Blogs Grid */}
            <div className="relative z-10 mx-auto overflow-x-auto scrollbar-hide touch-pan-x md:overflow-visible">
                <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-[40px] w-max md:w-full px-4">
                    {blogs.map((blog, idx) => (
                        <article
                            key={idx}
                            className="group mb-1 bg-[#E9FFFE] rounded-xl shadow-sm text-center relative w-[222px] h-[260px] md:h-[274px] lg:w-[290px] lg:h-[300px] xl:w-[338px] xl:h-[320px] mx-auto border border-transparent hover:border-[#0178A3] transition-all duration-300 flex-shrink-0"
                            onTouchStart={() => setActiveIndex(idx)}
                            onClick={() => setActiveIndex(idx)}
                            itemScope
                            itemType="https://schema.org/BlogPosting"
                        >
                            <div className="relative w-[220px] h-[144px] lg:w-[288px] lg:h-[170px] xl:w-[336px] xl:h-[190px] mx-auto overflow-hidden rounded-t-xl">
                                <Image
                                    src={blog.img}
                                    alt={blog.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="transform group-hover:scale-110 transition-transform duration-300"
                                    priority={idx < 3}
                                    itemProp="image"
                                    sizes="(max-width: 768px) 260px, (max-width: 1200px) 300px, 405px"
                                />
                            </div>

                            <div className={`flex justify-start items-center gap-2 ${locale === 'ar' ? 'pr-3' : 'ml-3'} my-3 text-[12px] sm:text-[14px] md:text-[16px]`}>
                                <Image
                                    src="/icons/date.svg"
                                    alt="date icon"
                                    width={18}
                                    height={18}
                                    itemProp="datePublished"
                                />
                                <time dateTime={blog.publishDate} itemProp="datePublished">
                                    {blog.publishDate}
                                </time>
                            </div>

                            <h3 className={`text-[13px] sm:text-[15px] md:text-[18px] text-start ${locale === 'en' ? 'ml-[6px]' : 'mr-[6px]'} font-semibold leading-snug px-2 group-hover:text-[#0178A3] group-hover:underline transition-all duration-300 cursor-pointer`}>
                                <Link
                                    href={blog.link}
                                    itemProp="url"
                                    prefetch={true}
                                >
                                    <span itemProp="headline">{blog.title}</span>
                                </Link>
                            </h3>

                            {/* Hidden SEO Content */}
                            <div className="sr-only" aria-hidden="true">
                                <span itemProp="description">{blog.description}</span>
                                <div itemProp="author" itemScope itemType="https://schema.org/Person">
                                    <span itemProp="name">{locale === 'ar' ? "الدكتور محمد العبد" : "Dr. Mohamed Al-Abd"}</span>
                                </div>
                                <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                                    <span itemProp="name">Tooth Mate Dental Clinic</span>
                                </div>
                                <span itemProp="inLanguage">{locale === 'ar' ? "ar-EG" : "en-US"}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex justify-between items-center px-4 pt-6 md:hidden">
                <button
                    className="w-[155px] h-[45px] rounded-[5px] flex items-center justify-center text-[14px] font-bold text-white"
                    style={{
                        background: "linear-gradient(to right, #49C2BC, #02948C)",
                    }}
                >
                    <Link href='/blogs' prefetch={true} itemProp="url">{t('viewAll')}</Link>
                </button>

                <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-[8px] h-[8px] rounded-full"
                            style={{
                                backgroundColor: activeIndex === i ? "#456F81" : "#ccc",
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Hidden SEO Content for the entire section */}
            <div className="sr-only" aria-hidden="true">
                <div itemScope itemType="https://schema.org/CollectionPage">
                    <span itemProp="name">{locale === 'ar' ? "مقالات طب الأسنان" : "Dental Articles"}</span>
                    <span itemProp="description">
                        {locale === 'ar'
                            ? "مجموعة مقالات طبية متخصصة في طب الأسنان والتجميل من عيادة توث ميت"
                            : "Specialized medical articles collection about dentistry and cosmetics from Tooth Mate Clinic"
                        }
                    </span>
                    <span itemProp="numberOfItems">{blogs.length}</span>
                    <span itemProp="inLanguage">{locale === 'ar' ? "ar-EG" : "en-US"}</span>
                </div>
            </div>
        </section>
    );
}