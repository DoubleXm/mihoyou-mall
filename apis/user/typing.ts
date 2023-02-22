export interface VerifyCodeLoginParam {
  action_type: 'login'
  captcha: string
  is_bh2: boolean
  mobile: string
  support_reactivate: boolean
  t: number
  token_type: 6
}

export interface VerifyCodeSendParam {
  action_type: 'login'
  mobile: string
  t: number
}

export interface VerifyCodeKeyResult {
  code: number
  data: {
    mmt_data: {
      challenge: string
      gt: string
      mmt_key: string
      new_captcha: number
      success: number
    }
    mmt_type: number
    msg: string
    scene_type: number
    status: number
  }
}

export interface PostVerifyCodeResult {
  code: number
  data: {
    status: number
    msg: string
  }
}
