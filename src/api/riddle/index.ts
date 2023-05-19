import { request } from "@/utils/service"
import type * as Table from "./types/riddle"
/** 查 */
export function getRiddleDataApi(data: Table.IGetRiddleRequestData) {
  return request<Table.GetTableResponseData>({
    url: "/v1/blackHole/riddleWall",
    method: "post",
    data
  })
}
