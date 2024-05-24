<template>
  <div class="ml-16 mt-8">
    <h1 class="text-5xl font-bold mb-8">Result</h1>
    <el-table
      :data="tableData"
      highlight-current-row
      class="rounded-2xl custom-table"
      style="width: 95%"
      border
    >
      <el-table-column type="index" label="No." width="100" align="center" class="text-2xl" />
      <el-table-column property="user-email" label="User email" width="300" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.email.email }}</span>
        </template>
      </el-table-column>
      <el-table-column property="subject" label="Subject" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.sname.name }}</span>
        </template>
      </el-table-column>
      <el-table-column property="exam" label="Exam" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.examId.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column property="exam-date" label="Exam Date" width="300" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.edate }}</span>
        </template>
      </el-table-column>
      <el-table-column property="status" label="Result Status" width="200" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column property="score" label="Score" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column property="time" label="Total Time" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.totalTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import axios from 'axios'
import { apiEndpoint } from '@/apiEndpoint'

const tableData = ref([{
  id: 2,
  status: 'Fail',
  score: '0',
  edate: '22-5-2024 0:8:25',
  totalMarks: '10',
  totalQuestion: '1',
  sname: {
    name: 'Toan'
  },
  examId: {
    id: 1,
    desc: "123",
  },
  totalTime: 6,
  email: {
    name: 'tuan',
    email: 'tuan'
  }
}])

fetchTableData()

async function fetchTableData() {
  tableData.value = []
  await axios.get(apiEndpoint.result.get_all)
    .then((response) => {
      tableData.value = response.data
    })
}
</script>

<style scoped>
.custom-table > :nth-child(1) > :nth-child(2) {
  font-size: 20px;
}
</style>