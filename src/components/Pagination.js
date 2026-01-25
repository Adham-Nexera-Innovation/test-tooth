'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Pagination({ currentPage, totalPages, locale }) {
    const params = useParams();

    return (
        <div className={`flex justify-center items-center gap-4 mt-12 ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Previous Button */}
            {currentPage === 1 ? (
                <span
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-400 cursor-not-allowed opacity-50"
                    aria-disabled="true"
                >
                    {locale === 'ar' ? 'السابق' : 'Previous'}
                </span>
            ) : (
                <Link
                    href={`/${locale}/blogs?page=${currentPage - 1}`}
                    className="px-4 py-2 rounded-lg border border-[#0178A3] text-[#0178A3] hover:bg-[#0178A3] hover:text-white transition-all duration-300"
                >
                    {locale === 'ar' ? 'السابق' : 'Previous'}
                </Link>
            )}

            {/* Page Numbers */}
            <div className={`flex gap-2 ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                        key={page}
                        href={`/${locale}/blogs?page=${page}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-300 ${page === currentPage
                            ? 'bg-[#0178A3] text-white border-[#0178A3]'
                            : 'border-gray-300 text-gray-600 hover:border-[#0178A3] hover:text-[#0178A3]'
                            }`}
                        aria-current={page === currentPage ? 'page' : undefined}
                    >
                        {page}
                    </Link>
                ))}
            </div>

            {/* Next Button */}
            {currentPage === totalPages ? (
                <span
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-400 cursor-not-allowed opacity-50"
                    aria-disabled="true"
                >
                    {locale === 'ar' ? 'التالي' : 'Next'}
                </span>
            ) : (
                <Link
                    href={`/${locale}/blogs?page=${currentPage + 1}`}
                    className="px-4 py-2 rounded-lg border border-[#0178A3] text-[#0178A3] hover:bg-[#0178A3] hover:text-white transition-all duration-300"
                >
                    {locale === 'ar' ? 'التالي' : 'Next'}
                </Link>
            )}
        </div>
    );
}