<script setup lang="ts">
import type { Ref } from 'vue'

interface UseErrorRetuenType {
  url: string
  statusCode: string
  statusMessage: string
  message: string
  description: string
  data?: any
}

const error = useError() as unknown as Ref<UseErrorRetuenType>

if (error.value!.statusCode === '404')
  error.value.message = '[script]: Oops! Page not found 😔'

// clear error and redirect to home page
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="common-error-page">
    <div class="notfound-page">
      <p>
        error.statusCode: {{ error.statusCode }} <br>
        error.message: {{ error.message }}
      </p>
      <p
        v-if="error.statusCode === '404'"
        style="margin: 20px;"
      >
        [template]: Oops page not available 🥺
      </p>

      <ElButton size="small" @click="handleError">
        Clear errors
      </ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.common-error-page {
  width: 100vw;
  height: 100vh;
  .notfound-page {
    margin-top: 15vh;
    text-align: center;
  }
}
</style>
