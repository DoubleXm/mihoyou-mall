import { defineStore } from 'pinia'

import type { ShopListItem } from '~/apis/common/typing'

export const useShopStore = defineStore({
  id: 'shop-store',
  state: () => (({
    shop: {
      shop_code: '',
      shop_name: '',
      icon_m_inactive: '',
      icon_m: '',
      icon: '',
    },
  })),
  getters: {
    shopCode: store => store.shop.shop_code.replace(/\//, ''),
  },
  actions: {
    setShopInfo(shopInfo: ShopListItem) {
      this.shop = shopInfo
    },
  },
  persist: true,
})
