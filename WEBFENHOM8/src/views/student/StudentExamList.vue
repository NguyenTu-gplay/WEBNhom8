<template>
  <div class="ml-16 mt-8">
    <div class="flex justify-between">
      <h1 class="text-5xl font-bold">Exams of {{ subject }}</h1>
    </div>
    <div class="flex mt-5 gap-14 flex-wrap">

      <el-card v-for="exam in examList" :key="exam.id" class="w-[45%] text-3xl rounded-lg">
        <div class="flex items-center">
          <div class="flex flex-col pl-5 gap-3">

            <p class="font-normal">Exam Description: <strong> {{ exam.desc }} </strong></p>
            <p class="font-normal">Total Questions: <strong>{{ exam.totalQuestion }}</strong></p>
            <p class="font-normal">Total Time: <strong>{{ formatTime(exam.totalTime) }}</strong></p>
          </div>
          <RouterLink :to="`/exam/${subject}/${exam.id}`" class="ml-auto">
            <el-button type="primary" size="large" class="text-3xl py-10 px-5">Practice
            </el-button>
          </RouterLink>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { apiEndpoint } from '@/apiEndpoint.js'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const subject = route.params.subject
const examList = ref([{
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

fetchData()

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

async function fetchData() {
  examList.value = []
  await axios.get(apiEndpoint.exam.get_all)
    .then((response) => {
      const raw_data = response.data
      raw_data.map((exam) => {
        if (exam.name.name == subject) examList.value.push(exam)
      })
    })
}
</script>