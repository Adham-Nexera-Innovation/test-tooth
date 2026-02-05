import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    localePrefix: 'always',
    localeDetection: false, // Disable automatic locale detection to prevent redirects
    pathnames: {
        '/': '/',
        '/services': {
            ar: '/خدماتنا',         // 👈 URL بالعربي
            en: '/our-services'   // 👈 URL بالإنجليزي
        },
        '/blogs': {
            ar: '/مقالاتنا',
            en: '/our-blogs'
        },
        'ar/about': {
            ar: '/عن-العيادة',
            en: '/about-clinic'
        },
        '/before-and-after': {
            ar: '/حالات-قبل-وبعد',
            en: '/cases-before-and-after'
        },
        '/contact-us': {
            ar: '/تواصل-معنا',
            en: '/contact-us'
        },
        '/team': {
            ar: '/فريق-عمل-توث-ميت',
            en: '/toothmate-team'
        },
        '/services/implant': {
            ar: '/زراعة-الأسنان/خدماتنا',
            en: '/our-services/dental-implants'
        },
        '/services/surgery': {
            ar: '/جراحة-الأسنان/خدماتنا',
            en: '/our-services/dental-surgery'
        },
        '/services/hollywood-smile': {
            ar: '/هوليوود-سمايل/خدماتنا',
            en: '/our-services/hollywood-smile'
        },
        '/services/braces': {
            ar: '/تقويم-الاسنان/خدماتنا',
            en: '/our-services/dental-braces'
        },
        '/services/cosmetic': {
            ar: '/الحشوات-التجميلية/خدماتنا',
            en: '/our-services/cosmetic-dentistry'
        },
        '/services/dental-prosthetics': {
            ar: '/تركيبات-الاسنان/خدماتنا',
            en: '/our-services/dental-prosthetics'
        },
        '/services/root-canal': {
            ar: '/حشو-العصب/خدماتنا',
            en: '/our-services/root-canal'
        },
        '/services/pediatric-dentistry': {
            ar: '/طب-أسنان-ألاطفال/خدماتنا',
            en: '/our-services/pediatric-dentistry'
        },
        '/services/general-anesthesia': {
            ar: '/التخدير-الكلي/خدماتنا',
            en: '/our-services/general-anesthesia'
        },
        '/services/jaw-fractures': {
            ar: '/حالات-كسور-الفك/خدماتنا',
            en: '/our-services/jaw-fractures'
        },
        '/services/oral-tumors': {
            ar: '/جراحات-أورام-الفم/خدماتنا',
            en: '/our-services/oral-tumors-surgery'
        },
        '/blogs/anesthesia': {
            ar: '/كل-ما-تحتاج-معرفتة-عن-التخدير-الكلي-للاسنان/مقالاتنا',
            en: '/our-blogs/all-you-need-to-know-about-general-anesthesia'
        },
        '/blogs/braces-price': {
            ar: '/أسعار-التقويم-في-مصر/مقالاتنا',
            en: '/our-blogs/braces-price-in-egypt'
        },
        '/blogs/tooth-whitening': {
            ar: '/تبييض-ألاسنان/مقالاتنا',
            en: '/our-blogs/tooth-whitening'
        },
        '/blogs/dental-implants': {
            ar: '/دليل-زراعة-الأسنان-في-مصر-2025/مقالاتنا',
            en: '/our-blogs/egypt-dental-implant-2025'
        },
        '/blogs/root-canal': {
            ar: '/دليلك-الكامل-لحشو-العصب/مقالاتنا',
            en: '/our-blogs/root-canal-treatment-egypt-2025'
        },
        '/blogs/best-dentist-near-me': {
            ar: '/أفضل-دكتور-اسنان-قريب-منك-في-المعادي/مقالاتنا',
            en: '/our-blogs/best-dentist-near-you-maadi'
        },
        '/blogs/fixed-dental-prosthesis': {
            ar: '/دليلك-لأفضل-نركيبات-الأسنان-في-المعادي/مقالاتنا',
            en: '/our-blogs/best-fixed-dental-prosthesis'
        },
        '/blogs/hollywood-smile': {
            ar: '/هوليود-اسمايل/مقالاتنا',
            en: '/our-blogs/hollywood-smile'
        },
        '/blogs/fillings': {
            ar: '/الحشوات-التجميلية/مقالاتنا',
            en: '/our-blogs/teeth-filling'
        },
        '/blogs/pediatric-dentist-maadi': {
            ar: '/أفضل-دكتور-أسنان-متحصص-بالمعادي/مقالاتنا',
            en: '/our-blogs/best-pediatric-dentist-maadi'
        },
    }
});

