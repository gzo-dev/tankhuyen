// const isDev = process.env.NODE_ENV !== "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.tankhuyencenter.com",
      },
    ],
  },
  // async header() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: nextSafe({
  //         isDev,
  //         contentSecurityPolicy: {
  //           mergeDefaultDirectives: true,
  //           "img-src": ["'self'", "cms.tankhuyencenter.com"],
  //         },
  //       }),
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
