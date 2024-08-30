/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
      { // cấu hình cho image fall back, nó được lưu trên một trang web nào đó
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
