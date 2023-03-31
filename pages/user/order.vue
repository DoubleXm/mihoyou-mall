<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('ORDER_LIST')
const tabList = [
  { name: 'ORDER_LIST', label: '全部订单' },
  { name: 'WAIT_DISBURSE', label: '代付款' },
  { name: 'WAIT_DELIVER_GOODS', label: '代发货' },
  { name: 'WAIT_RECEIPT', label: '代收货' },
]

const tabPaneClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<template>
  <div class="user-order__content menu-content">
    <h3 class="menu-content__title">我的订单</h3>
    <ElTabs v-model="activeName" class="demo-tabs" @tab-click="tabPaneClick">
      <ElTabPane v-for="item in tabList" :key="item.name" :name="item.name" :label="item.label">
        {{ item.name }}
      </ElTabPane>
    </ElTabs>
  </div>
</template>
