<script lang="ts" setup>
import type { SwiperBanner } from '~/components/BannerSwiper.vue'

import { bannerSwiperStatic } from '~/settings/static'

// MOCK Data ...
const swiperBannerList = reactive<SwiperBanner[]>([
  { src: '', idOrPath: '/ys', type: 'MENU_DETAIL' },
  { src: '', idOrPath: '/dby', type: 'MENU_DETAIL' },
  { src: '', idOrPath: '/wd', type: 'MENU_DETAIL' },
  { src: '', idOrPath: '2024510538545312606208', type: 'GOODS_DETAIL' },
  { src: '', idOrPath: '/bh2', type: 'MENU_DETAIL' },
])

watchEffect(() => {
  bannerSwiperStatic.forEach((item, i) => {
    swiperBannerList[i].src = item
  })
})
</script>

<template>
  <div class="home-page">
    <div class="swiper-banner-container">
      <BannerSwiper
        :width="840"
        :height="200"
        arrow="never"
        indicator-position="none"
        :swiper-list="swiperBannerList"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  .swiper-banner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 15PX auto;
  }
}
</style>
