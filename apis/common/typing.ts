import type { CommonResult } from '../typing'

/**
 * 店铺列表
 */
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

/**
 * 搜索关键字
 */
export interface SearchSuggestionResult extends CommonResult {
  data: {
    keyword: string
  }
}

/**
 * 搜索关键字列表
 */
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

/**
 * 商品分类列表
 */
export interface CategoryListResult extends CommonResult {
  data: {
    list: CategoryListItem[]
  }
}

export interface CategoryListItem {
  child: CategoryListItem[]
  id: number
  name: string
}
