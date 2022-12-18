<script setup lang="ts">
import { ElAvatar } from 'element-plus'
import { getShopList } from '~~/apis/common'
import type { ShopList } from '~~/apis/common/typing'

/**
 * 获取商品列表数据
 */
const shopList = ref<ShopList['data']['list']>([])
const queryShopList = async () => {
  const { data, error } = await useHttp<ShopList>(getShopList())

  if (error.value) {
    ElMessage.error(error.value.toString())
    return
  }

  shopList.value = data.value!.data.list
}

await queryShopList()

/**
 * Dropdown
 */
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="container">
    <ElConfigProvider size="large" :z-index="3000">
      <header>
        <div class="header-l">
          <NuxtLink to="/">
            <img class="" src="~/assets/images/logo.png" alt="logo">
          </NuxtLink>
          <div class="shop-list__divider" />
          <div class="shop-dropdown">
            <!-- <img src="" alt=""> -->
            <ClientOnly>
              <ElMenu
                class="shop-dropdown__menu"
                :default-active="activeIndex"
                mode="horizontal"
                @select="handleSelect"
              >
                <ElSubMenu
                  index="1"
                >
                  <template #title>
                    选择店铺
                    <i class="iconfont icon-arrow-down-filling" />
                  </template>
                  <ElMenuItem v-for="(item, index) in shopList" :key="item.shop_code" :index="`1-${index}`">
                    {{ item.shop_name }}
                  </ElMenuItem>
                </ElSubMenu>
              </ElMenu>
            </ClientOnly>
          </div>
        </div>

        <div class="header-r">
          <ElInput>
            <template #append>
              <i class="iconfont icon-search" />
            </template>
          </ElInput>

          <ElAvatar>User</ElAvatar>

          <div class="goods-card">
            <i class="iconfont icon-shop-cart-" />
            <span>购物车</span>
          </div>
        </div>
      </header>

      <main class="container">
        <slot />
      </main>
    </ElConfigProvider>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
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
      align-items: center;

      ::v-deep(.el-input) {
        :hover {
          color: var(--el-color-info);
          .el-input-group__append {
            border: 1px solid var(--el-color-info);
            border-left: 0;
            box-shadow: none;
          }
        }

        .el-input__wrapper {
          box-sizing: border-box;
          &:hover {
            +.el-input-group__append {
              box-shadow: 0 1px 0 0 var(--el-input-hover-border-color) inset, 0 -1px 0 0 var(--el-input-hover-border-color) inset, -1px 0 0 0 var(--el-input-hover-border-color) inset;
            }
          }
          &.is-focus {
            box-shadow: 0 0 0 1px var(--el-color-info, var(--el-color-info)) inset;
            +.el-input-group__append {
              box-shadow: 0 1px 0 0 var(--el-color-info) inset, 0 -1px 0 0 var(--el-color-info) inset, -1px 0 0 0 var(--el-color-info) inset;
            }
          }
        }

        .el-input-group__append {
          box-sizing: border-box;
          padding: 0 8px;
          .icon-search {
            font-size: 22px;
          }
        }

      }

      .el-avatar {
        height: 32px;
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
          color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
