'use client'
import { usePathname } from 'next/navigation';
import Contact from './contact-form';

export default function ConditionalContact() {
    const pathname = usePathname();

    if (!pathname) {
        return null;
    }

    // فك الترميز علشان الأحرف العربية
    const decodedPath = decodeURIComponent(pathname);

    if (decodedPath.includes('/contact-us')
        || decodedPath.includes('/تواصل-معنا')
        || decodedPath.includes('/about-us')
        || decodedPath.includes('/عن-العيادة')) {
        return null;
    }

    return (

        <section className='bg-[#D3F3FF]'>
            <Contact />
        </section>

    )
        ;
}