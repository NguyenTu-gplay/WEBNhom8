import AdminLayout from '@/layouts/AdminLayout.vue'
import StudentLayout from '@/layouts/StudentLayout.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/admin/AdminDashboard.vue'
import ExamView from '@/views/admin/AdminExam.vue'
import ResultView from '@/views/admin/AdminResult.vue'
import StudentListView from '@/views/admin/AdminStudentList.vue'
import SubjectView from '@/views/admin/AdminSubject.vue'
import ChooseSubjectView from '@/views/student/StudentSubject.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MyResultView from '@/views/student/StudentResult.vue'
import QuestionView from '@/views/admin/AdminQuestion.vue'
import RegisterView from '@/views/RegisterView.vue'
import AdminExamDetail from '@/views/admin/AdminExamDetail.vue'
import AdminQuestionExam from '@/views/admin/AdminQuestionExam.vue'
import StudentExamList from '@/views/student/StudentExamList.vue'
import StudentExam from '@/views/student/StudentExam.vue'
import AdminStudentResult from '@/views/admin/AdminStudentResultDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'student',
      redirect: '/subject',
      component: StudentLayout,
      children: [
        {
          path: '/subject',
          component: ChooseSubjectView,
        },
        {
          path: '/result',
          component: MyResultView,
        },
        {
          path: '/exam/:subject',
          component: StudentExamList,
        },
        {
          path: '/exam/:subject/:id',
          component: StudentExam,
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/dashboard',
      component: AdminLayout,
      children: [
        {
          path: 'dashboard',
          component: DashboardView
        },
        {
          path: 'subject',
          component: SubjectView
        },
        {
          path: 'exam',
          component: ExamView
        },
        {
          path: 'exam/detail/:id',
          component: AdminExamDetail,
        },
        {
          path: 'exam/question/:id',
          component: AdminQuestionExam,
        },
        {
          path: 'result',
          component: ResultView
        },
        {
          path: 'question',
          component: QuestionView,
        },
        {
          path: 'student',
          component: StudentListView
        },
        {
          path: 'student/result/:email',
          component: AdminStudentResult
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

export default router
