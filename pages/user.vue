<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { getUserInfo } from '~/apis/common'
import type { UserInfoResult } from '~/apis/common/typing'

const userInfo = ref<UserInfoResult['data']>()
const menuList = ref([
  { text: '我的订单', name: 'user-order', icon: 'icon-dingdan' },
  { text: '退款售后', name: 'user-service', icon: 'icon-shouhouwuyou' },
  { text: '优惠券', name: 'user-coupon', icon: 'icon-wodeyouhuiquan' },
  {
    text: '地址管理',
    target: 'https://user.mihoyogift.com/address-management-pc.html?disableDetectDevice=1&theme=mall#/',
    icon: 'icon-dizhi',
  },
])

const queryUserInfo = async () => {
  const result = await getUserInfo()

  if (result.retcode !== 0) {
    ElMessage.error(result.message)
    return
  }
  userInfo.value = result.data
}

queryUserInfo()
</script>

<template>
  <div class="user__page">
    <ElBreadcrumb :separator-icon="ArrowRight">
      <ElBreadcrumbItem to="/">首页</ElBreadcrumbItem>
      <ElBreadcrumbItem class="current-breadcrumb" to="/user/order">个人中心</ElBreadcrumbItem>
    </ElBreadcrumb>

    <div class="user-info-content">
      <el-avatar :size="76" :src="userInfo?.avatar_url" />
      <div class="user">
        <p class="user-name">{{ userInfo?.nickname }}</p>
        <p class="user-id">AID: {{ userInfo?.uid }}</p>
      </div>
    </div>

    <div class="user-order__container">
      <div class="l-menu">
        <h3>
          <i class="iconfont icon-gerenzhongxin" />
          个人中心
        </h3>
        <ul>
          <li v-for="item in menuList" :key="item.icon">
            <i class="iconfont" :class="item.icon" />
            <NuxtLink v-if="item.name" :to="{ name: item.name }">{{ item.text }}</NuxtLink>
            <NuxtLink v-else :to="item.target" target="_blank">{{ item.text }}</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="r-content">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.user__page{
  width: 1260PX;
  margin: 0 auto;

  .user-info-content {
    display: flex;
    align-items: center;
    padding: 24PX 30PX;
    border-radius: 8PX;
    background-color: var(--el-color-white);
    .user {
      margin-left: 24PX;
      line-height: 24PX;
      .user-name {
        font-size: 18PX;
        color: var(--el-color-black);
      }
      .user-id {
        margin-top: 6PX;
        font-size: 16PX;
        color: var(--el-color-info);
      }
    }
  }

  .user-order__container {
    display: flex;
    margin-top: 24PX;
    .l-menu {
      align-self: baseline;
      margin-right: 30PX;
      padding: 24PX 30PX 0 30PX;
      border-radius: 8PX;
      background-color: var(--el-color-white);
      h3 {
        font-size: 18PX;
        color: var(--el-color-black);
        i {
          font-size: 18PX;
          color: var(--el-color-primary);
        }
      }
      ul {
        padding: 24PX 0;
        li {
          width: 150PX;
          line-height: 20PX;
          margin-top: 24PX;
          &:first-child {
            margin-top: 0;
          }
          &:hover {
            color: var(--el-color-primary);
            a {
              color: var(--el-color-primary);
            }
          }
          a {
            padding-left: 10PX;
            color: var(--el-text-color-primary);
            text-decoration: none;
          }
        }
      }
    }
    .r-content {
      flex: 1;
      min-height: 400PX;
      border-radius: 8PX;
    }
  }

  // order 下所有的 ElTabs 样式重写 及通用样式
  .menu-content {
    h3.menu-content__title {
      padding: 24PX 30PX 0;
      font-size: 18PX;
      line-height: 24PX;
      font-weight: bold;
      color: var(--el-color-black);
      background-color: var(--el-color-white);
      border-top-right-radius: 8PX;
      border-top-left-radius: 8PX;
    }

    .el-tabs {
      .el-tabs__header {
        padding: 12PX 30PX;
        margin: 0;
        border-bottom: 1PX solid var(--el-color-info-light-7);
        background-color: var(--el-color-white);
        .el-tabs__nav-wrap {
          &::after {
            display: none;
          }
          .el-tabs__active-bar {
            display: none;
          }
          .el-tabs__item {
            height: 44PX;
            padding: 0;
            font-size: 14PX;
            line-height: 44PX;
            font-weight: normal;
            &:not(:nth-child(2)) {
              margin-left: 42PX;
            }
          }
        }
      }
    }
  }
}
</style>
