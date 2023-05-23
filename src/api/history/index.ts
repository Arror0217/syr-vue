import { request } from "@/utils/service"
import type * as Table from "./types/history"
/** 查 */
export function getHistoryDataApi(data: Table.IGetHistoryRequestData) {
  return request<Table.GetTableResponseData>({
    url: "/v1/blackHole/history",
    method: "post",
    data
  })
}
