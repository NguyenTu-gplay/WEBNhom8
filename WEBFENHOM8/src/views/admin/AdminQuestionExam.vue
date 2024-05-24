<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import { apiEndpoint, baseUrl } from '@/apiEndpoint'

const route = useRoute()
const addQuestionVisible = ref(false)
const editQuestionVisible = ref(false)
const currentEditId = ref(0)
const id = route.params.id
const questionForm = ref<{
  answer: string;
  ename: {
    id: string
  },
  optionFour: string;
  optionOne: string;
  optionThree: string;
  optionTwo: string;
  qname: string;
  sname: {
    name: string
  },
}>()

const questionData = ref([{
  id: 0,
  qname: '',
  optionOne: '',
  optionTwo: '',
  optionThree: '',
  optionFour: '',
  answer: '',
  ename: { id: '' },
  sname: {
    name: ''
  }
}])

fetchQuestionData()

async function fetchQuestionData() {
  await axios.get(`${baseUrl}/exam/${id}/question`)
    .then((response) => {
      questionData.value = response.data
    })
}

async function deleteQuestion(id: number) {
  await axios.delete(apiEndpoint.question.delete + id)
    .then(() => {
      fetchQuestionData()
    })
}

async function showAddQuestionDialog() {
  addQuestionVisible.value = true
  questionForm.value = {
    qname: '',
    optionOne: '',
    optionTwo: '',
    optionThree: '',
    optionFour: '',
    answer: '',
    ename: { id: '' },
    sname: {
      sname: ''
    },
    name: ''
  }
  await addQuestion()
}

async function addQuestion() {
  questionForm.value.ename.id = id
  questionForm.value.name = questionForm.value.sname.sname
  console.log(questionForm.value)
  await axios.post(apiEndpoint.question.create, {
    qname: questionForm.value.qname,
    optionOne: questionForm.value.optionOne,
    optionTwo: questionForm.value.optionTwo,
    optionThree: questionForm.value.optionThree,
    optionFour: questionForm.value.optionFour,
    answer: questionForm.value.answer,
    sname: { name: questionForm.value?.sname.name },
    ename: { id: questionForm.value?.ename.id }
  })
    .then(() => {
      fetchQuestionData()
      addQuestionVisible.value = false
    })
}

function showEditDialog(id: number) {
  currentEditId.value = id
  editQuestionVisible.value = true
  const question = questionData.value.find((question) => question.id === id)
  if (question) {
    questionForm.value = {
      qname: question.qname,
      optionOne: question.optionOne,
      optionTwo: question.optionTwo,
      optionThree: question.optionThree,
      optionFour: question.optionFour,
      answer: question.answer,
      ename: { id: question.ename.id },
      sname: { name: question.sname.name }
    }
  }
}

async function editQuestion() {
  console.log(questionForm.value)
  await axios.put(apiEndpoint.question.edit + currentEditId.value, {
    qname: questionForm.value.qname,
    optionOne: questionForm.value.optionOne,
    optionTwo: questionForm.value.optionTwo,
    optionThree: questionForm.value.optionThree,
    optionFour: questionForm.value.optionFour,
    answer: questionForm.value.answer,
    sname: { name: questionForm.value.sname.name },
    ename: { id: questionForm.value.ename.id }
  })
    .then(() => {
      fetchQuestionData()
      editQuestionVisible.value = false
    })
}

</script>

<template>
  <div class="ml-16 mt-8">
    <el-dialog v-model="addQuestionVisible" title="Add Question" width="400">
      <el-form :model="questionForm">
        <el-form-item label="Question Name">
          <el-input v-model="questionForm.qname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Option A">
          <el-input v-model="questionForm.optionOne" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Option B">
          <el-input v-model="questionForm.optionTwo" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Option C">
          <el-input v-model="questionForm.optionThree" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Option D">
          <el-input v-model="questionForm.optionFour" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Answer">
          <el-select v-model="questionForm.answer">
            <el-option :value="questionForm.optionOne" label="A"></el-option>
            <el-option :value="questionForm.optionTwo" label="B"></el-option>
            <el-option :value="questionForm.optionThree" label="C"></el-option>
            <el-option :value="questionForm.optionFour" label="D"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Subject">
          <el-input v-model="questionForm.sname.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addQuestionVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addQuestion">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="editQuestionVisible" title="Edit Question" width="400">
      <el-form :model="questionForm">
        <el-form-item label="Question Name">
          <el-input v-model="questionForm.qname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Option A">
          <el-input v-model="questionForm.optionOne" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Option B">
          <el-input v-model="questionForm.optionTwo" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Option C">
          <el-input v-model="questionForm.optionThree" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Option D">
          <el-input v-model="questionForm.optionFour" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Answer">
          <el-select v-model="questionForm.answer">
            <el-option :value="questionForm.optionOne" label="A"></el-option>
            <el-option :value="questionForm.optionTwo" label="B"></el-option>
            <el-option :value="questionForm.optionThree" label="C"></el-option>
            <el-option :value="questionForm.optionFour" label="D"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Subject">
          <el-input v-model="questionForm.sname.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editQuestionVisible = false">Cancel</el-button>
          <el-button type="primary" @click="editQuestion">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>


    <h1 class="text-5xl font-bold">Questions List</h1>
    <div class="flex justify-between">

      <RouterLink to="/admin/exam">
        <el-button type="warning" class="text-xl p-5 my-3">Back</el-button>
      </RouterLink>
      <el-button type="success" class="text-2xl py-6 px-5 mr-20" @click="showAddQuestionDialog">
        Add Question
      </el-button>
    </div>
    <el-table
      :data="questionData"
      highlight-current-row
      class="rounded-2xl custom-table"
      style="width: 95%"
      border
    >
      <el-table-column type="index" label="No." width="60" align="center" class="text-2xl" />
      <el-table-column property="name" label="Name" width="200" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.qname }}</span>
        </template>
      </el-table-column>
      <el-table-column property="option1" label="Option 1" width="150" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.optionOne }}</span>
        </template>
      </el-table-column>
      <el-table-column property="option2" label="Option 2" width="150" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.optionTwo }}</span>
        </template>
      </el-table-column>
      <el-table-column property="option3" label="Option 3" width="150" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.optionThree }}</span>
        </template>
      </el-table-column>
      <el-table-column property="option4" label="Option 4" width="150" align="center">
        <template #default="scope">
          <span class="text-xl ">{{ scope.row.optionFour }}</span>
        </template>
      </el-table-column>
      <el-table-column property="answer" label="Answer" width="150" align="center">
        <template #default="scope">
          <span class="text-xl">{{ scope.row.answer }}</span>
        </template>
      </el-table-column>
      <el-table-column property="action" label="Action" align="center">
        <template #default="scope">
          <el-button type="primary" size="large" class="text-lg" @click="showEditDialog(scope.row.id)">Edit</el-button>
          <el-button type="danger" size="large" class="text-lg" @click="deleteQuestion(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.custom-table > :nth-child(1) > :nth-child(2) {
  font-size: 20px;
}
</style>