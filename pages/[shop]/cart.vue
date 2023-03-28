<script setup lang="ts">
import type { CheckboxValueType } from 'element-plus'
import type {
  CalcShopCarGoodsPayload, CalcShopCarGoodsResult, DelShopCarGoodsPayload, EditShopCarGoodsPayload,
  GoodsCartChildItem, GoodsCartItem, GoodsCartResult,
} from '~/apis/common/typing'

import { useGoodsCardStore } from '~/store/modules/goodsCard'
import { calcShopCarGoods, delShopCarGoods, editShopCarGoods, getGoodsCartList } from '~/apis/common'

const router = useRouter()
const goodsStore = useGoodsCardStore()

const selectGoodsCarAll = ref(false)
const goodsCartList = ref<GoodsCartResult['data']['list']>([])
const goodsPriceCounterInfo = ref<CalcShopCarGoodsResult['data'] | null>(null)
const goodsCounter = ref(0)
const goodsCartLoading = ref(false)

watch(
  () => goodsCartList.value,
  (val) => {
    // 全部子集如果全部为 true 则更新全选效果
    const isShopSelect = val.every(i => i.select)
    const isGoodsSelect = val.map(i => i.list.map(k => k.select).every(j => j)).every(l => l)

    if (isShopSelect && isGoodsSelect)
      selectGoodsCarAll.value = true

    goodsCounter.value = 0
    val.forEach((item) => {
      if (item.list.length) {
        // 店铺内子集全选
        const isInShopSelectAll = item.list.every(item => item.select)
        item.select = isInShopSelectAll

        // 统计全部为 true （选中商品）的数量
        item.list.forEach((i) => {
          if (i.select)
            goodsCounter.value += i.nums
        })
      }
    })
  },
  { deep: true },
)

/**
 * @description 格式化 goodsCartList (增加 select 属性用于绑定 checkbox)
 */
const formatGoodsCaritList = (goodsCartList: GoodsCartResult['data']['list']) => {
  goodsCartList.forEach((item) => {
    item.select = false
    if (item.list.length)
      item.list.forEach(i => i.select = false)
  })
  return goodsCartList
}

/**
 * @description 格式化计算价格请求参数
 */
const formatCalcGoodsCartPayload = (goodsCartList: GoodsCartResult['data']['list']) => {
  // 计算金额所需的 payload
  return {
    list: goodsCartList
      .map(item => ({
        shop_code: item.shop_code,
        goods_list: item.list.filter(i => i.select),
      }))
      .filter(item => item.goods_list.length)
      .map(item => ({
        shop_code: item.shop_code,
        goods_list: item.goods_list.map(i => ({
          goods_id: i.goods_id,
          sku_id: i.sku_id,
          nums: i.nums,
        })),
      })),
  }
}

/**
 * @description 购物车商品列表
 */
const queryGoodsCartList = async () => {
  goodsCartLoading.value = true
  const result = await getGoodsCartList()

  goodsCartLoading.value = false
  if (result.retcode !== 0) {
    ElMessage.error(result.message)
    return
  }

  goodsCartList.value = formatGoodsCaritList(result.data.list)
}

/**
 * @description 计算购物车金额
 */
const calcGoodsCartPrice = async (data: CalcShopCarGoodsPayload) => {
  const result = await calcShopCarGoods(data)

  if (result.retcode !== 0) {
    ElMessage.error(result.message)
    return
  }
  goodsPriceCounterInfo.value = result.data
  console.log(goodsPriceCounterInfo.value)
}

/**
 * @description 修改购物车商品数量
 */
const updateGoodsCartById = async (goods: GoodsCartChildItem) => {
  const payload: EditShopCarGoodsPayload = {
    sku_id: goods.sku_id,
    shop_code: goods.shop_code,
    nums: goods.nums,
    goods_id: goods.goods_id,
  }

  const result = await editShopCarGoods(payload)

  if (result.retcode !== 0) {
    ElMessage.error(result.message)
    return
  }

  if (goods.select || goodsCounter.value)
    calcGoodsCartPrice(formatCalcGoodsCartPayload(goodsCartList.value))
}

/**
 * @description 删除单个购物车商品 todo
 */
const deleteGoodsCartById = (goods: GoodsCartChildItem, item: GoodsCartItem) => {
  ElMessageBox.confirm(
    '是否将此商品从购物车删除',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    },
  )
    .then(async () => {
      const payload: DelShopCarGoodsPayload = {
        sku_id: goods.sku_id,
        shop_code: goods.shop_code,
        goods_id: goods.goods_id,
      }

      const result = await delShopCarGoods(payload)

      if (result.retcode !== 0) {
        ElMessage.error(result.message)
        return
      }

      // 取消选中也要不影响其他的选中效果
      goodsCartList.value.forEach((i) => {
        if (i.shop_code === item.shop_code) {
          const index = i.list.findIndex(j => j.goods_id === goods.goods_id)
          if (index !== -1)
            i.list.splice(index, 1)

          if (!i.list.length) {
            const index = goodsCartList.value.findIndex(k => k.shop_code === i.shop_code)
            if (index !== -1)
              goodsCartList.value.splice(index, 1)
          }
        }
      })
      goodsStore.queryGoodsCard()

      if (goods.select || goodsCounter.value)
        calcGoodsCartPrice(formatCalcGoodsCartPayload(goodsCartList.value))
    })
}

