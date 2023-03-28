<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'

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
</script>

<template>
  <div class="user__page">
    <ElBreadcrumb :separator-icon="ArrowRight">
      <ElBreadcrumbItem to="/">首页</ElBreadcrumbItem>
      <ElBreadcrumbItem class="current-breadcrumb" to="/user/order">个人中心</ElBreadcrumbItem>
    </ElBreadcrumb>

    <div class="user-info-content">
      <el-avatar :size="76" src="" />
      <div class="user">
        <p class="user-name">onePeople</p>
        <p class="user-id">AID: 357733426</p>
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
        <NuxtPage name="user-order" />
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
      background-color: var(--el-color-white);
    }
  }
}
</style>
