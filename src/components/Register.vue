<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="name"
            type="text"
            class="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Name"
          />
          <p v-if="fieldErrors.name" class="text-red-500 text-sm">{{ fieldErrors.name[0] }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Email"
          />
          <p v-if="fieldErrors.email" class="text-red-500 text-sm">{{ fieldErrors.email[0] }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            class="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Password"
          />
          <p v-if="fieldErrors.password" class="text-red-500 text-sm">{{ fieldErrors.password[0] }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Confirm Password</label
          >
          <input
            v-model="password_confirmation"
            type="password"
            class="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Confirm Password"
          />
          <p v-if="fieldErrors.password_confirmation" class="text-red-500 text-sm">{{ fieldErrors.password_confirmation[0] }}</p>
        </div>
        <p class="text-red-500 text-sm" v-if="error">{{ error }}</p>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
      <p>
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
import { inject } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const error = ref('')
const fieldErrors = ref({})
const router = useRouter()
const toastr = inject('toastr')

const handleRegister = async () => {
  error.value = ''
  fieldErrors.value = {}
  try {
    const response = await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation:password_confirmation.value
    })
    if (response.data.success==true) {
      toastr.success(response.data.message)
      router.push('/login')
    }
  } catch (err) {
    if (err.response?.status === 422) {
      fieldErrors.value = err.response.data.errors
    } else {
      error.value = err.response?.data?.message || 'Register failed'
    }
  }
}
</script>

