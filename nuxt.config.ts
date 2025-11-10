// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-gtag'
  ],
  gtag: {
    id: 'G-V4MG6MNPZT' // あなたの測定ID
  }
})
