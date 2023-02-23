import { defineStore } from 'pinia'
import { UserInfoResult } from '~~/apis/common/typing'

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => (({
    userInfo: {
      uid: '',
      nickname: '',
      avatar_url: '',
      introduce: '',
      gender: 0,
      is_creator: false,
      is_creator_disabled: false,
      fans: 0,
    },
    isNeedUserLogin: false,
  })),
  getters: {
    userIsLogin: store => !!store.userInfo.uid,
  },
  actions: {
    /**
     * @description 是否需要用户登录
     */
    setIsNeedUserLogin(isNeedLogin: boolean) {
      this.isNeedUserLogin = isNeedLogin
    },
    /**
     * @description 设置用户信息
     */
    setUserInfo(info: UserInfoResult['data']) {
      this.userInfo = info
    },
  },
})
