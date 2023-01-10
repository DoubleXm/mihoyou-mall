<script setup lang="ts">
import type { ShopList, ShopListItem } from '~/apis/common/typing'

import { getShopList } from '~/apis/common'

const route = useRoute()

const shopList = ref<ShopList['data']['list']>([])
const menuSelectedItem = ref<ShopListItem | undefined>(undefined)
// const footerAuthInfo = reactive([
//   { src: import('~/assets/images/footer-auth/license.webp'), alt: '电子营业执照' },
//   { src: '~/assets/images/footer-auth/report-1.webp', alt: '上海市互联网违法和不良信息举报中心' },
//   { src: '~/assets/images/footer-auth/report-2.webp', alt: '上海市互联网违法和不良信息举报中心' },
//   { src: '~/assets/images/footer-auth/report-3.webp', alt: '违法和不良信息举报中心' },
// ])
const footerLinks = reactive([
  { link: '/', target: '_self', text: '首页', className: '' },
  { link: '#', target: '_blank', text: '隐私政策', className: 'protocol' },
  { link: '#', target: '_blank', text: '商城服务协议', className: 'protocol' },
  { link: '#', target: '_blank', text: '加入我们', className: 'protocol' },
])

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

      <footer>
        <div class="footer-l">
          <img src="~/assets/images/footer-logo.webp" alt="footer-logo">
        </div>

        <div class="footer-r">
          <ul class="footer-link">
            <li v-for="item in footerLinks" :key="item.text">
              <NuxtLink :to="item.link" :target="item.target">
                {{ item.text }}
              </NuxtLink>
            </li>
          </ul>
          <div class="copyright">
            <p>© 2021 米哈游版权所有｜ <a href="#">沪公网安备31010402009928号</a> ｜ <a href="#">沪ICP备2021018283号-2</a> </p>
            <p>沪网文〔2021〕3859-324号｜增值电信业务经营许可证：沪B2-20220200 </p>
            <p>互联网违法不良信息举报电话：021-34203135（工作时间：每天10点-20点）｜互联网违法不良信息举报邮箱：tousu@mihoyo.com</p>
            <p>亲爱的市民朋友，上海警方反诈劝阻电话“962110”系专门针对避免您财产被骗受损而设，请您一旦收到来电，立即接听。</p>
          </div>
          <div class="footer-auth">
            <a href="#">
              <img src="~/assets/images/footer-auth/license.webp" alt="电子营业执照">
            </a>
            <a href="#">
              <img src="~/assets/images/footer-auth/report-1.webp" alt="上海市互联网违法和不良信息举报中心">
            </a>
            <a href="#">
              <img src="~/assets/images/footer-auth/report-2.webp" alt="上海市互联网违法和不良信息举报中心">
            </a>
            <a href="#">
              <img src="~/assets/images/footer-auth/report-3.webp" alt="违法和不良信息举报中心">
            </a>
          </div>
        </div>
      </footer>
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

  .page-container {
    min-height: 100vh;
    margin-bottom: calc(179.5px + 44px);
  }

  footer {
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 22px 0;
    background-color: var(--el-color-white);
    .footer-l {
      width: 166px;
      height: 60px;
      margin-left: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .footer-r {
      margin-left: 97px;
      a {
        font-size: 12px;
        color: var(--el-text-color-primary);
        text-decoration: none;
        &:hover {
          color: var(--footer-link-hover-color) !important;
        }
      }
      .footer-link {
        display: flex;
        li {
          position: relative;
          margin-left: 36px;
          line-height: 18px;
          &:first-child {
            margin-left: 0;
          }
          &.protocol::before {
            content: "";
            position: absolute;
            left: -17px;
            top: 60%;
            margin-top: -6px;
            display: inline-block;
            width: 1px;
            height: 12px;
            background-color: #eff1f4;
          }
        }
      }
      .copyright {
        margin: 20px 0;
        line-height: 18px;
        font-size: 12px;
        color: var(--el-text-color-placeholder);
        a {
          color: var(--el-text-color-placeholder);
        }
      }
      .footer-auth {
        a {
          width: 116px;
          height: 48.5px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
