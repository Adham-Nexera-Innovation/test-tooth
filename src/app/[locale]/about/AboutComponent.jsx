"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Reviews from "@/landing-page-components/reviews";
import CTA from "@/components/cta-buttons";
import { useTranslations, useLocale } from "next-intl";

export default function AboutComponent() {
  const locale = useLocale();
  const t = useTranslations("landingPage.aboutClinic");
  const m = useTranslations("aboutClinic");
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlayButton(false);
      setHasPlayed(true);
      setIsPlaying(true);
    }
  };

  // Effect to handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlaying = () => {
      setIsPlaying(true);
      setShowPlayButton(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      // Don't show play button when user pauses
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowPlayButton(true);
    };

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Clinic Statistics Data
  const statistics = [
    { value: "20+", label: m("yearsExperience") },
    { value: "2,000+", label: m("happyPatients") },
    { value: "10+", label: m("expertTeam") },
  ];

  // Vision & Mission Cards Data
  const visionMissionCards = [
    {
      icon: "/icons/our-vision.svg",
      title: m("visionTitle"),
      description: m("visionDescription"),
      alt: "our-vision",
    },
    {
      icon: "/icons/our-mission.svg",
      title: m("missionTitle"),
      description: m("missionDescription"),
      alt: "our-mission",
    },
    {
      icon: "/icons/our-values.svg",
      title: m("valuesTitle"),
      description: m("valuesDescription"),
      alt: "our-values",
    },
  ];

  // Process Steps Data
  const processSteps = [
    {
      icon: "/icons/consultant-logo.svg",
      title: m("consultationTitle"),
      description: m("consultationDescription"),
      alt: "consultant-logo",
    },
    {
      icon: "/icons/medicine-icon.svg",
      title: m("treatmentTitle"),
      description: m("treatmentDescription"),
      alt: "medicine-icon",
    },
    {
      icon: "/icons/care-icon.svg",
      title: m("careTitle"),
      description: m("careDescription"),
      alt: "care-icon",
    },
  ];

  // Clinic Gallery Images
  const galleryImages = [
    {
      src: "/images/about-clinic-photo-1.webp",
      alt: m("clinicPhotos.operationAlt"),
      className: `object-cover ${locale === "en" ? "lg:rounded-bl-[40px]" : "lg:rounded-br-[40px]"}`,
      containerClass:
        "relative w-full lg:w-[320px] xl:w-[490px] h-[245px] sm:h-[364px] mt-1 md:mt-0",
    },
    {
      src: "/images/about-clinic-photo-3.webp",
      alt: m("clinicPhotos.childernAlt"),
      className: "object-cover",
      containerClass:
        "relative w-full h-[230px] lg:w-[220px] xl:w-[280px] sm:h-[500px] lg:h-[230px] mb-1 mt-1 lg:mt-0",
    },
    {
      src: "/images/about-clinic-photo-4.webp",
      alt: m("clinicPhotos.surgeryAlt"),
      className: "object-cover",
      containerClass:
        "relative w-full lg:w-[220px] xl:w-[280px] h-[230px] sm:h-[500px] lg:h-[230px]",
    },
    {
      src: "/images/about-clinic-photo-2.webp",
      alt: m("clinicPhotos.mangerAlt"),
      className: `object-cover ${locale === "en" ? "lg:rounded-tr-[40px] lg:rounded-br-[40px]" : "lg:rounded-tl-[40px] lg:rounded-bl-[40px]"}`,
      containerClass:
        "relative w-full lg:w-[440px] xl:w-[490px] h-[300px] md:h-[464px] lg:mr-1 mt-1 lg:mt-0",
    },
  ];

  return (
    <>
      {/* Hero Section with SEO optimization */}
      <div
        className="relative bg-[url('/images/chair-clinic.webp')] bg-cover bg-center h-[400px] w-full flex justify-center items-center"
        role="banner"
        aria-label={m("heroSectionAriaLabel")}
        itemScope
        itemType="https://schema.org/DentalClinic"
        itemID="#dental-clinic"
      >
        <h1 className="sr-only">{m("nearestClinic")}</h1>
        <strong className="absolute z-10 text-2xl md:text-3xl lg:text-4xl text-white font-bold">
          {m("pageTitle")}
        </strong>
        <div
          className="absolute inset-0 bg-[#004E6AAD] z-0 "
          aria-hidden="true"
        />
      </div>

      <CTA />

      {/* Main Clinic Information Section */}
      <section
        className="container-custom my-12 "
        role="region"
        aria-labelledby="clinic-heading"
        itemScope
        itemType="https://schema.org/AboutPage"
        itemProp="mainEntity"
        itemID="#about-page"
      >
        <div className="flex flex-col-reverse md:flex-row items-start gap-3 md:mr-6">
          {/* Text Content Section */}
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-2 mt-10 px-4 md:px-6 lg:px-2">
              <div className="flex flex-col gap-5 order-1 md:order-0 mt-1 md:mt-0">
                <h2 className="text-[#0178A3] text-[20px] md:text-2xl lg:text-4xl font-bold">
                  Toothmate - Keep it vital
                </h2>
                <p className="text-black text-[22px] md:text-[28px] lg:text-[32px] font-bold">
                  {locale === "ar"
                    ? " أفضل عيادة أسنان في المعادي"
                    : "Best Dental Clinic in Maadi"}
                </p>

                <Image
                  src={"/icons/Line 2.svg"}
                  alt="line"
                  width={90}
                  height={0}
                />
                <p className="text-black text-[16px] md:text-[20px] lg:text-[25px] font-semibold">
                  {locale === "ar" ? (
                    " أحدث التقنيات الطبية وأعلى معايير التعقيم"
                  ) : (
                    <>
                      and highest sterilization standards
                      <br />
                      Latest medical innovations
                    </>
                  )}
                </p>

                {/* CTA Buttons Container */}
                <div className="flex gap-6 items-center lg:justify-normal md:items-start">
                  {/* Learn More Button */}
                  <Link
                    href="/about"
                    aria-label={t("learnMore") + " ToothMate Dental Clinic"}
                    itemProp="url"
                    prefetch={true}
                    className="
                                    flex items-center justify-center
                                    h-[45px] w-[155px]
                                    sm:h-[60px] sm:w-[185px]
                                    md:h-[59px] md:w-[221px]
                                    rounded-sm text-sm md:text-[18px] font-semibold
                                    text-white
                                    bg-gradient-to-r
                                    from-[#42B5B0] to-[#077671]
                                    hover:from-[#08445a] hover:to-[#0a81ac]
                                    transition duration-200
                                "
                  >
                    <span className="sr-only">
                      {t("learnMore")} ToothMate Dental Clinic
                    </span>
                    <span aria-hidden="true">
                      {locale === "ar"
                        ? "تعرف على عيادتنا"
                        : "About Our Clinic"}
                    </span>
                  </Link>
                </div>
              </div>

              <div
                className={`relative rounded-2xl w-[300px] md:w-full xl:w-[710px] overflow-hidden ${locale === "en" ? "xl:ml-[-80px]" : "xl:mr-[-80px]"} mr-0 shadow-2xl bg-black order-0 md:order-0 mx-auto`}
              >
                <div className="relative aspect-video w-full">
                  <video
                    ref={videoRef}
                    className={`w-full h-[235px] md:h-[300px] lg:h-[500px] ${
                      isPlaying ? "" : "object-cover"
                    }`}
                    preload="metadata"
                    poster="/images/vid-poster.png"
                    aria-label={
                      locale === "ar"
                        ? "فيديو يوضح فريق ToothMate في العمل"
                        : "ToothMate team in action video"
                    }
                    playsInline
                    loading="lazy"
                    controls={hasPlayed}
                  >
                    <source src="/videos/toothmate.mp4" type="video/mp4" />
                    <source src="/videos/toothmate.webm" type="video/webm" />
                    <p className="text-white text-center p-4">
                      {locale === "ar"
                        ? "متصفحك لا يدعم تشغيل الفيديو. حمّل الفيديو"
                        : "Your browser does not support the video tag. Download the video"}
                    </p>
                  </video>

                  {/* Play Button Overlay - Shows only when video is not playing */}
                  {showPlayButton && (
                    <button
                      onClick={handlePlayClick}
                      aria-label={
                        locale === "ar" ? "تشغيل الفيديو" : "Play video"
                      }
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-300"
                    >
                      <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 hover:scale-110 transition-transform duration-300">
                        <Image
                          src="/images/play-icon.png"
                          alt={
                            locale === "ar"
                              ? "زر تشغيل الفيديو"
                              : "Play video button"
                          }
                          fill
                          className="object-contain"
                        />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        className={`flex justify-center items-center ${locale === "en" ? "gap-5" : "gap-2"} md:gap-6 mx-auto my-9`}
        role="region"
        aria-label={m("statisticsAriaLabel")}
      >
        {statistics.map((stat, index) => (
          <div
            key={stat.label}
            className={`space-y-2 text-center w-[29%] md:w-[300px] h-[80px] md:h-[120px] border-gray-300 ${index < statistics.length - 1 ? (locale === "en" ? "border-r" : "border-l") : ""} ${index === 2 ? (locale === "en" ? "pl-0" : "pr-1") : ""} ${index === 1 ? (locale === "en" ? "pr-3" : "pl-3") : ""} `}
          >
            <p className="text-[#0178A3] text-[28px] lg:text-[48px] font-bold">
              {stat.value}
            </p>
            <p className="text-[12px] lg:text-[20px] text-gray-700">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* Vision & Mission Section */}
      <section
        className="my-[130px] mt-[80px] w-full h-[300px] overflow-visible bg-[#0178A3] relative"
        role="region"
        aria-labelledby="vision-mission-heading"
      >
        <div
          className={`md:w-[450px] mx-7 ${locale === "en" ? "md:ml-[110px]" : "md:mr-[130px]"} pt-12 space-y-3 text-white`}
        >
          <div className="flex justify-start items-center gap-3">
            <Image
              src={"/icons/our-mission-icon.svg"}
              width={32}
              height={32}
              alt={m("visionMissionIconAlt")}
              className="w-5 h-5 md:w-8 md:h-8"
            />
            <p
              id="vision-mission-heading"
              className="font-medium text-[16px] md:text-[20px]"
            >
              {m("visionMissionTitle")}
            </p>
          </div>
          <p className="text-[18px] md:text-[24px] font-bold">
            {m("visionMissionSubtitle")}
          </p>
        </div>

        <div className="md:mr-[70px] flex flex-col lg:flex-row justify-center items-center gap-6 mt-8">
          {visionMissionCards.map((card, index) => (
            <div
              key={card.title}
              className="p-[1px] rounded-lg bg-gradient-to-b from-[#04729A] to-[#4DC0C1]"
            >
              <div className="flex flex-col justify-center items-center gap-4 h-[280px] w-[300px] xl:w-[350px] xl:h-[300px] bg-white p-2 rounded-lg shadow-[0_-4px_10px_#00000026,0_4px_10px_#0000000D]">
                <Image
                  src={card.icon}
                  width={50}
                  height={50}
                  alt={card.alt}
                  className="mx-auto"
                  loading="lazy"
                />
                <p className="font-semibold text-[18px] md:text-2xl text-gray-800">
                  {card.title}
                </p>
                <p className="font-normal text-[16px] text-center text-[#7D7D7D]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clinic Gallery Section */}
      <section
        className="flex justify-center items-center my-[50px] mx-auto bg-[#D3F3FF] xl:ml-0 mt-[820px] lg:mt-[250px]"
        role="region"
        aria-labelledby="gallery-heading"
      >
        <div className="flex justify-center items-center">
          <div className={`flex flex-col lg:flex-row my-[50px]`}>
            {/* Gallery Left Column */}
            <div className="h-full lg:ml-1">
              <div
                className={`w-full lg:w-[320px] xl:w-full h-[70px] lg:h-[100px] bg-[#0178A3] flex justify-center items-center rounded-t-[40px] ${locale === "en" ? "lg:rounded-tr-[0px]" : "lg:rounded-tl-[0px]"}`}
              >
                <h3
                  id="gallery-heading"
                  className="text-white text-[28px] xl:text-[44px] font-extrabold"
                >
                  {m("galleryTitle")}
                </h3>
              </div>
              <div className={galleryImages[0].containerClass}>
                <Image
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  fill
                  className={galleryImages[0].className}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgDRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pV2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                />
              </div>
            </div>

            {/* Gallery Middle Column */}
            <div className="h-full">
              <div className={galleryImages[1].containerClass}>
                <Image
                  src={galleryImages[1].src}
                  alt={galleryImages[1].alt}
                  fill
                  className={galleryImages[1].className}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgDRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pV2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                />
              </div>
              <div className={galleryImages[2].containerClass}>
                <Image
                  src={galleryImages[2].src}
                  alt={galleryImages[2].alt}
                  fill
                  className={galleryImages[2].className}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgDRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pV2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                />
              </div>
            </div>

            {/* Gallery Right Column */}
            <div className={galleryImages[3].containerClass}>
              <Image
                src={galleryImages[3].src}
                alt={galleryImages[3].alt}
                fill
                className={galleryImages[3].className}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgDRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pV2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section
        className="flex-col-reverse flex md:flex-row md:justify-center md:items-center gap-4 md:gap-9 my-10 md:my-14 mx-4 sm:mx-2 md:mx-4 xl:mx-0"
        role="region"
        aria-label={m("processAriaLabel")}
      >
        {processSteps.map((step) => (
          <div
            key={step.title}
            className="flex justify-center items-center gap-5 h-[110px] w-full md:w-[350px]"
          >
            <Image
              src={step.icon}
              width={30}
              height={30}
              alt={step.alt}
              loading="lazy"
            />
            <div>
              <h4 className="text-[22px] md:text-[24px] font-semibold text-gray-800">
                {step.title}
              </h4>
              <p className="text-[16px] font-normal text-gray-600">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Reviews Section */}
      <Reviews />
    </>
  );
}
