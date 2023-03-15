import { defineStore } from 'pinia'
import { getUserShopCardNum, postGoodsToShopCard } from '~/apis/common'

import type { AddGoodsToCardPayload } from '~/apis/common/typing'

export const useGoodsCardStore = defineStore({
  id: 'goods-card-store',
  state: () => (({
    goodsCard: {
      counter: 0,
    },
  })),
  getters: {
    getGoodsCardCounter: state => state.goodsCard.counter,
  },
  actions: {
    /**
     * @description 获取购物车商品数量
     */
    async queryGoodsCard() {
      const result = await getUserShopCardNum()

      if (result.retcode !== 0) {
        ElMessage.error(result.message)
        return
      }
      this.goodsCard.counter = result.data.num
    },
    /**
     * @description 加入购物车
     */
    async addToGoodsCard(playload: AddGoodsToCardPayload) {
      const result = await postGoodsToShopCard(playload)

      if (result.retcode !== 0) {
        ElMessage.error(result.message)
        return
      }
      this.queryGoodsCard()
    },
  },
  persist: true,
})
