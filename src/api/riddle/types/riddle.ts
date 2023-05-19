export interface IGetRiddleRequestData {
  pageNo: number
  pageSize: number
}
export interface IGetRiddleTableData {
  ID: number
  Content: string
  public_time: string
  expiration_time: string
  off_shelf_time: string
  is_show: string
  created_at: string
}
export type GetTableResponseData = IApiResponseData<{
  data: IGetRiddleTableData[]
  total: number
}>
