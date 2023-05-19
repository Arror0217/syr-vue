import { request } from "@/utils/service"
import type * as Table from "./types/dragon"
/** 查 */
export function getDragonDataApi(data: Table.IGetDragonRequestData) {
  return request<Table.GetTableResponseData>({
    url: "/v1/blackHole/dragon",
    method: "post",
    data
  })
}
