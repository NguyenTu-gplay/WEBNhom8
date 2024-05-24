<template>
  <div class="ml-16 mt-8">
    <h1 class="text-5xl font-bold">Exam List</h1>
    <RouterLink to="/admin/exam">
      <el-button type="warning" class="text-xl p-5 my-3">Back</el-button>
    </RouterLink>
    <div class="flex bg-white py-10 px-20 text-3xl gap-40 w-fit rounded-3xl border-2 border-red-300 mx-auto">
      <div class="flex flex-col gap-3 font-medium">
        <p>Exam Name:</p>
        <p>Exam Description:</p>
        <p>Exam Creation Date:</p>
        <p>Exam TotalTime:</p>
        <p>Exam TotalQuestion:</p>
        <p>Exam PassMarks:</p>
        <p>Exam Level:</p>
      </div>
      <div class="flex flex-col gap-3 ">
        <p>{{ examData.name.name }}</p>
        <p>{{ examData.desc }}</p>
        <p>{{ examData.date }}</p>
        <p>{{ formatTime(examData.totalTime) }}</p>
        <p>{{ examData.totalQuestion }}</p>
        <p>{{ examData.passMarks }}</p>
        <p>{{ examData.level }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import axios from 'axios'
import { apiEndpoint } from '@/apiEndpoint'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const examData = ref({
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
})

fetchTableData()

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

async function fetchTableData() {
  examData.value = {}
  await axios.get(apiEndpoint.exam.get + id)
    .then((response) => {
      examData.value = response.data
    })
}

</script>

<style scoped>
.custom-table > :nth-child(1) > :nth-child(2) {
  font-size: 20px;
}
</style>