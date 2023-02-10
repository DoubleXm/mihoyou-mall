<script lang="ts">
import { shopConfig } from '~/settings/static'

export default defineComponent({
  name: 'ShopDby',
  setup() {
    return {
      shopConfig,
    }
  },
})
</script>

<template>
  <div class="dby-wrapper">
    <div class="banner">
      <img :src="shopConfig.dby.banner" alt="banner">
    </div>

    <div class="content-1" />
    <div class="content-2" />
    <div class="content-3" />
    <div class="content-4" />
  </div>
</template>

<style lang="scss">
.dby-wrapper {
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
    height: 1403PX;
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/01/19/71b52b465932b313b81d37fbe44df411_5422375187876247629.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .content-2 {
    height: 1618PX;
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/01/19/ff6088b0d64997886f30de8fa23e1f0b_4780209136421639607.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .content-3 {
    height: 1812PX;
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/01/19/8929059caf7f72eccae944dce26d2349_2337894816519924985.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .content-4 {
    height: 1328PX;
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2022/11/18/77adcd068d41cc3a671c1e895d8cf5b3_8089260019433749073.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
}
</style>
