<script setup lang="ts">
import type { PropType } from 'vue'

export interface SwiperBanner {
  idOrPath: string
  src: string
  type: 'GOODS_DETAIL' | 'MENU_DETAIL'
}

defineProps({
  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
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
  <ElCarousel
    class="swiper-container"
    v-bind="$attrs"
    :height="`${height}px`"
    :style="{ width: `${width}px` }"
  >
    <ElCarouselItem v-for="item in swiperList" :key="item.src">
      <a href="#" @click.prevent="jumpToDetailPage(item)">
        <img :src="item.src" :alt="item.idOrPath">
      </a>
    </ElCarouselItem>
  </ElCarousel>
</template>

<style lang="scss">
.swiper-container {
  img {
    width: 100%;
  }
}
</style>
