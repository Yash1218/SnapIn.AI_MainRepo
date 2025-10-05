/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "http://192.168.0.150:3000", // your PC LAN IP
    "http://localhost:3000", // always include localhost
  ],
  reactStrictMode: true,
};

module.exports = nextConfig;
