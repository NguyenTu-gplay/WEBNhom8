<template>
  <div class="flex bg-red-500 text-white font-bold text-4xl py-4 items-center fixed w-full z-20">
    <img src="/public/logo192.png" alt="" class="w-12 h-12 ml-8 object-cover rounded-lg">
    <h1 class="text-center w-full">PTIT Exam</h1>
    <div class="flex text-2xl font-normal items-center mr-8">
      <span>Student</span>
      <img src="/public/student.png" alt="" class="w-12 h-12 ml-4 mr-4 object-cover rounded-full">
    </div>
  </div>
  <div class="w-[300px] pt-24 h-[100vh] flex flex-col bg-white text-2xl fixed">
    <div class="flex flex-col">
      <RouterLink to="/subject" class="flex items-center gap-3 pl-8 py-3 hover:bg-[#f5dad7]" active-class="active">
        <span>Subject</span>
      </RouterLink>
      <RouterLink to="/result" class="flex items-center gap-3 pl-8 py-3 hover:bg-[#f5dad7]" active-class="active">
        <span>My Result</span>
      </RouterLink>
      <div class="flex items-center gap-3 pl-8 py-3 hover:bg-[#f5dad7] hover:cursor-pointer" @click="logout">
        Logout
      </div>
    </div>
  </div>
  <div class="ml-[300px] pt-24">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

if (!sessionStorage.getItem('user')) {
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