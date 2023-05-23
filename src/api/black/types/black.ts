export interface IGetBlackRequestData {
  pageNo: number
  pageSize: number
}
export interface IUpdateBlackRequestData {
  OpenID: string
}
export interface IDeleteBlackRequestData {
  ID: number
}
export interface IGetBlackTableData {
  ID: number
  CreatedAt: TimeRanges | null
  OpenID: string
}
export type GetTableResponseData = IApiResponseData<{
  data: IGetBlackTableData[]
  total: number
}>
