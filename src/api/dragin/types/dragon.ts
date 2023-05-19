export interface IGetDragonRequestData {
  pageNo: number
  pageSize: number
  open_id: string
  keyward: string
}
export interface IGetDragonTableData {
  ID: number
  Question: string
  Answer: string
  CreatedAt: string
  OpenId: string
}
export type GetTableResponseData = IApiResponseData<{
  data: IGetDragonTableData[]
  total: number
}>
