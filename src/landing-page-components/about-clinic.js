"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function AboutClinic() {
    const t = useTranslations('landingPage.aboutClinic');
    const locale = useLocale();
    const [showPlayButton, setShowPlayButton] = useState(true);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const baseUrl = "https://www.toothmatedental.com";
    const whatsappNumber = "+20-100-329-4050";

    // Structured Data for Dental Clinic
    const clinicStructuredData = {
        "@context": "https://schema.org",
        "@type": "DentalClinic",
        "@id": `${baseUrl}#dental-clinic`,
        "name": "Tooth Mate Dental Clinic",
        "alternateName": ["Tooth Mate", "عيادة توث ميت"],
        "description": locale === 'ar'
            ? "أفضل عيادة أسنان في القاهرة تقدم خدمات متكاملة من تجميل الأسنان إلى الجراحات المتقدمة باستخدام أحدث التقنيات الطبية"
            : "Best dental clinic in Cairo offering comprehensive services from cosmetic dentistry to advanced surgeries using the latest medical technologies",
        "url": baseUrl,
        "telephone": whatsappNumber,
        "email": "info@toothmatedental.com",
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
        "openingHours": [
            "Mo-Sa 09:00-21:00",
            "Su 10:00-18:00"
        ],
        "priceRange": "$$",
        "medicalSpecialty": "Dentistry",
        "serviceType": "DentalCare",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "350",
            "bestRating": "5",
            "worstRating": "1"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": locale === 'ar' ? "خدمات طب الأسنان" : "Dental Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": locale === 'ar' ? "زراعة الأسنان" : "Dental Implants",
                        "description": locale === 'ar' ? "حل مثالي لتعويض الأسنان المفقودة باستخدام أحدث التقنيات" : "Ideal solution for replacing missing teeth using latest technologies"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": locale === 'ar' ? "ابتسامة هوليوود" : "Hollywood Smile",
                        "description": locale === 'ar' ? "تصميم ابتسامة مثالية باستخدام القشور التجميلية" : "Perfect smile design using cosmetic veneers"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": locale === 'ar' ? "تقويم الأسنان" : "Dental Braces",
                        "description": locale === 'ar' ? "تصحيح مشاكل الأسنان والفكين باستخدام أجهزة التقويم الحديثة" : "Correcting teeth and jaw problems using modern braces"
                    }
                }
            ]
        },
        "areaServed": [
            locale === 'ar' ? "القاهرة" : "Cairo",
            locale === 'ar' ? "المعادي" : "Maadi",
            locale === 'ar' ? "المعادي الجديدة" : "New Maadi",
            locale === 'ar' ? "مصر الجديدة" : "Heliopolis"
        ],
        "knowsLanguage": ["ar", "en"],
        "sameAs": [
            "https://www.facebook.com/profile.php?id=100063527632794&mibextid=wwXIfr&rdid=N52igTj1CEpfaoj3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16cett3Mem%2F%3Fmibextid%3DwwXIfr#",
            "https://www.instagram.com/toothmate_dental_clinic/?igsh=MW5jMnEzcGFvMHU1cg%3D%3D#"
        ]
    };

    const handlePlayClick = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setShowPlayButton(false);
            setHasPlayed(true);
            setIsPlaying(true);
        }
    };

    // Effect to handle video events
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlaying = () => {
            setIsPlaying(true);
            setShowPlayButton(false);
        };

        const handlePause = () => {
            setIsPlaying(false);
            // Don't show play button when user pauses
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setShowPlayButton(true);
        };

        video.addEventListener('playing', handlePlaying);
        video.addEventListener('pause', handlePause);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('playing', handlePlaying);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('ended', handleEnded);
        };
    }, []);

    return (
        <>

            <section
                className="relative container-custom my-20 mt-50"
                role="region"
                aria-labelledby="clinic-heading"
                itemScope
                itemType="https://schema.org/DentalClinic"
                itemID="#dental-clinic"
            >
                {/* Structured Data Script */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicStructuredData) }}
                    key="clinic-schema"
                />


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-2 mt-50 px-4 md:px-6 lg:px-2">
                    <div className="flex flex-col gap-5 order-1 md:order-0 mt-1 md:mt-0">
                        <h2 className='text-[#0178A3] text-[20px] md:text-2xl lg:text-4xl font-bold'>
                            Toothmate - Keep it vital
                        </h2>
                        <p className='text-black text-[22px] md:text-[28px] lg:text-[32px] font-bold'>
                            {locale === 'ar' ? " أفضل عيادة أسنان في المعادي" : "Best Dental Clinic in Maadi"}
                        </p>

                        <Image
                            src={'/icons/Line 2.svg'}
                            alt='line'
                            width={90}
                            height={0}
                        />

                        <p className="text-black text-[16px] md:text-[21px] lg:text-[26px] font-meduim">
                            {locale === 'ar' ? (
                                " أحدث التقنيات الطبية وأعلى معايير التعقيم"
                            ) : (
                                <>
                                    and highest sterilization standards
                                    <br />
                                    Latest medical innovations
                                </>
                            )}
                        </p>

                        {/* CTA Buttons Container */}
                        <div className="flex gap-6 items-center lg:justify-normal md:items-start">
                            {/* Learn More Button */}
                            <Link
                                href="/about"
                                aria-label={t('learnMore') + " ToothMate Dental Clinic"}
                                itemProp="url"
                                prefetch={true}
                                className="
                                    flex items-center justify-center
                                    h-[45px] w-[155px]
                                    sm:h-[60px] sm:w-[185px]
                                    md:h-[59px] md:w-[221px]
                                    rounded-sm text-sm md:text-[18px] font-semibold
                                    text-white
                                    bg-gradient-to-r
                                    from-[#42B5B0] to-[#077671]
                                    hover:from-[#08445a] hover:to-[#0a81ac]
                                    transition duration-200
                                "
                            >
                                <span className="sr-only">
                                    {t('learnMore')} ToothMate Dental Clinic
                                </span>
                                <span aria-hidden="true">
                                    {locale === 'ar' ? "تعرف على عيادتنا" : "About Our Clinic"}
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="relative rounded-2xl w-full xl:w-[710px] overflow-hidden xl:mr-[-80px] mr-0 shadow-2xl bg-black order-0 md:order-0 ">
                        <div className="relative aspect-video w-full h-[240px] md:h-[350px] lg:h-[500px] ">
                            <video
                                ref={videoRef}
                                className={`w-full h-full lg:h-[500px] ${isPlaying ? '' : 'object-cover'}`}
                                preload="metadata"
                                poster="/images/vid-poster.png"
                                aria-label={locale === 'ar' ? 'فيديو يوضح فريق ToothMate في العمل' : 'ToothMate team in action video'}
                                playsInline
                                loading="lazy"
                                controls={hasPlayed}
                            >
                                <source src="/videos/toothmate.mp4" type="video/mp4" />
                                <source src="/videos/toothmate.webm" type="video/webm" />
                                <p className="text-white text-center p-4">
                                    {locale === 'ar'
                                        ? 'متصفحك لا يدعم تشغيل الفيديو. حمّل الفيديو'
                                        : 'Your browser does not support the video tag. Download the video'}
                                </p>
                            </video>

                            {showPlayButton && (
                                <button
                                    onClick={handlePlayClick}
                                    aria-label={locale === 'ar' ? 'تشغيل الفيديو' : 'Play video'}
                                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-300"
                                >
                                    <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 hover:scale-110 transition-transform duration-300">
                                        <Image
                                            src="/images/play-icon.png"
                                            alt={locale === 'ar' ? 'زر تشغيل الفيديو' : 'Play video button'}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}