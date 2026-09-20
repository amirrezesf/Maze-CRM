// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  srcDir: "./app",
  devtools: { enabled: false },
  devServer: {
    port: 3000,
    host: "0.0.0.0"
  },
  nitro: {
    preset: "node-server"
  },
  modules: ["@nuxtjs/tailwindcss"],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "ion-icon"
    }
  },
  css: [
    "@/assets/fonts/Dana/dana.css",
    "@/assets/fonts/Kalameh/kalameh.css",
    "@/assets/fonts/Poppins/poppins.css",
    "@/assets/scss/main.scss",
    "@/assets/css/tailwind.css",
    "nprogress/nprogress.css"
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/colors";'
        }
      }
    }
  },
  app: {
    head: {
      title: "CRM Nuxt - سامانه آموزش و فروش ماز",
      meta: [
        { name: "description", content: "سامانه یکپارچه مدیریت فروش، اشتراک الماس، داوطلبان و آزمون‌های آنلاین موسسه آموزشی ماز (biomaze.ir)" },
        { property: "og:title", content: "CRM Nuxt - سامانه آموزش و فروش ماز" },
        { property: "og:description", content: "سامانه یکپارچه مدیریت فروش، اشتراک الماس، داوطلبان و آزمون‌های آنلاین موسسه آموزشی ماز (biomaze.ir)" }
      ],
      htmlAttrs: {
        dir: "rtl",
        lang: "fa"
      },
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        }
      ]
    }
  }
});
