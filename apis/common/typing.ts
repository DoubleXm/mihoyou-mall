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

/**
 * 商品列表
 */
export interface GoodsListResult extends CommonResult {
  data: {
    list: GoodsListItem[]
  }
}

export interface GoodsListItem {
  cover_url: string
  goods_id: string
  is_sold_out: boolean
  market_price: number
  name: string
  presale: boolean
  price: number
  remaining_time: number
  sale_time: number
  status: number
  // 1: 新品 3: 推荐 0: 正常商品
  tag: 1 | 3 | 0
}
