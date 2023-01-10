<script setup lang="ts">
import type { ShopList, ShopListItem } from '~/apis/common/typing'

import { getShopList } from '~/apis/common'

const route = useRoute()

const shopList = ref<ShopList['data']['list']>([])
const menuSelectedItem = ref<ShopListItem | undefined>(undefined)

watchEffect(() => {
  if (shopList.value.length && route.path !== '/') {
    const currentMenu = route.path.match(/\/\w+/)
    if (currentMenu?.length)
      menuSelectedItem.value = shopList.value.find(item => item.shop_code === currentMenu[0])
  }

  if (route.path === '/')
    menuSelectedItem.value = undefined
})

/**
 * 获取商品列表数据
 */
const queryShopList = async () => {
  const { data, error } = await useHttp<ShopList>(getShopList)

  if (error.value) {
    ElMessage.error(error.value.toString())
    return
  }

  shopList.value = data.value!.data.list.map(i => ({ ...i, shop_code: `/${i.shop_code}` }))
}

await queryShopList()

/**
 * Dropdown
 */
const menuSelectHandler = (key: string) => {
  menuSelectedItem.value = shopList.value.find(item => item.shop_code === key)
}
</script>

<template>
  <div class="container">
    <ElConfigProvider size="large" :z-index="3000">
      <header>
        <div class="header-l">
          <NuxtLink to="/">
            <img src="~/assets/images/logo.png" alt="logo">
          </NuxtLink>
          <div class="shop-list__divider" />
          <div class="shop-dropdown">
            <ClientOnly>
              <img v-if="menuSelectedItem" :src="menuSelectedItem.icon" :alt="menuSelectedItem.shop_code">
              <ElMenu
                class="shop-dropdown__menu"
                router
                mode="horizontal"
                :default-active="menuSelectedItem?.shop_code"
                @select="menuSelectHandler"
              >
                <ElSubMenu
                  index="1"
                  :popper-offset="-20"
                >
                  <template #title>
                    选择店铺
                    <i class="iconfont icon-arrow-down-filling" />
                  </template>
                  <ElMenuItem
                    v-for="item in shopList"
                    :key="item.shop_code"
                    :index="item.shop_code"
                  >
                    {{ item.shop_name }}
                  </ElMenuItem>
                </ElSubMenu>
              </ElMenu>
            </ClientOnly>
          </div>
        </div>

        <div class="header-r">
          <HeaderSearch />

          <ElAvatar src="/avatar.png" />

          <div class="goods-card">
            <i class="iconfont icon-shop-cart-" />
            <span>购物车</span>
          </div>
        </div>
      </header>

      <main class="page-container">
        <slot />
      </main>
    </ElConfigProvider>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
  min-width: 1280px;
  min-height: 100vh;
  background-color: var(--home-bg-color);
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    height: 100px;
    padding: 0 10px;
    padding-right: 40px;
    font-size: 14px;
    background-color: var(--el-color-white);

    .header-l {
      display: flex;
      flex: 1;
      align-items: center;
      img {
        width: 123px;
        height: 82px;
      }
      .shop-list__divider {
        width: 3px;
        height: 22px;
        margin: 18px;
        border-radius: 1.5px;
        background-color: #f1f1f1;
      }
    }

    .header-r {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      align-items: center;

      .el-avatar {
        border-radius: 50%;
        margin: 0 20px;
        background-color: var(--el-color-info);
        line-height: 32px;
      }

      .goods-card {
        min-width: 66px;
        color: var(--el-color-info);
        i {
          padding-right: 6px;
          font-weight: 500;
          font-size: 18px;
        }
        &:hover {
          cursor: pointer;
          color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
