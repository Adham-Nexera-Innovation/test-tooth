'use client'
import Image from "next/image";
import { useLocale } from "next-intl"

export default function CtaButtons() {
    const locale = useLocale();

    const baseUrl = "https://www.toothmatedental.com";
    const whatsappNumber = "+20-100-329-4050";


    const handleWhatsAppClick = () => {
        const message = locale === 'ar'
            ? "مرحباً، أريد حجز موعد في عيادة توث ميت"
            : "Hello, I'd like to book an appointment at Tooth Mate Clinic";
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
        window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    };

    const handlePhoneCall = () => {
        window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
    };

    const whatsappText = locale === 'ar' ? "تواصل على واتساب" : "Chat on WhatsApp";

    return (
        <div className={`
            fixed z-50 
            bottom-[40%]
            ${locale === 'ar' ? 'right-[-52px]' : 'left-[-52px]'}
            ${locale === 'ar' ? 'md:right-[-76px]' : 'md:left-[-76px]'}
        `}>
            {/* WhatsApp Contact Button - Vertical */}
            <button
                onClick={handleWhatsAppClick}
                aria-label={locale === 'ar' ? "اتصل بنا على واتساب" : "Contact us on WhatsApp"}
                className={`cursor-pointer ${locale === 'en' ? "rotate-90" : "rotate-270"} group flex flex-col items-center hover:scale-105 transition-all duration-300 bg-[#60D669] text-white rounded-t-[13px]  border-[2px] border-[#0178A3] shadow-lg overflow-hidden`}
                itemProp="telephone"
                content={whatsappNumber}
            >


                {/* Text */}
                <div className="px-3 py-2 w-full bg-[#55c05c] text-center">
                    <span className="font-bold text-sm md:text-[20px] whitespace-nowrap">
                        {whatsappText}
                    </span>
                </div>
            </button>
        </div>
    );
}