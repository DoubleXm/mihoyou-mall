<script lang="ts">
import { shopConfig } from '~/settings/static'

export default defineComponent({
  name: 'ShopWd',
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

<style lang="scss">
.wd-wrapper {
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
    height: 2780PX;
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/02/06/426528b5cb3c3ce801007212c0075a31_2177685609551573585.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .content-2 {
    height: 3902PX;
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/02/06/651470c61fce47f10af947ba100046c0_7096948583121632830.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .content-3 {
    height: 4070PX;
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/02/06/98802f7207c5eb62006a2debf2414689_1946964602944453367.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
}
</style>
