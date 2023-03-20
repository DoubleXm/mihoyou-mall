<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { VerifyCodeLoginParam } from '~/apis/user/typing'

import { useUserStore } from '~/store/modules/user'
import { getVerifyCodeKey, postPhoneLogin, postVerifyCode, postVerifyCodeLogin } from '~/apis/user'
import { checkEmailOrPhoneNumber, checkPhoneNumber, phoneNumberReg } from '~/utils/validate'

const userStore = useUserStore()

const tabActiveName = ref('Register')

function handleClose() {
  userStore.setIsNeedUserLogin(false)
}
/** -------------------------------verifyCode login */

const countDownTimer = ref<NodeJS.Timeout | null>(null)
const getVerifyCodeText = ref('获取验证码')
const verifyCodeForm = ref<VerifyCodeLoginParam>({
  action_type: 'login',
  captcha: '',
  is_bh2: false,
  mobile: '',
  support_reactivate: true,
  t: new Date().getTime(),
  token_type: 6,
})
const verifyCodeFormRef = ref<FormInstance | null>(null)

/**
 * @description 获取验证码 key
 */
async function queryVerifyCodeKey() {
  const result = await getVerifyCodeKey()

  if (result.code !== 200) {
    ElMessage.error(result.data.msg)
    return
  }
  return result.data
}

/**
 * @description 获取验证码
 */
async function queryVerifyCode() {
  if (!phoneNumberReg.test(verifyCodeForm.value.mobile)) {
    ElMessage.error('手机号格式错误 ~')
    return
  }

  const ret = await queryVerifyCodeKey()

  const params = {
    action_type: verifyCodeForm.value.action_type,
    mobile: verifyCodeForm.value.mobile,
    t: verifyCodeForm.value.t,
    mmt_key: ret?.mmt_data.mmt_key,
    geetest_challenge: ret?.mmt_data.challenge,
    geetest_validate: ret?.mmt_data.mmt_key,
    geetest_seccode: '',
  }

  const result = await postVerifyCode(params)

  if (result.code !== 200) {
    ElMessage.error(result.data.msg)
    return
  }

  let countDown = 60
  countDownTimer.value = setInterval(() => {
    --countDown
    if (!countDown) {
      getVerifyCodeText.value = '获取验证码'
      clearInterval(countDownTimer.value as unknown as number)
    }
    else {
      getVerifyCodeText.value = `已发送（${countDown}s）`
    }
  }, 1000)
}

/**
 * @description 验证码登录
 */
function registerLogin() {
  verifyCodeFormRef.value && verifyCodeFormRef.value.validate(async (valid) => {
    if (!valid)
      return

    const result = await postVerifyCodeLogin(verifyCodeForm.value)

    if (result.retcode !== 0) {
      ElMessage.error(result.message)
      return
    }

    // TODO: 验证码登录走不通
  })
}

/** -------------------------------phone login */

const loginForm = ref({
  account: '',
  password: '',
})
const loginFormRef = ref<FormInstance | null>(null)

/**
 * @description 手机号登录
 */
async function phoneLogin() {
  const result = await postPhoneLogin(loginForm.value)

  ElMessageBox.alert(
  `
    真实登录需要图形验证码，目前无法实现，目前模拟登录的方案分为两种：

    1. 米游铺登录成功复制相关 cookie 到这个项目的域下刷新页面即可。
    2. 本地调试可以打开 /components/LoginDialog.vue 中 135-142 行手动设置后点击登录，刷新页面也可。
  `,
  result.message, {
    confirmButtonText: 'OK',
    callback: () => {
      ElMessage({
        type: 'success',
        message: '感谢支持！',
      })
    },
  })

  useCookie('ltoken').value = 'EdZrfTHaiacuEOONcFMd2At9zcxyXqJDmPI71Y5r'
  useCookie('ltuid').value = '357733426'
  useCookie('cookie_token').value = 'gPo9LW8Lj22m6OEFgFbn4lsFU3nEO3GfzpFz5OLp'
  useCookie('account_id').value = '357733426'
}

