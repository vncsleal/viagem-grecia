/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["images.unsplash.com", "cf.bstatic.com", "a0.muscache.com"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
};

module.exports = nextConfig;
