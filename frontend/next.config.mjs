/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/app/:path*',
                destination: 'http://localhost:8000/:path*',
            },
        ];
    },
};

export default nextConfig;
