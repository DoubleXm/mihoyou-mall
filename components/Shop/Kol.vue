<script lang="ts">
import { shopConfig } from '~/settings/static'

export default defineComponent({
  name: 'ShopKol',
  setup() {
    return {
      shopConfig,
    }
  },
})
</script>

<template>
  <div class="kol-wrapper">
    <div class="banner">
      <img :src="shopConfig.kol.banner" alt="banner">
    </div>
    <div class="content-1" />
    <div class="content-2" />
    <div class="content-3" />
  </div>
</template>

<style lang="scss">
.kol-wrapper {
  .banner {
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
  div[class*=content] {
    background-position: center center;
    background-repeat:  no-repeat;
    background-size: cover;
  }

  .content-1 {
    height: 401PX;
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/02/02/ca3ad6d03028c8962dc39591236d0f1d_5972234838972341294.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .content-2 {
    height: 872PX;
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/02/02/016bc2e9143970280ac8f850fae088ac_1169910320637442119.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .content-3 {
    height: 9644PX;
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/02/02/526161a37adf321b3c90506330f8b298_6844640798072996441.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
}
</style>
