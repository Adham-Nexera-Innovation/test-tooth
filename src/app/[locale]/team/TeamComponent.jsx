"use client";

import CtaButtons from "@/components/cta-buttons";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function TeamComponent() {
  const locale = useLocale();

  const mainDoctorData = {
    name: locale === "en" ? "Dr. Mohamed Selim El-Abd" : "د/ محمد سليم العبد",
    title: locale === "en" ? "Chief Dentist" : "دكتور طب الاسنان",
    qualifications: [
      locale === "en"
        ? "Dean and Head of Dental Department at Police Hospital"
        : "عميد دكتور رئيس قسم الاسنان بمستشفي الشرطة",
      locale === "en"
        ? "PhD in Root Canal Treatment"
        : "حاصل علي دكتوراه في علاج الجذور",
      locale === "en"
        ? "Master's in Conservative Dentistry"
        : "حاصل علي ماجستير في العلاج التحفظي",
      locale === "en"
        ? "Over 22 years of experience in dentistry"
        : "خبرة تمتد لأكثر من 22 عامًا في مجال طب الأسنان",
    ],
    imageSrc: "/images/Dr. Mohamed El Abd.png",
    imageAlt:
      locale === "en" ? "Dr. Mohamed Selim El-Abd" : "د/ محمد سليم العبد",
  };

  const doctorsData = [
    {
      id: "abdallah",
      name: locale === "en" ? "Dr. Abdallah Farid" : "د. عبدالله فريد",
      title: locale === "en" ? "Dentist" : "دكتور طب الاسنان",
      imageSrc: "/images/Dr. Abdallah Farid.png",
      width: 245,
      height: 402,
      className: "absolute bottom-0 right-3 z-30 md:w-[240px] md:h-[322px]",
      gradientClass: "md:max-w-[320px] md:h-[338px]",
    },
    {
      id: "nora",
      name: locale === "en" ? "Dr. Nora Salah" : "د. نورا صلاح",
      title: locale === "en" ? "Dentist" : "دكتور طب الاسنان",
      imageSrc: "/images/Dr. Nora Salah.png",
      width: 190,
      height: 300,
      className:
        "absolute bottom-0 right-10 md:right-6 z-30 md:w-[220px] md:h-[322px]",
      gradientClass: "md:max-w-[320px] md:h-[348px]",
    },
    {
      id: "eman",
      name: locale === "en" ? "Dr. Eman" : "د. ايمان",
      title: locale === "en" ? "Dentist" : "دكتور طب الاسنان",
      imageSrc: "/images/Dr. Eman.png",
      width: 195,
      height: 302,
      className: "absolute bottom-0 right-8 z-30 md:w-[200px] md:h-[322px]",
      gradientClass: "md:max-w-[320px] md:h-[338px]",
    },
    {
      id: "yasmin",
      name: locale === "en" ? "Dr. Yasmin Darwish" : "د. ياسمين درويش",
      title: locale === "en" ? "Dentist" : "دكتور طب الاسنان",
      imageSrc: "/images/Dr. Yasmin Darwish.png",
      width: 195,
      height: 302,
      className:
        "absolute bottom-0 right-8 md:right-5 z-30 md:w-[200px] md:h-[322px]",
      gradientClass: "md:max-w-[320px] md:h-[338px]",
    },
    {
      id: "mai",
      name: locale === "en" ? "Dr. Mai Saber" : "د. مي صابر",
      title: locale === "en" ? "Dentist" : "دكتور طب الاسنان",
      imageSrc: "/images/Dr. Mai Saber.png",
      width: 205,
      height: 302,
      className: "absolute bottom-0 right-8 z-30 md:w-[210px] md:h-[322px]",
      gradientClass: "md:max-w-[320px] md:h-[338px]",
    },
    {
      id: "noha",
      name: locale === "en" ? "Dr. Noha" : "د. نها",
      title: locale === "en" ? "Dentist" : "دكتور طب الاسنان",
      imageSrc: "/images/Dr. Noha.png",
      width: 190,
      height: 302,
      className:
        "absolute bottom-0 right-10 md:right-8 z-30 md:w-[200px] md:h-[322px]",
      gradientClass: "md:max-w-[320px] md:h-[338px]",
    },
    {
      id: "esraa",
      name: locale === "en" ? "Dr. Esraa" : "د. اسراء",
      title: locale === "en" ? "Dentist" : "دكتور طب الاسنان",
      imageSrc: "/images/Dr. Esraa.png",
      width: 190,
      height: 302,
      className:
        "absolute bottom-0 right-10 md:right-8 z-30 md:w-[200px] md:h-[322px]",
      gradientClass: "md:max-w-[320px] md:h-[338px]",
    },
    {
      id: "bothina",
      name: locale === "en" ? "Dr. Bothina" : "د. بثينة",
      title: locale === "en" ? "Dentist" : "دكتور طب الاسنان",
      imageSrc: "/images/DR. Bothina.png",
      width: 205,
      height: 302,
      className: "absolute bottom-0 right-8 z-30 md:w-[200px] md:h-[322px]",
      gradientClass: "md:max-w-[320px] md:h-[338px]",
    },
  ];

  const [hoveredDoctor, setHoveredDoctor] = useState(null);

  const animationStyles = `
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeInDelay {
      0% { opacity: 0; transform: translateY(20px); }
      50% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }
    
    .animate-fadeInDelay {
      animation: fadeInDelay 0.8s ease-out;
    }
  `;

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = animationStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="bg-[#D3F3FF] min-h-screen">
      {/* Main Doctor Section */}
      <section
        className="relative z-10 py-20 bg-[#003548] backdrop-blur-[19px] text-white w-full"
        style={{ objectFit: "cover" }}
        aria-labelledby="doctor-main-heading"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-y-6 md:gap-x-20 lg:gap-x-40 xl:gap-x-50 mx-auto px-4 md:px-10 md:h-[430px]">
          {/* Text Content */}
          <div
            className={`max-w-[600px] space-y-4 mt-10 md:mt-30 text-start ${locale === "en" ? "md:order-none" : "md:order-2"}`}
          >
            <h1
              id="doctor-main-heading"
              className={`relative text-2xl sm:text-3xl ${locale === "en" ? "lg:text-[30px]" : "lg:text-3xl"} font-bold leading-snug`}
            >
              {mainDoctorData.name}
            </h1>
            <ul
              className={`text-[12px] md:text-2xl font-medium space-y-8 mt-6 ${locale === "en" ? "ml-5" : "mr-5"}`}
            >
              {mainDoctorData.qualifications.map((qualification, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-[6px] h-[6px] bg-white"></span>
                  {qualification}
                </li>
              ))}
            </ul>
          </div>

          {/* Doctor Image */}
          <div
            className={`relative w-[272px] h-[402px] md:w-[325px] md:h-[350px] order-2 mb-[-80px] md:mb-[-239px]`}
          >
            <div
              className="absolute bottom-0 w-full h-[345px] md:h-[405px] opacity-80 backdrop-blur-[30px] bg-gradient-to-b from-[rgba(77,192,193,0)] from-0% via-[rgba(77,192,193,0.5)] via-60% to-[rgba(4,114,154,1)] rounded-t-[70px]"
              aria-hidden="true"
            />
            <Image
              src={mainDoctorData.imageSrc}
              alt={mainDoctorData.imageAlt}
              width={245}
              height={402}
              className="absolute bottom-0 left-1 z-30 md:w-[310px] md:h-[360px]"
              priority
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Doctors Team Grid */}
      <div className="py-5 md:py-25 md:pt-20 bg-[rgba(74,198,192,0.1)]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003548] mb-4">
              {locale === "en"
                ? "Our Professional Dental Team"
                : "فريقنا الطبي المتخصص"}
            </h2>
            <p className="text-lg md:text-xl text-[#04729A] max-w-2xl mx-auto">
              {locale === "en"
                ? "Meet our team of experienced and specialized dental professionals"
                : "تعرف على فريقنا من أطباء الأسنان ذوي الخبرة والتخصص"}
            </p>
          </div>

          {/* Doctors Grid */}
          <div
            className="flex flex-wrap justify-evenly xl:justify-between items-center xl:w-[1250px] mx-auto gap-3 gap-y-6 md:gap-y-12"
            role="list"
            aria-label={
              locale === "en" ? "List of dentists" : "قائمة أطباء الأسنان"
            }
          >
            {doctorsData.map((doctor) => (
              <div
                key={doctor.id}
                role="listitem"
                className="relative cursor-pointer group"
                onMouseEnter={() => setHoveredDoctor(doctor.id)}
                onMouseLeave={() => setHoveredDoctor(null)}
                onTouchStart={() => setHoveredDoctor(doctor.id)}
                onTouchEnd={() => setHoveredDoctor(null)}
                onTouchCancel={() => setHoveredDoctor(null)}
              >
                <div
                  className={`relative w-[272px] h-[402px] ${doctor.gradientClass}`}
                >
                  {/* Gradient Background */}
                  <div
                    className="absolute bottom-0 w-full h-[345px] md:h-[350px] shadow-lg bg-gradient-to-b from-[rgba(77,192,193,0)] from-0% via-[rgba(77,192,193,0.5)] via-20% to-[rgba(4,114,154,1)] rounded-[20px]"
                    aria-hidden="true"
                  />

                  {/* Doctor Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={doctor.imageSrc}
                      alt={`${doctor.name} - ${doctor.title}`}
                      width={doctor.width}
                      height={doctor.height}
                      className={doctor.className}
                      loading="lazy"
                    />

                    {/* Hover Overlay */}
                    <div
                      className={`absolute inset-0 z-40 rounded-t-[70px] rounded-b-[20px] 
                                                    transition-all duration-400 ease-in-out flex flex-col items-start justify-end 
                                                    ${
                                                      hoveredDoctor ===
                                                      doctor.id
                                                        ? "bg-gradient-to-b from-[rgba(4,114,154,0.5)] to-[rgba(4,114,154,1)]"
                                                        : "bg-transparent opacity-0"
                                                    }`}
                    >
                      {hoveredDoctor === doctor.id && (
                        <div className=" text-white p-4 pb-8 transform transition-all duration-500 ease-out translate-y-0">
                          <h3
                            className="text-xl md:text-2xl font-bold mb-2 "
                            style={{ animation: "fadeIn 0.5s ease-out" }}
                          >
                            {doctor.name}
                          </h3>
                          <p
                            className="text-base md:text-lg font-medium"
                            style={{ animation: "fadeInDelay 0.8s ease-out" }}
                          >
                            {doctor.title}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CtaButtons />
    </div>
  );
}
