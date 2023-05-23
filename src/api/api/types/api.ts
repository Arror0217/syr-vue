// 管理员
export interface IGetManageRequestData {
  pageNo: number
  pageSize: number
  open_id: string
  action: string
}
export interface IGetManageTableData {
  ID: number
  Question: string
  Answer: string
  CreatedAt: string
  OpenId: string
}
export type GetTableResponseData = IApiResponseData<{
  data: IGetManageTableData[]
  total: number
}>
//通关记录
export interface IGetRecordRequestData {
  pageNo: number
  pageSize: number
  open_id: string
}
export interface IGetRecordTableData {
  ID: number
  Question: string
  Answer: string
  CreatedAt: string
  OpenId: string
}
export type GetRecordTableResponseData = IApiResponseData<{
  data: IGetRecordTableData[]
  total: number
}>
//获奖记录
export interface IGetRewardRequestData {
  pageNo: number
  pageSize: number
  open_id: string
}
export interface IGetRewardTableData {
  ID: number
  Question: string
  Answer: string
  CreatedAt: string
  OpenId: string
}
export type GetRewardTableResponseData = IApiResponseData<{
  data: IGetRewardTableData[]
  total: number
}>
