'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export const dynamic = 'force-static';
export const revalidate = 604800; // Revalidate every week

export default function LandingPageServices() {
    const t = useTranslations('landingPage.services');
    const locale = useLocale();

    const baseUrl = 'https://www.toothmatedental.com';

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
            title: t('cosmetic.title'),
            desc: t('cosmetic.desc'),
            alt: t('cosmetic.imageAlt'),
            icon: '/icons/clean.png',
            img: '/images/Cosmetic Dental Fillings.webp',
            link: '/services/cosmetic',
            serviceType: 'CosmeticDentistry',
        },
        {
            title: t('orthodontics.title'),
            desc: t('orthodontics.desc'),
            alt: t('orthodontics.imageAlt'),
            icon: '/icons/teeth.png',
            img: '/images/braces-service.webp',
            link: '/services/braces',
            serviceType: 'Orthodontics',
        },
        {
            title: t('prosthetics.title'),
            desc: t('prosthetics.desc'),
            alt: t('prosthetics.imageAlt'),
            icon: '/icons/natural-appearance.png',
            img: '/images/Hollywood.jpg',
            link: '/services/dental-prosthetics',
            serviceType: 'DentalProsthetics',
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
            icon: '/icons/why-implant-icon.svg',
            img: '/images/child.webp',
            link: '/services/pediatric-dentistry',
            serviceType: 'PediatricDentistry',
        },
    ];

    // Structured Data for Services Section
    const servicesStructuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": locale === 'ar' ? "خدمات طب الأسنان" : "Dental Services",
        "description": locale === 'ar'
            ? "مجموعة متكاملة من خدمات طب الأسنان والتجميل في عيادة توث ميت"
            : "Comprehensive range of dental and cosmetic services at Tooth Mate Clinic",
        "numberOfItems": services.length,
        "itemListElement": services.map((service, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Service",
                "name": service.title,
                "description": service.desc,
                "image": `${baseUrl}${service.img}`,
                "serviceType": service.serviceType,
                "provider": {
                    "@type": "DentalClinic",
                    "name": "Tooth Mate Dental Clinic",
                    "url": baseUrl
                },
                "url": `${baseUrl}/${locale}${service.link}`,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `${baseUrl}/${locale}${service.link}`
                },
                "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": `${baseUrl}/${locale}${service.link}`
                },
                "areaServed": {
                    "@type": "Country",
                    "name": "Egypt"
                },
                "inLanguage": locale === 'ar' ? "ar-EG" : "en-US"
            }
        }))
    };

    // Service Catalog Structured Data
    const serviceCatalogStructuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": locale === 'ar' ? "خدمات طب الأسنان المتكاملة" : "Comprehensive Dental Services",
        "description": locale === 'ar'
            ? "عيادة توث ميت تقدم مجموعة متكاملة من خدمات طب الأسنان تشمل الزراعة، التقويم، التجميل وعلاجات الأطفال"
            : "Tooth Mate Clinic offers comprehensive dental services including implants, orthodontics, cosmetics and pediatric treatments",
        "provider": {
            "@type": "DentalClinic",
            "name": "Tooth Mate Dental Clinic",
            "url": baseUrl
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": locale === 'ar' ? "قائمة خدمات الأسنان" : "Dental Services Catalog",
            "itemListElement": services.map((service, index) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": service.title,
                    "description": service.desc,
                    "serviceType": service.serviceType
                },
                "position": index + 1
            }))
        },
        "areaServed": {
            "@type": "Country",
            "name": "Egypt"
        },
        "availableLanguage": ["ar", "en"]
    };


    return (
        <section
            className="relative py-12 w-full overflow-hidden rounded-t-[50px] bg-[#003548]"
            aria-labelledby="services-title"
            itemScope
            itemType="https://schema.org/Service"
        >

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

            {/* Header */}
            <div className="flex items-center justify-between mb-10 text-white relative z-10 mx-8 lg:mx-18">
                <h3
                    id="services-meta-title"
                    className="text-2xl md:text-3xl font-bold text-center"
                    itemProp="name"
                >
                    {t('title')}{' '}
                    <strong className="text-white" itemProp="keywords">
                        {t('sectionHighlight')}
                    </strong>
                </h3>
                <Link
                    href="/services"
                    aria-label={t('viewAllAria')}
                    className="group md:flex items-center text-sm lg:text-[16px] font-semibold hidden gap-2"
                    prefetch={true}
                    itemProp="url"
                >
                    <span
                        className={`
                            border-b pb-0.5
                            text-white
                            font-bold border-white
                            group-hover:text-[#04729A]
                            group-hover:border-[#04729A]
                            ${locale === 'en' ? 'group-hover:translate-x-1' : 'group-hover:translate-x-[-5px]'}
                            transition-transform duration-600
                        `}
                    >
                        {t('viewAll')}
                    </span>
                    <Image
                        src="/icons/white-arrow.svg"
                        alt="Arrow icon"
                        width={28}
                        height={28}
                        className={`
                            transform
                            transition-transform duration-600
                            ${locale === 'en' ? 'rotate-90' : ''}
                            ${locale === 'en' ? 'group-hover:rotate-135' : 'group-hover:rotate-[-45deg]'}
                            `}
                    />
                </Link>
            </div>

            {/* Services Grid */}
            <div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-11 xl:mx-30 relative z-10 mx-auto"
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
            <div className="md:hidden w-[155px] h-[45px] 
                mx-auto flex items-center justify-center 
                border border-white
                mt-8
                mb-[-12px]
                bg-gradient-to-r from-[#43BBB5] to-[#05817B] rounded-sm">
                <Link
                    className="text-white text-[14px]  text-center font-semibold"
                    prefetch={true}
                    href="/services"
                >
                    {locale === 'ar' ? "عرض جميع الخدمات" : "View All Services"}
                </Link>
            </div>


            {/* Hidden SEO Content for the entire section */}
            <div className="sr-only" aria-hidden="true">
                <div itemScope itemType="https://schema.org/Service">
                    <span itemProp="name">{locale === 'ar' ? "خدمات طب الأسنان المتكاملة" : "Comprehensive Dental Services"}</span>
                    <span itemProp="description">
                        {locale === 'ar'
                            ? "عيادة توث ميت تقدم مجموعة متكاملة من خدمات طب الأسنان تشمل الزراعة، التقويم، التجميل وعلاجات الأطفال"
                            : "Tooth Mate Clinic offers comprehensive dental services including implants, orthodontics, cosmetics and pediatric treatments"
                        }
                    </span>
                    <div itemProp="provider" itemScope itemType="https://schema.org/DentalClinic">
                        <span itemProp="name">Tooth Mate Dental Clinic</span>
                        <link itemProp="url" href={baseUrl} />
                    </div>
                    <span itemProp="availableLanguage">ar</span>
                    <span itemProp="availableLanguage">en</span>
                </div>
            </div>
        </section>
    );
}

