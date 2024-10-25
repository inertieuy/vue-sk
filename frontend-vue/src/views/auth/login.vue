<script setup>

import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import api from '../../service/api'

import Cookies from 'js-cookie'

const router = useRouter()

const user = reactive({
  email: '',
  password: '',
})

const validation = ref([])
const loginFailed = ref([])

const login = async () => {
  await api.post('/api/login', {
    email: user.email,
    password: user.password,
  })
    .then(res => {

      Cookies.set('token', res.data.data.token)
      Cookies.set('user', JSON.stringify(res.data.data.user))

      if (Cookies.get('user')) {
        router.push({ name: 'home' })
      }

    })
    .catch(err => {
      validation.value = err.response.data

      loginFailed.value = err.response.data
    })
}

</script>


<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-4">
      <div class="card border-0 rounded shadow-sm">
        <div class="card-body">
          <h4>LOGIN</h4>
          <hr>
          <div v-if="validation.errors" class="mt-2 alert alert-danger">
            <ul class="mt-0 mb-0">
              <li v-for="(error, index) in validation.errors" :key="index">
                {{ `${error.path} : ${error.msg}` }}
              </li>
            </ul>
          </div>
          <div v-if="loginFailed.message" class="mt-2 alert alert-danger">
            {{ loginFailed.message }}
          </div>
          <form @submit.prevent="login">
            <div class="form-group mb-3">
              <label class="mb-1 fw-bold">Email address</label>
              <input type="email" v-model="user.email" class="form-control" placeholder="Email Address" />
            </div>

            <div class="form-group mb-3">
              <label class="mb-1 fw-bold">Password</label>
              <input type="password" v-model="user.password" class="form-control" placeholder="Password" />
            </div>
            <button type="submit" class="btn btn-primary w-100">LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>