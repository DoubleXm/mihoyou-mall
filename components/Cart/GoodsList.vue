<script setup lang="ts">
import { getSpuGoodsList } from '~/apis/common'
import type { SpuGoodsListItem, SpuGoodsListParams, SpuGoodsListResult } from '~/apis/common/typing'

const router = useRouter()
const goodsList = ref<SpuGoodsListResult['data']['list'] | null>(null)

/**
 * @description 获取购物车热销商品列表
 */
const queryGoodsList = async () => {
  const payload: Partial<SpuGoodsListParams> = {
    limit: 12,
    page: 1,
    order_by: 'sold_num',
    hide_sold_out: true,
    show_sale_type: 1,
  }

  const result = await getSpuGoodsList(payload)

  if (result.retcode !== 0) {
    ElMessage.error(result.message)
    return
  }

  goodsList.value = result.data.list
}

/**
 * @description 前往商品详情页
 */
function goToGoodsDetail(goods: SpuGoodsListItem) {
  const routeUrl = router.resolve({ name: 'goods-id', params: { id: goods.goods_id } })
  window.open(routeUrl.href, '_blnk')
}

queryGoodsList()
</script>

<template>
  <div class="shop-cart-goods__list">
    <template v-if="goodsList?.length">
      <h3>
        <i class="iconfont icon-rexiao" />
        热销商品
      </h3>

      <div class="goods-list">
        <GoodsCard
          v-for="(item, index) in goodsList"
          :key="item.goods_id" :goods="item"
          :style="{ marginRight: (index + 1) % 4 === 0 ? 0 : '24PX' }"
          @click="goToGoodsDetail"
        />
      </div>
    </template>

    <GoodsLoading v-else />
  </div>
</template>

<style lang="scss">
.shop-cart-goods__list {
  display: flex;
  flex-direction: column;
  min-height: 400PX;
  padding: 24PX 30PX;
  border-radius: 6PX;
  background-color: var(--el-color-white);
  h3 {
    margin-bottom: 30PX;
    font-size: 18PX;
    color: var(--el-color-black);
    i {
      font-size: 20PX;
      color: var(--el-color-primary);
      font-weight: bold;
    }
  }

  .goods-list {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
  }
  .goods-card__item {
    width: 280PX;
    height: 408PX;
    margin: 0 24PX 24PX 0;
    border: 1PX solid #f3f3f4;
    transition: all ease .3s;
    &:hover {
      box-shadow: 0 0 10PX 0 rgb(0 0 0 / 10%);
    }
    .goods-card-img {
      height: 280PX;
    }
    .goods-card-content {
      padding: 16PX 20PX 20PX;
      h5 {
        font-size: 16PX;
        line-height: 24PX;
      }
      .tag-recommend {
        width: 48PX;
        height: 18PX;
      }

      .goods-price-row {
        margin-top: 24PX;
        .price-currency {
          font-size: 18PX;
        }
        .price-integer {
          font-size: 22PX;
        }
      }
    }
  }
}
</style>
