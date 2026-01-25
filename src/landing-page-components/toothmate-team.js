'use client'

import { useState } from 'react';
import Image from 'next/image';

const teamMembers = [
    {
        id: 1,
        name: 'DR. Bothina',
        image: '/images/DR. Bothina.png',
        alt: 'DR. Bothina',
        z: 10,
        position: 'right-20 md:right-0 xl:right-0 bottom-44 md:bottom-0',
        containerSize: 'w-[97px] h-[140px] md:w-[120px] md:h-[230px] xl:w-[192px] xl:h-[276px]'
    },
    {
        id: 2,
        name: 'DR. Noha',
        image: '/images/Dr. Noha.png',
        alt: 'DR. Noha',
        z: 20,
        position: 'xl:right-32 right-15 md:right-25 bottom-27 md:bottom-0',
        containerSize: 'w-[93px] h-[169px] md:w-[120px] md:h-[230px] xl:w-[182px] xl:h-[312px]'
    },
    {
        id: 3,
        name: 'DR. Yasmin Darwish',
        image: '/images/Dr. Yasmin Darwish.png',
        alt: 'DR. Yasmin Darwish',
        z: 40,
        position: 'right-[-6px] md:right-44 xl:right-60 bottom-21 md:bottom-0',
        containerSize: 'w-[104px] h-[175px] md:w-[130px] md:h-[238px] xl:w-[205px] xl:h-[345px]'
    },
    {
        id: 4,
        name: 'DR. Nora Salah',
        image: '/images/Dr. Nora Salah.png',
        alt: 'DR. Nora Salah',
        z: 40,
        position: 'right-0 md:right-115 xl:right-94 bottom-0',
        containerSize: 'w-[115px] h-[197px] md:w-[140px] md:h-[240px] xl:w-[224px] xl:h-[388px]'
    },
    {
        id: 5,
        name: 'Dr. Mohamed El Abd',
        image: '/images/Dr. Mohamed El Abd.png',
        alt: 'Dr. Mohamed El Abd',
        z: 50,
        position: 'right-20 md:right-68 xl:right-125 bottom-0',
        containerSize: 'w-[194px] h-[222px] md:w-[220px] md:h-[272px] xl:w-[381px] xl:h-[438px]'
    },
    {
        id: 6,
        name: 'Dr. Abdallah Farid',
        image: '/images/Dr. Abdallah Farid.png',
        alt: 'Dr. Abdallah Farid',
        z: 40,
        position: 'right-45  md:right-145 xl:right-188 bottom-0',
        containerSize: 'w-[154px] h-[207px] md:w-[180px] md:h-[242px] xl:w-[280px] xl:h-[390px]'
    },
    {
        id: 7,
        name: 'Dr. Eman',
        image: '/images/Dr. Eman.png',
        alt: 'Dr. Eman',
        z: 30,
        position: 'right-62 bottom-21 md:bottom-35  md:right-80 xl:right-234 xl:bottom-0',
        containerSize: 'w-[102px] h-[170px] md:w-[125px] md:h-[208px] xl:w-[203px] xl:h-[345px]'
    },
    {
        id: 8,
        name: 'Dr. Mai Saber',
        image: '/images/Dr. Mai Saber.png',
        alt: 'Dr. Mai Saber',
        z: 20,
        position: 'right-46 bottom-30 md:bottom-36 md:right-115 xl:right-264 xl:bottom-0',
        containerSize: 'w-[107px] h-[159px] md:w-[130px] md:h-[193px] xl:w-[211px] xl:h-[311px]'
    },
    {
        id: 9,
        name: 'Dr. Esraa',
        image: '/images/Dr. Esraa.png',
        alt: 'Dr. Esraa',
        z: 10,
        position: 'xl:right-300 right-40 md:right-50 bottom-44 md:bottom-37 xl:bottom-0',
        containerSize: 'w-[84px] h-[140px] md:w-[110px] md:h-[183px] xl:w-[165px] xl:h-[276px]'
    }
];

export default function ToothMateTeam() {
    const [hoveredDoctor, setHoveredDoctor] = useState(null);

    return (
        <section className="relative bg-[#C3E6F6] py-25 md:pt-40 px-5 lg:px-10">
            <div className='relative w-[334px] md:w-[760px] xl:w-[1366px] mx-auto bg-[#003548] overflow-hidden xl:overflow-visible h-[350px] rounded-3xl'>

                {teamMembers.map((doctor) => (
                    <div
                        key={doctor.id}
                        className={`absolute ${doctor.position} ${doctor.containerSize} ${doctor.id === 6
                            ? 'z-40 md:z-30 xl:z-40'
                            : `z-${doctor.z}`
                            }                       
                            `}
                        onMouseEnter={() => setHoveredDoctor(doctor.id)}
                        onMouseLeave={() => setHoveredDoctor(null)}
                    >
                        {/* Doctor Image with gray filter */}
                        <div className="relative w-full h-full">
                            <Image
                                src={doctor.image}
                                alt={doctor.alt}
                                fill
                                className={`
                                    object-cover
                                    transition-all duration-500
                                    ${hoveredDoctor === doctor.id ? 'grayscale-0 brightness-100' : 'grayscale brightness-75'}
                                `}
                            />

                            {/* Doctor Name - Shows on hover */}
                            <div
                                className={`
                                    absolute -top-10 left-1/2 transform -translate-x-1/2
                                    bg-[#0178A3] backdrop-blur-sm
                                    px-3 py-1.5 rounded-lg
                                    text-sm font-bold text-white
                                    transition-all duration-300
                                    ${hoveredDoctor === doctor.id ? 'opacity-100 visible' : 'opacity-0 invisible'}
                                    whitespace-nowrap
                                    shadow-lg
                                `}
                            >
                                {doctor.name}
                                {/* Triangle pointer */}
                                <div className="absolute -bottom-2 left-[80%] transform -translate-x-1/2 w-0 h-0 
                                    border-l-[8px] border-r-[8px] border-t-[8px] 
                                    border-l-transparent border-r-transparent border-t-[#0178A3]">
                                </div>
                            </div>

                            {/* Overlay effect for hover */}
                            <div
                                className={`
                                    absolute inset-0
                                    bg-gradient-to-t from-black/20 to-transparent
                                    transition-opacity duration-500
                                    ${hoveredDoctor === doctor.id ? 'opacity-100' : 'opacity-0'}
                                `}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}