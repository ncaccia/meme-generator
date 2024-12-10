/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ik.imagekit.io",
                port: "",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "/a/**",  // This pattern matches Google profile image paths
            },
        ],
    },
};

export default nextConfig;
