<script lang="ts" setup>
import { formatDateTime } from "@/utils/index"

import { ref, watch, reactive } from "vue"
import { type FormInstance } from "element-plus"
import { getRewardDataApi } from "@/api/api/index"
import { Search, Refresh } from "@element-plus/icons-vue"

import { type IGetRewardTableData } from "@/api/api/types/api"
import { usePagination } from "@/hooks/usePagination"
const tableData = ref<IGetRewardTableData[]>([])
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
const loading = ref<boolean>(false)
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  open_id: ""
})
// 查看
const getTableData = () => {
  getRewardDataApi({
    pageNo: paginationData.pageNo,
    pageSize: paginationData.pageSize,
    open_id: searchData.open_id
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
  if (paginationData.pageNo === 1) {
    getTableData()
  }
  paginationData.pageNo = 1
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  if (paginationData.pageNo === 1) {
    getTableData()
  }
  paginationData.pageNo = 1
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
        <el-form-item prop="open_id" label="">
          <el-input v-model="searchData.open_id" placeholder="请输入用户地址" />
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
        <el-table-column label="活动编号" prop="ActionNo" />
        <el-table-column label="创建时间" prop="CreatedAt">
          <template v-slot="scope">
            {{ formatDateTime(scope.row.CreatedAt) }}
          </template>
        </el-table-column>
        <el-table-column label="NFR" prop="NfrName" />
        <el-table-column label="NFR编号" prop="NfrNo" />
        <el-table-column label="地址" prop="OpenID" />
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
}
.table-wrapper {
  margin-bottom: 15px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
