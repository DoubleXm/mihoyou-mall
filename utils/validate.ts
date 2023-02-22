export const phoneNumberReg = /^1[3456789]\d{9}$/

export const checkPhoneNumber = (rule: any, value: any, callback: any) => {
  if (!phoneNumberReg.test(value))
    callback(new Error('请输入正确的手机号码'))
  else
    callback()
}
