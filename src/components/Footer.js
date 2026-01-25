"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
    const locale = useLocale();
    const t = useTranslations('Footer');

    // Fallback translations in case of errors
    const getTranslation = (key) => {
        try {
            return t(key);
        } catch (error) {
            console.warn(`Translation error for key "${key}":`, error);

            // Fallback translations
            const fallbackTranslations = {
                'logoAlt1': 'ToothMate Logo',
                'logoAlt2': 'ToothMate Symbol',
                'followUs': 'Follow Us',
                'dividerAlt': 'Divider',
                'horizontalLineAlt': 'Horizontal Line',
                'footerNavigation': 'Footer Navigation',
                'rights': 'All rights reserved',
                'home': 'Home',
                'about': 'About',
                'services': 'Services',
                'beforeAfter': 'Before & After',
                'contact': 'Contact'
            };

            return fallbackTranslations[key] || key;
        }
    };

    // Get current year safely
    const currentYear = new Date().getFullYear();

    const baseUrl = "https://www.toothmatedental.com";

    // Structured Data for Organization
    const organizationStructuredData = {
        "@context": "https://schema.org",
        "@type": "DentalClinic",
        "@id": `${baseUrl}#organization`,
        "name": "Tooth Mate Dental Clinic",
        "alternateName": ["Tooth Mate", "عيادة توث ميت"],
        "url": baseUrl,
        "logo": [
            `${baseUrl}/icons/logo-white-2.svg`,
            `${baseUrl}/icons/logo-white-1.svg`
        ],
        "description": locale === 'ar'
            ? "أفضل عيادة أسنان في القاهرة تقدم خدمات متكاملة من تجميل الأسنان إلى الجراحات المتقدمة"
            : "Best dental clinic in Cairo offering comprehensive services from cosmetic dentistry to advanced surgeries",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": locale === 'ar' ? "شارع 263، المعادي الجديدة" : "Street 263, New Maadi",
            "addressLocality": locale === 'ar' ? "القاهرة" : "Cairo",
            "addressRegion": "Cairo",
            "postalCode": "11742",
            "addressCountry": "EG"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "29.9599",
            "longitude": "31.2581"
        },
        "telephone": "+20-100-329-4050",
        "email": "info@toothmatedental.com",
        "openingHours": [
            "Mo-Sa 09:00-21:00",
            "Su 10:00-18:00"
        ],
        "priceRange": "$$",
        "medicalSpecialty": "Dentistry",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": locale === 'ar' ? "خدمات طب الأسنان" : "Dental Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": locale === 'ar' ? "زراعة الأسنان" : "Dental Implants"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": locale === 'ar' ? "ابتسامة هوليوود" : "Hollywood Smile"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": locale === 'ar' ? "تقويم الأسنان" : "Dental Braces"
                    }
                }
            ]
        }
    };

    // Breadcrumb Structured Data for Footer Navigation
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
                "name": locale === 'ar' ? 'عن العيادة' : 'About Clinic',
                "item": `${baseUrl}/${locale}/about`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": locale === 'ar' ? 'خدماتنا' : 'Our Services',
                "item": `${baseUrl}/${locale}/services`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": locale === 'ar' ? 'تواصل معنا' : 'Contact Us',
                "item": `${baseUrl}/${locale}/contact-us`
            }
        ]
    };

    return (
        <footer
            className="bg-gradient-to-r from-[#4DC0C1] from-[5%] to-[rgba(0,78,106,0.9)] to-[100%] min-h-[250px] sm:min-h-[250px] py-6 sm:py-14"
            role="contentinfo"
            itemScope
            itemType="https://schema.org/WPFooter"
        >
            {/* Structured Data Scripts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
                key="footer-organization-schema"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
                key="footer-breadcrumb-schema"
            />

            <div className="container-custom mx-auto">
                {/* الشعارات والسوشيال ميديا */}
                <div
                    className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4 mb-6 sm:mb-4"
                    itemScope
                    itemType="https://schema.org/Organization"
                    itemID="#organization"
                >
                    <div className="flex gap-4 sm:gap-3 items-center">
                        <Link
                            href="/"
                            aria-label="ToothMate Logo"
                            itemProp="url"
                        >
                            <Image
                                src="/icons/logo-white-2.svg"
                                alt={getTranslation('logoAlt1')}
                                width={160}
                                height={48}
                                className="w-[140px] sm:w-[125px] h-auto"
                                loading="lazy"
                                itemProp="logo"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </Link>
                        <Link
                            href="/"
                            aria-label="ToothMate Logo"
                            itemProp="url"
                        >
                            <Image
                                src="/icons/logo-white-1.svg"
                                alt={getTranslation('logoAlt2')}
                                width={70}
                                height={75}
                                className="w-[60px] sm:w-[55px] h-auto"
                                loading="lazy"
                                itemProp="logo"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </Link>
                    </div>

                    {/* تابعنا على السوشيال ميديا */}
                    <div
                        className="flex items-center justify-center gap-4 sm:gap-4"
                        itemScope
                        itemType="https://schema.org/SocialMediaPosting"
                    >
                        <span
                            className="text-[12px] md:text-[14pxs] font-normal leading-[18px] text-white"
                            itemProp="sharedContent"
                        >
                            {getTranslation('followUs')}
                        </span>
                        <Image
                            src="/images/vertical line.png"
                            alt={getTranslation('dividerAlt')}
                            width={4}
                            height={24}
                            className="hidden sm:block"
                            loading="lazy"
                            aria-hidden="true"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <div className="flex gap-4 sm:gap-3" itemProp="sameAs">
                            {[
                                { platform: 'facebook', url: 'https://www.facebook.com/profile.php?id=100063527632794&mibextid=wwXIfr&rdid=N52igTj1CEpfaoj3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16cett3Mem%2F%3Fmibextid%3DwwXIfr#' },
                                { platform: 'twitter', url: 'https://www.twitter.com/toothmatedental' },
                                { platform: 'instagram', url: 'https://www.instagram.com/toothmate_dental_clinic/?igsh=MW5jMnEzcGFvMHU1cg%3D%3D#' },
                                { platform: 'linkedin', url: 'https://www.linkedin.com/company/toothmatedental' }
                            ].map((social) => (
                                <Link
                                    key={social.platform}
                                    href={social.url}
                                    aria-label={`Follow us on ${social.platform}`}
                                    itemProp="url"
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                >
                                    <Image
                                        src={`/icons/${social.platform}.svg`}
                                        alt={`${social.platform} icon`}
                                        width={18}
                                        height={18}
                                        className="sm:w-[20px] h-auto"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* خط فاصل */}
                <div className="my-4 sm:my-8" aria-hidden="true">
                    <Image
                        src="/images/Line.png"
                        alt={getTranslation('horizontalLineAlt')}
                        width={1280}
                        height={3}
                        className="w-full h-[3px] sm:h-[4px]"
                        loading="lazy"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>

                {/* الحقوق وروابط التنقل */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 text-[12px] sm:text-[14px] font-normal leading-[18px]">
                    {/* الحقوق */}
                    <div
                        className="order-2 sm:order-1 text-center sm:text-left"
                        itemProp="copyrightYear"
                    >
                        <span className="text-white" dir="rtl">
                            {getTranslation('rights')} <span dir="ltr">{currentYear} © ToothMate - </span>
                        </span>
                    </div>

                    {/* روابط التنقل */}
                    <nav
                        aria-label={getTranslation('footerNavigation')}
                        className="order-1 sm:order-2"
                        role="navigation"
                        itemScope
                        itemType="https://schema.org/SiteNavigationElement"
                    >
                        <ul className="flex flex-wrap justify-center text-white gap-4 sm:gap-4">
                            {[
                                { key: 'home', href: '/', name: 'Home' },
                                { key: 'about', href: '/about', name: 'About Clinic' },
                                { key: 'services', href: '/services', name: 'Dental Services' },
                                { key: 'beforeAfter', href: '/#cases', name: 'Before & After' },
                                { key: 'contact', href: '/contact-us', name: 'Contact Us' }
                            ].map((item) => (
                                <li key={item.key} itemProp="name">
                                    <Link
                                        href={item.href}
                                        className="hover:underline whitespace-nowrap"
                                        itemProp="url"
                                        prefetch={true}
                                    >
                                        {getTranslation(item.key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Hidden SEO Content */}
                <div className="sr-only" aria-hidden="true">
                    <div itemScope itemType="https://schema.org/DentalClinic">
                        <span itemProp="name">Tooth Mate Dental Clinic</span>
                        <span itemProp="description">
                            {locale === 'ar'
                                ? "أفضل عيادة أسنان في المعادي تقدم خدمات زراعة الأسنان، التقويم، هوليود سمايل وتبييض الأسنان"
                                : "Best dental clinic in Maadi offering dental implants, braces, Hollywood smile and teeth whitening services"
                            }
                        </span>
                        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                            <span itemProp="streetAddress">
                                {locale === 'ar' ? "شارع 263، المعادي الجديدة" : "Street 263, New Maadi"}
                            </span>
                            <span itemProp="addressLocality">{locale === 'ar' ? "القاهرة" : "Cairo"}</span>
                            <span itemProp="addressRegion">{locale === 'ar' ? "القاهرة الكبرى" : "Greater Cairo"}</span>
                            <span itemProp="postalCode">11742</span>
                            <span itemProp="addressCountry">EG</span>
                        </div>
                        <span itemProp="telephone">+20-100-329-4050</span>
                        <span itemProp="openingHours">Mo-Sa 09:00-21:00</span>
                        <span itemProp="openingHours">Su 10:00-18:00</span>
                        <span itemProp="priceRange">$$</span>
                        <span itemProp="medicalSpecialty">Dentistry</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}