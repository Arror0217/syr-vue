import { reactive } from "vue"

interface IDefaultPaginationData {
  pageNo: number
  OpenId: string
  keyward: string
  total: number
  pageSizes: number[]
  pageSize: number
  layout: string
}

interface IPaginationData {
  total?: number
  currentPage?: number
  pageSizes?: number[]
  pageSize?: number
  layout?: string
}

/** 默认的分页参数 */
const defaultPaginationData: IDefaultPaginationData = {
  pageNo: 1,
  OpenId: "",
  keyward: "",
  total: 0,
  pageSizes: [10, 20, 50],
  pageSize: 10,
  layout: "total, sizes, prev, pager, next, jumper"
}

export function usePagination(_paginationData: IPaginationData = {}) {
  /** 合并分页参数 */
  const paginationData = reactive(Object.assign({ ...defaultPaginationData }, _paginationData))

  /** 改变页码 */
  const handleCurrentChange = (value: number) => {
    paginationData.pageNo = value
  }

  /** 改变页面大小 */
  const handleSizeChange = (value: number) => {
    paginationData.pageSize = value
  }

  return { paginationData, handleCurrentChange, handleSizeChange }
}
