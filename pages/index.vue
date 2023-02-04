<script lang="ts" setup>
import type { SwiperBanner } from '~/components/BannerSwiper.vue'

import { bannerSwiperStatic, homeHotRecommend, homeNewAndPartition } from '~/settings/static'

interface Partition {
  path: string
  text: string
  top?: number
  left?: number
}

// MOCK Data starting....
const swiperBannerList = reactive<SwiperBanner[]>([
  { idOrPath: '/ys', type: 'MENU_DETAIL' },
  { idOrPath: '/dby', type: 'MENU_DETAIL' },
  { idOrPath: '/wd', type: 'MENU_DETAIL' },
  { idOrPath: '2024510538545312606208', type: 'GOODS_DETAIL' },
  { idOrPath: '/bh2', type: 'MENU_DETAIL' },
])

const partitionList = ref<Partition[]>([
  { path: '/dby', text: '大别野' },
  { path: '/ys', text: '原神' },
  { path: '/bh3', text: '崩坏三' },
  { path: '/bh2', text: '崩坏学院二' },
  { path: '/wd', text: '未定义事件簿' },
  { path: '/kol', text: '创小摊' },
])

const hotRecommendList = ref<string[]>([
  '2021451908976213273600',
  '202616430188139889',
  '2024538203845721853952',
  '2023510531745246881792',
  '2025538828658723260416',
])

const latelyGoodsList = reactive(['2021532939899309925376', '2024510538545312606208', '2021532950449880306688'])
// Mock Data end

const partitionImgRefs = ref<HTMLImageElement[] | null>(null)
const partitionImgWidth = ref(0)
const partitionImgHeight = ref(0)

watchEffect(() => {
  bannerSwiperStatic.forEach((item, i) => {
    swiperBannerList[i].src = item
  })
})

onMounted(() => {
  if (partitionImgRefs.value?.length) {
    partitionImgWidth.value = partitionImgRefs.value[0].width
    partitionImgHeight.value = partitionImgRefs.value[0].height
  }

  // 计算 店铺分区中 item 的位置
  if (partitionImgHeight.value && partitionImgWidth.value) {
    partitionList.value = partitionList.value.map((item, index) => {
      const linkWidth = 260 + 14
      const linkHeight = 112 + 14

      return {
        ...item,
        // 偶数表示右侧的数据需要向左偏移
        left: (partitionList.value.length - (index + 1)) % 2 === 0 ? linkWidth : 0,
        // (Math.round((index + 1) / 2) - 1) => 0 1 2 ....
        top: (Math.round((index + 1) / 2) - 1) * linkHeight,
      }
    })
  }
})
</script>

<template>
  <div class="home-page">
    <div class="type-area">
      <div class="swiper-banner-container">
        <BannerSwiper
          :swiper-list="swiperBannerList"
        />
      </div>
    </div>
    <!-- 店铺分区 & 最近上新 -->
    <section
      class="home-nwe-partition home-bg"
      :style="{ 'background-image': `url(${homeNewAndPartition})` } "
    >
      <div class="virtual-ele">
        <div class="partition">
          <NuxtLink
            v-for="item in partitionList"
            :key="item.path"
            :to="item.path"
            :style="{ left: `${item?.left}px`, top: `${item?.top}px` }"
          >
            <img
              ref="partitionImgRefs"
              :alt="item.text"
            >
          </NuxtLink>
        </div>

        <ul class="lately">
          <li v-for="item in latelyGoodsList" :key="item">
            <NuxtLink :to="`/goods/${item}`" />
          </li>
        </ul>
      </div>
    </section>

    <!-- 热门推荐 -->
    <section
      class="hot-recommend home-bg"
      :style="{ 'background-image': `url(${homeHotRecommend})` } "
    >
      <div class="goods-content">
        <!-- 循环四次假数据 -->
        <template v-for="item in 4" :key="item">
          <NuxtLink
            v-for="(id, index) in hotRecommendList"
            :key="id"
            :to="`/goods/${id}`"
            :class="index + 1 - 5 === 0 ? 'no-margin-right' : ''"
          />
        </template>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  .swiper-banner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 15PX auto;
    .swiper-wrapper {
      width: 936PX;
      height: 222PX;
    }
  }

  .home-bg {
    width: 1426PX;
    margin: 0 auto;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  // 店铺分区 & 最近上新
  .home-nwe-partition {
    height: 459PX;
    .virtual-ele {
      display: flex;
      justify-content: space-between;
      width: 936PX;
      height: 100%;
      margin: 0 auto;
      padding-top: 58PX;
      box-sizing: border-box;
      .partition {
        position: relative;
        left: 14PX;
        height: 100%;
        width: 58%;
        margin-top: 22PX;
        a {
          position: absolute;
          width: 260PX;
          height: 112PX;
          img {
            opacity: 0;
          }
        }
      }

      .lately {
        width: 39%;
        height: calc(100% + 14PX);
        margin-top: -14PX;
        li {
          height: 120PX;
          margin-bottom: 12PX;
          cursor: pointer;
          &:last-child {
            margin-bottom: 0;
          }
          &:first-child {
            margin-top: 22PX;
          }
          a {
            display: block;
            height: 100%;
          }
        }
      }
    }
  }

  // 热门推荐
  .hot-recommend {
    height: 1258PX;
    .goods-content {
      width: 936PX;
      margin: 0 auto;
      padding-top: 56PX;
      a {
        &.no-margin-right {
          margin-right: 0 !important;
        }
        display: inline-block;
        width: 177PX;
        height: 268PX;
        margin-top: 12PX;
        margin-right: 12PX;
      }
    }
  }
}
</style>
