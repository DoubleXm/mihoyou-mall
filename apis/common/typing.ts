import type { CommonResult } from '../typing'

/**
 * @description  店铺列表
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
 * @description  搜索关键字
 */
export interface SearchSuggestionResult extends CommonResult {
  data: {
    keyword: string
  }
}

/**
 * @description  搜索关键字列表
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
 * @description  商品分类列表
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
 * @description  商品列表（店铺页）
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
  status?: number
  // 1: 新品 3: 推荐 0: 正常商品
  tag: 1 | 3 | 0
}

/**
 * 商品列表请求参数
 */
export interface SpuGoodsListParams {
  shop_code: string
  hide_sold_out: boolean
  show_sale_type: number
  category_id: string
  order_by: string
  page: number
  limit: number
}

/**
 * 商品列表响应
 */
export interface SpuGoodsListResult extends CommonResult {
  data: {
    count: number
    list: SpuGoodsListItem[]
  }
}

export interface SpuGoodsListItem {
  add_cart?: boolean
  cover_url: string
  goods_id: string
  is_sold_out: boolean
  market_price: number
  name: string
  presale: boolean
  price: number
  remaining_time: number
  sale_time: number
  // 1: 新品 3: 推荐 0: 正常商品
  tag: 1 | 3 | 0
}
