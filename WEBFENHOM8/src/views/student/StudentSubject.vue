<template>
  <div class="ml-16 mt-8">
    <div class="flex justify-between">
      <h1 class="text-5xl font-bold">Choose Subject</h1>
    </div>
    <div class="flex mt-5 gap-10 flex-wrap">

      <el-card v-for="subject in subjectList" :key="subject.name" class="w-[30%] text-3xl rounded-lg">
        <div class="flex">

          <span class="font-medium">{{ subject.name }}</span>
          <RouterLink :to="`exam/${subject.name}`" class="ml-auto">
            <el-button type="primary" size="large" class="text-2xl">Go To Exam
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

const subjectList = ref([{
  name: ''
}])

fetchData()

async function fetchData() {
  await axios.get(apiEndpoint.subject.get_all)
    .then((response) => {
      subjectList.value = response.data
    })
}
</script>