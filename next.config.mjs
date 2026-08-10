/** Paper Signal Next.js configuration. */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
