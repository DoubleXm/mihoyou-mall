<script setup lang="ts">
import { shopPages } from '@/settings'

definePageMeta({
  validate: async (route) => {
    return !!shopPages.find(i => i === route.path)
  },
})

const route = useRoute()

const pathKey = computed(() => {
  const key = route.path.match(/[^\/][^$\/]+/) as RegExpMatchArray
  return Array.isArray(key) ? key[0] : ''
})
</script>

<template>
  <div>
    {{ pathKey }}
  </div>
</template>
