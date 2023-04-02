import type { CommonQuery, CommonResult } from '../typing'
import type {
  AddGoodsToCardPayload,
  AddGoodsToCardResult,
  CalcShopCarGoodsPayload,
  CalcShopCarGoodsResult,
  CategoryListResult,
  DelShopCarGoodsPayload,
  EditShopCarGoodsPayload,
  GoodsCartResult,
  GoodsDetail,
  GoodsDetailCouponReceive,
  GoodsDetailCouponResult,
  GoodsListResult,
  OrderListResult,
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

/**
 * @description 获取登录的用户购物车商品数量
 */
export function getUserShopCardNum() {
  return http.request<{
    data: { num: number }
    message: string
    retcode: number
  }>({
    method: 'GET',
    url: 'common/homeishop/v1/shop_car/get_shop_car_goods_num',
  })
}

/**
 * @description 加入购物车
 */
export function postGoodsToShopCard(data: AddGoodsToCardPayload) {
  return http.request<AddGoodsToCardResult>({
    method: 'POST',
    url: 'common/homeishop/v1/shop_car/add_goods_to_shop_car',
    data,
  })
}

/**
 * @description 获取商品详情
 */
export function getGoodsDetail(goods_id: string) {
  return http.request<GoodsDetail>({
    method: 'GET',
    url: 'common/homeishop/v1/goods/detail',
    params: {
      goods_id,
    },
  })
}

/**
 * @description 获取商品详情中优惠券列表
 */
export function getGoodsDetialCoupons(goods_id: string) {
  return http.request<GoodsDetailCouponResult>({
    method: 'GET',
    url: 'common/homeishop/v1/coupon/goods_detail_coupon',
    params: {
      goods_id,
    },
  })
}

/**
 * @description 商品详情中优惠券领取
 */
export function postGoodsDetailCouponRective(coupon_id: string) {
  return http.request<GoodsDetailCouponReceive>({
    method: 'POST',
    url: 'common/homeishop/v1/coupon/receive_coupon',
    data: {
      coupon_id,
    },
  })
}

/**
 * @description 获取购物车商品列表
 */
export function getGoodsCartList() {
  return http.request<GoodsCartResult>({
    method: 'GET',
    url: '/common/homeishop/v2/shop_car/get_shop_car_list',
  })
}

/**
 * @description 编辑购物车商品
 */
export function editShopCarGoods(data: EditShopCarGoodsPayload) {
  return http.request<CommonResult>({
    method: 'POST',
    url: '/common/homeishop/v1/shop_car/edit_shop_car_goods',
    data,
  })
}

/**
 * @description 删除购物车商品
 */
export function delShopCarGoods(data: DelShopCarGoodsPayload) {
  return http.request<CommonResult>({
    method: 'POST',
    url: '/common/homeishop/v1/shop_car/del_shop_car_goods',
    data,
  })
}

/**
 * @description 计算购物商品金额
 */
export function calcShopCarGoods(data: CalcShopCarGoodsPayload) {
  return http.request<CalcShopCarGoodsResult>({
    method: 'POST',
    url: '/common/homeishop/v1/shop_car/calc_price',
    data,
  })
}

/**
 * @description 获取个人信息
 */
export function queryUserInfo() {
  return http.request<UserInfoResult>({
    method: 'GET',
    url: '/common/homeishop/v1/user/info',
  })
}

/**
 * @description 获取订单列表
 */
export function getOrderList(filterBy: CommonQuery) {
  return http.request<OrderListResult>({
    method: 'GET',
    url: '/common/homeishop/v1/order/order_list',
    params: {
      ...filterBy,
    },
  })
}
