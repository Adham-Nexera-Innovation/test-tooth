'use client';
import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from 'next-intl';

export default function FQS() {
    const t = useTranslations('fqs');
    const locale = useLocale();
    const [openIndex, setOpenIndex] = useState(null);

    const questions = [
        {
            title: t('q1.title'),
            answer: t('q1.answer')
        },
        {
            title: t('q2.title'),
            answer: t('q2.answer')
        },
        {
            title: t('q3.title'),
            answer: t('q3.answer')
        },
        {
            title: t('q4.title'),
            answer: t('q4.answer')
        }
    ];

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Structured Data for FAQ
    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": questions.map((question, index) => ({
            "@type": "Question",
            "name": question.title,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": question.answer
            }
        }))
    };

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />

            <section
                className="container-custom my-[40px] sm:my-[80px] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 lg:gap-[200px]"
                itemScope
                itemType="https://schema.org/FAQPage"
            >
                {/* النص */}
                <div className={`font-bold text-[24px] sm:text-[28px] md:text-[30px] my-2 ${locale === 'en' ? 'sm:text-left' : 'sm:text-right'}`}>
                    <p className="my-2 sm:my-4">{t('title')}</p>
                    <p className="text-[#000000]">{t('subtitle')}</p>
                </div>

                {/* الأسئلة */}
                <div className="flex flex-col gap-3">
                    {questions.map((item, index) => (
                        <div
                            key={index}
                            className="cursor-pointer"
                            onClick={() => toggleAnswer(index)}
                            itemScope
                            itemProp="mainEntity"
                            itemType="https://schema.org/Question"
                        >
                            {/* العنوان */}
                            <div
                                className="flex justify-between items-center m-auto text-white h-[50px]  w-[335px] sm:w-[400px] md:w-[630px] px-4"
                                style={{
                                    background: "linear-gradient(to right, #4DC0C1, #04729A)",
                                }}
                                itemProp="name"
                            >
                                <p className="text-[14px] sm:text-[20px]">{item.title}</p>
                                <Image
                                    src={'/icons/fe_arrow-right.svg'}
                                    alt="arrow icon"
                                    width={20}
                                    height={20}
                                    className={`transition-transform duration-300 ${openIndex === index
                                        ? locale === 'ar'
                                            ? 'rotate-90'
                                            : '-rotate-90'
                                        : ''
                                        }`}
                                />
                            </div>

                            {/* الإجابة */}
                            {openIndex === index && (
                                <div
                                    className="bg-[#E2FFFE] w-[335px] sm:w-[400px] md:w-[630px]"
                                    itemScope
                                    itemProp="acceptedAnswer"
                                    itemType="https://schema.org/Answer"
                                >
                                    <p
                                        className="text-[14px] sm:text-[18px] px-[20px] py-[10px]"
                                        itemProp="text"
                                    >
                                        {item.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section >
        </>
    );
}