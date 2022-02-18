module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    // declare here all your variables
    DEV_URL: "http://localhost:3000",
    PROD_URL: process.env.PROD_URL,
  },
};
