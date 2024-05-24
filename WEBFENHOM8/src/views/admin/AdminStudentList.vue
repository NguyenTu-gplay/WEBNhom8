<template>
  <div class="ml-16 mt-8">
    <div class="flex justify-between">
      <h1 class="text-5xl font-bold">Student List</h1>
    </div>
    <div class="flex mt-5 gap-10 flex-wrap">

      <el-card v-for="student in studentList" :key="student.name" class="w-[30%] text-3xl rounded-lg">
        <div class="flex items-center">
          <div class="pl-2">
            <p class="font-medium">{{ student.name }}</p>
            <span>Email: </span>
            <span class="font-medium">{{ student.email }}</span>
          </div>
          <RouterLink :to="`/admin/student/result/${student.email}`" class="ml-auto w-1/4  ">

            <el-button type="primary" size="large" class="text-2xl h-full text-wrap"
            >View Result
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

const studentList = ref([
  {
    name: '',
    email: ''
  }
])
fetchData()

async function fetchData() {
  await axios.get(apiEndpoint.user.get_all)
    .then((response) => {
      studentList.value = response.data
    })
}
</script>