import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  css: ['~/assets/index.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  vite: {
    plugins: [
      Components({
        resolvers: [ElementPlusResolver(), VantResolver({ importStyle: 'css' })],
      }),
    ],
    ssr: {
      noExternal: ['element-plus', 'vant'],
    },
  },
  experimental: {
    externalVue: true,
  },
  postcss: {
    plugins: {
      'postcss-px-to-viewport-8-plugin': {
        viewportWidth: 375,
        include: ['**/m/**/*.{js,ts,tsx,vue}'],
      },
    },
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://apis.juhe.cn/',
        changeOrigin: true,
      },
    },
  },
})
