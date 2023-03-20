<script setup lang="ts"></script>

<template>
  <div class="shop-cart__page">
    <section class="shop-cart__header cart-flex">
      <div class="cart-flex__item" />
      <div class="cart-flex__item">商品信息</div>
      <div class="cart-flex__item">单价</div>
      <div class="cart-flex__item">数量</div>
      <div class="cart-flex__item">金额</div>
      <div class="cart-flex__item">操作</div>
    </section>

    <section class="shop-cart__main">
      <div v-for="item in 5" :key="item" class="goods-row__item cart-flex">
        <div class="cart-flex__item goods_checkbox">
          <ElCheckbox />
        </div>
        <div class="cart-flex__item goods_desc">
          <ClientOnly>
            <ElPopover placement="right" :width="240" trigger="hover" popper-class="goods-image__popover">
              <template #reference>
                <ElImage fit="cover" />
              </template>

              <ElImage fit="cover" class="goods-hover__image " />
            </ElPopover>
          </ClientOnly>

          <div class="goods_desc-content">
            <NuxtLink>
              <h3>【原神】蒙德城主题系列 人物亚克力立牌 Genshin</h3>
            </NuxtLink>
            <span>迪奥娜</span>
          </div>
        </div>
        <div class="cart-flex__item">
          ￥49.90
        </div>
        <div class="cart-flex__item goods_number">
          <ElInputNumber size="small" />
        </div>
        <div class="cart-flex__item goods_price ">
          ￥100.00
        </div>
        <div class="cart-flex__item goods_action">
          <i class="iconfont icon-shanchu" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.shop-cart__page {
  margin: 20PX 10PX 0 10PX;
  .shop-cart__header {
    margin-bottom: 8PX;
    padding: 20PX 30PX;
    background-color: var(--el-color-white);
    border-radius: 8PX;
    color: var(--el-color-info-light-3);
  }

  .shop-cart__main {
    background-color: var(--el-color-white);
    border-radius: 8PX;
    .goods-row__item {
      position: relative;
      padding: 12PX 30PX;
      &:last-child {
        &::after {
          height: 0;
        }
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        height: 1PX;
        width: calc(100% - 164PX - 60PX);
        margin-left: 164PX;
        background-color: var(--el-color-info-light-7);
      }
    }
    .goods_checkbox {
      text-align: left !important;
      .el-checkbox__inner {
        width: 20PX;
        height: 20PX;
      }
    }
    .goods_desc {
      display: flex;
      .el-image {
        width: 98PX;
        height: 98PX;
        margin-right: 24PX;
        border-radius: 10PX;
        border: 1PX solid var(--el-color-info-light-3);
      }

      .goods_desc-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h3 {
          width: 350PX;
          font-size: 16PX;
        }
        span {
          line-height: 20PX;
          color: var(--el-color-info-light-3);
        }
      }
    }
    .goods_number {
      .el-input-number {
          width: 96PX;
          height: 30PX;
          .el-input-number__increase,
          .el-input-number__decrease {
            background-color: var(--el-color-white);
          }
          .el-input__wrapper {
            width: 50PX;
            padding: 2PX 34PX;
            &.is-focus {
              box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
            }
          }
        }
    }
    .goods_price {
      color: var(--el-color-primary);
    }
    .goods_action {
      cursor: pointer;
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  .cart-flex {
    display: flex;
    align-items: center;
    .cart-flex__item {
      width: 150PX;
      line-height: 22PX;
      text-align: center;
      &:nth-child(1) {
        width: 40PX;
      }
      &:nth-child(2) {
        flex: 1;
        text-align: left;
      }
    }
  }
}

.goods-image__popover {
  width: auto !important;
  padding: 0 !important;
  line-height: 10PX !important;
  .goods-hover__image {
    width: 240PX;
    height: 240PX;
  }
}
</style>
