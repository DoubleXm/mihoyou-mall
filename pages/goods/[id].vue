<script setup lang="ts">
import type { GoodsDetail, GoodsDetailCouponResult } from '~/apis/common/typing'

import { getGoodsDetail, getGoodsDetialCoupons, postGoodsDetailCouponRective } from '~/apis/common'

const route = useRoute()

const goodsId = route.params.id as string

const goodsDetail = ref<GoodsDetail['data'] | null>(null)
const goodsCoupons = ref<GoodsDetailCouponResult['data'] | null>(null)
const coverUrl = ref<string | null>(null)

// 预览地址的 index
const imagePreviewIndex = computed(() => {
  if (goodsDetail.value) {
    const index = goodsDetail.value.goods.detail.banner_url.findIndex(i => i === coverUrl.value)
    if (index !== -1)
      return index
  }
  return 0
})

// 商品标签的类名
const goodsTag = computed(() => {
  if (goodsDetail.value) {
    switch (goodsDetail.value.goods.detail.tag) {
      case 1:
        return 'tag-new'
      case 3:
        return 'tag-recommend'
      default:
        return ''
    }
  }
})

// 优惠券列表
const couponList = computed(() => {
  if (goodsDetail.value) {
    return goodsDetail.value.promotion.coupons.map(i =>
      ({ coupon_id: i.coupon_id, name: i.name.replace(/^【.*】/, '') }))
  }
})

/**
 * @description 获取商品详情
 */
const queryGoodsDetail = async () => {
  const result = await getGoodsDetail(goodsId)

  if (result.retcode !== 0) {
    ElMessage.error(result.message)
    return
  }

  goodsDetail.value = result.data
  console.log(result.data)
}

/**
 * @description 获取商品详情中优惠券列表
 */
const queryGoodsDetailCoupons = async () => {
  const result = await getGoodsDetialCoupons(goodsId)

  if (result.retcode !== 0) {
    ElMessage.error(result.message)
    return
  }
  goodsCoupons.value = result.data
}

/**
 * @description 商品相中中优惠券领取
 */
const goodsDetailCouponRective = async (couponId: string) => {
  const result = await postGoodsDetailCouponRective(couponId)

  if (result.retcode !== 0) {
    ElMessage.error(result.message)
    return
  }

  queryGoodsDetailCoupons()
}

/**
 * @description 鼠标经过预览小图
 */
const reserveImageMouseenter = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  coverUrl.value = target.getAttribute('data-src')
  const imagesEle = document.querySelectorAll('.image-item')

  if (imagesEle) {
    imagesEle.forEach((ele) => {
      (ele as HTMLElement).style.setProperty('border', '1PX solid var(--el-border-color)')
    })
  }
  target.style.setProperty('border', '4PX solid var(--el-color-primary)')
}

onMounted(async () => {
  await queryGoodsDetail()

  // 初始化小图的默认选中
  const imagesEle = document.querySelectorAll('.image-item')
  if (imagesEle.length)
    (imagesEle.item(0) as HTMLElement).style.border = '4PX solid var(--el-color-primary)'
})
</script>

<template>
  <CategoryNavbar />

  <div class="goods-detail__page">
    <template v-if="goodsDetail">
      <div class="sku-selector">
        <!-- 图片预览 -->
        <div class="image-selector">
          <div class="cover_image">
            <ElImage
              ref="elImageRef"
              style="width: 100%; height: 100%;"
              :src="coverUrl ? coverUrl : goodsDetail?.goods.detail.cover_url"
              :preview-src-list="goodsDetail?.goods.detail.banner_url"
              :initial-index="imagePreviewIndex"
              fit="cover"
              lazy
            />
          </div>

          <div class="reserve-images">
            <div
              v-for="(item, index) in goodsDetail?.goods.detail.banner_url"
              :key="index"
              class="image-item"
              :data-src="item"
              @mouseenter="reserveImageMouseenter"
            >
              <img :src="item" :alt="item">
            </div>
          </div>
        </div>
        <!-- sku 选择 -->
        <div class="sku">
          <h2>
            <span class="tag" :class="[goodsTag]" />
            {{ goodsDetail.goods.detail.name }}
          </h2>

          <div class="price-content">
            <div class="price">
              <span class="price-prefix">￥</span>{{ goodsDetail.goods.detail.price / 100 }}
            </div>
            <div class="coupon">
              <label class="label">优惠</label>
              <ElPopover
                placement="bottom"
                trigger="click"
                width="420"
                popper-class="coupon-popover"
              >
                <div v-if="goodsCoupons?.received.length || goodsCoupons?.unreceive.length" class="coupon-img__list">
                  <div
                    v-for="item in goodsCoupons?.unreceive"
                    :key="item.coupon_id"
                    class="coupon-img__item unrective"
                  >
                    <span>{{ item.name.replace(/^【.*】/, '') }}</span>
                    <span @click="goodsDetailCouponRective(item.coupon_id)">领取</span>
                  </div>
                  <div
                    v-for="item in goodsCoupons?.received"
                    :key="item.coupon_id"
                    class="coupon-img__item rective"
                  >
                    <span>{{ item.name.replace(/^【.*】/, '') }}</span>
                    <span>已领取</span>
                  </div>
                </div>
                <template #reference>
                  <div v-if="couponList?.length" class="coupon-list" @click="queryGoodsDetailCoupons">
                    <span v-for="item in couponList" :key="item.coupon_id">
                      {{ item.name }}
                    </span>
                  </div>
                </template>
              </ElPopover>
            </div>
          </div>

          <div v-for="item in goodsDetail.goods.detail.sale_attrs" :key="item.name" class="specs">
            <label class="label">{{ item.name }}</label>
            <div class="specs-list">
              <label v-for="specs in item.content" :key="specs.key" class="specs-item">{{ specs.text }}</label>
            </div>
          </div>

          <div class="counter">
            <label class="label">数量</label>
            <ElInputNumber size="default" />
            <span>库存 1610 件</span>
          </div>

          <div class="btns">
            <ElButton type="primary">
              立即购买
            </ElButton>
            <ElButton type="primary" plain>
              加入购物车
            </ElButton>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <GoodsLoading />
    </template>
  </div>