/**
 * @description 选择购物车所有商品
 */
const selectGoodsInCart = (event: CheckboxValueType) => {
  goodsCartList.value.forEach((i) => {
    i.select = event as boolean
    i.list.forEach(item => item.select = event as boolean)
  })

  calcGoodsCartPrice(formatCalcGoodsCartPayload(goodsCartList.value))
}

/**
 * @description 选择店铺内所有的商品
 */
const selectGoodsInShop = (event: CheckboxValueType, cartItem: GoodsCartItem) => {
  // 只要子集有 false 全选状态就不会满足
  if (!event)
    selectGoodsCarAll.value = false

  goodsCartList.value.forEach((item) => {
    if (item.shop_code === cartItem.shop_code)
      item.list.forEach(i => i.select = event as boolean)
  })

  calcGoodsCartPrice(formatCalcGoodsCartPayload(goodsCartList.value))
}

/**
 * @description 选择单个商品
 */
const selectGoodsSingle = (event: CheckboxValueType, goods: GoodsCartChildItem) => {
  // 只要子集有 false 全选状态就不会满足
  if (!event)
    selectGoodsCarAll.value = false

  calcGoodsCartPrice(formatCalcGoodsCartPayload(goodsCartList.value))
}

/**
 * @description 结算
 */
const settleAccounts = () => {
  router.push({ name: 'order-confirm', query: { from: 'cart' } })
}

onMounted(() => {
  queryGoodsCartList()
})
</script>

<template>
  <div class="shop-cart__page">
    <template v-if="goodsCartList.length">
      <section class="shop-cart__header cart-flex">
        <div class="cart-flex__item" />
        <div class="cart-flex__item">商品信息</div>
        <div class="cart-flex__item">单价</div>
        <div class="cart-flex__item">数量</div>
        <div class="cart-flex__item">金额</div>
        <div class="cart-flex__item">操作</div>
      </section>

      <section v-for="item in goodsCartList" :key="item.shop_name" class="shop-cart__main">
        <!-- 店铺名 -->
        <div class="goods-row__item cart-flex">
          <div class="cart-flex__item goods_checkbox">
            <ElCheckbox v-model="item.select" @change="selectGoodsInShop($event, item)" />
          </div>
          <div class="cart-flex__item shop-cart__title">
            <i class="iconfont icon-dianpu" />
            <NuxtLink :to="{ name: 'shop', params: { shop: item.shop_code } }">{{ item.shop_name }}</NuxtLink>
          </div>
        </div>

        <!-- 购物车商品列表 -->
        <div v-for="goods in item.list" :key="goods.goods_id" class="goods-row__item cart-flex">
          <div class="cart-flex__item goods_checkbox">
            <ElCheckbox v-model="goods.select" @change="selectGoodsSingle($event, goods)" />
          </div>
          <div class="cart-flex__item goods_desc">
            <ClientOnly>
              <ElPopover placement="right" :width="240" trigger="hover" popper-class="goods-image__popover">
                <template #reference>
                  <ElImage fit="cover" :src="goods.cover_url" />
                </template>

                <ElImage fit="cover" :src="goods.cover_url" class="goods-hover__image " />
              </ElPopover>
            </ClientOnly>

            <div class="goods_desc-content">
              <NuxtLink :to="{ name: 'goods-id', params: { id: goods.goods_id } }">
                <h3>{{ goods.goods_name }}</h3>
              </NuxtLink>
              <span>{{ goods.sale_attr_val }}</span>
            </div>
          </div>
          <div class="cart-flex__item">
            ￥{{ (goods.new_price_fee / 100).toFixed(2) }}
          </div>
          <div class="cart-flex__item goods_number">
            <ElInputNumber
              v-model="goods.nums"
              :min="1"
              size="small"
              @input="updateGoodsCartById(goods)"
            />
          </div>
          <div class="cart-flex__item goods_price ">
            ￥{{ (goods.new_price_fee / 100 * goods.nums).toFixed(2) }}
          </div>
          <div class="cart-flex__item goods_action">
            <i class="iconfont icon-shanchu" @click="deleteGoodsCartById(goods, item)" />
          </div>
        </div>
      </section>

      <!-- 结算相关 -->
      <section class="shop-cart__footer">
        <div class="footer-l goods_checkbox">
          <ElCheckbox v-model="selectGoodsCarAll" @change="selectGoodsInCart" />
          <span>全选</span>
        </div>
        <div class="footer-r">
          <div class="goods-count">共 <span class="light">{{ goodsCounter }}</span> 件</div>
          <div class="goods-price-count">
            合计（不含运费）：
            <span class="light price-prefix">￥</span>
            <template v-if="goodsPriceCounterInfo">
              <span v-if="goodsPriceCounterInfo.total_goods_price" class="light price">
                {{ goodsPriceCounterInfo!.total_goods_price / 100 }}
              </span>
              <span v-else class="light price">0.00</span>
            </template>
            <span v-else class="light price">0.00</span>
          </div>
          <ElButton type="primary" size="large" :disabled="!goodsCounter" @click="settleAccounts">结算</ElButton>
        </div>
      </section>
    </template>

    <template v-else>
      <div class="goods-cart__empty">
        <img
          style="width: 176px; height: 160px;"
          src="~/assets/images/goods-cart-empty.webp"
          alt="empty-goods-cart"
        >
        <p>您的购物车空空如也～</p>
      </div>

      <CartGoodsList v-if="!goodsCartList.length && !goodsCartLoading" />
    </template>
  </div>
