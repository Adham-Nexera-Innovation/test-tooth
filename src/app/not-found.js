import { NextIntlClientProvider } from 'next-intl';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Location from '@/components/location';
import ConditionalContact from '@/components/conditional-contact';
import '@/app/globals.css';

import { Cairo } from 'next/font/google';

const cairo = Cairo({
    subsets: ['arabic'],
    weight: ['400', '700'],
    variable: '--font-cairo',
    display: 'swap',
});

export default function NotFound() {
    const t = useTranslations('NotFound');
    const validLocale = useLocale();
    return (

        <>
            <NextIntlClientProvider
                timeZone="Africa/Cairo"
            >
                <div dir={validLocale === 'ar' ? 'rtl' : 'ltr'} className={cairo.variable}>
                    <Header />
                </div>
                <div className="mb-[60px] mt-[200px] flex items-center justify-center bg-white px-4">
                    <div className="text-center max-w-md">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0178A3] mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-gray-600 text-base sm:text-lg mb-6">
                            {t('description')}
                        </p>
                        <Link
                            href="/"
                            prefetch={true}
                            className="inline-block bg-gradient-to-r from-[#49C2BC] to-[#02948C] text-white px-6 py-2 rounded-md text-sm sm:text-base font-semibold hover:from-[#3aa8a9] hover:to-[#036185] transition-all duration-200"
                        >
                            {t('goHome')}
                        </Link>
                    </div>
                </div>

                <div dir={validLocale === 'ar' ? 'rtl' : 'ltr'} className={cairo.variable}>
                    <ConditionalContact />
                </div>
                <div>
                    <Location dir={validLocale === 'ar' ? 'rtl' : 'ltr'} className={cairo.variable} />
                </div>
                <div>
                    <Footer dir={validLocale === 'ar' ? 'rtl' : 'ltr'} className={cairo.variable} />
                </div>
            </NextIntlClientProvider>
        </>

    );
}
