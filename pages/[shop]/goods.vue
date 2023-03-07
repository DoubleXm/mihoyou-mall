<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { getSpuGoodsList } from '~/apis/common'

import type { CategoryListResult, SpuGoodsListItem, SpuGoodsListParams } from '~/apis/common/typing'

interface BreadcrumbItem {
  text: string
  to: Record<string, any>
  className?: string
}

interface TabItem {
  name: string
  text: string
  query: string
}

const router = useRouter()
const route = useRoute()

const shopName = computed(() => route.params.shop as string)
const categoryId = computed(() => route.query.categoryId as string)
const order = computed(() => route.query.order as string)

const category = ref<CategoryListResult['data']['list'][]>([])
const breadcrumbList = ref<BreadcrumbItem[]>([])
const tabItemEleRef = ref<HTMLDivElement[] | null>(null)
const tabList = ref<TabItem[]>([
  { name: 'online_time', text: '新上市', query: 'online_time' },
  { name: 'sold_num', text: '畅销', query: 'sold_num' },
  { name: 'price', text: '价格', query: '-price' },
])

const fiterGoodsListParam = ref<SpuGoodsListParams>({
  shop_code: shopName.value ? shopName.value : '',
  hide_sold_out: false,
  show_sale_type: 1,
  category_id: categoryId.value ? categoryId.value : '',
  order_by: order.value ? order.value : '',
  page: 1,
  limit: 40,
})
const goodsList = ref<SpuGoodsListItem[]>([])
const goodsListCount = ref(0)

watch(
  () => route.query.categoryId,
  () => {
    // 重置数据在获取
    breadcrumbList.value = []
    getCategoryList(category.value)

    getSpuGoodsList()
  },
)

onMounted(() => {
  // 如果有 order 就初始化当前选中的样式
  if (order.value) {
    tabItemEleRef.value?.forEach((ele) => {
      if (tabList.value.find(i => i.query === order.value)?.text === ele.innerText)
        ele.classList.add('current__tab-item')

      else ele.classList.remove('current__tab-item')
    })
  }
})

/**
 * @description 获取面包导航需要的数据（数据处理辅助函数）
 */
function recursionHelper(categoryList: CategoryListResult['data']['list']) {
  for (let i = 0; i < categoryList.length; i++) {
    if (categoryList[i].id.toString() === categoryId.value) {
      breadcrumbList.value.push({
        text: categoryList[i].name,
        to: { name: 'shop-goods', query: { categoryId: categoryList[i].id } },
      })
      break
    }
    if (categoryList[i].child.length)
      recursionHelper(categoryList[i].child)
  }

  if (breadcrumbList.value.length >= 1) {
    for (let i = 0; i < categoryList.length; i++) {
      if (categoryList[i].child.find(i => i.name === breadcrumbList.value[breadcrumbList.value.length - 1].text)) {
        breadcrumbList.value.unshift({
          text: categoryList[i].name,
          to: { name: 'shop-goods', query: { categoryId: categoryList[i].id } },
        })
        break
      }
    }
  }
}

/**
 * @description 获取面包导航需要的数据
 */
function getCategoryList(categoryList: CategoryListResult['data']['list'][]) {
  category.value = categoryList

  if (!categoryId.value) {
    breadcrumbList.value.push({ text: '首页', to: { name: 'index' } })
    breadcrumbList.value.push({ text: '全部商品', to: { name: 'shop-goods' }, className: 'current-breadcrumb' })
    return
  }

  for (let i = 0; i < categoryList.length; i++)
    recursionHelper(categoryList[i])

  breadcrumbList.value.unshift({ text: '首页', to: { name: 'index' } })
  // 当前选中的文字颜色类名
  breadcrumbList.value[breadcrumbList.value.length - 1].className = 'current-breadcrumb'
}

/**
 * @description 查询商品分类数据
 */
async function queryOrderGoodsList(tabItem: TabItem) {
  const lastTab = tabList.value[tabList.value.length - 1]
  switch (order.value) {
    case '-price':
      lastTab.query = 'price'
      break
    case 'price':
      lastTab.query = '-price'
      break
  }

  router.push({ name: 'shop-goods', query: { categoryId: categoryId.value, order: tabItem.query } })

  nextTick(() => {
    // 控制当前选中的样式
    tabItemEleRef.value?.forEach((ele) => {
      if (ele.innerText === tabItem.text)
        ele.classList.add('current__tab-item')

      else ele.classList.remove('current__tab-item')
    })
  })

  await queryGoodsList()
}

/**
 * @description 查询商品数据
 */
async function queryGoodsList() {
  const result = await getSpuGoodsList(fiterGoodsListParam.value)

  if (result.retcode !== 0) {
    ElMessage.error(result.message)
    return
  }

  goodsList.value = result.data.list
  goodsListCount.value = result.data.count
}

/**
 * @description 页码更改
 */
