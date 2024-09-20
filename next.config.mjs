/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "ryds.se", // delete this one later!
            },
            // Add your image domains here
        ],
    },
}

export default nextConfig;
