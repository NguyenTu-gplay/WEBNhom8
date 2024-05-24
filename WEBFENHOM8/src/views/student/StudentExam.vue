<template>
  <div class="ml-16 mt-8">
    <h1 class="text-5xl font-bold mb-5">{{ subject }} Exam {{ id }}</h1>
    <div class="flex gap-10">
      <div
        class="flex flex-col bg-white p-5 rounded-xl w-2/3 text-xl border-2 border-red-300 space-y-6"
      >
        <!-- Questions -->
        <div
          :id="'question-' + question.id"
          v-for="question in questionList"
          :key="question.id"
          class="p-4 border-b border-gray-200"
        >
          <p class="mb-4 font-semibold">Question {{ question.id }}: {{ question.qname }}</p>
          <el-radio-group v-model="submitAnswer[question.id]" class="flex flex-col space-y-2 w-fit">
            <el-radio :label="question.optionOne" class="flex items-center">
              <span class="text-xl"> A. {{ question.optionOne }} </span>
            </el-radio>
            <el-radio :label="question.optionTwo" class="flex items-center">
              <span class="text-xl"> B. {{ question.optionTwo }} </span>
            </el-radio>
            <el-radio :label="question.optionThree" class="flex items-center">
              <span class="text-xl"> C. {{ question.optionThree }} </span>
            </el-radio>
            <el-radio :label="question.optionFour" class="flex items-center last">
              <span class="text-xl"> D. {{ question.optionFour }} </span>
            </el-radio>
          </el-radio-group>
        </div>
      </div>

      <!--    timer-->
      <div class="flex flex-col bg-white p-5 rounded-xl w-[25%] text-3xl border-2 border-red-300">
        <div class="ml-2">
          <p class="my-3">Level: {{ examData.level }}</p>
          <p class="my-3">Pass Mark: {{ examData.passMarks }}/{{ examData.marks }}</p>
          <p class="my-3">Exam Description: {{ examData.desc }}</p>
          <div class="flex gap-2 flex-wrap w-full my-5">
            <div v-for="question in questionList" :key="question.id">
              <div
                class="rounded-full flex justify-center items-center bg-red-400 h-16 w-16 text-white text-2xl hover:cursor-pointer"
                @click="scrollToQuestion(question.id)"
              >
                {{ question.id }}
              </div>
            </div>
          </div>
          <p class="my-3">Remaining Time: {{ formatTime(remainingTime) }}</p>
        </div>
        <div class="flex gap-3 justify-center">
          <el-button type="success" class="text-2xl px-8 py-7" @click="submitExam"
            >Submit</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { apiEndpoint, baseUrl } from '@/apiEndpoint.js'
import axios from 'axios'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()
const subject = route.params.subject
const id = route.params.id

const timeAll = ref(0)
const remainingTime = ref(0)
const submitAnswer = ref<{ [key: number]: string }>({})
const questionList = ref([
  {
    id: 0,
    qname: '',
    optionOne: '',
    optionTwo: '',
    optionThree: '',
    optionFour: '',
    answer: '',
    ename: {
      id: 0,
      desc: '',
      marks: '',
      totalQuestion: '',
      passMarks: '',
      level: '',
      totalTime: 0
    }
  }
])

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

fetchData()

async function fetchData() {
  await fetchExamData()
  questionList.value = []
  await axios.get(`${baseUrl}/exam/${id}/question`).then((response) => {
    const raw_data = response.data
    raw_data.map((data: any) => {
      questionList.value.push({
        id: data.id,
        qname: data.qname,
        optionOne: data.optionOne,
        optionTwo: data.optionTwo,
        optionThree: data.optionThree,
        optionFour: data.optionFour,
        answer: data.answer,
        ename: data.ename
      })
    })
  })
  console.log(examData.value)
  timeAll.value = examData.value.totalTime
  remainingTime.value = timeAll.value
  startTimer()
}

const formatTime = (time: any) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

function startTimer() {
  const timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      clearInterval(timer)
      submitExam()
    }
  }, 1000)
}

async function fetchExamData() {
  examData.value = {}
  await axios.get(apiEndpoint.exam.get + id).then((response) => {
    examData.value = response.data
  })
}

async function submitExam() {
  console.log(submitAnswer.value)
  let score = 0
  let status = ''
  questionList.value.map((question) => {
    if (submitAnswer.value[question.id] === question.answer) {
      score++
    }
  })

  if ((score / questionList.value.length) * 10 >= 5) status = 'Pass'
  else status = 'Fail'

  const date = new Date()
  const d = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
  const t = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  let data = {
    status: status,
    score: (score / questionList.value.length) * 10,
    email: {
      email: sessionStorage.getItem('user')
    },
    edate: d + ' ' + t,
    sname: { name: subject },
    totalMarks: 10,
    examId: { id: id },
    totalQuestion: questionList.value.length,
    totalTime: timeAll.value - remainingTime.value
  }
  await axios.post(apiEndpoint.result.create, data)
  await router.push('/result')
}

function scrollToQuestion(id) {
  const element = document.getElementById('question-' + id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
}
</script>

<style scoped>
.last {
  margin-right: auto;
}
</style>
