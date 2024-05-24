/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssl.nexon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fco.dn.nexoncdn.co.kr",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fo4.dn.nexoncdn.co.kr",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
