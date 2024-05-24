<template>
  <div class="ml-16 mt-8">
    <h1 class="text-5xl font-bold">Dashboard</h1>
    <div class="flex gap-6 text-white text-3xl mt-5">
      <RouterLink
        to="/admin/exam"
        class="flex border-2 border-blue-500 rounded-2xl bg-blue-400 w-[30%] px-10 py-8 items-center hover:shadow-2xl transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 -960 960 960" width="80px" fill="#fff"><path d="M197.69-140q-23.75 0-40.72-16.97T140-197.69v-564.62q0-23.75 16.97-40.72T197.69-820h205q-1.92-32.31 20.85-56.15Q446.31-900 480.19-900q33.89 0 56.66 23.85 22.76 23.84 20.46 56.15h205q23.75 0 40.72 16.97T820-762.31v564.62q0 23.75-16.97 40.72T762.31-140H197.69ZM290-294.62h254.92V-340H290v45.38Zm0-162.69h380v-45.38H290v45.38ZM290-620h380v-45.38H290V-620Zm190-171.23q13.62 0 23.73-9.92 10.12-9.93 10.12-23.93 0-13.61-10.12-23.53-10.11-9.93-23.73-9.93-13.62 0-23.54 9.93-9.92 9.92-9.92 23.53 0 14 9.92 23.93 9.92 9.92 23.54 9.92Z"/></svg>
        <span class="pl-7 w-[60%]">We have total <strong>{{ totalExam }}</strong> exams</span>
      </RouterLink>
      <RouterLink
        to="/admin/question"
        class="flex border-2 border-orange-500 rounded-2xl bg-orange-400 w-[30%] px-10 py-8 items-center hover:shadow-2xl transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 -960 960 960" width="80px" fill="#fff"><path d="M478.54-261.77q13.31 0 22.77-9.27 9.46-9.27 9.46-22.58 0-13.3-9.46-22.77-9.46-9.46-22.77-9.46-13.31 0-22.58 9.46-9.27 9.47-9.27 22.77 0 13.31 9.27 22.58 9.27 9.27 22.58 9.27Zm-26.08-138.77h43.92q.39-27.92 10.2-46.08 9.8-18.15 34.03-42.38 30.7-30.31 43.12-54.27 12.42-23.96 12.42-50.81 0-49.92-32.46-79.38-32.46-29.46-84.31-29.46-45.61 0-79.03 22.96-33.43 22.96-49.27 59.42l41.84 17.77q13.62-26.08 34.27-40.77 20.66-14.69 52.19-14.69 35.85 0 54.35 18.69t18.5 46.69q0 20.77-10.81 38.31-10.8 17.54-34.11 39.46-35.08 33.85-44.96 57.89-9.89 24.04-9.89 56.65ZM197.69-140q-23.61 0-40.65-17.04T140-197.69v-564.62q0-23.61 17.04-40.65T197.69-820h564.62q23.61 0 40.65 17.04T820-762.31v564.62q0 23.61-17.04 40.65T762.31-140H197.69Z"/></svg>
        <span class="pl-7 w-[60%]">We have total <strong>{{ totalQuestion }}</strong> questions</span>
      </RouterLink>
      <RouterLink
        to="/admin/student"
        class="flex border-2 border-green-500 rounded-2xl bg-green-400 w-[30%] px-10 py-8 items-center hover:shadow-2xl transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 -960 960 960" width="80px" fill="#fff"><path d="M70.31-187.69v-75.93q0-31.53 16.27-55.8 16.27-24.27 45.55-37.15 64.95-28.51 118.64-42.51 53.69-14 119.54-14 66.23 0 119.42 14t118.52 42.51q28.9 12.88 45.48 37.15 16.58 24.27 16.58 55.8v75.93h-600Zm665.38 0v-74.77q0-53.39-24.86-89.07-24.87-35.69-64.98-58.39 53.23 7.61 101.15 20.81 47.92 13.19 80.15 29.73 28.39 15.92 45.46 40.9 17.08 24.99 17.08 56.02v74.77h-154ZM370.31-492.92q-57.75 0-95.22-37.47-37.47-37.48-37.47-95.22 0-58.14 37.47-95.42t95.22-37.28q58.13 0 95.41 37.28Q503-683.75 503-625.61q0 57.74-37.28 95.22-37.28 37.47-95.41 37.47Zm316.15-132.69q0 57.74-37.28 95.22-37.28 37.47-95.41 37.47-6.77 0-14.5-.93-7.73-.92-14.5-3.38 21.43-23.37 32.52-56.12 11.09-32.75 11.09-72.31 0-39.57-11.53-70.61-11.54-31.04-32.08-58.11 6.38-1.46 14.5-2.7 8.11-1.23 14.5-1.23 58.13 0 95.41 37.28 37.28 37.28 37.28 95.42Z"/></svg>
        <span class="pl-7 w-[60%]">We have total <strong>{{ totalUser }}</strong> users</span>
      </RouterLink>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { apiEndpoint } from '@/apiEndpoint.js'
import axios from 'axios'

const totalExam = ref(0)
const totalQuestion = ref(0)
const totalUser = ref(0)

fetchData()

async function fetchData() {
  await axios.get(apiEndpoint.exam.get_all)
    .then((response) => {
      totalExam.value = response.data.length
    })
  await axios.get(apiEndpoint.question.get_all)
    .then((response) => {
      totalQuestion.value = response.data.length
    })
  await axios.get(apiEndpoint.user.get_all)
    .then((response) => {
      totalUser.value = response.data.length
    })
}
</script>