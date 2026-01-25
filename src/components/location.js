"use client";
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export default function Location() {
    const locale = useLocale();
    const t = useTranslations('Location');

    // Fallback translations in case of errors
    const getTranslation = (key) => {
        try {
            return t(key);
        } catch (error) {
            console.warn(`Translation error for key "${key}":`, error);

            // Fallback translations
            const fallbackTranslations = {
                'sectionLabel': 'Location Section',
                'workingHoursLabel': 'Working Hours',
                'clockIconAlt': 'Clock Icon',
                'workingHours': 'Saturday - Thursday: 3:00 PM - 10:00 PM',
                'addressLabel': 'Address',
                'locationIconAlt': 'Location Icon',
                'address': 'Street 263 - New Maadi, Cairo',
                'locationButton': 'View Location'
            };

            return fallbackTranslations[key] || key;
        }
    };

    const baseUrl = "https://www.toothmatedental.com";

    // Structured Data for Location
    const locationStructuredData = {
        "@context": "https://schema.org",
        "@type": "DentalClinic",
        "@id": `${baseUrl}#dental-clinic`,
        "name": "Tooth Mate Dental Clinic",
        "alternateName": ["Tooth Mate", "عيادة توث ميت"],
        "description": locale === 'ar'
            ? "أفضل عيادة أسنان في القاهرة تقدم خدمات متكاملة من تجميل الأسنان إلى الجراحات المتقدمة"
            : "Best dental clinic in Cairo offering comprehensive services from cosmetic dentistry to advanced surgeries",
        "url": baseUrl,
        "telephone": "+20-100-329-4050",
        "email": "info@toothmatedental.com",
        "openingHours": [
            "Mo-Sa 09:00-21:00",
            "Su 10:00-18:00"
        ],
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
        "hasMap": "https://www.google.com/maps/place/ToothMate+Dental+Clinic/@29.9739801,31.2785258,17z",
        "priceRange": "$$",
        "medicalSpecialty": "Dentistry",
        "areaServed": [
            locale === 'ar' ? "القاهرة" : "Cairo",
            locale === 'ar' ? "المعادي" : "Maadi",
            locale === 'ar' ? "المعادي الجديدة" : "new Maadi",
            locale === 'ar' ? "مصر الجديدة" : "Heliopolis",
            locale === 'ar' ? "التجمع الخامس" : "Fifth Settlement"
        ]
    };

    // Place Structured Data
    const placeStructuredData = {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": "Tooth Mate Dental Clinic",
        "description": locale === 'ar' ? "عيادة أسنان متخصصة في المعادي الجديدة" : "Specialized dental clinic in New Maadi",
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "29.9599",
            "longitude": "31.2581"
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": locale === 'ar' ? "شارع 263، المعادي الجديدة" : "Street 263, New Maadi",
            "addressLocality": locale === 'ar' ? "القاهرة" : "Cairo",
            "addressCountry": "EG"
        },
        "hasMap": "https://www.google.com/maps/place/ToothMate+Dental+Clinic/@29.9739801,31.2785258,17z",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
                "opens": "09:00",
                "closes": "21:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Sunday"],
                "opens": "10:00",
                "closes": "18:00"
            }
        ]
    };

    const handleLocationClick = () => {
        // Google Maps link with exact coordinates for New Maadi, Cairo
        const mapsUrl = 'https://www.google.com/maps/place/ToothMate+Dental+Clinic/@29.9739801,31.2785258,17z/data=!3m1!4b1!4m6!3m5!1s0x14583864145595ef:0xf18d7e573fa5d09d!8m2!3d29.9739801!4d31.2785258!16s%2Fg%2F11gdtm11br?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D';
        window.open(mapsUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <section
            aria-label={getTranslation('sectionLabel')}
            className="
                relative
                bg-[url('/images/location.webp')]
                bg-cover bg-center
                h-[220px] md:h-[290px]
                w-full
                pt-18
            "
            itemScope
            itemType="https://schema.org/DentalClinic"
            itemID="#dental-clinic"
        >
            {/* Structured Data Scripts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(locationStructuredData) }}
                key="location-clinic-schema"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(placeStructuredData) }}
                key="location-place-schema"
            />

            {/* Overlay فوق الصورة فقط */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            {/* صندوق المحتوى */}
            <div
                className={`
                    absolute top-0 bottom-0 
                    ${locale === 'en' ? 'right-[5%]' : 'left-[5%]'}
                    w-[260px] md:w-[300px]
                    bg-black/60 text-white
                    p-4 md:p-7
                    z-10
                    `}
                itemScope
                itemType="https://schema.org/PostalAddress"
                itemProp="address"
            >
                <address className="not-italic" itemScope itemType="https://schema.org/PostalAddress">
                    {/* Working Hours */}
                    <div className="my-2" itemProp="openingHoursSpecification" itemScope itemType="https://schema.org/OpeningHoursSpecification">
                        <p className="text-xs md:text-sm font-semibold mb-1">{getTranslation('workingHoursLabel')}:</p>
                        <div className="flex gap-1 items-center">
                            <Image
                                src="/icons/header-date.svg"
                                alt={getTranslation('clockIconAlt')}
                                width={16}
                                height={16}
                                className="md:w-[20px] md:h-[20px]"
                                loading="lazy"
                                itemProp="image"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = '<div class="w-4 h-4 bg-white rounded-full"></div>';
                                }}
                            />
                            <time
                                className="text-[11px] md:text-[12px] font-normal leading-[15px] text-white"
                                itemProp="opens"
                                content="09:00"
                            >
                                <meta itemProp="dayOfWeek" content="https://schema.org/Monday" />
                                <meta itemProp="dayOfWeek" content="https://schema.org/Tuesday" />
                                <meta itemProp="dayOfWeek" content="https://schema.org/Wednesday" />
                                <meta itemProp="dayOfWeek" content="https://schema.org/Thursday" />
                                <meta itemProp="dayOfWeek" content="https://schema.org/Saturday" />
                                <meta itemProp="closes" content="21:00" />
                                {getTranslation('workingHours')}
                            </time>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="my-4">
                        <p className="text-xs md:text-sm font-semibold mb-1">{getTranslation('addressLabel')}:</p>
                        <div className="flex gap-1 items-center">
                            <Image
                                src="/icons/location.svg"
                                alt={getTranslation('locationIconAlt')}
                                width={16}
                                height={16}
                                className="md:w-[20px] md:h-[20px]"
                                loading="lazy"
                                itemProp="image"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = '<div class="w-4 h-4 bg-white rounded-full"></div>';
                                }}
                            />
                            <span
                                className="text-[11px] md:text-[12px] font-normal leading-[15px] text-white"
                                itemProp="streetAddress"
                            >
                                {getTranslation('address')}
                                <meta itemProp="addressLocality" content={locale === 'ar' ? "القاهرة" : "Cairo"} />
                                <meta itemProp="addressRegion" content={locale === 'ar' ? "القاهرة الكبرى" : "Greater Cairo"} />
                                <meta itemProp="postalCode" content="11742" />
                                <meta itemProp="addressCountry" content="EG" />
                            </span>
                        </div>
                    </div>
                </address>

                {/* Location Button */}
                <div className="mt-4">
                    <button
                        type="button"
                        aria-label={getTranslation('locationButton')}
                        className="
                            bg-gradient-to-r from-[#42B5B0] to-[#077671]
                            h-[40px] md:h-[50px]
                            w-full rounded-sm text-center
                            text-white font-semibold
                            text-sm md:text-base
                            cursor-pointer
                            hover:from-[#08445a] hover:to-[#0a81ac]
                            transition-all duration-200
                            "
                        itemProp="hasMap"
                        content="https://www.google.com/maps/place/ToothMate+Dental+Clinic/@29.9739801,31.2785258,17z"
                        onClick={handleLocationClick}
                    >
                        {getTranslation('locationButton')}
                    </button>
                </div>

                {/* Hidden SEO Content */}
                <div className="sr-only" aria-hidden="true">
                    <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates">
                        <meta itemProp="latitude" content="29.9599" />
                        <meta itemProp="longitude" content="31.2581" />
                    </div>
                    <div itemProp="openingHours" content="Mo-Sa 09:00-21:00, Su 10:00-18:00" />
                    <div itemProp="telephone" content="+20-100-329-4050" />
                    <div itemProp="email" content="info@toothmatedental.com" />
                    <div itemProp="priceRange" content="$$" />
                    <div itemProp="medicalSpecialty" content="Dentistry" />
                    <link itemProp="url" href={baseUrl} />
                </div>
            </div>

            {/* Additional Hidden Structured Data for better SEO */}
            <div className="sr-only" aria-hidden="true">
                <div itemScope itemType="https://schema.org/LocalBusiness">
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
                    <span itemProp="email">info@toothmatedental.com</span>
                    <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates">
                        <meta itemProp="latitude" content="29.9599" />
                        <meta itemProp="longitude" content="31.2581" />
                    </div>
                    <span itemProp="openingHours">Mo-Sa 09:00-21:00</span>
                    <span itemProp="openingHours">Su 10:00-18:00</span>
                    <span itemProp="priceRange">$$</span>
                    <span itemProp="medicalSpecialty">Dentistry</span>
                </div>
            </div>
        </section>
    );
}