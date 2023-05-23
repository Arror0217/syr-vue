<script lang="ts" setup>
import { formatDateTime } from "@/utils/index"

import { ref, watch, reactive } from "vue"
import { type FormInstance } from "element-plus"

import { getManageDataApi } from "@/api/api/index"
import { Search, Refresh } from "@element-plus/icons-vue"
import { type IGetManageTableData } from "@/api/api/types/api"
import { usePagination } from "@/hooks/usePagination"
const tableData = ref<IGetManageTableData[]>([])
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
const loading = ref<boolean>(false)
const searchFormRef = ref<FormInstance | null>(null)

const searchData = reactive({
  open_id: "",
  action: "",
  options: [
    { value: "", label: "全部" },
    { value: "管理员登录", label: "管理员登录" },
    { value: "增加用户次数", label: "增加用户次数" },
    { value: "批量增加次数", label: "批量增加次数" },
    { value: "添加管理", label: "添加管理" },
    { value: "移除管理", label: "移除管理" },
    { value: "新增谜语", label: "新增谜语" },
    { value: "修改谜语", label: "修改谜语" },
    { value: "禁用谜语", label: "禁用谜语" },
    { value: "添加黑名单", label: "添加黑名单" },
    { value: "移除黑名单", label: "移除黑名单" }
  ]
})
// 查看
const getTableData = () => {
  getManageDataApi({
    pageNo: paginationData.pageNo,
    pageSize: paginationData.pageSize,
    open_id: searchData.open_id,
    action: searchData.action
  })
    .then((res) => {
      paginationData.total = res.data.total
      console.log(res.data)
      tableData.value = res.data.data
    })
    .catch(() => {
      tableData.value = []
    })
}
const handleSearch = () => {
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}
getTableData()
formatDateTime
/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageNo, () => paginationData.pageSize], getTableData, {
  immediate: true
})
</script>
<template>
  <div class="contain">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="open_id" label="" class="search">
          <el-input v-model="searchData.open_id" placeholder="请输入用户地址" />
          <el-select v-model="searchData.action" placeholder="请选择操作方式" style="width: 230px; margin-right: 10px">
            <el-option v-for="item in searchData.options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="500"
        border
        :header-cell-style="{
          background: 'rgb(201 191 191 / 41%)'
        }"
      >
        <el-table-column label="ID" prop="ID" />
        <el-table-column label="操作方式" prop="Action" />
        <el-table-column label="管理员地址" prop="AdminAddr" />
        <el-table-column label="创建时间" prop="CreatedAt">
          <template v-slot="scope">
            {{ formatDateTime(scope.row.CreatedAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作数据" prop="Data" />
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pager-wrapper">
      <el-pagination
        background
        :layout="paginationData.layout"
        :page-sizes="paginationData.pageSizes"
        :total="paginationData.total"
        :page-size="paginationData.pageSize"
        :currentPage="paginationData.pageNo"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.contain {
  padding: 0 30px;
}
.search-wrapper {
  margin: 15px 0;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
  .el-form {
    display: flex;
  }
  .el-input {
    margin-right: 5px;
  }
  .search {
    ::v-deep .el-form-item__content {
      flex-wrap: nowrap;
    }
  }
}
.table-wrapper {
  margin-bottom: 15px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
