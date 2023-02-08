<script setup lang="ts">
import ShopYs from '~/components/Shop/Ys.vue'
import ShopWd from '~/components/Shop/Wd.vue'
import ShopKol from '~/components/Shop/Kol.vue'
import ShopBh3 from '~/components/Shop/Bh3.vue'
import ShopBh2 from '~/components/Shop/Bh2.vue'
import ShopDby from '~~/components/Shop/Dby.vue'

import { firstLetterCapitl } from '~/utils'
import { shopPages } from '~/settings'

definePageMeta({
  // 路由校验
  validate: async (route) => {
    return !!shopPages.find(i => i === route.path)
  },
  // keepalive: true,
})

const route = useRoute()

const ShopComponents = [ShopYs, ShopWd, ShopKol, ShopBh3, ShopBh2, ShopDby]

// 根据路由匹配出对应的组件使用动态组件方式渲染
const ShopComponent = computed(() => {
  const key = route.path.match(/[^\/][^$\/]+/) as RegExpMatchArray
  const name = `Shop${firstLetterCapitl(Array.isArray(key) ? key[0] : '')}`
  return ShopComponents.find(com => com.name === name)
})
</script>

<template>
  <div class="shop-page">
    <CategoryNavbar />

    <component :is="ShopComponent" />
  </div>
</template>
