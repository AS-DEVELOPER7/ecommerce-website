/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Works for the reference design images + Unsplash if you re-enable later
    domains: [
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "source.unsplash.com",
    ],
    // (Next >=15 also supports remotePatterns; domains is enough here)
  },
};

export default nextConfig;
