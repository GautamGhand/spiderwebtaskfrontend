import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

toastr.options = {
    closeButton: true,
    positionClass: 'toast-top-right',
    timeOut: 3000,
    progressBar: true,
  }

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('toastr', toastr)

app.mount('#app')