</template>

<style lang="scss">
.goods-detail__page {
  width: 1260PX;
  margin: 20PX auto;
  padding: 20PX;
  border-radius: 8PX;
  background-color: var(--el-color-white);

  .sku-selector {
    display: flex;
    justify-content: space-between;
    .image-selector {
      .cover_image {
        width: 486PX;
        height: 486PX;
        border: 1PX solid var(--el-border-color);
        cursor: pointer;
        .el-image-viewer__canvas {
          .el-image-viewer__img {
            max-height: 90% !important;
            border-radius: 8PX;
          }
        }
        .el-image-viewer__btn {
          bottom: 6% !important;
        }
      }
      .reserve-images {
        display: flex;
        margin-top: 20PX;
        .image-item {
          width: 78PX;
          height: 78PX;
          margin-left: 24PX;
          box-sizing: border-box;
          border: 1PX solid var(--el-border-color);
          cursor: pointer;
          transition: all .1s ease;
          &:first-child {
            margin-left: 0;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .sku {
      flex: 1;
      margin-left: 10PX;
      h2 {
        margin-bottom: 24PX;
        font-size: 28PX;
        line-height: 40PX;
        .tag {
          display: inline-block;
          width: 64PX;
          height: 33PX;
          margin: 0 10PX;
          background-position: center center;
          background-repeat:  no-repeat;
          background-size: contain;
          vertical-align: text-bottom;
          &.tag-new {
            background-image: url(~/assets/images/goods/goods-state-new.png);
          }
          &.tag-recommend {
            background-image: url(~/assets/images/goods/goods-state-recommend.png);
          }
          &.tag-presale {
            background-image: url(~/assets/images/goods/goods-state-presale.png);
          }
          &.tag-over {
            background-image: url(~/assets/images/goods/goods-state-over.webp);
          }
        }
      }

      .price-content {
        padding: 12PX;
        background: rgba(243,243,244,.5) linear-gradient(270deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
        .price {
          font-size: 34PX;
          line-height: 52PX;
          font-weight: bold;
          color: var(--el-color-primary);
          .price-prefix {
            font-size: 24PX;
          }
        }
        .coupon {
          display: flex;
          line-height: 24PX;
          .coupon-list {
            span {
              display: inline-block;
              padding: 2PX 4PX;
              margin-right: 10PX;
              border-radius: 2PX;
              color: var(--el-color-primary);
              background-color: var(--el-color-primary-light-9);
              cursor: pointer;
            }
          }
        }
      }

      .label {
        display: inline-block;
        width: 72PX;
        color: var(--el-color-info);
      }

      .specs {
        display: flex;
        margin-top: 20PX;
        padding: 0 13PX;
        flex-wrap: wrap;
        .label {
          margin-top: 10PX;
        }
        .specs-list {
          flex: 1;
          .specs-item {
            display: inline-block;
            margin: 0 8PX 8px 0;
            padding: 0 12PX;
            white-space: nowrap;
            line-height: 32PX;
            border: 1PX solid var(--el-color-info);
            border-radius: 4PX;
            cursor: pointer;
          }
        }
      }

      .counter {
        padding: 0 13PX;
        .el-input-number {
          width: auto;
          .el-input-number__increase,
          .el-input-number__decrease {
            background-color: var(--el-color-white);
          }
          .el-input__wrapper {
            width: 50PX;
            padding: 0 44PX;
            &.is-focus {
              box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
            }
          }
        }
        span {
          padding-left: 10PX;
          color: var(--el-color-info);
        }
      }

      .btns {
        margin-top: 20PX;
        padding-left: 13PX;
        .el-button {
          width: 182PX;
          height: 56PX;
          font-size: 18PX;
          &.is-plain {
            background-color: var(--el-color-white);
            &:hover {
              color: var(--el-color-primary);
            }
            &:active {
              color: var(--el-color-primary);
            }
          }
        }
      }
    }
  }
}
.coupon-popover {
  background-image: url(~/assets/images/goods/goods-coupon-bg.png) !important;
  background-position: bottom right !important;
  background-repeat: no-repeat !important;
  background-size: 119PX 77PX !important;
  .coupon-img__list {
    display: flex;
    flex-wrap: wrap;
    width: 400PX;
    .coupon-img__item {
      display: flex;
      align-items: center;
      width: 121PX;
      height: 48PX;
      margin: 6PX;
      padding-left: 21PX;
      font-size: 12PX;
      color: var(--el-color-white);
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      box-sizing: border-box;
      &.unrective {
        background-image: url(~/assets/images/goods/goods-coupon-undraw.png);
      }
      &.rective {
        line-height: 12PX;
        background-image: url(~/assets/images/goods/goods-coupon-draw.png);
      }
      span {
        &:first-child {
          flex: 1;
        }
        &:last-child {
          width: 10PX;
          padding-right: 10PX;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
