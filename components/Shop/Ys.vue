<script lang="ts">
import { getShopGoodsList } from '~/apis/common'
import { shopConfig } from '~/settings/static'

export default defineComponent({
  name: 'ShopYs',
  setup() {
    // 不确定是什么值，反正拿来能用
    const apiParams: { puzzle_id: string; component_id: string }[] = [
      { puzzle_id: 'mall_cn_ys_1674114355', component_id: 'pz-30KlpKySWd' },
      { puzzle_id: 'mall_cn_ys_1674114355', component_id: 'pz-cJ9TZgRuwd' },
      { puzzle_id: 'mall_cn_ys_1674114355', component_id: 'pz-z5FRd5pbfw' },
      { puzzle_id: 'mall_cn_ys_1674114355', component_id: 'pz-JUfEB0CuAr' },
      { puzzle_id: 'mall_cn_ys_1674114355', component_id: 'pz-4WX9Gk6hO4' },
      { puzzle_id: 'mall_cn_ys_1674114355', component_id: 'pz-BdWCqpKBaN' },
    ]

    return {
      shopConfig,
    }
  },
})
</script>

<template>
  <div class="ys-wrapper">
    <div class="banner">
      <img :src="shopConfig.ys.banner" alt="banner">
    </div>
    <!-- 人气好物 -->
    <div class="goods-title good-goods" />
    <section class="goods-list">
      <div class="list">
        商品列表
      </div>
    </section>
    <!-- 手办模玩 -->
    <div class="goods-title garate-kit" />
    <section class="goods-list">
      <div class="list">
        商品列表
      </div>
    </section>
    <!-- 日用百货 -->
    <div class="goods-title stores" />
    <section class="goods-list">
      <div class="list">
        商品列表
      </div>
    </section>
    <!-- 毛绒玩具 -->
    <div class="goods-title plush-toys" />
    <section class="goods-list">
      <div class="list">
        商品列表
      </div>
    </section>
    <!-- 服装配饰 -->
    <div class="goods-title clothes" />
    <div class="goods-title clothes-banner" />
    <section class="goods-list">
      <div class="list">
        商品列表
      </div>
    </section>
    <!-- 挂件摆件 -->
    <div class="goods-title pendant" />
    <section class="goods-list">
      <div class="list">
        商品列表
      </div>
    </section>
    <!-- 主题系列 -->
    <div class="goods-title theme" />
    <div class="goods-title theme-top-banner" />
    <div class="goods-title theme-bootom-banner" />
    <div class="goods-title more" />
  </div>
</template>

<style lang="scss">
.ys-wrapper {
  .banner {
    img {
      width: 100%;
      height: 748PX;
      vertical-align: middle;
    }
  }
  // 商品列表头部标题
  .goods-title {
    height: 114PX;
    background-position: center center;
    background-repeat:  no-repeat;
    background-size: cover;
  }

  .good-goods {
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/01/30/e180bd7edcf3840d0f0ea7e7d770caf5_5961110765148775096.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .garate-kit {
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/01/30/31ff895db2c2632c449db0e64d268f32_4704739799258534104.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .stores {
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/01/30/b41d89baacb4556eb5d73bec9429fff0_8418348741069772590.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .plush-toys {
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/01/30/280f7fc310374e4a3ae5bf8bc2ce4112_1454471706164767243.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .clothes {
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/01/30/78f71d577cbc94d329b75df30f439e31_2486754311454212837.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .clothes-banner {
    height: 1512.89PX;
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/01/30/51ff01d50c2b13cbe5661296579794ab_5043816789992873067.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .pendant {
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/01/30/82ccda0bf288606848810783f9fd47bc_347750234097809529.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .theme {
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/01/30/e2eb805294e6f755ce9160aa2e5b0d7a_654287056465942441.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .theme-top-banner {
    height: 1510PX;
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/01/30/085a9361001a3951af5fb1b9a05b296b_6461250552033191225.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .theme-bottom-banner {
    height: 1629.5PX;
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/01/30/249fc6898d58514488a816845d9f0ca4_2074995051242932384.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }
  .more {
    height: 684.77PX;
    background-image: url(https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2023/01/30/f6f50b772debfa3068a4824634368a08_4148906054893906816.jpg?x-oss-process=image/format,webp/quality,Q_90);
  }

  .goods-list {
    width: 100%;
    background-color: rgb(162, 205, 255);
    .list {
      width: 639PX;
      margin: 0 auto;
      padding: 22PX;
    }
  }
}
</style>
