'use client'
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from 'next-intl';

export default function ServiceBar() {
  const t = useTranslations('ServiceBar');
  const locale = useLocale();
  const containerRef = useRef(null);

  const services = [
    t("implant"),
    t("prosthetics"),
    t("surgery"),
    t("orthodontics"),
    t("fillings"),
    t("hollywood")
  ];

  const repeatedServices = [...services, ...services];

  // Structured Data for Dental Services
  const dentalServicesStructuredData = {
    "@context": "https://schema.org",
    "@type": "ServiceChannel",
    "serviceType": "Dental Services",
    "provider": {
      "@type": "DentalClinic",
      "name": "ToothMate"
    },
    "availableService": services.map(service => ({
      "@type": "Service",
      "name": service,
      "category": "DentalProcedure",
      "provider": {
        "@type": "DentalClinic",
        "name": "ToothMate"
      }
    }))
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let position = 0;
    let direction = 1;
    const speed = 1;

    const animate = () => {
      position += direction * speed;

      if (position > 400) direction = -1;
      if (position < 0) direction = 1;

      container.style.transform =
        locale === 'en'
          ? `translateX(-${position}px)`
          : `translateX(${position}px)`;

      requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => {
      animate();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [locale]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dentalServicesStructuredData) }}
      />

      <div
        className="relative h-[70px] w-full bg-gradient-to-r from-[#4DC0C1] to-[#04729A] overflow-hidden flex items-center"
        role="region"
        aria-label={locale === 'en' ? "Dental services bar" : "شريط خدمات الأسنان"}
        itemScope
        itemType="https://schema.org/ServiceChannel"
      >
        <meta itemProp="serviceType" content="Dental Services" />

        <div
          ref={containerRef}
          className="flex items-center h-full will-change-transform"
          role="list"
          aria-label={locale === 'en' ? "Available dental services" : "الخدمات السنية المتاحة"}
        >
          {repeatedServices.map((service, index) => (
            <div
              key={index}
              className="flex items-center gap-4 text-white font-bold h-full px-5 flex-shrink-0"
              role="listitem"
              itemScope
              itemProp="availableService"
              itemType="https://schema.org/Service"
            >
              <meta itemProp="name" content={service} />
              <meta itemProp="category" content="DentalProcedure" />

              <Image
                src="/icons/teeth.svg"
                alt={locale === 'en' ? `Icon for ${service} dental service` : `أيقونة لخدمة ${service} السنية`}
                width={30}
                height={30}
                className="flex-shrink-0"
                itemProp="logo"
              />
              <span
                className="text-[20px] sm:text-[24px]"
                itemProp="description"
              >
                {service}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}