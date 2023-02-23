import type {
  CategoryListResult,
  GoodsListResult,
  SearchHotwordResult,
  SearchSuggestionResult,
  ShopList,
  SpuGoodsListParams,
  SpuGoodsListResult,
  UserInfoResult,
} from './typing'

import { http } from '~/utils/http'

/**
 * @description 获取商店列表
 */
export function getShopList() {
  return http.request<ShopList>({
    method: 'GET',
    url: 'common/homeishop/v1/shop/shop_list',
  })
}

/**
 * @description  获取首页搜索热词列表
 */
export function getSearchHotword(shop_code?: string) {
  return http.request<SearchHotwordResult>({
    method: 'GET',
    url: 'common/homeishop/v1/search/hotwords',
    params: { shop_code },
  })
}

/**
 * @description  获取首页搜索当前热词
 */
export function getSearchSuggestion(shop_code?: string) {
  return http.request<SearchSuggestionResult>({
    method: 'GET',
    url: 'common/homeishop/v1/search/suggestion',
    params: { shop_code },
  })
}

/**
 * @description  获取商品分类列表
 */
export function getCategoryList(shop_code?: string) {
  return http.request<CategoryListResult>({
    method: 'GET',
    url: 'common/homeishop/v1/category/get_category_list',
    params: { shop_code },
  })
}

/**
 * @description  获取商品页商品列表（目前仅原神中会用到）
 */
export function getShopGoodsList(params: { puzzle_id: string; component_id: string }) {
  return http.request<GoodsListResult>({
    method: 'GET',
    url: 'common/homeishop/v1/goods/puzzle_goods_info',
    params,
  })
}

/**
 * @description 商品列表
 */
export function getSpuGoodsList(params?: Partial<SpuGoodsListParams>) {
  return http.request<SpuGoodsListResult>({
    method: 'GET',
    url: 'common/homeishop/v1/goods/search_goods_spu_list',
    params,
  })
}

/**
 * @description 获取用户信息
 */
export function getUserInfo() {
  return http.request<UserInfoResult>({
    method: 'GET',
    url: 'common/homeishop/v1/user/info',
  })
}
