import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';

// ✅ Ensure static generation
export const dynamic = 'force-static';
export const revalidate = 604800 // Revalidate every week

export default async function WhyToothMate() {
    const t = await getTranslations('landingPage.whyToothMate');
    const locale = await getLocale();

    // Structured Data for Dental Clinic
    const dentalClinicStructuredData = {
        "@context": "https://schema.org",
        "@type": "DentalClinic",
        "name": "ToothMate",
        "description": t('title'),
        "medicalSpecialty": "Dentistry",
        "priceRange": t('priceTitle'),
        "amenityFeature": [
            {
                "@type": "LocationFeatureSpecification",
                "name": t('priceTitle'),
                "value": t('priceDesc')
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": t('hygieneTitle'),
                "value": t('hygieneDesc')
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": t('techTitle'),
                "value": t('techDesc')
            }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dental Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Affordable Dental Treatments"
                    }
                }
            ]
        }
    };

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(dentalClinicStructuredData) }}
            />

            <section
                className="container-custom my-25"
                // SEO: Semantic section with proper role
                role="region"
                aria-labelledby="why-toothmate-heading"
                itemScope
                itemType="https://schema.org/DentalClinic"
            >
                {/* SEO: Header section with proper heading structure */}
                <div className="text-center mb-10 md:mb-18">
                    <h4 className="my-2 font-bold text-xl md:text-[32px]" itemProp="alternativeHeadline">
                        {t('highlight')}
                    </h4>
                    <h4
                        id="why-toothmate-heading"
                        className="text-2xl md:text-[28px] font-semibold text-[#0178A3]"
                        itemProp="name"
                    >
                        {t('title')}
                    </h4>
                </div>

                <div>

                    <div className='flex flex-col md:flex-row justify-between items-center xl:w-[1200px] mx-auto'>
                        <div className='flex flex-col justify-between items-start gap-10 md:gap-20'>
                            <div className='flex justify-center items-center gap-5'>
                                <Image
                                    src={'/icons/price-icon.svg'}
                                    alt='price-icon'
                                    width={40}
                                    height={40}
                                />
                                <div className='space-y-3'>
                                    <p className='text-[#0178A3] text-[18px] md:text-[22px] font-bold'>{t('priceTitle')}</p>
                                    <p className='text-[#000000] text-[16px] md:text-[18px] font-meduim'>{t('priceDesc')}</p>
                                </div>
                            </div>

                            <div className='flex justify-center items-center gap-5'>
                                <Image
                                    src={'/icons/tech-icon.svg'}
                                    alt='price-icon'
                                    width={40}
                                    height={40}
                                />
                                <div className='space-y-3'>
                                    <p className='text-[#0178A3] text-[18px] md:text-[22px] font-bold'>{t('techTitle')}</p>
                                    <p className='text-[#000000] text-[16px] md:text-[18px] font-meduim'>{t('techDesc')}</p>
                                </div>
                            </div>

                            <div className='flex justify-center items-center gap-5'>
                                <Image
                                    src={'/icons/hygiene.svg'}
                                    alt='price-icon'
                                    width={40}
                                    height={40}
                                />
                                <div className='space-y-3'>
                                    <p className='text-[#0178A3] text-[18px] md:text-[22px] font-bold'>{t('hygieneTitle')}</p>
                                    <p className='text-[#000000] text-[16px] md:text-[18px] font-meduim'>{t('hygieneDesc')}</p>
                                </div>
                            </div>

                        </div>
                        <div className='relative w-[335px] md:w-140 h-[215px] md:h-100 mt-10 md:mt-0 '>
                            <Image
                                src={'/images/toothmate-keep-vital.webp'}
                                alt='vital'
                                fill
                                className='object-cover rounded-4xl'

                            />
                        </div>
                    </div>

                    <div className='flex flex-wrap justify-center sm:justify-between gap-4 sm:gap-0 items-center mt-6 xl:w-[1200px] mx-auto'>
                        <div className='relative w-[160px] md:w-65 h-[152px] md:h-60 xl:w-70 xl:h-65'>
                            <Image
                                src={'/images/why-toothmate-doctor.png'}
                                loading="lazy"
                                fill
                                className='rounded-xl'
                                alt={t('surgeryAlt')}
                            />
                        </div>
                        <div className='relative w-[160px] md:w-65 h-[152px] md:h-60 xl:w-72 xl:h-68'>
                            <Image
                                src={'/images/about-clinic-photo-4.webp'}
                                loading="lazy"
                                fill
                                className='rounded-xl'
                                alt={t('surgeryAlt')}
                            />
                        </div>
                        <div className='relative w-[160px] md:w-65 h-[152px] md:h-60 xl:w-72 xl:h-68 mt-3 lg:mt-0'>
                            <Image
                                src={'/images/whytoothmate-chair.png'}
                                loading="lazy"
                                fill
                                className='rounded-xl'
                                alt={t('surgeryAlt')}
                            />
                        </div>
                        <div className='relative w-[160px] md:w-65 h-[152px] md:h-60 xl:w-72 xl:h-68 mt-3 lg:mt-0'>
                            <Image
                                src={'/images/doctor-2.png'}
                                loading="lazy"
                                fill
                                className='rounded-xl'
                                alt={t('surgeryAlt')}
                            />
                        </div>
                    </div>

                </div>



            </section>
        </>
    );
}