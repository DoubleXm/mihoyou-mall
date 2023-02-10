<script lang="ts">
import { shopConfig } from '~/settings/static'

export default defineComponent({
  name: 'ShopBh3',
  setup() {
    return {
      shopConfig,
    }
  },
})
</script>

<template>
  <div class="wd-wrapper">
    <div class="banner">
      <img :src="shopConfig.wd.banner" alt="banner">
    </div>

    <div class="content-1" />
    <div class="content-2" />
    <div class="content-3" />
  </div>
</template>
