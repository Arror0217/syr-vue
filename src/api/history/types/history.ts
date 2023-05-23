export interface IGetHistoryRequestData {
  pageNo: number
  pageSize: number
  open_id: string
}

export interface IGetHistoryTableData {
  ID: number
  Question: string
  Answer: string
  CreatedAt: string
  OpenId: string
}
export type GetTableResponseData = IApiResponseData<{
  data: IGetHistoryTableData[]
  total: number
}>
