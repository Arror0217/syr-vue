export interface IGetRiddleRequestData {
  pageNo: number
  pageSize: number
}
export interface ICreateRiddleTableRequestData {
  Content: string
  expiration_time: number
  off_shelf_time: number
}
export interface IUpdateRiddleTableRequestData {
  Content: string
  expiration_time: number
  off_shelf_time: number
  ID: number
}
export interface IDeleteRiddleRequestData {
  ID: number
}
export interface IGetRiddleTableData {
  ID: number
  Content: string
  public_time: string
  expiration_time?: TimeRanges | null
  off_shelf_time?: TimeRanges | null
  is_show: string
  created_at: string
}
export type GetTableResponseData = IApiResponseData<{
  data: IGetRiddleTableData[]
  total: number
}>
