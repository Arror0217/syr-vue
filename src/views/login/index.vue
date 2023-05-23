<script lang="ts" setup>
import { ElMessage } from "element-plus"

import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
// import { useUserStore } from "@/store/modules/user"
// import { User, Lock, Key, Picture, Loading } from "@element-plus/icons-vue"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import { type FormInstance, FormRules } from "element-plus"
import { getLoginCodeApi, loginApi } from "@/api/login"
import { type ILoginRequestData } from "@/api/login/types/login"
import { getFormData } from "@/utils/index"

const router = useRouter()
const loginFormRef = ref<FormInstance | null>(null)

/** 登录按钮 Loading */
const loading = ref(false)
/** 验证码 */
const countdown = ref(0)
/** 登录表单数据 */
const loginForm: ILoginRequestData = reactive({
  phoneNum: "",
  smsCode: ""
})
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  phoneNum: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  smsCode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
}
/** 登录逻辑 */
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      if (loginForm.phoneNum === "" || loginForm.smsCode === "") {
        ElMessage.warning("请完善表单！")
        return
      }
      const data = getFormData({ phoneNum: loginForm.phoneNum, smsCode: loginForm.smsCode })
      loginApi(data)
        .then((res) => {
          const token = res.data.data.openId
          console.log(res.data)

          // 登录成功后存入本地
          localStorage.setItem("token", token)
          router.push({ path: "/" })
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      return false
    }
  })
}

const createCode = () => {
  const data1 = getFormData({ phoneNum: loginForm.phoneNum })
  // if (!loginForm.phoneNum) {
  //   getLoginCodeApi(data1).then(() => {
  //     startCountdown()
  //   })
  // } else return false
  getLoginCodeApi(data1).then(() => {
    startCountdown()
  })
}
// 开始倒计时
function startCountdown(): void {
  let timeLeft = 60
  countdown.value = timeLeft

  const intervalId = setInterval(() => {
    timeLeft--
    countdown.value = timeLeft

    if (timeLeft === 0) {
      clearInterval(intervalId)
      resetButtonStatus()
    }
  }, 1000)
}

// 倒计时结束后将按钮恢复为可点击状态
function resetButtonStatus(): void {
  countdown.value = 0
}
</script>

<template>
  <div class="login-container">
    <ThemeSwitch class="theme-switch" />
    <div class="login-card">
      <div class="title">
        <img src="@/assets/layout/logo-text-2.png" />
      </div>
      <div class="content">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <el-form-item prop="phoneNum" label="手机号">
            <el-input v-model.number="loginForm.phoneNum" class="input-w" maxlength="11" autocomplete="off" />
          </el-form-item>

          <el-form-item class="yanzheng" label="验证码" prop="smsCode">
            <div class="send-wrap">
              <el-input v-model="loginForm.smsCode" class="input-w" maxlength="6" autocomplete="off" />
              <el-button class="btn" @click="createCode" :disabled="countdown > 0">
                {{ countdown === 0 ? "获取验证码" : `${countdown}s` }}
              </el-button>
            </div>
          </el-form-item>
          <el-button class="button" :loading="loading" type="primary" size="large" @click.prevent="handleLogin">
            登 录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .button {
        width: 100%;
        margin-top: 10px;
      }
      .send-wrap {
        display: flex;
        align-items: center;
        .btn {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
