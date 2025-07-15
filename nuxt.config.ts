// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: true,
  nitro: {
    preset: 'static',
  },
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      woocommerceUrl: process.env.WOOCOMMERCE_URL || 'https://your-wordpress-site.com/wp-json/wc/v3',
      wordpressUrl: process.env.WORDPRESS_URL || 'https://your-wordpress-site.com/wp-json/wp/v2',
      consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '',
      consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || ''
    }
  },
  app: {
    head: {
      title: 'GRAABEL-PHARMA - Votre Pharmacie en Ligne',
      meta: [
        { name: 'description', content: 'Pharmacie en ligne professionnelle avec conseils santé, formations et produits pharmaceutiques certifiés.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    },
    baseURL: "/graabel/",
  }
})