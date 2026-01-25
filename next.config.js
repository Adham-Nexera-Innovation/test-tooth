const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/manifest-ar.json',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/manifest+json; charset=utf-8',
                    },
                ],
            },
            {
                source: '/manifest-en.json',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/manifest+json; charset=utf-8',
                    },
                ],
            },
        ];
    },
};

module.exports = withNextIntl(nextConfig);

