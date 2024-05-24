export const baseUrl = 'http://localhost:8081'

export const apiEndpoint = {
  exam: {
    get_all: baseUrl + '/exam',
    get: baseUrl + '/exam/',
    delete: baseUrl + '/exam/',
    add_question: baseUrl + '/exam/',
    view_question: baseUrl + '/exam/',
    create: baseUrl + '/exam',
  },
  question: {
    get_all: baseUrl + '/question',
    delete: baseUrl + '/question/',
    get: baseUrl + '/question/',
    edit: baseUrl + '/question/',
    create: baseUrl + '/question'
  },
  user: {
    get_all: baseUrl + '/user',
    get: baseUrl + '/user/',
  },
  result: {
    get_all: baseUrl + '/result',
    create: baseUrl + '/result',
  },
  subject: {
    get_all: baseUrl + '/subject',
    delete: baseUrl + '/subject/',
    create: baseUrl + '/subject'
  },
  auth: {
    student_register: baseUrl + '/user',
    student_login: baseUrl + '/user/',
    admin_login: baseUrl + '/admin/'
  }
}