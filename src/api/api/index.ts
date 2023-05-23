import { request } from "@/utils/service"
import type * as Table from "./types/api"
/** 查看管理员列表 */
export function getManageDataApi(data: Table.IGetManageRequestData) {
  return request<Table.GetTableResponseData>({
    url: "/v1/blackHole/adminLog",
    method: "post",
    data
  })
}
// 查看通关记录
export function getRecordDataApi(data: Table.IGetRecordRequestData) {
  return request<Table.GetRecordTableResponseData>({
    url: "/v1/blackHole/record",
    method: "post",
    data
  })
}
//查看获奖记录
export function getRewardDataApi(data: Table.IGetRewardRequestData) {
  return request<Table.GetRewardTableResponseData>({
    url: "/v1/blackHole/reward",
    method: "post",
    data
  })
}
