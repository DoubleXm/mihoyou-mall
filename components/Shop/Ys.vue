<script lang="ts">
import { getShopGoodsList } from '~/apis/common'
import { shopConfig } from '~/settings/static'
import { toKebabCase } from '~/utils'

import type { GoodsListItem } from '~~/apis/common/typing'

interface ApiParams {
  [key: string]: {
    puzzle_id: string
    component_id: string
  }
}

export default defineComponent({
  name: 'ShopYs',
  setup() {
    const router = useRouter()

    // 不确定是什么值，反正拿来能用
    const apiParams: ApiParams = {
      goodGoods: { puzzle_id: 'mall_cn_ys_1674114355', component_id: 'pz-30KlpKySWd' },
      garateKit: { puzzle_id: 'mall_cn_ys_1674114355', component_id: 'pz-cJ9TZgRuwd' },
      stores: { puzzle_id: 'mall_cn_ys_1674114355', component_id: 'pz-z5FRd5pbfw' },
      plushToys: { puzzle_id: 'mall_cn_ys_1674114355', component_id: 'pz-JUfEB0CuAr' },
      clothes: { puzzle_id: 'mall_cn_ys_1674114355', component_id: 'pz-4WX9Gk6hO4' },
      pendant: { puzzle_id: 'mall_cn_ys_1674114355', component_id: 'pz-BdWCqpKBaN' },
    }
    const goodsList = ref<Record<string, GoodsListItem[]>>({})

    /**
     * @description  获取商品列表数据
     */
    const getGoodsList = () => {
      Object.keys(apiParams).forEach(async (key) => {
        const result = await getShopGoodsList(apiParams[key])

        if (result.retcode !== 0) {
          ElMessage.error(result.message)
          return
        }

        goodsList.value[key] = result.data.list
      })
    }

    /**
     * @description  跳转商品详情页
     */
    const goToGoodsDetail = (item: GoodsListItem) => {
      router.push({ name: 'goods-id', params: { id: item.goods_id } })
    }

    getGoodsList()
    return {
      shopConfig,
      goodsList,
      toKebabCase,
      goToGoodsDetail,
    }
  },
})
</script>

<template>
  <div class="ys-wrapper">
    <div class="banner">
      <img :src="shopConfig.ys.banner" alt="banner">
    </div>

    <template v-for="(item, index) in Object.keys(goodsList)" :key="index">
      <!-- 把 key 的类名转成短横线类名 -->
      <div class="goods-title" :class="toKebabCase(item)" />
      <section class="goods-list">
        <div class="list">
          <GoodsCard
            v-for="goods in goodsList[item]"
            :key="goods.goods_id"
            :goods="goods"
            @click.prevent="goToGoodsDetail(goods)"
          />
        </div>
      </section>
    </template>

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
  .theme-bootom-banner {
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
      display: flex;
      flex-wrap: wrap;
      width: 954PX;
      margin: 0 auto;
      padding: 22PX;
      padding-bottom: 0;
      box-sizing: border-box;
    }
  }
}
</style>
