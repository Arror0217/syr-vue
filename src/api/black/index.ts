import { request } from "@/utils/service"
import type * as Table from "./types/black"
/** 查 */
export function getblackDataApi(data: Table.IGetBlackRequestData) {
  return request<Table.GetTableResponseData>({
    url: "/v1/blackHole/blackList",
    method: "post",
    data
  })
}
// 增
export function updateBlackDataApi(data: Table.IUpdateBlackRequestData) {
  return request({
    url: "/v1/blackHole/black",
    method: "post",
    data
  })
}
// 删除
export function deleteBlackDataApi(data: Table.IDeleteBlackRequestData) {
  return request({
    url: "/v1/blackHole/black",
    method: "DELETE",
    data
  })
}
