<template>
  <div class="ml-16 mt-8">
    <h1 class="text-5xl font-bold mb-8">Question List</h1>
    <el-table
      :data="questionTableData"
      highlight-current-row
      class="rounded-2xl custom-table"
      style="width: 95%"
      border
    >
      <el-table-column type="index" label="No." width="60" align="center" class="text-2xl" />
      <el-table-column property="name" label="Name" width="300" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.qname }}</span>
        </template>
      </el-table-column>
      <el-table-column property="option1" label="Option 1" width="120" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.optionOne }}</span>
        </template>
      </el-table-column>
      <el-table-column property="option2" label="Option 2" width="120" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.optionTwo }}</span>
        </template>
      </el-table-column>
      <el-table-column property="option3" label="Option 3" width="120" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.optionThree }}</span>
        </template>
      </el-table-column>
      <el-table-column property="option4" label="Option 4" width="120" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.optionFour }}</span>
        </template>
      </el-table-column>
      <el-table-column property="answer" label="Question Answer" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.answer }}</span>
        </template>
      </el-table-column>
      <el-table-column property="subject" label="Subject Name" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.sname }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import axios from 'axios'
import { apiEndpoint } from '@/apiEndpoint'

const questionTableData = ref([{
  id: 0,
  qname: '',
  optionOne: '',
  optionTwo: '',
  optionThree: '',
  optionFour: '',
  answer: '',
  sname: {
    name: ''
  }
}])

fetchTableData()

async function fetchTableData() {
  questionTableData.value = []
  await axios.get(apiEndpoint.question.get_all)
    .then((response) => {
      const rawData = response.data
      questionTableData.value = rawData.map((data: any) => {
        return {
          id: data.id,
          qname: data.qname,
          optionOne: data.optionOne,
          optionTwo: data.optionTwo,
          optionThree: data.optionThree,
          optionFour: data.optionFour,
          answer: data.answer,
          sname: data.sname.name
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