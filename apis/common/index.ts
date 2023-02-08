import type { CategoryListResult, SearchHotwordResult, SearchSuggestionResult, ShopList } from './typing'

import { http } from '~/utils/http'

/**
 * 获取商店列表
 */
export function getShopList() {
  return http.request<ShopList>({
    method: 'GET',
    url: 'common/homeishop/v1/shop/shop_list',
  })
}

/**
 * 获取首页搜索热词列表
 */
export function getSearchHotword(shop_code?: string) {
  return http.request<SearchHotwordResult>({
    method: 'GET',
    url: 'common/homeishop/v1/search/hotwords',
    params: { shop_code },
  })
}

/**
 * 获取首页搜索当前热词
 */
export function getSearchSuggestion(shop_code?: string) {
  return http.request<SearchSuggestionResult>({
    method: 'GET',
    url: 'common/homeishop/v1/search/suggestion',
    params: { shop_code },
  })
}

/**
 * 获取商品分类列表
 */
export function getCategoryList(shop_code?: string) {
  return http.request<CategoryListResult>({
    method: 'GET',
    url: 'common/homeishop/v1/category/get_category_list',
    params: { shop_code },
  })
}
