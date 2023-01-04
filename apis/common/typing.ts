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

export interface SearchSuggestionResult extends CommonResult {
  data: {
    keyword: string
  }
}

export interface SearchHotwordResult extends CommonResult {
  data: {
    list: SearchHotwordItem[]
  }
}

export interface SearchHotwordItem {
  id: string
  shop_code: string
  text: string
}
