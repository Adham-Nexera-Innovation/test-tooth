import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    localePrefix: 'always',
    localeDetection: true,
    pathnames: {
        '/': '/',
        '/services': {
            ar: '/خدمات',
            en: '/services'
        },
        '/blogs': {
            ar: '/مقالات',
            en: '/blogs'
        },
        '/about': {
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
            ar: '/زراعة-الأسنان',
            en: '/dental-implants'
        },
        '/services/surgery': {
            ar: '/جراحة-الأسنان',
            en: '/dental-surgery'
        },
        '/services/hollywood-smile': {
            ar: '/هوليوود-سمايل',
            en: '/hollywood-smile'
        },
        '/services/braces': {
            ar: '/تقويم-الاسنان',
            en: '/dental-braces'
        },
        '/services/cosmetic': {
            ar: '/الحشوات-التجميلية',
            en: '/cosmetic-dentistry'
        },
        '/services/dental-prosthetics': {
            ar: '/تركيبات-الاسنان',
            en: '/dental-prosthetics'
        },
        '/services/root-canal': {
            ar: '/حشو-العصب',
            en: '/root-canal'
        },
        '/services/pediatric-dentistry': {
            ar: '/طب-أسنان-ألاطفال',
            en: '/pediatric-dentistry'
        },
        '/services/general-anesthesia': {
            ar: '/التخدير-الكلي',
            en: '/general-anesthesia'
        },
        '/services/jaw-fractures': {
            ar: '/حالات-كسور-الفك',
            en: '/jaw-fractures'
        },
        '/services/oral-tumors': {
            ar: '/جراحات-أورام-الفم',
            en: '/oral-tumors-surgery'
        },
        '/blogs/anesthesia': {
            ar: '/كل-ما-تحتاج-معرفتة-عن-التخدير-الكلي-للاسنان',
            en: '/all-you-need-to-know-about-general-anesthesia'
        },
        '/blogs/braces-price': {
            ar: '/أسعار-التقويم-في-مصر',
            en: '/braces-price-in-egypt'
        },
        '/blogs/tooth-whitening': {
            ar: '/تبييض-ألاسنان',
            en: '/tooth-whitening'
        },
        '/blogs/dental-implants': {
            ar: '/دليل-زراعة-الأسنان-في-مصر-2025',
            en: '/egypt-dental-implant-2025'
        },
        '/blogs/root-canal': {
            ar: '/دليلك-الكامل-لحشو-العصب',
            en: '/root-canal-treatment-egypt-2025'
        },
        '/blogs/best-dentist-near-me': {
            ar: '/أفضل-دكتور-اسنان-قريب-منك-في-المعادي',
            en: '/best-dentist-near-you-maadi'
        },
        '/blogs/fixed-dental-prosthesis': {
            ar: '/دليلك-لأفضل-نركيبات-الأسنان-في-المعادي',
            en: '/best-fixed-dental-prosthesis'
        },
        '/blogs/hollywood-smile': {
            ar: '/هوليود-اسمايل',
            en: '/hollywood-smile'
        },
        '/blogs/fillings': {
            ar: '/الحشوات-التجميلية',
            en: '/teeth-filling'
        },
        '/blogs/pediatric-dentist-maadi': {
            ar: '/أفضل-دكتور-أسنان-متحصص-بالمعادي',
            en: '/best-pediatric-dentist-maadi'
        }
    }
});