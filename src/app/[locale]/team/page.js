// app/[locale]/dental-team/page.js
import TeamComponent from './TeamComponent';
import Script from 'next/script';

import { getLocale } from 'next-intl/server';

export async function generateMetadata() {
    const locale = await getLocale();

    const baseUrl = 'https://toothmatedental.com';
    const canonicalPath = locale === 'ar' ? '/فريق-عمل-توث-ميت' : '/toothmate-team';
    const canonicalUrl = `${baseUrl}/${locale}${canonicalPath}`;

    const pageTitle = locale === 'en'
        ? 'Our Dental Team - ToothMate Dental Clinic in Maadi'
        : 'فريقنا الطبي - عيادة توث ميت لطب الأسنان في المعادي';

    const pageDescription = locale === 'en'
        ? 'Meet our professional dental team at ToothMate Clinic: Dr. Mohamed Selim El-Abd with 22+ years experience and specialized dentists in Maadi'
        : 'تعرف على فريقنا الطبي في عيادة توث ميت: دكتور محمد سليم العبد مع خبرة 22+ سنة وأطباء أسنان متخصصين في المعادي';

    return {
        title: pageTitle,
        description: pageDescription,
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'ar-EG': `${baseUrl}/ar/فريق-عمل-توث-ميت`,
                'en-US': `${baseUrl}/en/toothmate-team`,
                'x-default': `${baseUrl}`
            }
        },
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: canonicalUrl,
            type: 'website',
            locale: locale === 'ar' ? 'ar_EG' : 'en_US',
            siteName: 'ToothMate Dental Clinic',
            images: [
                {
                    url: `${baseUrl}/images/Dr. Mohamed El Abd.png`,
                    width: 1200,
                    height: 630,
                    alt: locale === 'en' ? 'Dr. Mohamed Selim El-Abd' : 'دكتور محمد سليم العبد'
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDescription,
            images: [`${baseUrl}/images/Dr. Mohamed El Abd.png`]
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1
            }
        },
        keywords: locale === 'en'
            ? "dentist maadi, dental team, toothmate clinic, dental specialists, orthodontist, implant specialist"
            : "طبيب أسنان المعادي, فريق طبي, عيادة توث ميت, أخصائي أسنان, تقويم أسنان, زراعة أسنان"
    };
}

const generateStructuredData = (locale) => {
    const baseUrl = 'https://toothmatedental.com';

    return {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "ToothMate Dental Clinic",
        "description": locale === 'en'
            ? "Professional dental clinic with experienced dental team in Maadi"
            : "عيادة أسنان محترفة مع فريق طبي ذو خبرة في المعادي",
        "medicalSpecialty": "Dentistry",
        "employee": [
            {
                "@type": "Dentist",
                "name": locale === 'en' ? 'Dr. Mohamed Selim El-Abd' : 'د/ محمد سليم العبد',
                "medicalSpecialty": "Dentistry",
                "experienceYears": 22
            }
        ]
    };
};

export default function DentalTeamPage() {
    const locale = getLocale();
    const structuredData = generateStructuredData(locale);

    return (
        <>
            <Script
                id="team-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <TeamComponent />
        </>
    );
}