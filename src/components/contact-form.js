'use client';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect, useMemo } from 'react';

export default function Contact() {
    const locale = useLocale();
    const t = useTranslations("Contact");
    const isArabic = locale === 'ar';

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const baseUrl = "https://www.toothmatedental.com";

    // Structured Data for Contact Form - باستخدام useMemo لمنع التغيرات غير الضرورية
    const contactStructuredData = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": isArabic ? "اتصل بنا - عيادة توث ميت لطب الأسنان" : "Contact Us - Tooth Mate Dental Clinic",
        "description": isArabic
            ? "احجز موعدك الآن في عيادة توث ميت لطب الأسنان. استشارات مجانية وخدمات متكاملة لزراعة الأسنان، التقويم، هوليود سمايل وتبييض الأسنان."
            : "Book your appointment now at Tooth Mate Dental Clinic. Free consultations and comprehensive services for dental implants, orthodontics, Hollywood smile, and teeth whitening.",
        "url": `${baseUrl}/${locale}/contact-us`,
        "mainEntity": {
            "@type": "WebPageElement",
            "name": isArabic ? "نموذج حجز موعد" : "Appointment Booking Form",
            "description": isArabic ? "نموذج اتصال لحجز المواعيد والاستشارات المجانية" : "Contact form for booking appointments and free consultations"
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": isArabic ? "الرئيسية" : "Home",
                    "item": `${baseUrl}/${locale}`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": isArabic ? "اتصل بنا" : "Contact Us"
                }
            ]
        }
    }), [locale, isArabic]);

    // ContactPoint Structured Data
    const contactPointStructuredData = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "ContactPoint",
        "name": "Tooth Mate Dental Clinic Contact",
        "telephone": "+20-100-329-4050",
        "email": "info@toothmatedental.com",
        "contactType": "customer service",
        "areaServed": "EG",
        "availableLanguage": [isArabic ? "Arabic" : "English"],
        "url": `${baseUrl}/${locale}/contact-us`
    }), [locale, isArabic]);

    // Add structured data to head
    useEffect(() => {
        // Remove existing structured data if any
        const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-contact]');
        existingScripts.forEach(script => script.remove());

        // Add new structured data
        const contactScript = document.createElement('script');
        contactScript.type = 'application/ld+json';
        contactScript.setAttribute('data-contact', 'contact-page');
        contactScript.text = JSON.stringify(contactStructuredData);
        document.head.appendChild(contactScript);

        const contactPointScript = document.createElement('script');
        contactPointScript.type = 'application/ld+json';
        contactPointScript.setAttribute('data-contact', 'contact-point');
        contactPointScript.text = JSON.stringify(contactPointStructuredData);
        document.head.appendChild(contactPointScript);

        return () => {
            [contactScript, contactPointScript].forEach(script => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            });
        };
    }, [contactStructuredData, contactPointStructuredData]);

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = t('validation.nameRequired');
        }

        if (!phone.trim()) {
            newErrors.phone = t('validation.phoneRequired');
        } else if (!/^[\d\s\-\+\(\)]{8,}$/.test(phone.replace(/\s/g, ''))) {
            newErrors.phone = t('validation.phoneInvalid');
        }

        if (!service) {
            newErrors.service = t('validation.serviceRequired');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateForm();
    };

    const handleInputChange = (field, value) => {
        // Update field value
        if (field === 'name') setName(value);
        if (field === 'phone') setPhone(value);
        if (field === 'service') setService(value);

        // Clear error when user starts typing/selecting
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched({ name: true, phone: true, service: true });

        if (!validateForm()) {
            return;
        }

        // Create message based on locale
        const message = locale === 'ar'
            ? `الاسم: ${name}\nرقم الهاتف: ${phone}\nالخدمة المطلوبة: ${service}`
            : `Name: ${name}\nPhone: ${phone}\nService: ${service}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = '201003294050';

        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    };

    const getInputClassName = (field) => {
        const baseClass = `w-full sm:w-[65%] h-[35px] md:h-[40px] p-2 rounded-md bg-white text-[11px] md:text-[13px] placeholder:text-[13px] focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200`;

        if (errors[field] && touched[field]) {
            return `${baseClass} border-1 border-red-500 focus:border-red-500 focus:ring-[1px] focus:ring-red-500`;
        }

        return `${baseClass} focus:border-[#0178A3] focus:ring-1 focus:ring-[#0178A3]`;
    };

    const getSelectClassName = () => {
        const baseClass = `w-full sm:w-[65%] h-[35px] md:h-[40px] p-2 ${isArabic ? 'pr-2' : 'pl-2'} rounded-md bg-white text-gray-500 text-[10px] md:text-[12px] appearance-none focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200`;

        if (errors.service && touched.service) {
            return `${baseClass} border-1 border-red-500 focus:border-red-500 focus:ring-[1px] focus:ring-red-500`;
        }

        return `${baseClass} focus:border-[#0178A3] focus:ring-1 focus:ring-[#0178A3]`;
    };

    return (
        <section
            aria-label={t('sectionLabel')}
            className="py-20 flex justify-center items-center w-[92%] mx-auto"
            itemScope
            itemType="https://schema.org/ContactPage"
            itemID="#contact-page"
        >
            <div className="w-full">

                {/* Contact Form Container */}
                <div className={`
                    w-full
                    h-[740px]
                    ${locale === 'en' ? 'lg:h-[490px]' : 'lg:h-[470px]'}  
                    flex
                    flex-col
                    sm:flex-row 
                    sm:justify-between
                    items-center
                    ${isArabic ? 'lg:pr-16' : 'lg:pl-16'}
                    rounded-[16px]
                    backdrop-blur-[10px]
                    bg-[#003548]
                    ${isArabic ? 'text-right' : 'text-left'}
                `}
                    itemScope
                    itemType="https://schema.org/ContactPoint"
                >

                    <div className='m-4'>
                        {/* Form Introduction Text */}
                        <p className="text-[16px] md:text-[20px] lg:text-2xl font-bold mb-4 text-white" itemProp="description">
                            <span className="text-white" itemProp="name">{t('introHighlight')}</span> {t('introText')}
                        </p>

                        {/* Contact Form */}
                        <form
                            className="space-y-4"
                            aria-label={t('formLabel')}
                            onSubmit={handleSubmit}
                            noValidate
                            itemScope
                            itemType="https://schema.org/ContactPage"
                        >

                            {/* Name Input Field */}
                            <div className="relative" itemProp="mainEntity" itemScope itemType="https://schema.org/PropertyValue">
                                <label htmlFor="contact-name" className="block text-white mb-2 text-[12px] md:text-sm font-medium">
                                    {t('nameLabel')}
                                </label>
                                <input
                                    type="text"
                                    id="contact-name"
                                    name="name"
                                    placeholder={t('namePlaceholder')}
                                    value={name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    onBlur={() => handleBlur('name')}
                                    className={getInputClassName('name')}
                                    aria-label={t('nameLabel')}
                                    required
                                    itemProp="value"
                                    aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                                />
                                {errors.name && touched.name && (
                                    <span id="name-error" className="text-red-500 text-xs block" role="alert">
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            {/* Phone Input Field */}
                            <div className="relative" itemProp="mainEntity" itemScope itemType="https://schema.org/PropertyValue">
                                <label htmlFor="contact-phone" className="block mb-2 text-white text-[12px] md:text-sm font-medium">
                                    {t('phoneLabel')}
                                </label>
                                <input
                                    type="text"
                                    id="contact-phone"
                                    name="phone"
                                    placeholder={t('phonePlaceholder')}
                                    value={phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    onBlur={() => handleBlur('phone')}
                                    className={getInputClassName('phone')}
                                    aria-label={t('phoneLabel')}
                                    required
                                    itemProp="value"
                                    aria-describedby={errors.phone && touched.phone ? "phone-error" : undefined}
                                />
                                {errors.phone && touched.phone && (
                                    <span id="phone-error" className="text-red-500 text-xs block" role="alert">
                                        {errors.phone}
                                    </span>
                                )}
                            </div>

                            {/* Service Selection Dropdown */}
                            <div className="relative" itemProp="mainEntity" itemScope itemType="https://schema.org/PropertyValue">
                                <label htmlFor="contact-service" className="block mb-2 text-white text-[12px] md:text-sm font-medium">
                                    {t('serviceLabel')}
                                </label>
                                <div className="relative">
                                    <select
                                        id="contact-service"
                                        name="service"
                                        value={service}
                                        onChange={(e) => handleInputChange('service', e.target.value)}
                                        onBlur={() => handleBlur('service')}
                                        className={`${getSelectClassName()} text-[13px]`}
                                        aria-label={t('serviceLabel')}
                                        required
                                        itemProp="value"
                                        aria-describedby={errors.service && touched.service ? "service-error" : undefined}
                                    >
                                        <option value="" disabled hidden>
                                            {t('servicePlaceholder')}
                                        </option>
                                        <option value={t('service1')}>{t('service1')}</option>
                                        <option value={t('service2')}>{t('service2')}</option>
                                        <option value={t('service3')}>{t('service3')}</option>
                                        <option value={t('service4')}>{t('service4')}</option>
                                        <option value={t('service5')}>{t('service5')}</option>
                                        <option value={t('service6')}>{t('service6')}</option>
                                        <option value={t('service7')}>{t('service7')}</option>
                                        <option value={t('service8')}>{t('service8')}</option>
                                    </select>

                                    {/* Custom Dropdown Arrow Icon */}
                                    <div
                                        className={`absolute top-[55%] -translate-y-1/2 ${locale === 'en' ? 'right-[5%]' : 'left-[5%]'} ${locale === 'en' ? 'md:right-[35%]' : 'md:left-[35%]'} pointer-events-none`}
                                        aria-hidden="true"
                                    >
                                        <Image
                                            src="/icons/Arrow.svg"
                                            alt={t('arrowAlt')}
                                            width={35}
                                            height={35}
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                                {errors.service && touched.service && (
                                    <span id="service-error" className="text-red-500 text-xs block" role="alert">
                                        {errors.service}
                                    </span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pb-4">
                                <button
                                    type="submit"
                                    aria-label={t('submitButton')}
                                    className="w-full md:w-[65%] h-[40px] md:h-[50px] mt-4 rounded-sm text-[14px] md:text-[18px] text-white bg-gradient-to-r from-[#49C2BC] from-[20%] to-[#02948C] to-[100%] hover:from-[#08445a] hover:to-[#0a81ac] cursor-pointer transition-all duration-200 font-semibold"
                                    itemProp="potentialAction"
                                >
                                    {t('submitButton')}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className={`relative w-[100%] sm:w-[50%] h-full ${locale === 'en' ? 'lg:h-[490px]' : 'lg:h-full'}`}>

                        <Image
                            src={'/images/Dr-contact-us.webp'}
                            fill
                            alt='doctor photo'
                            className='rounded-[16px] opacity-50'
                        />
                    </div>


                    {/* Hidden SEO Content */}
                    <div className="sr-only" aria-hidden="true">
                        <div itemScope itemType="https://schema.org/DentalClinic">
                            <span itemProp="name">Tooth Mate Dental Clinic</span>
                            <span itemProp="description">
                                {isArabic
                                    ? "عيادة متخصصة في زراعة الأسنان، التقويم، هوليود سمايل، تبييض الأسنان وعلاجات تجميل الأسنان"
                                    : "Specialized clinic in dental implants, orthodontics, Hollywood smile, teeth whitening and cosmetic dental treatments"
                                }
                            </span>
                            <span itemProp="telephone">+20-100-329-4050</span>
                            <span itemProp="email">info@toothmatedental.com</span>
                            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                <span itemProp="streetAddress">
                                    {isArabic ? "شارع 263، المعادي الجديدة" : "Street 263, New Maadi"}
                                </span>
                                <span itemProp="addressLocality">Cairo</span>
                                <span itemProp="addressCountry">EG</span>
                            </div>
                            <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                                <span itemProp="contactType">customer service</span>
                                <span itemProp="telephone">+20-100-329-4050</span>
                                <span itemProp="availableLanguage">{isArabic ? "Arabic" : "English"}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div >

        </section >
    );
}