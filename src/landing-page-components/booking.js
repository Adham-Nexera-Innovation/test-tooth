import Image from "next/image";
import { getLocale, getTranslations } from 'next-intl/server';

export const revalidate = 604800 // Revalidate every week

export default async function Booking() {
    const { locale } = await getLocale();
    const t = await getTranslations('booking');

    const baseUrl = "https://www.toothmatedental.com";

    const MedicalApplications = [
        {
            path: "/images/ekshef.webp",
            alt: t('apps.akshef'),
            id: "akshef-app",
            name: "Akshef",
            sizes: "w-[107.96px] h-[33.91px] mt-1 sm:w-[141px] sm:h-[50px]",
            shadowPostion: "top-1/3 left-1/16",
            url: "https://www.akshef.com"
        },
        {
            path: "/images/what-clinic-booking.webp",
            alt: 'what-clinic-icon',
            id: "whatClinic-app",
            name: "what-clinic",
            sizes: "w-[120.96px] h-[20.91px] sm:w-[180px] sm:h-[40px]",
            shadowPostion: "top-1/4 left-1/10",
            url: "https://www.whatClinic.com"
        },
        {
            path: "/images/dawinaa-booking.webp",
            alt: t('apps.dawinaa'),
            id: "dawinaa-app",
            sizes: "w-[107.96px] h-[33.91px] sm:w-[131px] sm:h-[48px]",
            shadowPostion: "top-1/3 left-1/10",
            name: "Dawinaa",
            url: "https://www.dawinaa.com"
        },
    ];

    // Structured Data for Booking Section
    const bookingStructuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": t('title'),
        "description": t('subtitle'),
        "provider": {
            "@type": "DentalClinic",
            "name": "Tooth Mate Dental Clinic",
            "url": baseUrl
        },
        "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": `${baseUrl}/booking`,
            "availableLanguage": ["ar", "en"]
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Booking Platforms",
            "itemListElement": MedicalApplications.map((app, index) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": app.name,
                    "description": app.alt,
                    "url": app.url
                },
                "position": index + 1
            }))
        },
        "areaServed": {
            "@type": "Country",
            "name": "Egypt"
        }
    };

    // Action for Booking
    const actionStructuredData = {
        "@context": "https://schema.org",
        "@type": "Action",
        "name": "Book Dental Appointment",
        "description": "Book an appointment with Tooth Mate Dental Clinic through various medical platforms",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/booking`,
            "actionPlatform": [
                "https://schema.org/DesktopWebPlatform",
                "https://schema.org/MobileWebPlatform"
            ]
        },
        "result": {
            "@type": "Appointment",
            "serviceType": "Dental Care"
        }
    };

    return (
        <section
            className="pt-16 bg-[#003548]"
            aria-labelledby="booking-title"
            itemScope
            itemType="https://schema.org/Service"
        >
            {/* Structured Data Scripts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(bookingStructuredData) }}
                key="booking-service-schema"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(actionStructuredData) }}
                key="booking-action-schema"
            />

            <div className="bg-[#004964] rounded-t-3xl py-14 pb-8">

                <div className="container-custom ">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center mb-4 xl:mx-20">
                        <div>
                            <p
                                id="booking-title"
                                className="text-2xl md:text-[32px] font-bold mb-4 text-white"
                                itemProp="name"
                            >
                                {t('title')}
                            </p>
                            <p
                                className="text-[22px] sm:text-[28px] text-[#31C1B9] font-meduim leading-relaxed"
                                itemProp="description"
                            >
                                {t('subtitle')}
                            </p>
                        </div>
                        <div className={`flex justify-center items-center ${locale === 'en' ? 'gap-10' : 'gap-20'} md:gap-10 mt-5 mr-6`}>
                            <div
                                className="relative w-[107.96px] h-[33.91px] sm:w-[191px] sm:h-[68px] transition-transform duration-300 hover:scale-105"
                                role="listitem"
                                itemScope
                                itemType="https://schema.org/Offer"
                                itemProp="itemListElement"
                            >
                                {/* Main App Logo */}
                                <Image
                                    src={'/images/vezeeta-booking.webp'}
                                    alt='vezeeta icon'
                                    width={171}
                                    height={68}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                    sizes="(max-width: 640px) 108px, 171px"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                                    itemProp="image"
                                />

                                {/* Decorative Shadow */}
                                <Image
                                    src="/icons/teeth-shadow.svg"
                                    alt="teeth-shadow"
                                    width={70}
                                    height={70}
                                    className="absolute top-1/2 left-1/5 -translate-x-1/2 -translate-y-1/2 w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] pointer-events-none"
                                    loading="lazy"
                                    aria-hidden="true"
                                />
                            </div>
                            <div
                                className="relative w-[107.96px] h-[43.91px] sm:w-[171px] sm:h-[68px] transition-transform duration-300 hover:scale-105"
                                role="listitem"
                                itemScope
                                itemType="https://schema.org/Offer"
                                itemProp="itemListElement"
                            >
                                {/* Main App Logo */}
                                <Image
                                    src={'/images/clinido.webp'}
                                    alt='cliniDo icon'
                                    width={191}
                                    height={78}
                                    className="w-full h-auto object-contain mt-[-30px] md:mt-[-50px]"
                                    loading="lazy"
                                    sizes="(max-width: 640px) 108px, 171px "
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                                    itemProp="image"
                                />

                                {/* Decorative Shadow */}
                                <Image
                                    src="/icons/teeth-shadow.svg"
                                    alt="teeth-shadow"
                                    width={70}
                                    height={70}
                                    className="absolute top-1/2 left-1/5 -translate-x-1/2 -translate-y-1/2 w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] pointer-events-none"
                                    loading="lazy"
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Apps Grid */}
                    <div
                        className={`grid grid-cols-2 place-items-center gap-x-4 gap-y-8 sm:flex sm:justify-end sm:items-center sm:gap-12 my-10 md:my-14  ${locale === 'en' ? 'mr-4' : 'ml-4'} ${locale === 'en' ? 'xl:mr-25' : 'xl:ml-25'}`}
                        role="list"
                        aria-label="Medical booking applications"
                        itemScope
                        itemType="https://schema.org/OfferCatalog"
                        itemProp="hasOfferCatalog"
                    >
                        {MedicalApplications.map((item, index) => (
                            <div
                                key={item.id}
                                className={`relative ${item.sizes} transition-transform duration-300 hover:scale-105 
                                    ${index === MedicalApplications.length - 1 ? 'col-span-2 justify-self-center' : ''}`}
                                role="listitem"
                                itemScope
                                itemType="https://schema.org/Offer"
                                itemProp="itemListElement"
                            >
                                {/* Main App Logo */}
                                <Image
                                    src={item.path}
                                    alt={item.alt}
                                    width={171}
                                    height={68}
                                    className="w-full absolute h-auto object-contain z-100"
                                    loading="lazy"
                                    sizes="(max-width: 640px) 108px, 171px"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/..."
                                    itemProp="image"
                                />

                                {/* Decorative Shadow */}
                                <Image
                                    src="/icons/teeth-shadow.svg"
                                    alt="teeth-shadow"
                                    width={70}
                                    height={70}
                                    className={`absolute z-0 ${item.shadowPostion} -translate-x-1/2 -translate-y-1/2 w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] pointer-events-none`}
                                    loading="lazy"
                                    aria-hidden="true"
                                />

                                {/* Hidden SEO Content */}
                                <div className="sr-only" aria-hidden="true">
                                    <span itemProp="name">{item.name}</span>
                                    <span itemProp="description">{item.alt}</span>
                                    <link itemProp="url" href={item.url} />
                                    <meta itemProp="position" content={index + 1} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Hidden SEO Content */}
                    <div className="sr-only" aria-hidden="true">
                        <div itemScope itemType="https://schema.org/Service">
                            <span itemProp="name">{t('title')}</span>
                            <span itemProp="description">{t('subtitle')}</span>
                            <div itemProp="provider" itemScope itemType="https://schema.org/DentalClinic">
                                <span itemProp="name">Tooth Mate Dental Clinic</span>
                                <link itemProp="url" href={baseUrl} />
                            </div>
                            <div itemProp="availableChannel" itemScope itemType="https://schema.org/ServiceChannel">
                                <link itemProp="serviceUrl" href={`${baseUrl}/booking`} />
                                <span itemProp="availableLanguage">ar</span>
                                <span itemProp="availableLanguage">en</span>
                            </div>
                            <div itemProp="areaServed" itemScope itemType="https://schema.org/Country">
                                <span itemProp="name">Egypt</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
}