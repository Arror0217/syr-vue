import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 获取登录验证码 */
export function getLoginCodeApi(data: FormData) {
  return request<Login.LoginCodeResponseData>({
    url: "/v1/blackHole/sendFunSms",
    method: "post",
    data
  })
}

/** 登录并返回 Token */
export function loginApi(data: FormData) {
  return request<Login.LoginResponseData>({
    url: "/v1/blackHole/login",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request<Login.UserInfoResponseData>({
    url: "users/info",
    method: "get"
  })
}
