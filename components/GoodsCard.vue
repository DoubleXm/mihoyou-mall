<script setup lang="ts">
import type { GoodsListItem } from '~/apis/common/typing'

const props = defineProps<{ goods: GoodsListItem }>()

const tagClassName = computed(() => props.goods.tag === 1
  ? 'tag-new'
  : props.goods.tag === 3
    ? 'tag-recommend'
    : props.goods.presale
      ? 'tag-presale'
      : '',
)
</script>

<template>
  <div class="goods-card__item">
    <div
      class="goods-card-img"
      :style="{ background: `url(${goods.cover_url}) center center no-repeat` }"
    />
    <div class="goods-card-content">
      <div class="goods-content-row">
        <h5>
          <div :class="[tagClassName ? `tag ${tagClassName}` : '']" />
          <span>{{ goods.name }}</span>
        </h5>
      </div>
      <div class="goods-price-row">
        <span class="price-currency">￥</span>
        <span class="price-integer">{{ goods.price }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.goods-card__item {
  width: 207.95PX;
  margin-right: 18PX;
  margin-bottom: 18PX;
  background: var(--el-color-white);
  cursor: pointer;
  .goods-card-img {
    width: 100%;
    height: 207.95PX;
    background-size: cover !important;
  }

  .goods-card-content {
    padding: 11PX 15PX 15PX;
    color: var(--el-text-color-primary);
    font-size: 12PX;
    line-height: 18PX;

    .goods-content-row {
      h5 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; //多行在这里修改数字即可
        overflow:hidden;
        /* autoprefixer: ignore next */
        -webkit-box-orient: vertical;
      }
      .tag {
        display: inline-block;
        width: 35.65PX;
        height: 13.37PX;
        margin-right: 4PX;
        background-position: center center;
        background-repeat:  no-repeat;
        background-size: cover;
        vertical-align: text-bottom;
      }
      .tag-new {
        background-image: url(~/assets/images/goods/goods-state-new.png);
      }
      .tag-recommend {
        background-image: url(~/assets/images/goods/goods-state-recommend.png);
      }
      .tag-presale {
        background-image: url(~/assets/images/goods/goods-state-presale.png);
      }
    }

    .goods-price-row {
      margin-top: 10PX;
      padding-right: 2PX;
      color: var(--el-color-primary);
      font-weight: 700;
      .price-integer {
        font-size: 16PX;
      }
    }
  }
}
</style>
