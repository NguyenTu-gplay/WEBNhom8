<template>
  <div class="ml-16 mt-8">
    <h1 class="text-5xl font-bold mb-8">My Result</h1>
    <el-table
      :data="tableData"
      highlight-current-row
      class="rounded-2xl custom-table"
      style="width: 95%"
      border
    >
      <el-table-column type="index" label="No." width="60" align="center" class="text-2xl" />
      <el-table-column property="user_email" label="User email" width="200" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.email.email }}</span>
        </template>
      </el-table-column>
      <el-table-column property="username" label="Username" width="200" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.sname.name }}</span>
        </template>
      </el-table-column>
      <el-table-column property="examDesc" label="Exam Description" width="200" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.examId.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column property="examDate" label="Exam Date" width="200" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.edate }}</span>
        </template>
      </el-table-column>
      <el-table-column property="status" label="Result Status" width="100" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column property="score" label="Your Score" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column property="totalMark" label="Total Marks" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.totalMarks }}</span>
        </template>
      </el-table-column>
      <el-table-column property="time" label="Total Time" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ formatTime(scope.row.totalTime) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import axios from 'axios'
import { apiEndpoint, baseUrl } from '@/apiEndpoint'

const tableData = ref([{
  id: 2,
  status: 'Fail',
  score: '0',
  edate: '22-5-2024 0:8:25',
  totalMarks: '10',
  totalQuestion: '1',
  email: {
    name: "tuan",
    email: "tuan",
  },
  sname: {
    name: 'Toan'
  },
  examId: {
    id: 1,
    desc: '123'
  },
  totalTime: 6
}])

fetchTableData()

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}



async function fetchTableData() {
  tableData.value = []
  await axios.get(`${baseUrl}/user/${sessionStorage.getItem('user')}/result`)
    .then((response) => {
      const raw_data = response.data
      tableData.value = raw_data.map((data: any) => {
        return {
          id: data.id,
          status: data.status,
          score: data.score,
          edate: data.edate,
          totalMarks: data.totalMarks,
          totalQuestion: data.totalQuestion,
          email: {
            name: data.email.name,
            email: data.email.email
          },
          sname: data.sname,
          examId: {
            id: data.examId.id,
            desc: data.examId.desc
          },
          totalTime: data.totalTime
        }
      })
    })
}

</script>

<style scoped>
.custom-table > :nth-child(1) > :nth-child(2) {
  font-size: 20px;
}
</style>