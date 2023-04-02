<script setup lang="ts">
import type { OrderListItem } from '~/apis/common/typing'

defineProps<{
  order: OrderListItem
}>()

const getOrderStautsTextOrStyleMap = (status: number) => {
  switch (status) {
    case 1:
      return {
        color: 'var(--el-color-primary)',
        title: '待付款',
      }
    case 400:
      return {
        color: 'var(--el-color-info)',
        title: '交易关闭',
      }
  }
}
</script>

<template>
  <section class="uer-order-item">
    <div class="user-order-item__header">
      <i class="iconfont icon-dianpu" />
      <h3>
        <NuxtLink :to="{ name: 'shop', params: { shop: order.shop.shop_code } }" target="_blank">
          {{ order.shop.shop_name }}
        </NuxtLink>
      </h3>
      <h4
        :style="
          { color: getOrderStautsTextOrStyleMap(order.status)?.color }
        "
      >
        {{ getOrderStautsTextOrStyleMap(order.status)?.title }}
      </h4>
    </div>

    <div class="user-order-item__content">
      <div
        v-for="item in order.goods_list"
        :key="item.meta_info.goods_id"
        class="shop-order-list__item"
        :class="order.goods_list.length > 1 ? 'border' : ''"
      >
        <div :class="item.meta_info.is_gift ? 'gave-goods' : ''">
          <ElImage :src="item.meta_info.cover_url" />
        </div>
        <div class="goods-name">
          <h5>
            <NuxtLink :to="{ name: 'goods-id', params: { id: item.meta_info.goods_id } }" target="_blank">
              {{ item.meta_info.goods_name }}
            </NuxtLink>
          </h5>
          <template v-if="item.meta_info.sku_sales.length">
            <span>{{ item.meta_info.sku_sales[0].attr_value }}</span>
          </template>
        </div>
        <div class="signle-price">￥{{ (item.meta_info.price / 100).toFixed(2) }}</div>
        <div class="goods-count">×{{ item.meta_info.quantity }}</div>
        <template v-if="!item.meta_info.is_gift">
          <div class="total-price">
            <em
              :style="{
                color: getOrderStautsTextOrStyleMap(order.status)?.color,
              }"
            >
              ￥{{ (order.order_amount / 100).toFixed(2) }}
            </em> <br>
            <span>包邮</span>
          </div>
          <div
            class="order-detail-content"
            style="display: flex; flex-direction: column;"
          >
            <template v-if="order.status === 1">
              <ElButton type="primary" plain>付款</ElButton>
            </template>
            <NuxtLink class="order-detail" :to="{ name: 'order-id', params: { id: order.order_no } }">订单详情</NuxtLink>
          </div>
        </template>
        <template v-else>
          <!-- 占位 -->
          <div class="total-price" />
          <NuxtLink class="order-detail" />
        </template>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.uer-order-item {
  padding: 0 30PX;
  border-radius: 8PX;
  background-color: var(--el-color-white);
  .user-order-item__header {
    display: flex;
    padding-top: 24PX;
    line-height: 24PX;
    i {
      font-size: 22PX;
      color: var(--el-color-primary);
    }
    h3 {
      padding: 0 8PX;
      font-size: 18PX;
      a {
        text-decoration: none;
        color: var(--el-color-black);
        font-weight: bold;
        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
    h4 {
      font-size: 16PX;
      font-weight: bold;
      color: var(--el-color-info);
    }
  }

  .shop-order-list__item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 24PX 0;
    .gave-goods {
      position: relative;
      ::after {
        content: "赠";
        position: absolute;
        top: -1PX;
        right: 0;
        padding: 1PX 3PX 2PX 5PX;
        border-radius: 0 8PX 0 8PX;
        font-size: 10PX;
        color: #ff8b0c;
        background-color: #fffae4;
      }
    }
    .el-image {
      width: 100PX;
      height: 100PX;
    }
    .goods-name {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 24PX;
      padding-top: 8PX;
      h5 {
        flex: 1;
        a {
          display: block;
          height: 68PX;
          font-size: 16PX;
          line-height: 22PX;
          color: var(--el-color-black);
          &:hover {
            color: var(--el-color-primary);
          }
        }
      }
      span {
        padding-top: 4PX;
        line-height: 20PX;
        color: var(--el-color-info);
      }
    }
    .signle-price {
      width: 146PX;
      color: var(--el-color-black);
    }
    .goods-count {
      width: 72PX;
    }
    .total-price {
      width: 146PX;
      font-size: 16PX;
      font-weight: bold;
      color: var(--el-color-info);
      span {
        font-weight: normal;
        font-size: 12PX;
      }
    }
    .order-detail-content {
     .el-button {
      width: 102PX;
      margin-left: 15PX;
      margin-bottom: 10PX;
      color: var(--el-color-primary);
      background-color: var(--el-color-white);
      border-width: 3PX;
      border-radius: 8PX;
      border-color: var(--el-color-primary);
      &:hover {
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);
      }
     }
    }
    .order-detail {
      width: 132PX;
      color: #519bde;
    }

    .signle-price,
    .goods-count,
    .total-price,
    .order-detail {
      text-align: center;
    }

    &.border {
      &::after {
        content: "";
        position: absolute;
        width: calc(100% - 402PX);
        height: 1PX;
        bottom: 0;
        left: 124PX;
        background-color: var(--el-color-info-light-7);
      }
    }
  }

  a {
    text-decoration: none;
  }
}
</style>
