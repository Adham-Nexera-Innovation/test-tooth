'use client';

import { useState, useCallback, useEffect } from 'react';

export default function CasesGallery({ service, locale }) {
    const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState(new Set());

    // Preload all images
    useEffect(() => {
        service.cases.forEach((caseItem, caseIndex) => {
            // Preload before image
            const beforeImg = new Image();
            beforeImg.src = caseItem.before;
            beforeImg.onload = () => {
                setLoadedImages(prev => new Set(prev).add(`case-${caseIndex}-before`));
            };

            // Preload after image
            const afterImg = new Image();
            afterImg.src = caseItem.after;
            afterImg.onload = () => {
                setLoadedImages(prev => new Set(prev).add(`case-${caseIndex}-after`));
            };
        });
    }, [service.cases]);

    const goToCase = (index) => {
        if (index === currentCaseIndex) return;
        setCurrentCaseIndex(index);
    };

    // Touch swipe handlers
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;

    const onTouchStart = useCallback((e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    }, []);

    const onTouchMove = useCallback((e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }, []);

    const onTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            setCurrentCaseIndex(prev =>
                prev === service.cases.length - 1 ? 0 : prev + 1
            );
        } else if (isRightSwipe) {
            setCurrentCaseIndex(prev =>
                prev === 0 ? service.cases.length - 1 : prev - 1
            );
        }
    }, [touchStart, touchEnd, service.cases.length]);

    const currentCase = service.cases[currentCaseIndex];
    const isArabic = locale === 'ar';

    return (
        <div className="max-w-3xl bg-[#BEEAE8]/25 border border-[#4DC0C1] rounded-2xl">
            <div className="h-[320px] w-full relative">
                <div className="absolute inset-0 flex items-center justify-center z-0">
                    <div className="relative w-full h-full">
                        <img
                            src="/images/cases-logo.webp"
                            alt="cases-logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                <div
                    className="relative z-10 h-full flex flex-col"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div className="flex-1 flex items-center justify-center py-8">
                        <div className="flex w-full h-full max-h-[150px]">

                            <div className="flex-1 relative min-h-0">
                                <div className="relative w-full h-full">
                                    <img
                                        src={currentCase.before}
                                        alt={`${service.alt} - ${isArabic ? 'قبل' : 'Before'} - ${isArabic ? 'حالة' : 'Case'} ${currentCase.caseNumber}`}
                                        className="w-full h-full"
                                        loading="eager"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 relative min-h-0">
                                <div className="relative w-full h-full ">
                                    <img
                                        src={currentCase.after}
                                        alt={`${service.alt} - ${isArabic ? 'بعد' : 'After'} - ${isArabic ? 'حالة' : 'Case'} ${currentCase.caseNumber}`}
                                        className="w-full h-full"
                                        loading="eager"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="absolute bottom-[-35px] left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                        {service.cases.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToCase(index)}
                                className={`w-4 h-2 rounded-md transition-all duration-200 ${index === currentCaseIndex
                                    ? 'bg-gradient-to-r from-[#4DC0C1] to-[#04729A] scale-100 w-7'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={isArabic ?
                                    `عرض الحالة ${index + 1}` :
                                    `View Case ${index + 1}`
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}