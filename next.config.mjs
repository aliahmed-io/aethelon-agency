/** Paper Signal Next.js configuration. */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [68, 70, 75],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.manuscdn.com",
        pathname: "/user_upload_by_module/session_file/**",
      },
    ],
  },
};

export default nextConfig;
