<template>
  <div class="riddle-table">
    <el-table
      height="450px"
      :data="tableData"
      :header-cell-style="{
        background: 'rgb(201 191 191 / 41%)'
      }"
    >
      <el-table-column prop="ID" label="ID" />
      <el-table-column prop="Content" label="谜语" />
      <el-table-column prop="created_at" label="创建时间" />
      <el-table-column prop="public_time" label="公开时间" />
      <el-table-column prop="expiration_time" label="过期时间" />
      <el-table-column prop="off_shelf_time" label="下架时间" />
      <el-table-column prop="is_show" label="状态" />
      <!-- <el-table-column label="操作">
        <template v-slot="scope">
          <el-button class="button-edit" style="margin-right: 20px" size="mini" @click="editRiddleValue(scope.row)">
            修改
          </el-button>
          <template v-if="scope.row.is_show">
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确定要将这段谜语重新隐藏？"
            >
              <el-button slot="reference" size="mini" type="danger">隐藏</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column> -->
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <span class="demonstration" />
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
  </div>
</template>
<script lang="ts" setup>
import { watch, ref } from "vue"

import { getRiddleDataApi } from "@/api/riddle/index"
// import { type FormInstance } from "element-plus"

import { type IGetRiddleTableData } from "@/api/riddle/types/riddle"
import { usePagination } from "@/hooks/usePagination"
// import { Search, Refresh } from "@element-plus/icons-vue"
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
const tableData = ref<IGetRiddleTableData[]>([])
const getTableData = () => {
  getRiddleDataApi({
    pageNo: paginationData.pageNo,
    pageSize: paginationData.pageSize
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
getTableData()
/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageNo, () => paginationData.pageSize], getTableData, {
  immediate: true
})
</script>
<style lang="scss" scoped></style>
