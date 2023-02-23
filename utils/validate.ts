export const phoneNumberReg = /^1[3456789]\d{9}$/
export const emailReg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/

export const checkPhoneNumber = (rule: any, value: any, callback: any) => {
  if (!phoneNumberReg.test(value))
    callback(new Error('请输入正确的手机号码'))
  else
    callback()
}

export const checkEmailOrPhoneNumber = (rule: any, value: any, callback: any) => {
  if (!phoneNumberReg.test(value) || !emailReg.test(value))
    callback(new Error('请输入正确的手机号码或邮箱'))
  else
    callback()
}