// ServiceCard component as a client component
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

    // إزالة تحديد النص على الموبايل لمنع التحديد غير المقصود
    useEffect(() => {
        if (isMobile) {
            const preventTextSelection = (e) => {
                if (isActive || isLongPress) {
                    e.preventDefault();
                }
            };

            document.addEventListener('selectstart', preventTextSelection);
            return () => {
                document.removeEventListener('selectstart', preventTextSelection);
            };
        }
    }, [isMobile, isActive, isLongPress]);

    const handleTouchStart = () => {
        if (isMobile) {
            // بدء مؤقت للضغط المطول (500ms)
            longPressTimerRef.current = setTimeout(() => {
                setIsLongPress(true);
                setIsActive(true);
            }, 500);
        }
    };

    const handleTouchMove = () => {
        // إذا تحرك المستخدم، إلغاء الضغط المطول
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
    };

    const handleTouchEnd = () => {
        // تنظيف المؤقتات
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }

        // إذا كان ضغط عادي (ليس طويل)، تنفيذ السلوك العادي
        if (!isLongPress) {
            // مؤقت صغير للسماح بالنقر على الروابط
            timerRef.current = setTimeout(() => {
                const activeElement = document.activeElement;
                if (!articleRef.current?.contains(activeElement) || activeElement.tagName !== 'A') {
                    setIsActive(false);
                }
            }, 100);
        } else {
            // إذا كان ضغط طويل، نبقى في وضع النشط
            // نضبط مؤقت لإعادة تعيين بعد ثانيتين
            timerRef.current = setTimeout(() => {
                setIsActive(false);
                setIsLongPress(false);
            }, 2000);
        }
    };

    const handleLinkClick = (e) => {
        // السماح للرابط بالعمل بشكل طبيعي
        e.stopPropagation();
        if (timerRef.current) clearTimeout(timerRef.current);
        if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
        setIsActive(false);
        setIsLongPress(false);
    };

    const handleCardClick = (e) => {
        // على الديسكتوب، السلوك العادي
        if (!isMobile) {
            return;
        }

        // على الموبايل، إذا كان نقر سريع (ليس ضغط طويل)
        if (!isLongPress) {
            // يمكنك هنا تنفيذ سلوك إضافي للنقر السريع إذا أردت
            // مثلاً: فتح التفاصيل مباشرة
        }
    };

    return (
        <article
            ref={articleRef}
            className={`group rounded-xl shadow-md relative w-75 sm:w-82 lg:w-90 min-h-[380px] mx-auto overflow-hidden transition-all duration-500 ${isMobile ? 'select-none touch-manipulation' : ''
                }`}
            onMouseEnter={() => !isMobile && setIsActive(true)}
            onMouseLeave={() => !isMobile && setIsActive(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleCardClick}
            style={{
                WebkitTouchCallout: isMobile ? 'none' : 'default',
                WebkitUserSelect: isMobile ? 'none' : 'auto',
                userSelect: isMobile ? 'none' : 'auto',
            }}
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
                }}
            />

            {/* Original Content - Hidden with smooth transition */}
            <div
                className={`absolute w-full bg-[#9FDCFA] bottom-[0.25px] border border-[#31C1B9] shadow-2xl rounded-xl transition-all duration-500 ${isActive ? 'opacity-0 translate-y-full' : ''
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

        </article>
    );
}