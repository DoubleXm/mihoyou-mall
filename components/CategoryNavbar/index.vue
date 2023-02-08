<script setup lang="ts">
import type { Swiper } from 'swiper/types'
import { Navigation } from 'swiper'
import type { CategoryListItem, CategoryListResult } from '~/apis/common/typing'

import { getCategoryList } from '~/apis/common'
import 'swiper/css'
import 'swiper/css/navigation'

const route = useRoute()
const router = useRouter()

const categroyList = ref<CategoryListResult['data']['list'][]>([])
const menuSelectedKey = ref<string>('')
const currentSelectedMenuItem = ref<CategoryListItem | undefined>(undefined)

// shop_code 参数
const shopCodeParam = computed(() => {
  const key = route.path.match(/[^\/][^$\/]+/) as RegExpMatchArray
  return Array.isArray(key) ? key[0] : ''
})

/**
 * 获取分类列表数据
 */
const queryCategoryList = async () => {
  const result = await getCategoryList(shopCodeParam.value)

  if (result.retcode !== 0) {
    ElMessage.error(result.message)
    return
  }

  // 一维数组转换成二维数组
  categroyList.value = arrayDimensionalTransform(result.data.list as unknown as any, 8)
  const allGoods = {
    name: '全部商品',
    id: 0,
    child: [],
  }
  categroyList.value[0].unshift(allGoods)
  // 每个数组最后一个删除，最为下一个数组的第一个
  for (let i = 0; i < categroyList.value.length; i++) {
    if (categroyList.value[i + 1]) {
      const temp = categroyList.value[i].splice(categroyList.value[i].length - 1, 1)
      categroyList.value[i + 1].unshift(...temp)
    }
  }
}

/**
 * 菜单点击
 */
const menuItemClick = (item: CategoryListItem) => {
  // 递归菜单无法获取到对应的信息，需要重新找一遍
  // 目前来看接口一共就返回两层，后续如果增加这里要更改成递归，暂时就这样吧。
  nextTick(() => {
    if (menuSelectedKey.value === item.id.toString()) {
      currentSelectedMenuItem.value = item
      router.push({ name: 'shop-goods' })
    }
    else {
      currentSelectedMenuItem.value = item.child.find(item => item.id.toString() === menuSelectedKey.value)
      router.push({ name: 'shop-goods', query: { categoryId: currentSelectedMenuItem.value?.id } })
    }
  })
}

/**
 * 菜单选择
 */
const menuSelectHandler = (key: string) => menuSelectedKey.value = key

;(async () => {
  await queryCategoryList()
})()
</script>

<template>
  <Swiper
    v-if="categroyList.length"
    ref="swiperRef"
    :modules="[Navigation]"
    navigation
    class="category-navbar"
  >
    <SwiperSlide v-for="(item, index) in categroyList" :key="index" class="shop-dorpdown">
      <div class="swiper-container">
        <ClientOnly>
          <ElMenu
            router
            mode="horizontal"
            @select="menuSelectHandler"
          >
            <CategoryNavbarMenu :menu-list="item" @menu-item-click="menuItemClick" />
          </ElMenu>
        </ClientOnly>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss">
.category-navbar {
  position: relative;
  height: 44PX;
  .swiper-slide {
    .swiper-container {
      display: flex;
      align-items: center;
      padding: 0 84PX;
      background-color: var(--el-color-white);

      .el-menu {
        .el-menu-item,
        .el-sub-menu {
          justify-content: flex-start;
          width: 140PX;
          height: 36PX;
          margin-bottom: 6PX;
          padding: 0;
          box-sizing: border-box;
          border-radius: 6PX;
        }

        .el-menu-item {
          margin-bottom: 4PX;
          padding: 0 10PX;
        }

        .el-sub-menu {
          &:hover {
            background-color: var(--el-menu-hover-bg-color);
            .el-sub-menu__title {
              &:hover {
                background-color: transparent;
              }
              color: var(--el-color-primary);
              i {
                color: var(--el-color-primary);
              }
            }
          }
        }
      }
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    display: block;
    position: absolute;
    top: 40%;
    z-index: 3001;
    transform: translateY(-50%);
    width: 20PX;
    height: 20PX;
    margin-top: 0;
    margin-bottom: 6PX;
    text-align: center;
    border-radius: 50%;
    background-color: var(--el-color-info-light-5);
    cursor: pointer;
    &::after {
      font-size: 10PX;
      font-weight: 700;
      color: var(--el-color-white);
    }
    &:hover {
      background-color: var(--el-color-primary);
    }
  }

  .swiper-button-prev {
    left: var(--swiper-navigation-sides-offset, 60PX)
  }
  .swiper-button-next {
    right: var(--swiper-navigation-sides-offset, 200PX);
  }
  // 只显示一个分页器
  .swiper-button-disabled {
    display: none;
  }
}
</style>
