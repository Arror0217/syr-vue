<script lang="ts" setup>
import { formatDateTime } from "@/utils/index"
import {
  createRiddleTableDataApi,
  updateRiddleTableDataApi,
  getRiddleDataApi,
  deleteRiddleApi
} from "@/api/riddle/index"
import { usePagination } from "@/hooks/usePagination"
import { ref, reactive, watch } from "vue"
import { CirclePlus } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox, type FormInstance } from "element-plus"
import { type IGetRiddleTableData } from "@/api/riddle/types/riddle"
const loading = ref<boolean>(false)
const tableData = ref<IGetRiddleTableData[]>([])

const currentUpdateId = ref<undefined | number>(undefined)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
// 查看
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
//增
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  Content: "",
  expiration_time: 0,
  off_shelf_time: 0
})
const handleCreate = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        createRiddleTableDataApi({
          Content: formData.Content,
          expiration_time: new Date(formData.expiration_time || 0).getTime() / 1000,
          off_shelf_time: new Date(formData.off_shelf_time || 0).getTime() / 1000
        }).then(() => {
          ElMessage.success("新增成功")
          dialogVisible.value = false
          getTableData()
        })
      } else {
        updateRiddleTableDataApi({
          ID: currentUpdateId.value,
          Content: formData.Content,
          expiration_time: new Date(formData.expiration_time || 0).getTime() / 1000,
          off_shelf_time: new Date(formData.off_shelf_time || 0).getTime() / 1000
        }).then(() => {
          ElMessage.success("修改成功")
          dialogVisible.value = false
          getTableData()
        })
      }
    } else {
      return false
    }
  })
}
const resetForm = () => {
  currentUpdateId.value = undefined
  formData.Content = ""
  formData.expiration_time = 0
  formData.off_shelf_time = 0
}
// 改
const handleUpdate = (row: IGetRiddleTableData) => {
  currentUpdateId.value = row.ID
  formData.Content = row.Content
  dialogVisible.value = true
}
//删除
const deleteTableData = (row: IGetRiddleTableData) => {
  ElMessageBox.confirm(`正在删除谜语：${row.Content}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    return deleteRiddleApi({ ID: row.ID }).then(() => {
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
  <div class="contain">
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增谜语</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="currentUpdateId === undefined ? '新增用户' : '修改用户'"
      @close="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" label-width="100px" label-position="left">
        <el-form-item prop="username" label="谜语内容">
          <el-input v-model="formData.Content" placeholder="请输入谜语内容" />
        </el-form-item>
        <el-form-item prop="password" label="过期时间">
          <el-date-picker
            v-model="formData.expiration_time"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 240px"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item prop="username" label="下架时间">
          <el-date-picker
            v-model="formData.off_shelf_time"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 240px"
            placeholder="选择日期时间"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">确认</el-button>
      </template>
    </el-dialog>
    <div class="riddle-table">
      <el-card v-loading="loading" shadow="never">
        <el-table
          height="450px"
          :data="tableData"
          :header-cell-style="{
            background: 'rgb(201 191 191 / 41%)'
          }"
        >
          <el-table-column prop="ID" label="ID" />
          <el-table-column prop="Content" label="谜语" />
          <el-table-column prop="created_at" label="创建时间">
            <template v-slot="scope">
              {{ formatDateTime(scope.row.created_at) }}
            </template>
          </el-table-column>
          <el-table-column prop="public_time" label="公开时间">
            <template v-slot="scope">
              {{ formatDateTime(scope.row.public_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="expiration_time" label="过期时间">
            <template v-slot="scope">
              {{ formatDateTime(scope.row.expiration_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="off_shelf_time" label="下架时间">
            <template v-slot="scope">
              {{ formatDateTime(scope.row.off_shelf_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="is_show" label="状态">
            <template v-slot="scope">
              <el-tag :type="scope.row.is_show ? 'danger' : 'success'" disable-transitions>
                {{ scope.row.is_show ? "已公开" : "未公开" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <div class="button-contain">
                <div class="edit">
                  <el-button class="button-edit" style="margin-right: 20px" @click="handleUpdate(scope.row)">
                    修改
                  </el-button>
                </div>
                <div class="delete" v-if="scope.row.is_show">
                  <el-button type="danger" @click="deleteTableData(scope.row)">隐藏</el-button>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

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
  </div>
</template>
<style lang="scss" scoped>
.contain {
  padding: 0 30px;
}
.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.riddle-table {
  margin: 15px 0;
}
.pager-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
.button-contain {
  display: flex;
}
</style>
