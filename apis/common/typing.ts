import type { CommonResult } from '../typing'

export interface ShopList extends CommonResult {
  data: {
    list: ShopListItem[]
  }
}

export interface ShopListItem {
  shop_code: string
  shop_name: string
  icon_m_inactive: string
  icon_m: string
  icon: string
}

