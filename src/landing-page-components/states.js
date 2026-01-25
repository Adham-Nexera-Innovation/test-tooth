'use client';

import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';

export default function States() {
    const locale = useLocale();
    const t = useTranslations('states');

    const cases = [
        {
            before: "/images/before-braces.webp",
            after: "/images/new-braces-after.webp",
            alt: t('cases.brace'),
            id: "brace-case"
        },
        {
            before: "/images/before-veneer-2.webp",
            after: "/images/after-veneer-2.webp",
            alt: t('cases.veneer'),
            id: "veneer-case"
        },
        {
            before: "/images/Jaw-before-case.webp",
            after: "/images/Jaw-after-case.webp",
            alt: t('cases.prosthetics'),
            id: "prosthetics-case"
        },
        {
            before: "/images/before-implants.webp",
            after: "/images/after-implants.webp",
            alt: t('cases.implants'),
            id: "implants-case"
        },
        {
            before: "/images/before-whitening.webp",
            after: "/images/after-whitening.webp",
            alt: t('cases.whitening'),
            id: "whitening-case"
        },
        {
            before: "/images/before-complete.webp",
            after: "/images/after-complete.webp",
            alt: t('cases.filling'),
            id: "filling-case"
        }
    ];

    // Structured Data for Before/After Cases
    const medicalCasesStructuredData = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": t('title'),
        "description": t('subtitle'),
        "about": {
            "@type": "MedicalProcedure",
            "name": "Dental Treatments"
        },
        "mainEntity": cases.map((item, index) => ({
            "@type": "MedicalCase",
            "name": item.alt,
            "description": `${t('before')} and ${t('after')} ${item.alt}`,
            "followup": "Results may vary by individual",
            "status": "Completed",
            "medicalCode": {
                "@type": "MedicalCode",
                "codingSystem": "Dental Treatment Types",
                "codeValue": item.id
            }
        }))
    };

    const CaseSlider = ({ item, index }) => {
        const [sliderPosition, setSliderPosition] = useState(50);
        const [isDragging, setIsDragging] = useState(false);
        const containerRef = useRef(null);

        const handleMove = (clientX) => {
            if (!containerRef.current || !isDragging) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const relativeX = clientX - containerRect.left;
            const percentage = (relativeX / containerRect.width) * 100;

            setSliderPosition(Math.max(0, Math.min(100, percentage)));
        };

        const handleMouseDown = (e) => {
            e.preventDefault();
            setIsDragging(true);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            handleMove(e.clientX);
        };

        const handleTouchStart = (e) => {
            setIsDragging(true);
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;
            handleMove(e.touches[0].clientX);
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
        };

        useEffect(() => {
            if (isDragging) {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
                document.addEventListener('touchmove', handleTouchMove);
                document.addEventListener('touchend', handleTouchEnd);
            } else {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
            }

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
            };
        }, [isDragging, sliderPosition]);

        return (
            <figure
                key={item.id}
                className="flex items-start justify-center relative"
                role="listitem"
                itemScope
                itemType="https://schema.org/MedicalCase"
            >
                <meta itemProp="name" content={item.alt} />
                <meta itemProp="description" content={`${t('before')} and ${t('after')} ${item.alt}`} />
                <meta itemProp="status" content="Completed" />

                {/* Main Container */}
                <div
                    className="flex-wrap items-start justify-center relative w-[390px] h-[190px] rounded-[10px] overflow-hidden"
                    ref={containerRef}
                >
                    {/* Before Image - Right Side */}
                    <div
                        className="absolute top-0 right-0 h-full overflow-hidden"
                        style={{
                            width: `${100 - sliderPosition}%`,
                            transition: isDragging ? 'none' : 'width 0.1s ease'
                        }}
                    >
                        <div className="relative w-full h-full">
                            {/* خلفية سوداء شفافة على صورة قبل فقط */}
                            <div className="absolute inset-0 bg-[#00000040] z-10 mix-blend-multiply"></div>

                            {/* تعديل هنا: استخدام div مع background-image بدلاً من Image */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `url(${item.before})`,
                                    backgroundSize: '390px 190px',
                                    backgroundPosition: 'right center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                                aria-hidden="true"
                            />

                            {/* إضافة Image hidden للـ SEO فقط */}
                            <Image
                                src={item.before}
                                alt={`${t('before')} - ${item.alt}`}
                                width={390}
                                height={190}
                                className="opacity-0"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                loading={index > 1 ? "lazy" : "eager"}
                                itemProp="image"
                            />

                            {/* Before Label */}
                            <span
                                className={`
                                    absolute top-[10px]
                                    right-[10px]
                                    text-[10px] font-bold
                                    px-2 py-0.5
                                    rounded-3xl
                                    bg-black
                                    text-white
                                    backdrop-blur-[3.58px]
                                    z-20
                                `}
                                aria-hidden="true"
                            >
                                {t('before')}
                            </span>
                        </div>
                    </div>

                    {/* After Image - Left Side */}
                    <div
                        className="absolute top-0 left-0 h-full overflow-hidden"
                        style={{
                            width: `${sliderPosition}%`,
                            transition: isDragging ? 'none' : 'width 0.1s ease'
                        }}
                    >
                        <div className="relative w-full h-full">
                            {/* تعديل هنا: استخدام div مع background-image بدلاً من Image */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `url(${item.after})`,
                                    backgroundSize: '390px 190px',
                                    backgroundPosition: 'left center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                                aria-hidden="true"
                            />

                            {/* إضافة Image hidden للـ SEO فقط */}
                            <Image
                                src={item.after}
                                alt={`${t('after')} - ${item.alt}`}
                                width={390}
                                height={190}
                                className="opacity-0"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                loading={index > 1 ? "lazy" : "eager"}
                                itemProp="image"
                            />

                            {/* After Label */}
                            <span
                                className={`
                                    absolute top-[10px]
                                    left-[10px] 
                                    text-white text-[10px] font-bold
                                    px-2 py-0.5
                                    rounded-3xl
                                    bg-[#31C1B9]
                                    backdrop-blur-[3.58px]
                                    z-10
                                `}
                                aria-hidden="true"
                            >
                                {t('after')}
                            </span>
                        </div>
                    </div>

                    {/* Slider Divider - Always Visible and Draggable */}
                    <div
                        className="absolute top-0 bottom-0 flex flex-col items-center justify-center cursor-ew-resize select-none z-20"
                        style={{
                            left: `${sliderPosition}%`,
                            transform: 'translateX(-50%)'
                        }}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                    >
                        <div className="w-[2px] h-full bg-white shadow-lg"></div>
                        <div className="absolute top-1/2 -translate-y-1/2 w-6 h-8 flex items-center justify-center">
                            <Image
                                src="/icons/Dot.svg"
                                alt="Slider control"
                                width={20}
                                height={30}
                                className="opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </figure>
        );
    };

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalCasesStructuredData) }}
            />

            <section
                className="bg-[#003548] py-10 "
                aria-labelledby="cases-title"
                id="cases"
                itemScope
                itemType="https://schema.org/MedicalWebPage"
            >
                <meta itemProp="name" content={t('title')} />
                <meta itemProp="description" content={t('subtitle')} />

                {/* Title */}
                <div className="text-center mb-12 mx-3">
                    <h5
                        id="cases-title"
                        className="my-3 font-bold text-2xl md:text-3xl text-white"
                        itemProp="headline"
                    >
                        {t('title')}
                    </h5>
                    <p
                        className="text-[20px] md:text-2xl font-[500] text-[#31C1B9]"
                        itemProp="description"
                    >
                        {t('subtitle')}
                    </p>
                </div>

                {/* Cases Grid */}
                <div
                    className="mx-auto xl:mx-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12 my-2"
                    role="list"
                    aria-label={"Before and after treatment cases"}
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/ItemList"
                >
                    {cases.map((item, idx) => (
                        <CaseSlider
                            key={item.id}
                            item={item}
                            index={idx}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}