<script lang="ts" setup>
import { formatDateTime } from "@/utils/index"
import { CirclePlus } from "@element-plus/icons-vue"
import { type IGetBlackTableData } from "@/api/black/types/black"
import { ref, watch, reactive } from "vue"
import { usePagination } from "@/hooks/usePagination"
import { getblackDataApi, deleteBlackDataApi, updateBlackDataApi } from "@/api/black/index"
import { ElMessage, ElMessageBox, type FormInstance } from "element-plus"
import { type IDeleteBlackRequestData } from "@/api/black/types/black"
const tableData = ref<IGetBlackTableData[]>([])
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
const getTableData = () => {
  getblackDataApi({
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
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  OpenID: ""
})
const handleCreate = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      updateBlackDataApi({
        OpenID: formData.OpenID
      }).then(() => {
        ElMessage.success("添加成功")
        dialogVisible.value = false
        getTableData()
      })
    } else {
      return false
    }
  })
}

const resetForm = () => {
  formData.OpenID = ""
}
const deleteBlack = (row: IDeleteBlackRequestData) => {
  ElMessageBox.confirm(`正在从黑名单中移除次ID：${row.ID}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    return deleteBlackDataApi({ ID: row.ID }).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
getTableData()
formatDateTime
/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageNo, () => paginationData.pageSize], getTableData, {
  immediate: true
})
</script>

<template>
  <el-card shadow="never">
    <div class="toolbar-wrapper">
      <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增谜语</el-button>
    </div>
  </el-card>
  <el-dialog v-model="dialogVisible" title="新增黑名单" @close="resetForm" width="30%">
    <el-form ref="formRef" :model="formData" label-width="100px" label-position="left">
      <el-form-item>
        <el-input v-model="formData.OpenID" autocomplete="off" placeholder="请输入用户数字地址" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleCreate">确认</el-button>
    </template>
  </el-dialog>
  <div>
    <el-table
      max-height="490"
      :data="tableData"
      style="width: 80%"
      :header-cell-style="{
        background: 'rgb(201 191 191 / 41%)'
      }"
    >
      <el-table-column label="ID" prop="ID" />
      <el-table-column label="创建时间" prop="CreatedAt">
        <template v-slot="scope">
          {{ formatDateTime(scope.row.CreatedAt) }}
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="OpenID" />
      <el-table-column label="原因" prop="Reason" />
      <el-table-column label="操作">
        <template v-slot="scope">
          <div class="delete">
            <el-button type="danger" @click="deleteBlack(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
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
