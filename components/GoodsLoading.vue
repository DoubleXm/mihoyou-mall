<script setup lang="ts">
interface Props {
  width?: string
  height?: string
}

withDefaults(
  defineProps<Props>(),
  {
    width: '100%',
    height: '400PX',
  },
)
</script>

<template>
  <div
    class="loading-container"
    :style="{
      width,
      height,
      marginTop: '100PX',
      textAlign: 'center',
    }"
  >
    <img
      height="200"
      width="200"
      src="~/assets/images/goods/goods-loading.gif" alt="loading"
    >
  </div>
</template>
