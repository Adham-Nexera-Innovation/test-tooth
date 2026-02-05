"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";

export default function ContactUs() {
  const locale = useLocale();
  const t = useTranslations("contact");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = t("validation.nameRequired");
    }

    if (!phone.trim()) {
      newErrors.phone = t("validation.phoneRequired");
    } else if (!/^[\d\s\-\+\(\)]{8,}$/.test(phone.replace(/\s/g, ""))) {
      newErrors.phone = t("validation.phoneInvalid");
    }

    if (!service.trim()) {
      newErrors.service = t("validation.serviceRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  const handleInputChange = (field, value) => {
    // Update field value
    if (field === "name") setName(value);
    if (field === "phone") setPhone(value);
    if (field === "service") setService(value);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, service: true });

    if (!validateForm()) {
      return;
    }

    // Create message based on locale
    const message =
      locale === "ar"
        ? `الاسم: ${name}\nرقم الهاتف: ${phone}\nالخدمة المطلوبة: ${service}`
        : `Name: ${name}\nPhone: ${phone}\nService: ${service}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "201222960119";

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");
  };

  const getInputClassName = (field) => {
    const baseClass = `w-full bg-white p-2 ${
      locale === "ar" ? "pr-9" : "pl-9"
    } rounded-[10px] border h-[40px] transition-colors duration-200`;

    if (errors[field] && touched[field]) {
      return `${baseClass} border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500`;
    }

    return `${baseClass} border-[#484848] focus:border-[#0178A3] focus:ring-1 focus:ring-[#0178A3]`;
  };

  const getTextareaClassName = () => {
    const baseClass =
      "w-full h-full bg-white p-2 mb-4 rounded-[10px] border transition-colors duration-200";

    if (errors.service && touched.service) {
      return `${baseClass} border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500`;
    }

    return `${baseClass} border-[#484848] focus:border-[#0178A3] focus:ring-1 focus:ring-[#0178A3]`;
  };

  return (
    <>
      <section
        className="pb-[100px]"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        {/* Hero Section */}
        <div
          className="relative h-[400px] w-full flex justify-center items-center"
          role="banner"
          aria-label={t("heroImageAlt")}
        >
          <Image
            src="/images/contact-us.webp"
            alt={t("heroImageAlt")}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            itemProp="image"
          />
          <div className="absolute inset-0 bg-[#004E6AAD] z-0"></div>
          <h1 className="sr-only">{t("title2")}</h1>
          <strong
            className="relative z-10 text-2xl sm:text-3xl md:text-4xl text-white font-bold"
            itemProp="headline"
          >
            {t("heroTitle")}
          </strong>
        </div>

        <div
          className="container-custom mt-12 "
          itemScope
          itemProp="mainContentOfPage"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold" itemProp="name">
              <strong className="text-black">{t("titleAccent")} </strong>
              {t("title")}
            </h2>
            <p
              className="text-[16px] md:text-[18px] font-semibold mt-3"
              itemProp="description"
            >
              {t("subtitle")}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-y-[170px]">
            {/* Contact Form */}
            <div
              className="w-full lg:w-[620px] h-[344px] md:h-[540px]"
              itemScope
              itemType="https://schema.org/ContactPoint"
            >
              <form
                onSubmit={handleSubmit}
                noValidate
                itemScope
                itemType="https://schema.org/ContactPage"
              >
                {/* Name Field */}
                <div className="relative h-[85px] mt-8">
                  <label
                    htmlFor="contact-name"
                    className="block mb-1 text-[12px] md:text-sm font-medium"
                  >
                    {t("nameLabel")}
                  </label>
                  <input
                    type="text"
                    required
                    id="contact-name"
                    placeholder={t("namePlaceholder")}
                    value={name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={getInputClassName("name")}
                    itemProp="name"
                  />
                  <span>
                    <Image
                      src={"/icons/Group.svg"}
                      width={16}
                      height={16}
                      alt="name icon"
                      className={`absolute top-[40%] ${
                        locale === "ar" ? "right-[2%]" : "left-[2%]"
                      }`}
                    />
                  </span>
                  {errors.name && touched.name && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Phone Field */}
                <div className="relative h-[85px] my-2">
                  <label
                    htmlFor="contact-phone"
                    className="block mb-1 text-[12px] md:text-sm font-medium"
                  >
                    {t("phoneLabel")}
                  </label>
                  <input
                    id="contact-phone"
                    required
                    type="text"
                    placeholder={t("phonePlaceholder")}
                    value={phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    className={getInputClassName("phone")}
                    itemProp="telephone"
                  />
                  <span>
                    <Image
                      src={"/icons/Group.svg"}
                      width={16}
                      height={16}
                      alt="phone icon"
                      className={`absolute top-[40%] ${
                        locale === "ar" ? "right-[2%]" : "left-[2%]"
                      }`}
                    />
                  </span>
                  {errors.phone && touched.phone && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Service Field */}
                <div className="h-[200px] my-2">
                  <label className="block mb-1 text-[12px] md:text-sm font-medium">
                    {t("serviceLabel")}
                  </label>
                  <textarea
                    placeholder={t("messagePlaceholder")}
                    value={service}
                    onChange={(e) =>
                      handleInputChange("service", e.target.value)
                    }
                    onBlur={() => handleBlur("service")}
                    className={getTextareaClassName()}
                    rows={6}
                    itemProp="description"
                  />
                  {errors.service && touched.service && (
                    <span className="text-red-500 text-xs block my-[-22px]">
                      {errors.service}
                    </span>
                  )}
                </div>

                <div className="mt-12">
                  <button
                    type="submit"
                    className="w-full h-[45px] md:h-[60px] flex justify-center items-center rounded-sm cursor-pointer bg-gradient-to-r from-[#49C2BC] from-[20%] to-[#02948C] to-[100%] hover:from-[#08445a] hover:to-[#0a81ac] text-white font-semibold transition-all duration-200"
                    itemProp="potentialAction"
                  >
                    {t("submit")}
                  </button>
                </div>
              </form>
            </div>

            {/* Social Media Contacts */}
            <div
              className={`space-y-2 ${
                locale === "en" ? "ml-[-60px]" : "mr-[-60px]"
              }  ${
                locale === "en" ? "xl:mr-[220px]" : "xl:ml-[220px]"
              } mt-14 sm:mt-0
              `}
              itemScope
              itemType="https://schema.org/Organization"
            >
              <h3
                className="text-2xl md:text-3xl mb-8 font-bold"
                itemProp="name"
              >
                <strong className="text-[#0178A3]">{t("followAccent")} </strong>
                {t("follow")}
              </h3>

              {[
                {
                  platform: "facebook",
                  url: "https://www.facebook.com/profile.php?id=100063527632794&mibextid=wwXIfr&rdid=N52igTj1CEpfaoj3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16cett3Mem%2F%3Fmibextid%3DwwXIfr#",
                },
                {
                  platform: "instagram",
                  url: "https://www.instagram.com/toothmate_dental_clinic/?igsh=MW5jMnEzcGFvMHU1cg%3D%3D#",
                },
                { platform: "x", url: "https://twitter.com/toothmate" },
                {
                  platform: "linkedin",
                  url: "https://linkedin.com/company/toothmate",
                },
                { platform: "whatsapp", url: "https://wa.me/201003294050" },
                { platform: "phone", url: "tel:+20-100-329-4050" },
                {
                  platform: "location",
                  url: "https://www.google.com/maps/place/ToothMate+Dental+Clinic/@29.9739801,31.2785258,17z/data=!3m1!4b1!4m6!3m5!1s0x14583864145595ef:0xf18d7e573fa5d09d!8m2!3d29.9739801!4d31.2785258!16s%2Fg%2F11gdtm11br?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 ${
                    index >= 4 ? "mt-6" : ""
                  }`}
                  itemProp="contactPoint"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <span>
                    <Image
                      src={`/icons/${item.platform}-contact.svg`}
                      width={42}
                      height={42}
                      alt={`${item.platform} icon`}
                    />
                  </span>
                  <Link
                    href={item.url}
                    className={`text-[18px] font-bold ${
                      ["phone", "location"].includes(item.platform)
                        ? ""
                        : "underline"
                    }`}
                    itemProp="url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.platform === "phone"
                      ? "20-100-329-4050"
                      : item.platform === "location"
                      ? locale === "ar"
                        ? "شارع 263 - المعادي الجديدة - القاهرة"
                        : "Street 263 - New Maadi - Cairo"
                      : `${item.platform}.com/toothmate`}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
