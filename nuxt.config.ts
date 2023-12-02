// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  experimental: {
    payloadExtraction: false,
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "nuxt-icon",
    "nuxt-lodash",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  build: {
    transpile: ["pinia-plugin-persistedstate"],
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1 , maximum-scale=1",
    },
  },
});
