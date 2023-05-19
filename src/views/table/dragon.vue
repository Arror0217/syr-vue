<script lang="ts" setup>
import { ref, watch, reactive } from "vue"

import { getDragonDataApi } from "@/api/dragin"
import { type FormInstance } from "element-plus"

import { type IGetDragonTableData } from "@/api/dragin/types/dragon"
import { usePagination } from "@/hooks/usePagination"
import { Search, Refresh } from "@element-plus/icons-vue"

defineOptions({
  name: "ElementPlus"
})
const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
const searchFormRef = ref<FormInstance | null>(null)

const tableData = ref<IGetDragonTableData[]>([])
const searchData = reactive({
  open_id: "",
  keyward: ""
})
const getTableData = () => {
  loading.value = true
  getDragonDataApi({
    pageNo: paginationData.pageNo,
    pageSize: paginationData.pageSize,
    open_id: searchData.open_id,
    keyward: searchData.keyward
  })
    .then((res) => {
      paginationData.total = res.data.total
      tableData.value = res.data.data
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
// 查询
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
/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageNo, () => paginationData.pageSize], getTableData, {
  immediate: true
})
</script>
<template>
  <el-form ref="searchFormRef" :inline="true" :model="searchData">
    <el-form-item prop="keyward" label="">
      <el-input v-model="searchData.keyward" placeholder="请输入谜语问题中的关键字" />
    </el-form-item>
    <el-form-item prop="open_id" label="">
      <el-input v-model="searchData.open_id" placeholder="请输入用户地址" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
      <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
    </el-form-item>
  </el-form>

  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="500"
      :header-cell-style="{
        background: 'rgb(201 191 191 / 41%)'
      }"
    >
      <el-table-column label="ID" prop="ID" />
      <el-table-column label="谜语问题" prop="Question" />
      <el-table-column label="回答" prop="Answer" />
      <el-table-column label="创建时间" prop="CreatedAt" />
      <el-table-column label="地址" prop="OpenId" />
    </el-table>
  </div>
  <div class="pager-wrapper">
    <el-pagination
      background
      :layout="paginationData.layout"
      :page-sizes="paginationData.pageSizes"
      :total="paginationData.total"
      :page-size="paginationData.pageSize"
      :currentPage="paginationData.currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style lang="scss" scoped></style>
