<script setup lang="ts">
import { ElInput } from 'element-plus'
import { getSearchHotword, getSearchSuggestion } from '~/apis/common'
import { storage } from '~/utils/storage'
import { STORAGE_KEY } from '~/settings/enmu'

import type { SearchHotwordResult, SearchSuggestionResult } from '~/apis/common/typing'

const searchHotword = ref<SearchHotwordResult['data']['list']>([])
const searchSuggestion = ref('')
const searchSuggestionHistory = ref<string[]>([])
const searchHistoryElRef = ref<HTMLDivElement | null>(null)
const searchInputElRef = ref<InstanceType<typeof ElInput> | null>(null)

if (process.client)
  searchSuggestionHistory.value = storage.get(STORAGE_KEY.SEARCH_HISTORY) || []

const searchSuggestionHistoryIsShow = computed(() => !!searchSuggestionHistory.value.length)

/**
 * get 关键词列表
 */
const querySearchHotword = async () => {
  const { data, error } = await useHttp<SearchHotwordResult>(getSearchHotword)

  if (error.value) {
    ElMessage.error(error.value.toString())
    return
  }
  console.log(data.value)
  searchHotword.value = data.value!.data.list
}

/**
 * get 当前关键词
 */
const querySearchSuggestion = async () => {
  const { data, error } = await useHttp<SearchSuggestionResult>(getSearchSuggestion)

  if (error.value) {
    ElMessage.error(error.value.toString())
    return
  }

  searchSuggestion.value = data.value!.data.keyword
}

/**
 * 搜索
 */
const doSearch = () => {
  if (!searchSuggestion.value)
    return

  const index = searchSuggestionHistory.value.findIndex(i => i === searchSuggestion.value)
  if (index !== -1)
    searchSuggestionHistory.value.splice(index, 1)

  searchSuggestionHistory.value.unshift(searchSuggestion.value)

  storage.set(STORAGE_KEY.SEARCH_HISTORY, searchSuggestionHistory.value)
}

/**
 * 删除历史搜索
 */
const removeAllSearchHistory = () => {
  searchSuggestionHistory.value = []
  storage.remove(STORAGE_KEY.SEARCH_HISTORY)
}

/**
 * 单击单个搜索项
 */
const searchFindItemClick = (text: string) => {
  searchSuggestion.value = text
  doSearch()

  searchHistoryElRef.value!.style.opacity = '0'
  searchHistoryElRef.value!.style.zIndex = '-1'

  searchInputElRef.value!.input!.style!.width = '100%'
}

/**
 * search input focus handle
 */
const searchInputFocus = () => {
  searchHistoryElRef.value!.style.opacity = '1'
  searchHistoryElRef.value!.style.zIndex = '3000'

  searchInputElRef.value!.input!.style!.width = '400px'
}

/**
 * search input blur handle
 */
const searchInputBlur = () => {
  // 防止 blur 事件触发的时机过早导致历史弹窗内的 item 点击事件无效
  setTimeout(() => {
    searchHistoryElRef.value!.style.opacity = '0'
    searchHistoryElRef.value!.style.zIndex = '-1'

    searchInputElRef.value!.input!.style!.width = '100%'
  }, 200)
}

await querySearchHotword()
await querySearchSuggestion()
</script>

<template>
  <div class="search-container">
    <ElInput
      ref="searchInputElRef"
      v-model="searchSuggestion"
      placeholder="请输入想要的商品"
      class="search-input"
      @focus="searchInputFocus"
      @blur="searchInputBlur"
    >
      <template #append>
        <div style="height: 100%; padding: 0 8px" @click="doSearch">
          <i class="iconfont icon-search" />
        </div>
      </template>
    </ElInput>

    <div ref="searchHistoryElRef" class="search-history">
      <ClientOnly>
        <div v-if="searchSuggestionHistoryIsShow" class="history">
          <div class="search-history__head">
            <h1>搜索历史</h1>
            <i class="iconfont icon-shanchu" @click="removeAllSearchHistory" />
          </div>
          <div class="search-history__content">
            <template v-for="item in searchSuggestionHistory" :key="item">
              <div
                class="content-item"
                @click="searchFindItemClick(item)"
              >
                {{ item }}
              </div>
            </template>
          </div>
        </div>
      </ClientOnly>

      <div class="find">
        <h1>搜索发现</h1>
        <div class="search-history__content">
          <template v-for="item in searchHotword" :key="item.id">
            <div
              class="content-item"
              @click="searchFindItemClick(item.text)"
            >
              {{ item.text }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.search-container {
  position: relative;

  .search-input {
    // &:focus-within {
    //   +.search-history {
    //     opacity: 1;
    //     z-index: 3000;
    //   }
    // }

    :hover {
      color: var(--el-color-info);
      .el-input-group__append {
        border: 1PX solid var(--el-color-info);
        border-left: 0;
        box-shadow: none;
      }
    }

    .el-input__wrapper {
      box-sizing: border-box;
      &:hover {
        +.el-input-group__append {
          box-shadow: 0 1PX 0 0 var(--el-input-hover-border-color) inset, 0 -1PX 0 0 var(--el-input-hover-border-color) inset, -1PX 0 0 0 var(--el-input-hover-border-color) inset;
        }
      }
      &.is-focus {
        box-shadow: 0 0 0 1PX var(--el-color-info, var(--el-color-info)) inset;
        +.el-input-group__append {
          box-shadow: 0 1PX 0 0 var(--el-color-info) inset, 0 -1PX 0 0 var(--el-color-info) inset, -1PX 0 0 0 var(--el-color-info) inset;
        }
      }

      .el-input__inner {
        transition: width ease .4s;
        // &:focus {
        //   width: 400PX;
        // }
      }
    }

    .el-input-group__append {
      transition: all ease .3s;
      box-sizing: border-box;
      padding: 0;
      &:hover {
        cursor: pointer;
        background-color: var(--el-color-primary);
        box-shadow: none;
        .icon-search {
          color: var(--el-color-white);
        }
      }
      .icon-search {
        vertical-align: middle;
        font-size: 22PX;
      }
    }
  }

  .search-history {
    opacity: 0;
    position: absolute;
    top: 42PX;
    z-index: -1;
    padding: 18PX;
    box-sizing: border-box;
    box-shadow: 0 8PX 16PX 0 rgb(0 0 0 / 12%);
    border: 1PX solid #eff1f4;
    border-radius: 8PX;
    background-color: var(--el-color-white);
    transition: all ease .2s;
    .search-history__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10PX;
      h1 {
        margin-bottom: 0;
      }
      i {
        font-size: 16PX;
        color: #333;
        cursor: pointer;
      }
    }
    h1 {
      margin-bottom: 10PX;
      font-size: 16PX;
      font-weight: 500;
      line-height: 22PX;
    }
    &__content {
      .content-item {
        display: inline-block;
        font-size: 12PX;
        line-height: 18PX;
        text-align: center;
        padding: 8PX 14PX;
        background-color: #f3f3f4;
        border-radius: 8PX;
        margin-right: 10PX;
        margin-bottom: 10PX;
        max-width: 100%;
        cursor: pointer;
        &:hover {
          color: var(--el-color-white);
          background-color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
