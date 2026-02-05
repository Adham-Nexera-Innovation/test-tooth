"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
    const locale = useLocale();
    const t = useTranslations("Header", { locale });
    const [menuOpen, setMenuOpen] = useState(false);
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const baseUrl = "https://www.toothmatedental.com";

    // Structured Data for Organization
    const organizationStructuredData = {
        "@context": "https://schema.org",
        "@type": "DentalClinic",
        "name": "Tooth Mate Dental Clinic",
        "alternateName": ["Tooth Mate", "عيادة توث ميت"],
        "url": baseUrl,
        "logo": `${baseUrl}/icons/logo.svg`,
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

    // Website Structured Data
    const websiteStructuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Tooth Mate Dental Clinic",
        "url": baseUrl,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        },
        "inLanguage": [locale === 'ar' ? "ar-EG" : "en-US"]
    };

    // Mapping للـ routes (حسب الـ middleware config بتاعك)
    const routeMapping = {
        "/": ["/", "/ar", "/en"],
        "/about": ["/about", "/عن-العيادة", "/ar/عن-العيادة", "/en/about-clinic"],
        "/before-and-after": ["/cases-before-and-after", "/حالات-قبل-وبعد", "/ar/حالات-قبل-وبعد", "/en/cases-before-and-after"],
        "/services": ["/services", "/خدماتنا", "/ar/خدماتنا", "/en/our-services"],
        "/team": ["/toothmate-team", "/فريق-عمل-توث-ميت", "/ar/فريق-عمل-توث-ميت", "/en/toothmate-team"],
        "/blogs": ["/our-blogs", "/مقالاتنا", "/ar/مقالاتنا", "/en/our-blogs"],
        "/contact": ["/contact", "/تواصل-معنا", "/ar/تواصل-معنا", "/en/contact-us"],
    };

    // دالة لتحديد إذا كان الرابط نشطاً
    const isActiveLink = (path) => {
        const decodedPathname = decodeURIComponent(pathname);
        const possiblePaths = routeMapping[path] || [];

        // للصفحة الرئيسية - مطابقة تامة فقط
        if (path === "/") {
            return possiblePaths.some(p =>
                decodedPathname === p ||
                decodedPathname === p + "/"
            );
        }

        // لباقي الصفحات - تحقق من المطابقة التامة أو البداية بالمسار
        return possiblePaths.some(p =>
            decodedPathname === p ||
            decodedPathname === p + "/" ||
            decodedPathname.startsWith(p + "/")
        );
    };

    const switchLanguage = (newLocale) => {
        const currentPath = pathname;

        // إزالة اللغات الحالية من المسار
        let pathWithoutLocale = currentPath;
        const localeRegex = /^\/(ar|en)(\/|$)/;
        if (localeRegex.test(currentPath)) {
            pathWithoutLocale = currentPath.replace(localeRegex, '/');
            if (pathWithoutLocale === '') pathWithoutLocale = '/';
        }

        // بناء المسار الجديد بشكل موحد
        const newPath = `/${newLocale}${pathWithoutLocale}`;

        router.push(newPath);
        console.log("cuurrent")
        setMenuOpen(false);
        setLanguageMenuOpen(false);
    };


    // كلاسات CSS للروابط في الديسكتوب
    const getLinkClasses = (path) => {
        const baseClasses = "transition-all duration-300 ease-in-out py-2 px-1 relative";
        const activeClasses = "text-[#31C1B9] border-[#31C1B9] font-semibold after:content-[''] after:absolute after:left-0 after:bottom-[-0px] after:w-full after:h-[4px] after:bg-[#31C1B9]";
        const inactiveClasses = "border-transparent hover:text-[#31C1B9] hover:border-[#31C1B9]";

        return `${baseClasses} ${isActiveLink(path) ? activeClasses : inactiveClasses}`;
    };
    // كلاسات للروابط في الموبايل
    const getMobileLinkClasses = (path) => {
        const baseClasses = "block py-3 px-4 transition-all duration-300 ease-in-out border-r-[4px]";
        const activeClasses = "text-[#31C1B9] border-[#31C1B9] bg-blue-50 font-semibold";
        const inactiveClasses = "border-transparent hover:text-[#31C1B9] hover:bg-blue-50";

        return `${baseClasses} ${isActiveLink(path) ? activeClasses : inactiveClasses}`;
    };

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <header className="fixed top-0 w-full z-500 bg-[#0178A3]" role="banner" itemScope itemType="https://schema.org/DentalClinic">
            {/* Structured Data Scripts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
                key="organization-schema"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
                key="website-schema"
            />

            {/* شريط المعلومات - يختفي في الموبايل */}
            <div className="hidden md:flex bg-[#111827] mx-auto py-2 items-center justify-between h-[50px] px-[80px] text-white">
                <div className="flex items-center gap-9">
                    {/* ساعات العمل */}
                    <div className="flex items-center gap-2 text-sm font-medium" itemProp="openingHours" content="Mo-Sa 09:00-21:00, Su 10:00-18:00">
                        <Image src="/icons/header-date.svg" alt={t("clockAlt")} width={16} height={16} loading="lazy" />
                        <time dateTime="15:00" className="text-[12px] font-normal leading-[15.5px]" aria-label={t("workingHoursLabel")}>
                            {t("workingHours")}
                        </time>
                    </div>

                    {/* العنوان */}
                    <div className="flex items-center gap-2 text-sm font-medium" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                        <Image src="/icons/location.svg" alt={t("locationAlt")} width={14} height={18} loading="lazy" />
                        <address className="not-italic text-[12px] font-normal leading-[15.5px]" itemProp="streetAddress">
                            {t("address")}
                        </address>
                    </div>
                </div>

                {/* روابط السوشيال */}
                <div className="flex items-center gap-3">
                    <span className="text-[12px] font-normal leading-[15.5px]">{t("followUs")}</span>
                    <Link href="https://www.facebook.com/profile.php?id=100063527632794&mibextid=wwXIfr&rdid=N52igTj1CEpfaoj3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16cett3Mem%2F%3Fmibextid%3DwwXIfr#" aria-label={t("facebookLabel")} itemProp="sameAs" target="_blank">
                        <Image src="/icons/facebook.svg" alt={t("facebookAlt")} width={18} height={18} loading="lazy" />
                    </Link>
                    <Link href="/" aria-label={t("twitterLabel")} itemProp="sameAs">
                        <Image src="/icons/twitter.svg" alt={t("twitterAlt")} width={13.5} height={13.5} loading="lazy" />
                    </Link>
                    <Link href="https://www.instagram.com/toothmate_dental_clinic/?igsh=MW5jMnEzcGFvMHU1cg%3D%3D#" aria-label={t("instagramLabel")} itemProp="sameAs" target="_blank">
                        <Image src="/icons/instagram.svg" alt={t("instagramAlt")} width={13.5} height={13.5} loading="lazy" />
                    </Link>
                    <Link href="/" aria-label={t("linkedinLabel")} itemProp="sameAs">
                        <Image src="/icons/linkedin.svg" alt={t("linkedinAlt")} width={13.5} height={13.5} loading="lazy" />
                    </Link>
                </div>
            </div>

            {/* قائمة التنقل */}
            <nav className="backdrop-blur-[19px] h-[75px] bg-[#D3F3FF] md:bg-[#0000006B] text-gray-900 md:text-white shadow md:shadow-none" aria-label={t("mainNavigation")} itemScope itemType="https://schema.org/SiteNavigationElement">
                <div className={`container-custom  md:px-[15px] ${locale === 'en' ? 'lg:px-[10px]' : 'lg:px-[10px]'} py-2 flex items-center justify-between`}>

                    {/* اللوجو في التابلت والديسكتوب*/}
                    <div className="hidden md:flex items-center">
                        <Link href={`/${locale}/`} prefetch={true} itemProp="url">
                            <Image
                                src="/icons/logo.svg"
                                alt={t("logoAlt")}
                                width={45}
                                height={45}
                                className="md:w-[55px] md:h-[55px]"
                                priority
                                itemProp="logo"
                            />
                        </Link>
                    </div>

                    {/* القائمة في التابلت والديسكتوب */}
                    <ul className="hidden md:flex gap-4 md:gap-6 lg:gap-11 text-[14px] md:text-[15px] lg:text-[18px] font-medium leading-[100%]">
                        <li itemProp="name">
                            <Link href={`/${locale}/`} className={getLinkClasses("/")} onClick={handleLinkClick} prefetch={true} itemProp="url">
                                {t("home")}
                            </Link>
                        </li>
                        <li itemProp="name">
                            <Link href={`/${locale}/about`} className={getLinkClasses("/about")} onClick={handleLinkClick} prefetch={true} itemProp="url">
                                {t("about")}
                            </Link>
                        </li>
                        <li itemProp="name">
                            <Link href={`/${locale}/services`} className={getLinkClasses("/services")} onClick={handleLinkClick} prefetch={true} itemProp="url">
                                {t("services")}
                            </Link>
                        </li>
                        <li itemProp="name">
                            <Link href={`/${locale}/before-and-after`} className={getLinkClasses("/before-and-after")} onClick={handleLinkClick} prefetch={true} itemProp="url">
                                {t("cases")}
                            </Link>
                        </li>
                        <li itemProp="name">
                            <Link href={`/${locale}/team`} className={getLinkClasses("/team")} onClick={handleLinkClick} prefetch={true} itemProp="url">
                                {t("team")}
                            </Link>
                        </li>
                        <li itemProp="name">
                            <Link href={`/${locale}/blogs`} className={getLinkClasses("/blogs")} onClick={handleLinkClick} prefetch={true} itemProp="url">
                                {t("blogs")}
                            </Link>
                        </li>
                        <li itemProp="name">
                            <Link href={`/${locale}/contact-us`} className={getLinkClasses("/contact")} onClick={handleLinkClick} prefetch={true} itemProp="url">
                                {t("contact")}
                            </Link>
                        </li>
                    </ul>

                    {/* Language Switcher - Desktop */}
                    <div className="hidden md:flex items-center justify-center gap-1 relative">
                        <button
                            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                            className="flex items-center justify-center gap-1 cursor-pointer"
                            aria-label="Change language"
                            itemProp="inLanguage"
                            content={locale === 'ar' ? 'ar-EG' : 'en-US'}
                        >
                            <Image src={'/icons/arrow-bottom.svg'} width={12} height={9} alt="arrow-bottom" />
                            <strong className="text-[14px] font-[var(--font-poppins)]">{locale === 'ar' ? 'AR' : 'EN'}</strong>
                            <Image src={'/icons/Language icon.svg'} width={18} height={18} alt="Language icon" />
                        </button>

                        {/* Language Dropdown Menu */}
                        {languageMenuOpen && (
                            <div className="absolute top-full mt-2 right-0 bg-white rounded-md shadow-lg py-2 min-w-[120px] z-50">
                                <button
                                    onClick={() => switchLanguage('en')}
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${locale === 'en' ? 'bg-blue-50 text-[#31C1B9]' : 'text-gray-700'}`}
                                    lang="en"
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => switchLanguage('ar')}
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${locale === 'ar' ? 'bg-blue-50 text-[#31C1B9]' : 'text-gray-700'}`}
                                    lang="ar"
                                >
                                    العربية
                                </button>
                            </div>
                        )}
                    </div>

                    {/* الموبايل: menu على الشمال + اللوجو على اليمين */}
                    <div className="flex md:hidden w-full items-center justify-between">
                        {/* زرار المينيو على الشمال */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                            className="p-2"
                        >
                            <Image src="/icons/menu.svg" alt="menu" width={38} height={38} />
                        </button>

                        {/* اللوجو على اليمين */}
                        <Image
                            src="/icons/logo.svg"
                            alt={t("logoAlt")}
                            width={45}
                            height={45}
                            priority
                            itemProp="logo"
                        />
                    </div>
                </div>

                {/* القائمة في الموبايل */}
                {menuOpen && (
                    <div className="md:hidden bg-[#D3F3FF] shadow-lg">
                        <ul className="flex flex-col gap-0 text-[15px] font-medium text-gray-900">
                            <li itemProp="name">
                                <Link href={`/${locale}/`} className={getMobileLinkClasses("/")} onClick={handleLinkClick} itemProp="url">
                                    {t("home")}
                                </Link>
                            </li>
                            <li itemProp="name">
                                <Link href={`/${locale}/about`} className={getMobileLinkClasses("/about")} onClick={handleLinkClick} prefetch={true} itemProp="url">
                                    {t("about")}
                                </Link>
                            </li>
                            <li itemProp="name">
                                <Link href={`/${locale}/services`} className={getMobileLinkClasses("/services")} onClick={handleLinkClick} prefetch={true} itemProp="url">
                                    {t("services")}
                                </Link>
                            </li>
                            <li itemProp="name">
                                <Link href={`/${locale}/team`} className={getMobileLinkClasses("/team")} onClick={handleLinkClick} prefetch={true} itemProp="url">
                                    {t("team")}
                                </Link>
                            </li>
                            <li itemProp="name">
                                <Link href={`/${locale}/before-and-after`} className={getMobileLinkClasses("/before-and-after")} onClick={handleLinkClick} prefetch={true} itemProp="url">
                                    {t("cases")}
                                </Link>
                            </li>
                            <li itemProp="name">
                                <Link href={`/${locale}/blogs`} className={getMobileLinkClasses("/articles")} onClick={handleLinkClick} prefetch={true} itemProp="url">
                                    {t("blogs")}
                                </Link>
                            </li>
                            <li itemProp="name">
                                <Link href={`/${locale}/contact-us`} className={getMobileLinkClasses("/contact")} onClick={handleLinkClick} prefetch={true} itemProp="url">
                                    {t("contact")}
                                </Link>
                            </li>

                            {/* Language Switcher - Mobile */}
                            <li className="border-t border-gray-200 mt-2 pt-2">
                                <div className="px-4 py-3">
                                    <span className="block text-sm font-medium text-gray-500 mb-2">Language / اللغة</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => switchLanguage('en')}
                                            className={`flex-1 py-2 px-3 rounded border text-sm ${locale === 'en' ? 'bg-[#31C1B9] text-white border-[#31C1B9]' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
                                            lang="en"
                                        >
                                            English
                                        </button>
                                        <button
                                            onClick={() => switchLanguage('ar')}
                                            className={`flex-1 py-2 px-3 rounded border text-sm ${locale === 'ar' ? 'bg-[#31C1B9] text-white border-[#31C1B9]' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
                                            lang="ar"
                                        >
                                            العربية
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
            <div>

            </div>
        </header >
    );
}