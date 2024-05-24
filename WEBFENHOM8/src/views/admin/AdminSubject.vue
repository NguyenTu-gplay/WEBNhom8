<template>
  <div class="ml-16 mt-8">
    <div class="flex justify-between">
      <el-dialog v-model="dialogCreateVisible" title="Add Subject" width="400">
        <el-form :model="subjectForm">
          <el-form-item label="Name">
            <el-input v-model="subjectForm.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogCreateVisible = false">Cancel</el-button>
            <el-button type="primary" @click="createSubject">
              Confirm
            </el-button>
          </div>
        </template>
      </el-dialog>
      <h1 class="text-5xl font-bold">Subject List</h1>
      <div>
        <el-button type="success" class="text-2xl py-6 px-5 mr-16" @click="dialogCreateVisible=true">
          Add Subject
        </el-button>
      </div>
    </div>
    <div class="flex mt-5 gap-10 flex-wrap">

      <el-card v-for="subject in subjectList" :key="subject.name" class="w-[30%] text-3xl rounded-lg">
        <div class="flex">

          <span class="font-medium">{{ subject.name }}</span>
          <el-button type="danger" size="large" class="text-2xl ml-auto" @click="deleteSubject(subject.name)">Delete
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { apiEndpoint } from '@/apiEndpoint.js'
import axios from 'axios'

const dialogCreateVisible = ref(false)
const subjectList = ref([{
  name: ''
}])
const subjectForm = ref({
  name: ''
})
fetchData()

async function fetchData() {
  await axios.get(apiEndpoint.subject.get_all)
    .then((response) => {
      subjectList.value = response.data
    })
}

async function createSubject() {
  await axios.post(apiEndpoint.subject.create, {
    name: subjectForm.value.name
  })
    .then(() => {
      fetchData()
      dialogCreateVisible.value = false
    })
}

async function deleteSubject(subject: string) {
  await axios.delete(apiEndpoint.subject.delete + subject)
    .then(() => {
      fetchData()
    })
}
</script>