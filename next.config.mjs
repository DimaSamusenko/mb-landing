/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
	enabled: !!process.env.BUNDLE_ANALYZE,
})

const nextConfig = bundleAnalyzer({
	output: 'standalone',
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		domains: ['cdn.builder.io'],
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					// this will allow site to be framed under builder.io for wysiwyg editing
					{
						key: 'Content-Security-Policy',
						value: 'frame-ancestors https://*.builder.io https://builder.io',
					},
				],
			},
		]
	},
	env: {
		// expose env to the browser
		BUILDER_PUBLIC_KEY: process.env.BUILDER_PUBLIC_KEY,
	},
})

export default nextConfig;
