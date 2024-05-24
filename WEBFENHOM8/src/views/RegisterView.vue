<template>
  <div class="bg-red-50 h-screen flex items-center justify-center">
    <div class="bg-white shadow-2xl rounded-3xl w-full max-w-[30%] px-10 pt-16 pb-20 text-xl">
      <div class="flex justify-center mb-4">
        <img src="/public/logo192.png" alt="PTIT Logo" class="h-16 object-cover">
      </div>
      <p class="text-center text-2xl font-semibold text-red-600 mb-6">Sign up</p>
      <div class="space-y-6">
        <div class="relative">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="w-full p-3 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#B7B7B7">
              <path d="M243.92-277.31q54-36.84 112.62-54.77Q415.15-350 480-350t123.46 17.92q58.62 17.93 112.62 54.77 37.3-41 56.61-92.92Q792-422.15 792-480q0-129.67-91.23-220.84-91.23-91.16-221-91.16Q350-792 259-700.84 168-609.67 168-480q0 57.85 19.31 109.77 19.31 51.92 56.61 92.92ZM480-418q-55.77 0-94.88-39.12Q346-496.23 346-552q0-55.77 39.12-94.88Q424.23-686 480-686q55.77 0 94.88 39.12Q614-607.77 614-552q0 55.77-39.12 94.88Q535.77-418 480-418Zm.28 302q-75.43 0-141.78-28.27t-116.15-78.08q-49.81-49.8-78.08-116.11-28.27-66.3-28.27-142 0-75.69 28.27-141.54t78.08-115.65q49.8-49.81 116.11-78.08 66.3-28.27 142-28.27 75.69 0 141.54 28.27t115.65 78.08q49.81 49.8 78.08 115.87Q844-555.7 844-480.28q0 75.43-28.27 141.78t-78.08 116.15q-49.8 49.81-115.87 78.08Q555.7-116 480.28-116Z" />
            </svg>
          </span>
        </div>
        <div class="relative">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full p-3 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#B7B7B7"><path d="M573.33-446.67H760v-66.66H573.33v66.66Zm0-120H760v-66.66H573.33v66.66ZM200-320h320v-20q0-43-43-69.5T360-436q-74 0-117 26.5T200-340v20Zm159.95-169.33q31.05 0 53.22-22.12 22.16-22.11 22.16-53.16 0-31.06-22.11-53.22Q391.11-640 360.05-640q-31.05 0-53.22 22.11-22.16 22.12-22.16 53.17t22.11 53.22q22.11 22.17 53.17 22.17ZM146.67-160q-27 0-46.84-19.83Q80-199.67 80-226.67v-506.66q0-27 19.83-46.84Q119.67-800 146.67-800h666.66q27 0 46.84 19.83Q880-760.33 880-733.33v506.66q0 27-19.83 46.84Q840.33-160 813.33-160H146.67Zm0-66.67h666.66v-506.66H146.67v506.66Zm0 0v-506.66 506.66Z"/></svg>
          </span>
        </div>
        <div class="relative">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full p-3 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a3 3 0 00-3 3v4a3 3 0 003 3h10a3 3 0 003-3v-4a3 3 0 00-3-3h-1V6a4 4 0 00-4-4zM7 6a3 3 0 016 0v2H7V6z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        <div class="relative">
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            class="w-full p-3 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a3 3 0 00-3 3v4a3 3 0 003 3h10a3 3 0 003-3v-4a3 3 0 00-3-3h-1V6a4 4 0 00-4-4zM7 6a3 3 0 016 0v2H7V6z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        <button class="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700" @click="handleRegister">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { apiEndpoint } from '@/apiEndpoint'
import axios from 'axios'
import router from '@/router'

const email = ref('')
const password = ref('')
const username = ref('')
const confirmPassword = ref('')

async function handleRegister() {
  if (password.value !== confirmPassword.value) {
    ElNotification({
      title: 'Error',
      message: 'Password and Confirm Password do not match',
      type: 'error'
    })
    return
  }
  await axios.post(apiEndpoint.auth.student_register,{
    email: email.value,
    password: password.value,
    username: username.value,
  })
    .then(() => {
      ElNotification({
        title: 'Success',
        message: 'Register successfully',
        type: 'success'
      })
      router.push('/login')
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Register failed',
        type: 'error'
      })
    })
}
</script>

<style scoped>

</style>