async function goodsCurrentChange(page: number) {
  fiterGoodsListParam.value.page = page

  await queryGoodsList()
}

/**
 * @description 前往商品详情页
 */
function goToGoodsDetail(goods: SpuGoodsListItem) {
  const routeUrl = router.resolve({ name: 'goods-id', params: { id: goods.goods_id } })
  window.open(routeUrl.href, '_blnk')
}

(async () => {
  await queryGoodsList()
})()
</script>

<template>
  <div class="goods-list-page">
    <CategoryNavbar @get-category-list="getCategoryList" />

    <div class="goods-list-content">
      <!-- 面包屑 -->
      <ElBreadcrumb :separator-icon="ArrowRight">
        <ElBreadcrumbItem
          v-for="item in breadcrumbList"
          :key="item.text"
          :to="item.to"
          :class="item.className"
        >
          {{ item.text }}
        </ElBreadcrumbItem>
      </ElBreadcrumb>
      <!-- tab 栏 -->
      <div class="filter-tab">
        <div
          v-for="item in tabList"
          :key="item.name"
          ref="tabItemEleRef"
          class="tab-item"
          :class="[item.name === 'sold_num' ? 'tab-item__center' : '']"
          @click="queryOrderGoodsList(item)"
        >
          {{ item.text }}

          <span
            v-if="item.query.includes('price')"
            class="icons"
            :class="[item.query.includes('price') ? 'selected-price' : '']"
          >
            <i class="iconfont icon-jiantouyou" :class="item.query === '-price' ? 'order-desc' : ''" />
            <i class="iconfont icon-jiantouyou" :class="item.query === 'price' ? 'order-asc' : ''" />
          </span>
        </div>
      </div>

      <div class="goods-container">
        <section v-if="goodsList.length" class="goods-list">
          <template v-for="(item, index) in goodsList" :key="index">
            <GoodsCard :goods="item" :style="{ marginRight: (index + 1) % 4 === 0 ? 0 : '24PX' }" @click="goToGoodsDetail(item)" />
          </template>
        </section>
        <template v-else>
          <GoodsLoading />
        </template>

        <div class="paging">
          <ElPagination
            :page-size="fiterGoodsListParam.limit"
            background
            layout="prev, pager, next"
            :total="goodsListCount"
            @current-change="goodsCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.goods-list-page {
  .goods-list-content {
    width: 1260PX;
    margin: 0 auto;

    .el-menu-item {
      .is-active {
        color: var(--el-text-color-primary) !important;
      }
    }

    .el-breadcrumb {
      padding: 12PX 30PX;
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          line-height: 20PX;
          &:hover {
            color: var(--el-color-primary);
            cursor: pointer;
          }
          font-weight: normal;
          color: var(--el-text-color-regular);
        }
      }
      .current-breadcrumb {
        .el-breadcrumb__inner {
          color: var(--el-color-primary);
        }
      }
    }

    .filter-tab {
      display: flex;
      align-items: center;
      height: 64PX;
      background-color: var(--el-color-white);
      color: var(--el-text-color-primary);
      font-size: 14PX;
      border-radius: 6PX;
      .tab-item {
        display: flex;
        align-items: center;
        padding: 0 30PX;
        &:hover {
          cursor: pointer;
        }
        // 中间的 tab-item
        &.tab-item__center {
          position: relative;
          &::after,
          &::before {
            content: '';
            position: absolute;
            height: 14PX;
            width: 1PX;
            background-color: var(--el-color-info-light-7);
          }
          &::after {
            right: 0;
          }
          &::before {
            left: 0;
          }
        }
        .icons {
          display: flex;
          flex-direction: column;
          .iconfont {
            height: 6PX;
            font-size: 10PX;
            padding-left: 4PX;
            color: var(--el-color-info-light-5);
            &:nth-child(1) {
              transform: rotate(-90deg) scale(0.6);
            }
            &:nth-child(2) {
              transform: rotate(90deg) scale(0.6) translateY(-7PX);
            }
          }
        }

        // 当前选中的 tab-item
        &.current__tab-item {
          color: var(--el-color-primary);
          .selected-price {
            .iconfont {
              &:nth-child(1) {
                transform: rotate(-90deg) scale(.8);
              }
              &:nth-child(2) {
                transform: rotate(90deg) scale(.8) translateY(-7PX);
              }
              &.order-desc,
              &.order-asc {
                color: var(--el-color-primary) !important;
              }
            }
          }
        }
      }
    }

    .goods-container {
      background-color: var(--el-color-white);
      margin-bottom: 30PX;
      padding: 24PX 30PX;
      margin-top: 10PX;
      .paging {
        display: flex;
        justify-content: center;
        align-items: center;
        button, li {
          border-radius: 6PX;
        }
        button[aria-disabled=true] {
          display: none;
        }
      }
    }
    .goods-list {
      display: flex;
      flex-wrap: wrap;
      border-radius: 6PX;
      box-sizing: border-box;
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
  }
}
</style>
