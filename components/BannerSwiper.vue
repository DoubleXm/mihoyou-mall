<script setup lang="ts">
import type { PropType } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

export interface SwiperBanner {
  idOrPath: string
  src?: string
  type: 'GOODS_DETAIL' | 'MENU_DETAIL'
}

defineProps({
  swiperList: {
    type: Array as PropType<SwiperBanner[]>,
    default: () => ([]),
  },
})

const router = useRouter()

/**
 * 跳转详情页
 */
const jumpToDetailPage = (item: SwiperBanner) => {
  if (item.type === 'GOODS_DETAIL')
    router.push({ name: 'goods_detial', params: { id: item.idOrPath } })
  else
    router.push(item.idOrPath)
}
</script>

<template>
  <Swiper v-bind="$attrs">
    <SwiperSlide v-for="item in swiperList" :key="item.src">
      <a href="#" @click.prevent="jumpToDetailPage(item)">
        <img :src="item.src" :alt="item.idOrPath">
      </a>
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss">
.swiper {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>
