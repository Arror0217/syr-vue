export interface ILoginRequestData {
  /** admin 或 editor */
  // username: "admin"
  // username: "admin" | "editor"
  phoneNum: string
  /** 密码 */
  // password: string
  /** 验证码 */
  smsCode: string
}

export type LoginCodeResponseData = IApiResponseData<string>

export type LoginResponseData = IApiResponseData<{
  data: { openId: string }
  token: string
}>

export type UserInfoResponseData = IApiResponseData<{ username: string; roles: string[] }>
