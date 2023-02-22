import type { PostVerifyCodeResult, VerifyCodeKeyResult, VerifyCodeLoginParam, VerifyCodeSendParam } from './typing'

import { accountHttp, passportHttp } from '~/utils/http'

/**
 * @description 获取验证码需要的 key
 */
export function getVerifyCodeKey() {
  return accountHttp.request<VerifyCodeKeyResult>({
    method: 'GET',
    url: 'Api/create_mmt',
    params: {
      t: new Date().getTime(),
      scene_type: 1,
      now: new Date().getTime(),
      reason: 'www.mihoyogift.com',
      action_type: 'login_by_mobile_captcha',
    },
  })
}

/**
 * @description 获取验证码
 */
export function postVerifyCode(data: VerifyCodeSendParam) {
  return accountHttp.request<PostVerifyCodeResult>({
    method: 'POST',
    url: 'Api/create_mobile_captcha',
    data,
  })
}

/**
 * @description 验证码登录
 */
export function postVerifyCodeLogin(data: VerifyCodeLoginParam) {
  return passportHttp.request({
    method: 'POST',
    url: 'account/auth/api/webLoginByMobile',
    data,
  })
}
