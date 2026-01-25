'use client';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function ReviewsCarousel() {
    const locale = useLocale();
    const t = useTranslations('reviews');

    const reviews = [
        { image: "/images/El W-Review.webp", alt: t('reviewalt.elw') },
        { image: "/images/moataz-review.webp", alt: t('reviewalt.moataz') },
        { image: "/images/khaled-review.webp", alt: t('reviewalt.khaled') },
        { image: "/images/ahmed-review.webp", alt: t('reviewalt.ahmed') },
        { image: "/images/essam-review.webp", alt: t('reviewalt.essam') },
        { image: "/images/karim-review.webp", alt: t('reviewalt.karim') },
        { image: "/images/mostafa-review.webp", alt: t('reviewalt.mostafa') },
        { image: "/images/noor-review.webp", alt: t('reviewalt.noor') },
        { image: "/images/tarek-review.webp", alt: t('reviewalt.tarek') }
    ];

    const [currentIndex, setCurrentIndex] = useState(1);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [slideWidth, setSlideWidth] = useState(164);
    const carouselRef = useRef(null);

    useEffect(() => {
        const updateSlideWidth = () => {
            if (window.innerWidth >= 768) {
                setSlideWidth(372);
            } else {
                setSlideWidth(164);
            }
        };

        updateSlideWidth();
        window.addEventListener('resize', updateSlideWidth);

        return () => window.removeEventListener('resize', updateSlideWidth);
    }, []);

    const moveToRight = () => {
        if (currentIndex < reviews.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const moveToLeft = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const goToSlide = (index) => {
        if (index >= 0 && index <= reviews.length - 1) {
            setCurrentIndex(index);
        }
    };

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (locale == 'en') {
            if (isLeftSwipe) {
                moveToLeft();
            } else if (isRightSwipe) {
                moveToRight();
            }
        } else {
            if (isLeftSwipe) {
                moveToRight();
            } else if (isRightSwipe) {
                moveToLeft();
            }
        }
    };

    // Structured Data for Reviews Carousel
    const reviewsStructuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": t('title'),
        "description": t('subtitle'),
        "numberOfItems": reviews.length,
        "itemListElement": reviews.map((review, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Review",
                "name": review.alt,
                "image": review.image
            }
        }))
    };

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsStructuredData) }}
            />

            <section
                className="py-4 relative bg-[#C3E6F6]"
                itemScope
                itemType="https://schema.org/ItemList"
            >
                <div className={`container-custom ${locale === 'en' ? 'h-[540px]' : 'h-[510px]'} sm:h-[500px] md:h-[600px] relative`}>
                    {/* Header Section */}
                    <div className="flex-col sm:flex-row flex justify-between sm:items-center items-start px-2 relative z-30">
                        <div className="py-2 md:mb-8">
                            <strong
                                className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-gray-800"
                                itemProp="name"
                            >
                                {t('title')}
                            </strong>
                            <p
                                className="text-[22px] sm:text-[24px] lg:text-[28px] text-[#04729A] mt-3"
                                itemProp="description"
                            >
                                {t('subtitle')}
                            </p>
                        </div>

                        <div className="text-left">
                            <Image
                                src={'/images/Rating.svg'}
                                width={230}
                                height={74}
                                alt="google rating photo"
                                className="sm:h-[100px] my-1"
                            />
                            <Link
                                href="https://www.google.com/maps/place/ToothMate+Dental+Clinic/@29.9739801,31.2785258,17z/data=!3m1!4b1!4m6!3m5!1s0x14583864145595ef:0xf18d7e573fa5d09d!8m2!3d29.9739801!4d31.2785258!16s%2Fg%2F11gdtm11br?entry=ttu&g_ep=EgoyMDI1MTAyOS.يIKXMDSoASAFQAw%3D%3D"
                                aria-label={t('cta')}
                                target="_blank"
                                className="group flex items-center text-sm font-semibold mt-1 gap-2 md:gap-0"
                            >
                                <span
                                    className={`border-b pb-0.5 my-4 text-black font-bold border-black group-hover:text-[#31C1B9] group-hover:border-[#31C1B9] ${locale === 'en' ? 'group-hover:translate-x-[8px]' : 'group-hover:translate-x-[-8px]'} transition-transform duration-[100ms]`}
                                >
                                    {t('cta')}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 40 24"
                                    className={`w-10 h-6 transition-colors duration-100 
                                        ${locale === 'en' ? 'rotate-300' : 'rotate-220'}
                                        mt-2
                                      text-black group-hover:text-[#31C1B9] 
                                        ${locale === 'en' ? 'group-hover:translate-x-[-8px]' : 'group-hover:translate-x-[8px]'} 
                                        ${locale === 'en' ? 'group-hover:rotate-360' : 'group-hover:rotate-180'}`}
                                >
                                    <line
                                        x1="18"
                                        y1="12"
                                        x2="34"
                                        y2="12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                    <polyline
                                        points="28,6 34,12 28,18"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Carousel Container */}
                    <div className="overflow-visible relative flex items-center justify-center py-8 h-[220px] md:h-[320px] mr-[-100px] md:mr-[-60px] xl:mr-[20px]">
                        <div
                            ref={carouselRef}
                            className="flex transition-transform md:gap-4 duration-300 ease-in-out items-center"
                            style={{
                                transform: `translateX(${locale === 'en'
                                    ? -currentIndex * slideWidth + slideWidth
                                    : currentIndex * slideWidth - slideWidth}px)`
                            }}
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                        >
                            {reviews.map((review, index) => {
                                const isActive = currentIndex === index;
                                const distanceFromActive = Math.abs(currentIndex - index);

                                return (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 last:mr-0 relative"
                                        itemProp="itemListElement"
                                        itemScope
                                        itemType="https://schema.org/ListItem"
                                        style={{
                                            // تأثير 3D - كلما كانت الصورة أبعد عن المركز، كلما كانت أصغر وأقل وضوحًا
                                            transform: isActive
                                                ? 'translateZ(50px) scale(1)'
                                                : `translateZ(${-distanceFromActive * 10}px) scale(${0.9 - distanceFromActive * 0.05})`,
                                            zIndex: isActive ? 50 : 10 - distanceFromActive,
                                            opacity: isActive ? 1 : 0.7 - distanceFromActive * 0.1,
                                            transition: 'all 0.3s ease-in-out',
                                            perspective: '1200px'
                                        }}
                                    >
                                        <meta itemProp="position" content={index + 1} />
                                        <div className="relative">
                                            {/* الخلفية الداكنة للصورة الحالية */}
                                            {isActive && (
                                                <div
                                                    className="absolute inset-[-12px] bg-[#003548] rounded-2xl z-[-1]"
                                                    style={{
                                                        boxShadow: '0 20px 40px rgba(0, 53, 72, 0.4)',
                                                    }}
                                                />
                                            )}

                                            <div className={`overflow-hidden rounded-lg flex items-center justify-center py-7 md:py-14 px-1 ${isActive ? 'relative' : ''}`}>
                                                {isActive && (
                                                    <div className="absolute w-[20px] md:w-[38px] h-[20px] md:h-[20px] -top-0 md:-top-1 right-[10%] transform -translate-x-1/2 z-40">
                                                        <Image
                                                            src="/icons/carbon_review.svg"
                                                            width={40}
                                                            height={40}
                                                            alt="review icon"
                                                            className="drop-shadow-lg"
                                                        />
                                                    </div>
                                                )}

                                                <Image
                                                    src={review.image}
                                                    width={164}
                                                    height={100}
                                                    alt={review.alt}
                                                    className={`transition-all duration-300 ease-in-out object-contain sm:width-[300px] sm:h-[300px] md:w-[372px] md:h-[226px]
                                                        ${isActive
                                                            ? 'scale-110 cursor-default transform-gpu shadow-2xl'
                                                            : 'hover:scale-105 cursor-pointer'
                                                        }`}
                                                    style={{
                                                        transformStyle: 'preserve-3d',
                                                        backfaceVisibility: 'hidden'
                                                    }}
                                                    itemProp="image"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-center md:justify-between items-center md:my-6 mt-8 md:mt-14 px-3 relative z-30">
                        {/* Dots */}
                        <div className="flex gap-3">
                            {Array.from({ length: reviews.length }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${currentIndex === index ? "bg-[#003548]" : "bg-gray-300"}`}
                                    aria-label={`${t('aria.dot')} ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Arrows */}
                        <div className="hidden md:flex gap-2">
                            {/* Right Arrow */}
                            <button
                                onClick={locale === 'en' ? moveToRight : moveToLeft}
                                disabled={locale === 'en' ? currentIndex === reviews.length - 1 : currentIndex === 0}
                                className={`bg-white w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-100 group hover:bg-[#0178A3] rounded-full border border-[#0178A3]
                                    ${(locale === 'en' ? currentIndex === reviews.length - 1 : currentIndex === 0) ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:opacity-80 hover:scale-110'}`}
                                aria-label={locale === 'en' ? t('aria.right') : t('aria.left')}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 40 24"
                                    className={`w-10 h-5 transition-colors duration-100 
                                    ${locale === 'en' ? 'rotate-180' : 'rotate-0'}
                                    ${locale === 'en' ? 'ml-3' : 'mr-3'}
                                   text-[#0178A3] group-hover:text-white
                                    `}
                                >
                                    <line
                                        x1="22"
                                        y1="12"
                                        x2="34"
                                        y2="12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                    <polyline
                                        points="28,6 34,12 28,18"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </button>

                            {/* Left Arrow */}
                            <button
                                onClick={locale === 'en' ? moveToLeft : moveToRight}
                                disabled={locale === 'en' ? currentIndex === 0 : currentIndex === reviews.length - 1}
                                className={`bg-white w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-100 group hover:bg-[#0178A3] rounded-full border border-[#0178A3]
                                    ${(locale === 'en' ? currentIndex === 0 : currentIndex === reviews.length - 1) ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:opacity-80 hover:scale-110'}`}
                                aria-label={locale === 'en' ? t('aria.left') : t('aria.right')}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 40 24"
                                    className={`w-10 h-5 transition-colors duration-100 
                                    ${locale === 'en' ? 'rotate-0' : 'rotate-180'}
                                    ${locale === 'en' ? 'mr-3' : 'ml-3'}
                                   text-[#0178A3] group-hover:text-white
                                    `}
                                >
                                    <line
                                        x1="22"
                                        y1="12"
                                        x2="34"
                                        y2="12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                    <polyline
                                        points="28,6 34,12 28,18"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}