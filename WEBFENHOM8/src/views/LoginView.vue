<template>
  <div class="h-screen flex items-center justify-center">
    <div class="bg-white border-2 border-red-400 rounded-3xl w-full h-[65%] max-w-[30%] px-10 pt-16 pb-20 text-xl">
      <div class="flex justify-center mb-4">
        <img src="/public/logo192.png" alt="PTIT Logo" class="h-16 object-cover">
      </div>
      <p class="text-center text-2xl font-semibold text-red-600 mb-6">Log in</p>
      <el-select v-model="role" placeholder="Select Role" size="large" class="mb-4 role-select">
        <el-option label="Student" value="student" />
        <el-option label="Admin" value="admin" />
      </el-select>
      <div class="space-y-4">
        <div class="relative">
          <input
            v-model="username"
            type="email"
            placeholder="Email"
            class="w-full p-3 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#B7B7B7">
              <path
                d="M243.92-277.31q54-36.84 112.62-54.77Q415.15-350 480-350t123.46 17.92q58.62 17.93 112.62 54.77 37.3-41 56.61-92.92Q792-422.15 792-480q0-129.67-91.23-220.84-91.23-91.16-221-91.16Q350-792 259-700.84 168-609.67 168-480q0 57.85 19.31 109.77 19.31 51.92 56.61 92.92ZM480-418q-55.77 0-94.88-39.12Q346-496.23 346-552q0-55.77 39.12-94.88Q424.23-686 480-686q55.77 0 94.88 39.12Q614-607.77 614-552q0 55.77-39.12 94.88Q535.77-418 480-418Zm.28 302q-75.43 0-141.78-28.27t-116.15-78.08q-49.81-49.8-78.08-116.11-28.27-66.3-28.27-142 0-75.69 28.27-141.54t78.08-115.65q49.8-49.81 116.11-78.08 66.3-28.27 142-28.27 75.69 0 141.54 28.27t115.65 78.08q49.81 49.8 78.08 115.87Q844-555.7 844-480.28q0 75.43-28.27 141.78t-78.08 116.15q-49.8 49.81-115.87 78.08Q555.7-116 480.28-116Z" />
            </svg>
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
              <path fill-rule="evenodd"
                    d="M10 2a4 4 0 00-4 4v2H5a3 3 0 00-3 3v4a3 3 0 003 3h10a3 3 0 003-3v-4a3 3 0 00-3-3h-1V6a4 4 0 00-4-4zM7 6a3 3 0 016 0v2H7V6z"
                    clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        <button class="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700" @click="handleLogin">Login</button>
        <div class="relative">
          <RouterLink to="/register" class="w-full">
            <button v-show="role === 'student'"
                    class="w-full border-2 border-red-600 text-red-600 p-3 rounded-md hover:text-white hover:bg-red-700">
              Register
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { apiEndpoint } from '@/apiEndpoint'
import router from '@/router'
import { ElNotification } from 'element-plus'

const username = ref('')
const password = ref('')
const role = ref('student')

async function handleLogin() {
  if (role.value == 'admin') {
    await axios.get(apiEndpoint.auth.admin_login + username.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const raw_data = response.data
        if (raw_data && raw_data.password == password.value) {
          sessionStorage.setItem('user', 'admin')
          router.push('/admin/dashboard')
        } else {
          ElNotification({
            title: 'Error',
            message: 'Wrong Username or Password',
            type: 'error'
          })
        }
      })
      .catch((error) => {
        console.log(error)
        ElNotification({
          title: 'Error',
          message: 'Login Failed',
          type: 'error'
        })
      })
  } else if (role.value == 'student') {
    await axios.get(apiEndpoint.auth.student_login + username.value)
      .then((response) => {
        const raw_data = response.data
        if (raw_data && raw_data.password == password.value) {
          sessionStorage.setItem('user', username.value)
          router.push('/subject')
        } else {
          ElNotification({
            title: 'Error',
            message: 'Wrong Username or Password',
            type: 'error'
          })
        }
      })
      .catch((error) => {
        console.log(error)
        ElNotification({
          title: 'Error',
          message: 'Login Failed',
          type: 'error'
        })
      })
  }
}
</script>

<style scoped>
</style>
