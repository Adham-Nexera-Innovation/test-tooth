'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from "next/link";
import CTA from '@/components/cta-buttons';
import { useLocale, useTranslations } from 'next-intl';
import Head from 'next/head';

export default function Services() {
    const locale = useLocale();
    const t = useTranslations('landingPage.services');

    const baseUrl = 'https://toothmatedental.com';
    const currentPath = locale === 'ar' ? '/الخدمات' : '/services';
    const canonicalUrl = `${baseUrl}/${locale}${currentPath}`;

    const services = [
        {
            title: t('implant.title'),
            desc: t('implant.desc'),
            alt: t('implant.imageAlt'),
            img: '/images/dental-implant-after-case-2.webp',
            icon: '/icons/why-implant.svg',
            link: '/services/implant',
            serviceType: 'DentalImplants',
        },
        {
            title: t('surgery.title'),
            desc: t('surgery.desc'),
            alt: t('surgery.imageAlt'),
            img: '/images/surgery-toothmate.webp',
            icon: '/icons/why-implant-icon.svg',
            link: '/services/surgery',
            serviceType: 'DentalSurgery',
        },
        {
            title: t('hollywood.title'),
            desc: t('hollywood.desc'),
            alt: t('hollywood.imageAlt'),
            img: '/images/tooth-hollywood-smile.jpg',
            icon: '/icons/why-implant-icon-2.svg',
            link: '/services/hollywood-smile',
            serviceType: 'CosmeticDentistry',
        },
        {
            title: t('cosmetic.title'),
            desc: t('cosmetic.desc'),
            alt: t('cosmetic.imageAlt'),
            img: '/images/cosmetic.jpg',
            icon: '/icons/natural-appearance.png',
            link: '/services/cosmetic',
            serviceType: 'CosmeticDentistry',
        },
        {
            title: t('prosthetics.title'),
            desc: t('prosthetics.desc'),
            alt: t('prosthetics.imageAlt'),
            img: '/images/prosthetics.jpg',
            icon: '/icons/teeth.png',
            link: '/services/dental-prosthetics',
            serviceType: 'DentalProsthetics',
        },
        {
            title: t('orthodontics.title'),
            desc: t('orthodontics.desc'),
            alt: t('orthodontics.imageAlt'),
            img: '/images/braces-service.webp',
            icon: '/icons/care-icon.svg',
            link: '/services/braces',
            serviceType: 'Orthodontics',
        },
        {
            title: t('rootCanal.title'),
            desc: t('rootCanal.desc'),
            alt: t('rootCanal.imageAlt'),
            img: '/images/root-canal-iamge.jpg',
            icon: '/icons/root-canal.png',
            link: '/services/root-canal',
            serviceType: 'RootCanal',
        },
        {
            title: t('pediatricDentistry.title'),
            desc: t('pediatricDentistry.desc'),
            alt: t('pediatricDentistry.imageAlt'),
            img: '/images/child.webp',
            icon: '/icons/clean.png',
            link: '/services/pediatric-dentistry',
            serviceType: 'PediatricDentistry',
        },
        {
            title: t('generalAnesthesia.title'),
            desc: t('generalAnesthesia.desc'),
            alt: t('generalAnesthesia.imageAlt'),
            img: '/images/general-anesthesia.jpeg',
            icon: '/icons/general-anesthesia.png',
            link: '/services/general-anesthesia',
            serviceType: 'GeneralAnesthesia',
        },
        {
            title: t('jawFracture.title'),
            desc: t('jawFracture.desc'),
            alt: t('jawFracture.imageAlt'),
            img: '/images/jawFracture.jpeg',
            icon: '/icons/jawFracture.png',
            link: '/services/jaw-fractures',
            serviceType: 'JawFractures',
        },
        {
            title: t('oralTumorSurgery.title'),
            desc: t('oralTumorSurgery.desc'),
            alt: t('oralTumorSurgery.imageAlt'),
            img: '/images/oralTumorSurgery.avif',
            icon: '/icons/oral.png',
            link: '/services/oral-tumors',
            serviceType: 'OralSurgery',
        },
    ];

    // Structured Data for Services
    const servicesStructuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": t('title'),
        "description": t('heroTitle'),
        "numberOfItems": services.length,
        "itemListElement": services.map((service, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Service",
                "name": service.title,
                "description": service.desc,
                "serviceType": service.title,
                "url": `${baseUrl}/${locale}${service.link}`,
                "image": `${baseUrl}${service.img}`,
                "areaServed": {
                    "@type": "Place",
                    "name": locale === 'ar' ? "المعادي، القاهرة" : "Maadi, Cairo"
                },
                "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": `${baseUrl}/${locale}/contact`
                },
                "provider": {
                    "@type": "Dentist",
                    "name": locale === 'ar' ? "الدكتور محمد سليم العبد" : "Dr. Mohamed Selim Al-Abd"
                }
            }
        }))
    };

    // Service Catalog Structured Data
    const serviceCatalogStructuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "DentalCare",
        "provider": {
            "@type": "DentalClinic",
            "name": "Tooth Mate Dental Clinic",
            "url": baseUrl
        },
        "areaServed": "EG",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": locale === 'ar' ? "خدمات طب الأسنان" : "Dental Services",
            "itemListElement": services.map((service, index) => ({
                "@type": "Offer",
                "position": index + 1,
                "itemOffered": {
                    "@type": "Service",
                    "name": service.title,
                    "description": service.desc,
                    "url": `${baseUrl}/${locale}${service.link}`
                }
            }))
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
                "name": t('title'),
                "item": canonicalUrl
            }
        ]
    };

    // Page metadata for SEO
    const pageTitle = locale === 'ar'
        ? `${t('title')} - أفضل خدمات طب الأسنان في المعادي | توث ميت`
        : `${t('title')} - Best Dental Services in Maadi | Tooth Mate`;

    const pageDescription = locale === 'ar'
        ? 'اكتشف خدمات طب الأسنان المتكاملة في عيادة توث ميت: زراعة الأسنان، هوليود سمايل، تقويم الأسنان، علاج الجذور والمزيد. احجز موعدك الآن.'
        : 'Discover comprehensive dental services at Tooth Mate Clinic: dental implants, Hollywood smile, braces, root canal treatment and more. Book your appointment now.';

    return (
        <>
            {/* SEO Head Tags for Client Component */}
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={locale === 'ar'
                    ? "خدمات الأسنان, زراعة الأسنان, هوليود سمايل, تقويم الأسنان, عيادة أسنان المعادي, دكتور أسنان, علاج الجذور"
                    : "dental services, dental implants, hollywood smile, braces, maadi dental clinic, dentist, root canal treatment"
                } />

                {/* Canonical URL */}
                <link rel="canonical" href={canonicalUrl} />

                {/* Alternate Language URLs */}
                <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar/الخدمات`} />
                <link rel="alternate" hrefLang="en" href={`${baseUrl}/en/services`} />
                <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/ar/الخدمات`} />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:site_name" content="Tooth Mate Dental Clinic" />
                <meta property="og:locale" content={locale === 'ar' ? 'ar_EG' : 'en_US'} />
                <meta property="og:image" content={`${baseUrl}/images/serivces-image.webp`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content={locale === 'ar' ? "خدمات طب الأسنان في عيادة توث ميت" : "Dental Services at Tooth Mate Clinic"} />

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={`${baseUrl}/images/serivces-image.webp`} />

                {/* Robots Meta Tag */}
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="googlebot" content="index, follow" />
            </Head>

            {/* Structured Data Scripts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesStructuredData) }}
                key="services-list-schema"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogStructuredData) }}
                key="service-catalog-schema"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
                key="breadcrumb-schema"
            />

            <section className='bg-[#D3F3FF]'>
                <section className='pb-18' itemScope itemType="https://schema.org/Service">
                    <CTA />

                    {/* Hero Section */}
                    <div
                        className="relative h-[400px] w-full flex justify-center items-center"
                        itemScope
                        itemType="https://schema.org/MedicalClinic"
                    >
                        <Image
                            src="/images/serivces-image.webp"
                            alt={t("title")}
                            fill
                            className="object-cover"
                            priority
                            quality={75}
                            sizes="100vw"
                            itemProp="image"
                        />
                        <div className="absolute inset-0 bg-[#004E6AAD] z-0"></div>
                        <strong
                            className="relative z-10 text-4xl text-white font-bold"
                            itemProp="name"
                        >
                            {t("head")}
                        </strong>
                    </div>

                    {/* Services Section */}
                    <section
                        aria-labelledby="services-heading"
                        className='container-custom'
                    >
                        <h1 id="services-heading" className='text-2xl sm:text-[28px] xl:text-[32px] font-bold text-center mt-12 mb-7'>
                            {t("title")} <strong className='text-black'>{t("subtitle")}</strong>
                        </h1>

                        <p className='lg:px-3 mb-9 text-[16px] sm:text-[20px] xl:text-2xl '>{t("heroTitle")}</p>
                        <p className='lg:px-3 my-9 text-[16px] sm:text-[20px] xl:text-2xl'>{t("heroTitle2")}</p>

                        {/* Services Grid */}
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9 gap-x-1 relative z-10 mx-auto"
                            itemScope
                            itemType="https://schema.org/ItemList"
                            itemProp="hasOfferCatalog"
                        >
                            {services.map((service, idx) => (
                                <ServiceCard
                                    key={idx}
                                    service={service}
                                    idx={idx}
                                    t={t}
                                    locale={locale}
                                    baseUrl={baseUrl}
                                />
                            ))}
                        </div>
                    </section>
                </section>
            </section>
        </>
    );
}

