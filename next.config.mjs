/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        loader: 'custom',
        loaderFile: './image-loader.js',
        remotePatterns: [
            {
                "hostname": "drive.google.com",
                "protocol": "https",
            },
            {
                "hostname": "assets.aceternity.com",
                "protocol": "https",
            }
        ]
    }
};

export default nextConfig;
