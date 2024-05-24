<template>
  <div class="ml-16 mt-8">
    <el-dialog v-model="addExamVisible" title="Add Question" width="400">
      <el-form :model="examForm">
        <el-form-item label="Subject Name">
          <el-input v-model="examForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Exam Description">
          <el-input v-model="examForm.desc" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Exam Level">
          <el-input v-model="examForm.level" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Total Question">
          <el-input v-model="examForm.totalQuestion" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Time">
          <el-input v-model="examForm.total_time" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addExamVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addExam">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
    <div class="flex justify-between mb-5">
      <h1 class="text-5xl font-bold">Exam List</h1>
      <div>
        <el-button type="success" class="text-2xl py-6 px-5 mr-20" @click="addExamVisible=true">
          Add Exam
        </el-button>
      </div>
    </div>
    <el-table
      :data="examTableData"
      highlight-current-row
      class="rounded-2xl custom-table"
      style="width: 95%"
      border
    >
      <el-table-column type="index" label="No." width="60" align="center" class="text-2xl" />
      <el-table-column property="examName" label="Exam Name" width="200" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.name.name }}</span>
        </template>
      </el-table-column>
      <el-table-column property="examDescription" label="Exam Description" width="200" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column property="examDate" label="Exam Creation Date" width="200" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column property="examLevel" label="Exam Level" width="200" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column property="action" label="Action" align="center">
        <template #default="scope">
          <RouterLink :to='`/admin/exam/detail/${scope.row.id}`'>
            <el-button type="info" size="large" class="text-lg mr-3">Details</el-button>
          </RouterLink>
          <RouterLink :to='`/admin/exam/question/${scope.row.id}`'>
            <el-button size="large" class="text-lg mr-3">View Questions</el-button>
          </RouterLink>
          <el-button type="danger" size="large" class="text-lg" @click="deleteExam(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import axios from 'axios'
import { apiEndpoint } from '@/apiEndpoint'

const addExamVisible = ref(false)

const examForm = ref<{
  name: string,
  desc: string,
  date: string,
  marks: string,
  totalQuestion: string,
  passMarks: string,
  level: string,
  total_time: number
}>({})

const examTableData = ref([{
  id: 1,
  name: {
    name: 'Toan'
  },
  desc: '123',
  date: '24/02/20',
  marks: '10',
  totalQuestion: '12',
  passMarks: '5',
  level: '2',
  totalTime: 13
}])

const questionList = ref([])

fetchTableData()

async function getListQuestion() {
  await axios.get(apiEndpoint.question.get_all)
    .then((response) => {
      questionList.value = response.data
    })
}

async function fetchTableData() {
  await getListQuestion()
  examTableData.value = []
  await axios.get(apiEndpoint.exam.get_all)
    .then((response) => {
      examTableData.value = response.data
    })
}

async function deleteExam(id: number) {
  try {
    for (let i = 0; i < questionList.value.length; i++) {
      if (parseInt(questions[i].exam_id) === parseInt(id)) {
        await axios.delete(apiEndpoint.question.delete + questions[i].id)
      }
    }
  } catch (e) {
    console.log(e)
  }
  await axios.delete(apiEndpoint.exam.delete + id)
  await fetchTableData()

}

async function addExam() {
  const date = new Date()
  const d = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
  const t = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  console.log({
    name: {
      name: examForm.value.name
    },
    desc: examForm.value.desc,
    date: d + ' ' + t,
    totalQuestion: examForm.value.totalQuestion,
    level: examForm.value.level,
    totalTime: examForm.value.total_time
  })
  await axios.post(apiEndpoint.exam.create, {
    name: {
      name: examForm.value.name
    },
    desc: examForm.value.desc,
    date: d + ' ' + t,
    totalQuestion: examForm.value.totalQuestion,
    level: examForm.value.level,
    totalTime: examForm.value.total_time
  })
  addExamVisible.value = false
  await fetchTableData()
}

</script>

<style scoped>
.custom-table > :nth-child(1) > :nth-child(2) {
  font-size: 20px;
}
</style>