// ServiceCard component with enhanced mobile hover effect
function ServiceCard({ service, idx, t, locale, baseUrl }) {
    const [isActive, setIsActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLongPress, setIsLongPress] = useState(false);
    const articleRef = useRef(null);
    const timerRef = useRef(null);
    const longPressTimerRef = useRef(null);

    useEffect(() => {
        // Detect if device is mobile
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
            if (timerRef.current) clearTimeout(timerRef.current);
            if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (articleRef.current && !articleRef.current.contains(event.target)) {
                setIsActive(false);
                setIsLongPress(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    // Prevent text selection on mobile
    useEffect(() => {
        if (isMobile) {
            const preventTextSelection = (e) => {
                if (isActive || isLongPress) {
                    e.preventDefault();
                    return false;
                }
            };

            // Prevent text selection
            articleRef.current?.style.setProperty('-webkit-user-select', 'none');
            articleRef.current?.style.setProperty('user-select', 'none');
            articleRef.current?.style.setProperty('-webkit-touch-callout', 'none');

            document.addEventListener('selectstart', preventTextSelection);
            return () => {
                document.removeEventListener('selectstart', preventTextSelection);
                if (articleRef.current) {
                    articleRef.current.style.removeProperty('-webkit-user-select');
                    articleRef.current.style.removeProperty('user-select');
                    articleRef.current.style.removeProperty('-webkit-touch-callout');
                }
            };
        }
    }, [isMobile, isActive, isLongPress]);

    const handleTouchStart = () => {
        if (isMobile) {
            // Start long press timer
            longPressTimerRef.current = setTimeout(() => {
                setIsLongPress(true);
                setIsActive(true);
            }, 400); // 400ms for long press
        }
    };

    const handleTouchMove = () => {
        // Cancel long press if user moves finger
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
    };

    const handleTouchEnd = () => {
        // Clean up timers
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }

        if (!isLongPress) {
            // Normal tap - allow link clicks
            timerRef.current = setTimeout(() => {
                const activeElement = document.activeElement;
                if (!articleRef.current?.contains(activeElement) || activeElement.tagName !== 'A') {
                    setIsActive(false);
                }
            }, 150);
        } else {
            // Long press - keep content visible for 3 seconds
            timerRef.current = setTimeout(() => {
                setIsActive(false);
                setIsLongPress(false);
            }, 3000);
        }
    };

    const handleLinkClick = (e) => {
        e.stopPropagation();
        if (timerRef.current) clearTimeout(timerRef.current);
        if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
        setIsActive(false);
        setIsLongPress(false);
    };

    const handleCardClick = () => {
        if (isMobile && !isLongPress) {
            // Quick tap on mobile - open the service page
            window.location.href = `${locale}${service.link}`;
        }
    };

    // Enhanced mobile styling
    const mobileStyles = isMobile ? {
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        touchAction: 'manipulation',
    } : {};

    return (
        <article
            ref={articleRef}
            className={`group rounded-xl shadow-md relative w-75 sm:w-82 lg:w-90 min-h-[350px] mx-auto overflow-hidden transition-all duration-500 ${isMobile ? 'select-none touch-manipulation' : ''
                }`}
            style={mobileStyles}
            onMouseEnter={() => !isMobile && setIsActive(true)}
            onMouseLeave={() => !isMobile && setIsActive(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleCardClick}
            itemScope
            itemType="https://schema.org/Service"
            itemProp="itemListElement"
        >
            {/* Main Image - Full height on hover */}
            <div className="relative w-full h-full mx-auto overflow-hidden">
                <Image
                    src={service.img}
                    alt={service.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    className={`rounded-t-xl transition-all duration-500 ${isActive ? 'rounded-xl scale-110' : ''
                        }`}
                    loading="lazy"
                    sizes="(max-width: 640px) 298px, (max-width: 1024px) 328px, 378px"
                    itemProp="image"
                />
            </div>

            {/* Gradient Overlay - Show on hover/active */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 rounded-xl z-10 ${isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                style={{
                    background: 'linear-gradient(to right, rgba(77, 192, 193, 0.9), rgba(4, 114, 154, 0.9))',
                    pointerEvents: 'none',
                }}
            />

            {/* Original Content - Hidden with smooth transition */}
            <div
                className={`absolute w-full bg-[#9FDCFA] border border-[#31C1B9] bottom-[0.25px] shadow-2xl rounded-xl transition-all duration-500 ${isActive ? 'opacity-0 translate-y-full' : ''
                    }`}
                style={{
                    pointerEvents: isActive ? 'none' : 'auto',
                }}
            >
                {/* Title */}
                <h3 className="text-lg sm:text-2xl font-bold text-[#04729A] m-4 mb-3" itemProp="name">
                    {service.title}
                </h3>

                {/* More Details */}
                <Link
                    href={service.link}
                    aria-label={`${t('moreDetailsAria')} ${service.title}`}
                    className="group/link flex items-center justify-start text-sm font-semibold gap-2 mx-5 mb-5"
                    prefetch={true}
                    itemProp="mainEntityOfPage"
                    onClick={handleLinkClick}
                >
                    <span
                        className={`
                            text-base sm:text-lg border-b 
                            ${locale === 'en'
                                ? 'group-hover/link:translate-x-1'
                                : 'group-hover/link:translate-x-[-5px]'
                            } 
                            transition-transform duration-600 
                            border-black group-hover/link:text-[#04729A] group-hover/link:border-[#04729A]
                        `}
                    >
                        {t('moreDetails')}
                    </span>
                    <Image
                        src="/icons/arrow-rotated.svg"
                        alt="Arrow icon"
                        width={20}
                        height={20}
                        className={`
                            transform transition-transform duration-600 
                            ${locale === 'en' ? 'rotate-90' : ''} 
                            ${locale === 'en'
                                ? 'group-hover/link:rotate-135'
                                : 'group-hover/link:rotate-[-45deg]'
                            }
                        `}
                    />
                </Link>
            </div>

            {/* Hover Content - Show on hover/active with slide up effect */}
            <div
                className={`absolute inset-0 flex flex-col items-start justify-center transition-all duration-500 z-20 p-6 ${isActive ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
                    }`}
                style={{
                    pointerEvents: isActive ? 'auto' : 'none',
                }}
            >
                {/* Icon */}
                <div className="mb-4">
                    <Image
                        src={service.icon}
                        alt=""
                        width={60}
                        height={60}
                        className="filter brightness-0 invert"
                    />
                </div>

                {/* Title */}
                <h3 className="text-white text-xl font-bold mb-3 text-left">{service.title}</h3>

                {/* Description */}
                <p
                    className={`text-white text-base sm:text-lg mb-6 line-clamp-3 ${locale === 'en' ? 'text-left' : 'text-right'
                        }`}
                >
                    {service.desc}
                </p>

                {/* More Details Link - White version */}
                <Link
                    href={service.link}
                    aria-label={`${t('moreDetailsAria')} ${service.title}`}
                    className={`group/hover-link flex items-center gap-2 ${locale === 'en' ? 'justify-start' : 'justify-end'
                        }`}
                    prefetch={true}
                    onClick={handleLinkClick}
                    style={{
                        pointerEvents: isActive ? 'auto' : 'none',
                    }}
                >
                    <span className="text-white text-base sm:text-lg font-semibold border-b border-white pb-1">
                        {t('moreDetails')}
                    </span>
                    <Image
                        src="/icons/white-arrow.svg"
                        alt="Arrow icon"
                        width={34}
                        height={34}
                        className={`
                            transform transition-transform duration-300 
                            ${locale === 'en' ? 'rotate-90' : ''} 
                            ${locale === 'en'
                                ? 'group-hover/hover-link:rotate-135'
                                : 'group-hover/hover-link:rotate-[-45deg]'
                            }
                        `}
                    />
                </Link>
            </div>



            {/* Hidden SEO Content */}
            <div className="sr-only" aria-hidden="true">
                <span itemProp="serviceType">{service.serviceType}</span>
                <div itemProp="provider" itemScope itemType="https://schema.org/DentalClinic">
                    <span itemProp="name">Tooth Mate Dental Clinic</span>
                    <link itemProp="url" href={baseUrl} />
                </div>
                <div itemProp="availableChannel" itemScope itemType="https://schema.org/ServiceChannel">
                    <link itemProp="serviceUrl" href={`${baseUrl}/${locale}${service.link}`} />
                </div>
                <div itemProp="areaServed" itemScope itemType="https://schema.org/Country">
                    <span itemProp="name">Egypt</span>
                </div>
                <span itemProp="inLanguage">{locale === 'ar' ? "ar-EG" : "en-US"}</span>
                <meta itemProp="position" content={idx + 1} />
            </div>
        </article>
    );
}