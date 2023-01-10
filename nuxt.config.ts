import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: 'https://api-mall.mihoyogift.com/',
    },
  },
  typescript: {
    shim: false,
  },
  css: [
    'element-plus/theme-chalk/src/index.scss', // full import (autoimport has some error)
    // 'element-plus/theme-chalk/src/dark/css-vars.scss', // dark mode
    '~/assets/css/index.scss',
  ],
  modules: ['@pinia/nuxt'],
  vite: {
    plugins: [
      Components({
        resolvers: [
          ElementPlusResolver({
            // importStyle: 'sass',
            directives: true,
            version: '2.1.5',
            importStyle: false,
          }),
          VantResolver({ importStyle: 'css' }),
        ],
      }),
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: false })],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/css/element/index.scss" as *;
          `,
        },
      },
    },
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
        exclude: [
          /\/layouts\//,
          /\/element-plus\//,
        ],
      },
    },
  },
  //  这个代理有点坑，虽然解决了跨域问题，但是并不能直接在模板中去请求外部接口
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://api-mall.mihoyogift.com/',
        changeOrigin: true,
      },
    },
  },
})