onBeforeUnmount(() => {
  clearInterval(countDownTimer.value as unknown as number)
})
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="userStore.isNeedUserLogin"
      width="465px"
      :before-close="handleClose"
      class="login-dialog"
    >
      <div class="login-logo" />
      <ElTabs v-model="tabActiveName">
        <ElTabPane label="验证码登录" name="Register">
          <ElForm ref="verifyCodeForm" :model="verifyCodeForm">
            <ElFormItem
              prop="mobile"
              :rules="[
                { required: true, message: '请输入手机号码', trigger: 'blur' },
                { validator: checkPhoneNumber, trigger: 'blur' },
              ]"
            >
              <ElInput v-model.number="verifyCodeForm.mobile" placeholder="手机号注册/登录" />
            </ElFormItem>
            <ElFormItem
              prop="captcha"
              :rules="[
                { required: true, message: '请输入验证码', trigger: 'blur' },
              ]"
            >
              <ElInput v-model.number="verifyCodeForm.captcha" maxlength="6" placeholder="验证码" />
              <div class="register-code" @click="queryVerifyCode">
                {{ getVerifyCodeText }}
              </div>
            </ElFormItem>
            <ElButton type="primary" @click="registerLogin">
              登录
            </ElButton>
          </ElForm>
          <div class="login-helper">
            <a href="#">登录遇到问题？</a>
            <a href="#">立即注册</a>
          </div>
          <div class="login-tips">
            未注册的手机验证后将自动登录。注册/登录即代表您同意并遵守
            <a href="#">《米哈游通行证用户服务协议》</a>
            <a href="#">《米哈游通行证用户个人信息及隐私保护政策》</a>
          </div>
        </ElTabPane>

        <ElTabPane label="密码登录" name="Login">
          <ElForm ref="loginFormRef" :model="loginForm">
            <ElFormItem
              prop="mobile"
              :rules="[
                { required: true, message: '请输入手机号码或者邮箱', trigger: 'blur' },
                { validator: checkEmailOrPhoneNumber, trigger: 'blue' },
              ]"
            >
              <ElInput v-model.number="loginForm.account" placeholder="手机号/邮箱" />
            </ElFormItem>
            <ElFormItem
              prop="captcha"
              :rules="[
                { required: true, message: '请输入密码', trigger: 'blur' },
              ]"
            >
              <ElInput v-model.number="loginForm.password" placeholder="密码" />
            </ElFormItem>
            <ElButton type="primary" @click="phoneLogin">
              登录
            </ElButton>
          </ElForm>
          <div class="login-helper">
            <a href="#">登录遇到问题？</a>
            <a href="#">立即注册</a>
          </div>
          <div class="login-tips">
            登录即代表您同意并遵守
            <a href="#">《米哈游通行证用户服务协议》</a>
            <a href="#">《米哈游通行证用户个人信息及隐私保护政策》</a>
          </div>
        </ElTabPane>
      </ElTabs>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss">
.login-dialog {
  margin-top: 25vh !important;
  border-radius: 8PX;
  .el-dialog__header {
    .el-dialog__headerbtn {
      top: -2PX;
      .el-icon {
        font-size: 24PX;
      }
    }
  }
  .el-dialog__body {
    position: relative;
    padding: 20PX 30PX;
    padding-top: 0;

    .login-logo {
      position: absolute;
      top: -88PX;
      left: 50%;
      width: 107PX;
      height: 38PX;
      background: url(~/assets/images/login-logo.png) center center no-repeat;
      background-size: cover;
      transform: translateX(-50%);
    }

    .el-tabs {
      margin: 0 10PX;
      .el-tabs__nav-wrap {
        &::after {
          height: 1PX;
        }
        .el-tabs__nav {
          width: 100%;

          .el-tabs__active-bar {
            display: none;
          }

          .el-tabs__item {
            width: 50%;
            text-align: center;
            font-size: 18PX;
            color: var(--el-color-info);
            font-weight: normal;
            &.is-active {
              position: relative;
              font-weight: bold;
              color: var(--el-color-black);
              &::before {
                content: "";
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 25PX;
                height: 3PX;
                background-color: var(--el-color-primary);
                border-radius: 3PX;
                transform: translateX(-90%);
              }
              &#tab-Login {
                &::before {
                  transform: translateX(-8%);
                }
              }
            }
          }
        }
      }

      .login-helper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 12PX 0;
      }
      .login-tips {
        margin-bottom: 20PX;
        font-size: 16PX;
        line-height: 22PX;
      }
      a {
        text-decoration: none;
        color: var(--el-color-info);
        font-size: 16PX;
      }
    }

    .el-form {
      margin: 20PX 0;
      .el-input {
        height: 46PX;
        font-size: 16PX;
        &.is-error {
          .el-input__wrapper {
            box-shadow: 0 0 0 0 var(--el-input-hover-border-color) inset;
          }
        }
        .el-input__wrapper {
          &.is-focus {
            box-shadow: 0 0 0 1PX var(--el-input-hover-border-color) inset;
          }
        }
      }
      .el-button {
        width: 100%;
        height: 46PX;
      }
      .el-form-item {
        .register-code {
          position: absolute;
          right: 14PX;
          height: 46PX;
          top: 50%;
          padding-left: 18PX;
          line-height: 46PX;
          transform: translateY(-50%);
          font-size: 16PX;
          color: var(--el-color-info);
          cursor: pointer;
          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 14PX;
            width: 1PX;
            background-color: var(--el-color-info-light-7);
          }
        }
      }
    }
  }
}
</style>
