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

export interface UserInfoResult {
  data: {
    avatar_url: string
    fans: number
    gender: number
    introduce: string
    is_creator: boolean
    is_creator_disabled: boolean
    nickname: string
    uid: string
  }
  message: string
  retcode: number
}

/**
 * 商品详情
 */
export interface GoodsDetail extends CommonResult {
  data: {
    goods: {
      account_id: string
      creator: null
      detail: {
        banner_url: string[]
        cover_url: string
        desc: string
        goods_id: string
        goods_kind: number
        goods_type: number
        have_sku: boolean
        is_gift: boolean
        main_url: string[]
        market_price: number
        name: string
        new: boolean
        price: number
        product_category: string
        product_material: string
        product_notes: string
        product_producer: string
        product_size: string
        quota: number
        remaining_time: number
        sale_attrs: {
          name: string
          content: {
            img_url: string
            is_chose: boolean
            key: string
            text: string
          }[]
          is_open: boolean
          key: string
        }[]
        sale_time: number
        shop: {
          cert: boolean
          icon: string
          icon_goods_avatar: string
          icon_m_goods: string
          official: boolean
          shop_code: string
          shop_name: string
        }
        shop_code: string
        skus: {
          [key: string]: {
            attr: string
            cover_url: string
            id: number
            market_price: number
            price: number
            sale_attr1_key: string
            sale_attr1_val: string
            sale_attr2_key: string
            sale_attr2_val: string
          }
        }
        tag: number
        status: number
      }
      goods_count: number
      notices: {
        bottom: {
          image_urls: string[]
        }
        top: {
          image_urls: string[]
        }
      }
      quantity: {
        have_sku: boolean
        sku_quantities: {
          [key: string]: number
        }
        sold_num: number
        spu_quantity: number
      }
    }
    promotion: {
      coupons: any[]
      free_shipping_activity: null
      gift_activities: any[]
      presale_activity: null
      server_time: number
    }
  }
}

export interface GoodsDetailSKU {
  img_url: string
  is_chose: boolean
  key: string
  text: string
}

/**
 * 商品详情优惠券列表
 */
export interface GoodsDetailCouponResult extends CommonResult {
  data: {
    received: (GoodsDetailCouponResultCommonItem & GoodsDetailCouponReceived)[]
    unreceive: (GoodsDetailCouponResultCommonItem & GoodsDetailCouponUnreceive)[]
  }
}

export interface GoodsDetailCouponResultCommonItem {
  apply_category: any[]
  apply_end_time: number
  apply_goods: {
    id: string
    name: string
  }[]
  apply_goods_scene: number
  apply_scope_desc: string
  apply_start_time: number
  coupon_id: string
  deduction: number
  jump_type: number
  name: string
  received: number
  server_time: number
  shop_code: string
  threshold: number
}

export interface GoodsDetailCouponReceived {
  instance_id: string
  receive_time: number
  unavaliable_reason: string
  use_time: number
}
export interface GoodsDetailCouponUnreceive {
  dist_end_time: number
  dist_start_time: number
  apply_interval_after_dist: number
  apply_time_type: number
  threshold: number
  stock: number
}

export interface GoodsDetailCouponReceive extends CommonResult {
  data: {
    instance_id: string
  }
}

export interface AddGoodsToCardPayload {
  goods_id: string
  sku_id: number
  nums: number
  shop_code: string
  old_sku_id: number | null
}

export interface AddGoodsToCardResult extends CommonResult {
  data: {
    can_add_num: number
    code: number
    current_num: number
  }
}

export interface GoodsCartItem {
  gift_activity_goods: any[]
  have_avaliable_shop_coupon: boolean
  last_update_time: number
  shop_code: string
  shop_name: string
  list: GoodsCartChildItem[]

  select: boolean // 自定义属性控制 checkbox
}

export interface GoodsCartChildItem {
  cover_url: string
  create_time: string
  from_system: boolean
  goods_id: string
  goods_name: string
  is_effect: boolean
  mtime: number
  new_price_fee: number
  noneffecttive_reason: string
  nums: number
  old_price_fee: number
  presale: null
  quantity: number
  quota: number
  remaining_time: number
  sale_attr_val: string
  sale_time: number
  shop_code: string
  sku_id: number
  sold_out_status: number

  select: boolean // 自定义属性控制 checkbox
}

export interface GoodsCartResult extends CommonResult {
  data: {
    list: GoodsCartItem[]
  }
}

export interface EditShopCarGoodsPayload {
  goods_id: string
  nums: number
  shop_code: string
  sku_id: number
}

export type DelShopCarGoodsPayload = Omit<EditShopCarGoodsPayload, 'nums'>

export interface CalcShopCarGoodsPayload {
  list: {
    shop_code: string
    goods_list: {
      goods_id: string
      nums: number
      sku_id: number
    }[]
  }[]
}

export interface CalcShopCarGoodsResult extends CommonResult {
  data: {
    coupon_shop_discount: number
    goods_discount: number
    total_discount: number
    total_goods_price: number
    total_price: number
    list: CalcShopCarGoodsPayload['list']
  }
}

export interface OrderListResult extends CommonResult {
  data: {
    count: number
    list: OrderListItem[]
  }
}

export interface OrderListItem {
  account_uid: number
  allow_close_order: false
  allow_user_change_address: false
  can_apply_refund_logistic: false
  cancel_time: number
  channel: string
  comment: string
  delivery_time: number
  discounts: {
    coupon_discount: number
    goods_discount: number
    total_discount: number
  }
  goods_amount: number
  goods_list: GoodsItemForOderListItem[]
  invoice_info: {
    disabled_reason: string
    status: number
  }
  logistic_amount: number
  logistic_status: number
  mtime: number
  order_amount: number
  order_no: string
  order_time: number
  pay_deadline: number
  payment_info: {
    pay_amount: number
    pay_method: number
    pay_no: string
    pay_time: number
  }
  shop: {
    shop_code: string
    shop_icon: string
    shop_name: string
  }
  status: number // 1 待付款 400 交易关闭
  sync_status: number
}

export interface GoodsItemForOderListItem {
  aftersales_info: {
    aftersales_no: string
    aftersales_status: number
    aftersales_type: number
    can_apply_aftersales: number
  }
  meta_info: {
    activity_id: string
    cd_keys: any[]
    coupon_discount: number
    cover_url: string
    free_shipping: boolean
    gift_type: number
    goods_id: string
    goods_kind: number
    goods_name: string
    goods_type: number
    is_gift: boolean
    market_price: number
    presale_id: string
    presale_type: number
    price: number
    quantity: number
    sale_attr_val: string
    shipping_status: number
    sku_id: number
    sku_sales: {
      attr_key: string
      attr_name: string
      attr_value: string
    }[]
    total_price: number
    version: number
  }
  shop: null
}

