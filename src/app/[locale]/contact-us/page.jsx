import ContactUs from "./ContactUs";
import { getTranslations } from "next-intl/server";
import CTA from "@/components/cta-buttons";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations("contact", locale);

  const baseDomain = "https://toothmatedental.com";
  const localizedPath = locale === "ar" ? "/تواصل-معنا" : "/contact-us";

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: t("meta.keywords"),
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      url: `${baseDomain}/${locale}${localizedPath}`,
      siteName: "ToothMate Dental Clinic",
      locale: `${locale}`,
      images: [
        {
          url: "https://https://toothmatedental.com/icons/logo.png",
          width: 1200,
          height: 630,
          alt: "تواصل مع عيادة ToothMate للأسنان",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      images: ["https://toothmatedental.com/icons/logo.png"],
    },
  };
}

export default async function Page({ params }) {
  const { locale } = await params;
  const baseDomain = "https://toothmatedental.com";
  const localizedPath = locale === "ar" ? "/تواصل-معنا" : "/contact-us";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name:
      locale === "ar"
        ? "اتصل بنا - عيادة تود ميت لطب الأسنان"
        : "Contact Us - Tooth Mate Dental Clinic",
    description:
      locale === "ar"
        ? "تواصل مع عيادة تود ميت لطب الأسنان للحصول على استشارة مجانية وحجز موعد. نحن هنا لمساعدتك في جميع خدمات طب الأسنان."
        : "Contact Tooth Mate Dental Clinic for a free consultation and appointment booking. We're here to help you with all dental services.",
    url: `${baseDomain}/${locale}${localizedPath}`,
    mainEntity: {
      "@type": "DentalClinic",
      name: "Tooth Mate Dental Clinic",
      telephone: "+20 100 329 4050",
      email: "contact@toothmatedental.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "شارع 263 , المعادي الجديدة",
        addressLocality: "القاهرة",
        addressRegion: "القاهرة الكبرى",
        postalCode: "11742",
        addressCountry: "EG",
      },
      openingHours: ["Mo-Th 15:00-22:00", "Sa-Su 15:00-22:00"],
      areaServed: [
        "القاهرة",
        "المعادي الجديدة",
        "المعادي",
        "مصر الجديدة",
        "التجمع الخامس",
      ],
      knowsLanguage: ["ar", "en"],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "ar" ? "الرئيسية" : "Home",
          item: `${baseDomain}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "ar" ? "اتصل بنا" : "Contact Us",
          item: `${baseDomain}/${locale}${localizedPath}`,
        },
      ],
    },
  };

  return (
    <section className="bg-[#D3F3FF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CTA />
      <ContactUs />
    </section>
  );
}
