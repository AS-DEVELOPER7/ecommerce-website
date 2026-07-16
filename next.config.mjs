/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Works for the reference design images + Unsplash if you re-enable later
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  // Allow local network IP for development access
  allowedDevOrigins: ["192.168.0.57"],
};

export default nextConfig;
