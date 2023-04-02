<script setup lang="ts">
import { getOrderList } from '~/apis/common'
import type { OrderListItem } from '~/apis/common/typing'
import type { CommonQuery } from '~/apis/typing'

interface TabListItem {
  name: 'ORDER_LIST' | 'WAIT_DISBURSE' | 'WAIT_DELIVER_GOODS' | 'WAIT_RECEIPT'
  label: '全部订单' | '代付款' | '代发货' | '代收货'
  loading: boolean
  filterBy?: CommonQuery
  list?: OrderListItem[]
  total?: number
}

const activeName = ref('ORDER_LIST')
const tabList = ref<TabListItem[]>([
  {
    name: 'ORDER_LIST',
    label: '全部订单',
    loading: false,
    filterBy: {
      page: 1,
      limit: 10,
    },
    list: [],
    total: 0,
  },
  { name: 'WAIT_DISBURSE', label: '代付款', loading: false },
  { name: 'WAIT_DELIVER_GOODS', label: '代发货', loading: false },
  { name: 'WAIT_RECEIPT', label: '代收货', loading: false },
])

/**
 * @description 订单列表
 */
const queryOrderList = async (name: string) => {
  const index = tabList.value.findIndex(i => i.name === name)

  if (index !== -1) {
    tabList.value[index].loading = true
    const result = await getOrderList(tabList.value[index].filterBy!)
    tabList.value[index].loading = false
    if (result.retcode !== 0) {
      ElMessage.error(result.message)
      return
    }
    tabList.value[index].list = result.data.list
    tabList.value[index].total = result.data.count
  }
}

/**
 * @description 订单列表页码切换
 */
const orderListPageChange = (page: number, name: TabListItem['name']) => {
  const index = tabList.value.findIndex(i => i.name === name)

  if (index !== -1 && tabList.value[index].filterBy)
    tabList.value[index].filterBy!.page = page

  queryOrderList(name)
}

watch(
  () => activeName.value,
  () => {
    switch (activeName.value) {
      case 'ORDER_LIST':
        queryOrderList('ORDER_LIST')
        break
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="user-order__content menu-content">
    <h3 class="menu-content__title">我的订单</h3>
    <ElTabs v-model="activeName">
      <ElTabPane v-for="item in tabList" :key="item.name" :name="item.name" :label="item.label">
        <template v-if="!item.loading">
          <template v-if="item.name === 'ORDER_LIST'">
            <UserOrderItem v-for="order in item.list" :key="order.order_no" :order="order" />

            <LazyClientOnly>
              <div class="paging">
                <ElPagination
                  :page-size="item.filterBy?.limit"
                  :current-page="item.filterBy?.page"
                  background
                  layout="prev, pager, next"
                  :total="item.total || 0"
                  @current-change="orderListPageChange($event, item.name)"
                />
              </div>
            </LazyClientOnly>
          </template>
        </template>
        <GoodsLoading v-else />
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<style lang="scss">
.user-order__content {
  .uer-order-item {
    margin-top: 8PX;
    &:first-child {
      margin-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
}
</style>
