<template>
  <div class="flex bg-red-500 text-white font-bold text-4xl py-4 items-center fixed w-full z-20">
    <img src="/public/logo192.png" alt="" class="w-12 h-12 ml-8 object-cover rounded-lg">
    <h1 class="text-center w-full">PTIT Exam</h1>
    <div class="flex text-2xl font-normal items-center mr-8">
      <span>Admin</span>
      <img src="/public/admin.jpg" alt="" class="w-12 h-12 ml-4 object-cover rounded-full">
    </div>
  </div>
  <div class="w-[300px] pt-24 h-[100vh] flex flex-col bg-white text-2xl fixed">
    <div class="flex flex-col">
      <RouterLink to="/admin/dashboard" class="flex items-center gap-3 pl-8 py-3 hover:bg-[#f5dad7]" active-class="active">
        <span>Dashboard</span>
      </RouterLink>
      <RouterLink to="/admin/subject" class="flex items-center gap-3 pl-8 py-3 hover:bg-[#f5dad7]" active-class="active">
        <span>Subject</span>
      </RouterLink>
      <RouterLink to="/admin/exam" class="flex items-center gap-3 pl-8 py-3 hover:bg-[#f5dad7]" active-class="active">
        <span>Exam</span>
      </RouterLink>
      <RouterLink to="/admin/question" class="flex items-center gap-3 pl-8 py-3 hover:bg-[#f5dad7]" active-class="active">
        <span>Question</span>
      </RouterLink>
      <RouterLink to="/admin/result" class="flex items-center gap-3 pl-8 py-3 hover:bg-[#f5dad7]" active-class="active">
        <span>Result</span>
      </RouterLink>
      <RouterLink to="/admin/student" class="flex items-center gap-3 pl-8 py-3 hover:bg-[#f5dad7]" active-class="active">
        <span>Student List</span>
      </RouterLink>
      <div class="flex items-center gap-3 pl-8 py-3 hover:bg-[#f5dad7] hover:cursor-pointer" @click="logout">
        <span>Logout</span>
      </div>
    </div>
  </div>
  <div class="ml-[300px] pt-24">
    <RouterView />
  </div>
</template>

<script setup lang="ts">

import router from '@/router'

if (sessionStorage.getItem('user') !== 'admin') {
  router.push('/login')
}
function logout() {
  sessionStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.active {
  background-color: #f5dad7;
  font-weight: bold;
}
</style>