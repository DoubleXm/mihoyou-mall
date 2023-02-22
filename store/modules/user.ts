import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => (({
    userInfo: null,
    isNeedUserLogin: false,
  })),
  actions: {
    /**
     * @description 是否需要用户登录
     */
    setIsNeedUserLogin(isNeedLogin: boolean) {
      this.isNeedUserLogin = isNeedLogin
    },
  },
})
