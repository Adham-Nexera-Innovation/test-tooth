import Image from 'next/image';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';

// ✅ Ensure static generation
export const dynamic = 'force-static';
export const revalidate = 604800 // Revalidate every week

export default async function AboutDoctor() {
    const t = await getTranslations('landingPage.AboutDoctor');
    const m = await getTranslations('landingPage.aboutClinic');
    const locale = await getLocale();

    const baseUrl = "https://www.toothmatedental.com";

    // Structured Data for Dentist
    const doctorStructuredData = {
        "@context": "https://schema.org",
        "@type": "Dentist",
        "@id": `${baseUrl}#dentist`,
        "name": locale === 'ar' ? "الدكتور محمد العبد" : "Dr. Mohamed Al-Abd",
        "alternateName": ["Dr. Mohamed Al-Abd", "الدكتور محمد العبد"],
        "description": locale === 'ar'
            ? "استشاري تجميل وزراعة الأسنان، مؤسس عيادة توث ميت لطب الأسنان. خبرة واسعة في جراحات الفم والأسنان والعلاجات التجميلية."
            : "Cosmetic and Dental Implants Consultant, founder of Tooth Mate Dental Clinic. Extensive experience in oral surgery and cosmetic dental treatments.",
        "url": baseUrl,
        "image": `${baseUrl}/images/Doctor.webp`,
        "medicalSpecialty": ["Dentistry", "CosmeticDentistry", "DentalImplants"],
        "knowsAbout": [
            "Dental Implants",
            "Cosmetic Dentistry",
            "Orthodontics",
            "Teeth Whitening",
            "Oral Surgery"
        ],
        "worksFor": {
            "@type": "DentalClinic",
            "name": "Tooth Mate Dental Clinic",
            "url": baseUrl
        },
        "hasCredential": "MBBCh, MSc Dentistry",
        "knowsLanguage": ["ar", "en"],
        "sameAs": [
            "https://www.facebook.com/profile.php?id=100063527632794&mibextid=wwXIfr&rdid=N52igTj1CEpfaoj3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16cett3Mem%2F%3Fmibextid%3DwwXIfr#",
            "https://www.instagram.com/toothmate_dental_clinic/?igsh=MW5jMnEzcGFvMHU1cg%3D%3D#"
        ]
    };

    // Person Structured Data
    const personStructuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": locale === 'ar' ? "الدكتور محمد العبد" : "Dr. Mohamed Al-Abd",
        "jobTitle": locale === 'ar' ? "استشاري تجميل وزراعة الأسنان" : "Cosmetic and Dental Implants Consultant",
        "worksFor": {
            "@type": "DentalClinic",
            "name": "Tooth Mate Dental Clinic"
        },
        "description": locale === 'ar'
            ? "خبير في طب الأسنان التجميلي والزراعي مع سنوات من الخبرة في تقديم أفضل العلاجات للمرضى"
            : "Expert in cosmetic and implant dentistry with years of experience providing the best treatments for patients"
    };

    return (
        <section
            className="relative z-10 bg-[url('/images/doctor-frame.png')] h-[700px] xl:h-[670px] bg-center md:bg-cover rounded-b-[350px] text-white"
            style={{ objectFit: 'cover' }}
            aria-labelledby="doctor-main-heading"
            itemScope
            itemType="https://schema.org/Dentist"
            itemID="#dentist"
        >
            {/* Structured Data Scripts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorStructuredData) }}
                key="doctor-schema"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
                key="person-schema"
            />

            <div className="flex flex-col items-center justify-between lg:pt-30 md:pt-10 mx-auto px-4 md:px-10 md:h-[500px]">
                {/* Text Content */}
                <div className={`max-w-[600px] space-y-4 mt-25 mb-2 ${locale == 'en' ? 'lg:ml-135' : 'lg:ml-95'} text-center md:text-start`}>
                    <h1 className='sr-only'>
                        {t('clinicDescription')}
                    </h1>
                    <p
                        id="doctor-main-heading"
                        className={`relative text-2xl sm:text-3xl ${locale === 'en' ? 'lg:text-[40px]' : 'lg:text-5xl'} ${locale === 'en' ? 'xl:text-4xl' : 'xl:text-5xl'} font-bold leading-snug`}
                        itemProp="name"
                    >
                        {t('heading')}
                    </p>

                    <p className="text-[17px] md:text-[26px] font-normal leading-relaxed" itemProp="description">
                        {t('description')}
                    </p>

                    <div className="mt-6 md:mt-10 flex gap-4 sm:gap-6 items-center sm:items-start justify-center md:justify-start">
                        <Link
                            href="/services"
                            aria-label={t('servicesAria')}
                            className="flex items-center justify-center text-sm md:text-[18px] h-[45px] md:h-[60px] w-[160px] md:w-[220px] rounded-sm font-semibold text-white bg-gradient-to-r from-[#42B5B0] to-[#077671] hover:from-[#08445a] hover:to-[#0a81ac] border border-white transition duration-150"
                            itemProp="hasOfferCatalog"
                            prefetch={true}
                        >
                            {t('servicesBtn')}
                        </Link>

                        <Link
                            href="/contact-us"
                            aria-label={t('contactAria')}
                            className="flex items-center justify-center text-sm md:text-[18px] h-[45px] md:h-[60px] w-[160px] md:w-[220px] rounded-sm font-semibold text-[#31C1B9] border-[2px] border-[#31C1B9] bg-transparent hover:bg-gradient-to-r hover:from-[#49C2BC] hover:to-[#02948C] hover:text-white transition duration-150"
                            itemProp="contactPoint"
                            prefetch={true}
                        >
                            {t('contactBtn')}
                        </Link>
                    </div>
                </div>

                {/* Stats Container - Responsive only for sm and md */}
                <div className={`flex flex-col lg:flex-row justify-center items-center mt-75 md:mb-15 lg:mt-15 gap-0 md:gap-5 h-[160px] lg:h-[260px] w-[330px] lg:w-[995px] bg-[#003548] rounded-[50px] overflow-visible ${locale === 'ar' ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Doctor Image - Always on the Left */}
                    <Image
                        src={'/images/doctor-image.png'}
                        alt='Doctor Mohamed ELAbd'
                        className="mb-30 md:mb-72 lg:mb-92 md:mr-12 w-[270px] h-[450px] lg:h-[630px] lg:w-[392px]"
                        width={390}
                        height={600}
                    />

                    <div className='md:hidden lg:block'>
                        {/* Stats - Always on the Right */}
                        <div className="mb-42 mt-[-100px] md:mt-0 md:mb-0 flex flex-row justify-center items-center md:justify-start md:items-start gap-3 md:gap-4 ml-0 md:ml-[-30px] mr-0 md:mr-4">
                            {/* Judgements Stat */}
                            <div
                                className={` rounded-xl border-2 border-[#31C1B9] w-40 sm:w-58 ${locale === 'en' ? 'space-y-1' : 'space-y-2'} ${locale === 'en' ? 'h-25' : 'h-25'} sm:h-38 p-3 md:pt-4`}
                                itemScope
                                itemType="https://schema.org/AggregateRating"
                                itemProp="aggregateRating"
                            >
                                <Image
                                    src="/icons/judgements.svg"
                                    alt={m('judgementsAlt')}
                                    width={18}
                                    height={18}
                                    itemProp="image"
                                    className='mt-1 md:w-[35px] md:h-[35px]'
                                />
                                <strong className="text-base sm:text-2xl font-bold text-black md:text-white" itemProp="ratingValue">
                                    {m('judgements')}
                                </strong>
                                <p className="text-[11px] sm:text-[18px] font-meduim mt-1 text-black md:text-white" itemProp="description">
                                    {m('judgementsText')}
                                </p>
                            </div>

                            {/* Satisfaction Stat */}
                            <div
                                className={`rounded-xl border-2 border-[#31C1B9] w-40 sm:w-58 ${locale === 'en' ? 'space-y-1' : 'space-y-3'} ${locale === 'en' ? 'h-25' : 'h-25'} sm:h-38 p-3 md:pt-4 `}
                                itemScope
                                itemType="https://schema.org/AggregateRating"
                                itemProp="aggregateRating"
                            >
                                <Image
                                    src="/icons/satisfaction.svg"
                                    alt={m('satisfactionAlt')}
                                    width={18}
                                    height={18}
                                    itemProp="image"
                                    className='md:mt-1 md:w-[35px] md:h-[35px]'
                                />
                                <strong className="text-base sm:text-lg font-bold text-black md:text-white">
                                    {m('satisfactionNumber')}
                                    <span itemProp="author">
                                        {m('pationt')}
                                    </span>
                                </strong>
                                <p className="text-[12px] sm:text-[18px] font-meduim md:mt-1 text-black md:text-white" itemProp="description">
                                    {m('satisfactiontext')}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Hidden SEO Content */}
            <div className="sr-only" aria-hidden="true">
                <div itemScope itemType="https://schema.org/Dentist">
                    <span itemProp="name">{locale === 'ar' ? "الدكتور محمد العبد" : "Dr. Mohamed Al-Abd"}</span>
                    <span itemProp="jobTitle">{locale === 'ar' ? "استشاري تجميل وزراعة الأسنان" : "Cosmetic and Dental Implants Consultant"}</span>
                    <span itemProp="medicalSpecialty">Dentistry</span>
                    <span itemProp="medicalSpecialty">CosmeticDentistry</span>
                    <span itemProp="medicalSpecialty">DentalImplants</span>
                    <div itemProp="worksFor" itemScope itemType="https://schema.org/DentalClinic">
                        <span itemProp="name">Tooth Mate Dental Clinic</span>
                    </div>
                    <span itemProp="knowsLanguage">ar</span>
                    <span itemProp="knowsLanguage">en</span>
                </div>
            </div>
        </section>
    )
}