<script setup lang="ts">
import { PropType } from 'vue'

import type { CategoryListItem } from '~/apis/common/typing'

defineProps({
  menuList: {
    type: Object as PropType<CategoryListItem[]>,
    require: true,
  },
})

const emit = defineEmits(['menu-item-click'])
</script>

<template>
  <template v-for="subItem in menuList">
    <ElSubMenu
      v-if="subItem.child.length"
      :key="subItem.id"
      :index="`${subItem.id}`"
      :popper-offset="5"
      popper-class="header-navbar-propper"
    >
      <template #title>
        {{ subItem.name }}
        <i class="iconfont icon-arrow-down-filling" />
      </template>

      <CategoryNavbarMenu :menu-list="subItem.child" @menu-item-click="emit('menu-item-click', subItem)" />
    </ElSubMenu>

    <ElMenuItem
      v-else
      :key="subItem.name"
      :index="`${subItem.id}`"
      @click="emit('menu-item-click', subItem)"
    >
      {{ subItem.name }}
    </ElMenuItem>
  </template>
</template>

<style lang="scss">
.header-navbar-propper {
  width: 200PX;
  max-height: 350PX;
  border-radius: 8PX;
  .el-menu--popup {
    overflow: auto;
    width: 100%;
  }
  .el-menu-item {
    margin-bottom: 4PX;
    padding: 0 10PX;
    border-bottom: none;
    &.is-active {
      color: var(--el-text-color-primary) !important;
      border-bottom: none;
      background-color: transparent !important;
    }
  }
}
</style>
