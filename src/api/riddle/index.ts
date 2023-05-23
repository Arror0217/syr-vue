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
/** 增 */
export function createRiddleTableDataApi(data: Table.ICreateRiddleTableRequestData) {
  return request({
    url: "/v1/blackHole/addRiddle",
    method: "post",
    data
  })
}
/** 更新*/
export function updateRiddleTableDataApi(data: Table.IUpdateRiddleTableRequestData) {
  return request({
    url: "/v1/blackHole/updateRiddle",
    method: "put",
    data
  })
}

export function deleteRiddleApi(data: Table.IDeleteRiddleRequestData) {
  return request({
    url: "/v1/blackHole/disableRiddle",
    method: "put",
    data
  })
}
