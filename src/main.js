import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/theme.css'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(router).use(store).mount('#app')

import { useRouter } from 'vue-router'
const router = useRouter()

router.push({ name: 'menu' })           // por nome
router.push('/cart')                    // por path
router.push({ name: 'cart', query: { ref: 'home' } })