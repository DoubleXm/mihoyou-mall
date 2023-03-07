<script setup lang="ts">
import type { GoodsDetail } from '~/apis/common/typing'

import { getGoodsDetail } from '~/apis/common'

const route = useRoute()

const goodsId = route.params.id as string

const goodsDetail = ref<GoodsDetail['data'] | null>(null)
const coverUrl = ref<string | null>(null)

const imagePreviewIndex = computed(() => {
  if (goodsDetail.value) {
    const index = goodsDetail.value.goods.detail.banner_url.findIndex(i => i === coverUrl.value)
    if (index !== -1)
      return index
  }
  return 0
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
}
</style>