</template>

<style lang="scss">
.shop-cart__page {
  width: 1260PX;
  margin: 20PX auto 30PX auto;
  .shop-cart__header {
    margin-bottom: 8PX;
    padding: 20PX 30PX;
    background-color: var(--el-color-white);
    border-radius: 8PX;
    color: var(--el-color-info-light-3);
  }

  .shop-cart__main {
    background-color: var(--el-color-white);
    border-radius: 8PX;
    .goods-row__item {
      position: relative;
      padding: 12PX 30PX;
      &:last-child {
        &::after {
          height: 0;
        }
      }
      &:first-child {
        &::after {
          height: 0;
        }
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        height: 1PX;
        width: calc(100% - 164PX - 60PX);
        margin-left: 164PX;
        background-color: var(--el-color-info-light-7);
      }
    }
    .goods_desc {
      display: flex;
      .el-image {
        width: 98PX;
        height: 98PX;
        margin-right: 24PX;
        border-radius: 10PX;
        border: 1PX solid var(--el-color-info-light-3);
      }

      .goods_desc-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        a {
          text-decoration: none;
          color: var(--el-color-black);
        }
        h3 {
          width: 350PX;
          font-size: 16PX;
        }
        span {
          line-height: 20PX;
          color: var(--el-color-info-light-3);
        }
      }
    }
    .goods_number {
      .el-input-number {
          width: 96PX;
          height: 30PX;
          .el-input-number__increase,
          .el-input-number__decrease {
            background-color: var(--el-color-white);
          }
          .el-input__wrapper {
            width: 50PX;
            padding: 2PX 34PX;
            &.is-focus {
              box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
            }
          }
        }
    }
    .goods_price {
      color: var(--el-color-primary);
    }
    .goods_action {
      cursor: pointer;
      &:hover {
        color: var(--el-color-primary);
      }
    }
    .shop-cart__title {
      .iconfont {
        font-size: 18PX;
        color: var(--el-color-primary);
      }
      line-height: 24PX;
      font-size: 16PX;
      a {
        padding-left: 12PX;
        color: var(--el-color-black);
        text-decoration: none;
        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
  }

  .goods_checkbox {
    text-align: left !important;
    .el-checkbox__inner {
      width: 20PX;
      height: 20PX;
      &::after {
        left: 7PX;
        top: 4PX;
      }
    }
  }

  .shop-cart__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    bottom: 0;
    z-index: 2;
    height: 100PX;
    margin: 10PX 0 30PX 0;
    padding: 20PX 30PX;
    background-color: var(--el-color-white);
    border-radius: 8PX;
    border: 1PX solid var(--el-color-info-light-9);
    box-sizing: border-box;
    .footer-l {
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 16PX;
      > span {
        padding-left: 10PX;
      }
    }
    .footer-r {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 1;
      font-size: 16PX;
      line-height: 16PX;
      .goods-count {
        margin: 14PX 30PX 0 0;
      }
      .goods-price-count {
        height: 16PX;
      }
      .price-prefix {
        font-size: 24PX;
      }
      .price {
        font-size: 34PX;
      }
      .el-button {
        width: 180PX;
        height: 56PX;
        margin-left: 30PX;
        border-radius: 8PX;
        font-size: 18PX;
        font-weight: bold;
      }
    }
  }

  .cart-flex {
    display: flex;
    align-items: center;
    .cart-flex__item {
      width: 150PX;
      line-height: 22PX;
      text-align: center;
      &:nth-child(1) {
        width: 40PX;
      }
      &:nth-child(2) {
        flex: 1;
        text-align: left;
      }
    }
  }

  .light {
    color: var(--el-color-primary);
  }

  .goods-cart__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 300PX;
    p {
      margin-top: 10PX;
      line-height: 24PX;
      color: #9696a1;
    }
  }
}

.goods-image__popover {
  width: auto !important;
  padding: 0 !important;
  line-height: 10PX !important;
  .goods-hover__image {
    width: 240PX;
    height: 240PX;
  }
}
</style>
