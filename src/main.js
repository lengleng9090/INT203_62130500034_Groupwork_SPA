import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import NavigationBar from '@/components/NavigationBar.vue'

createApp(App).use(router).component('navigation-bar', NavigationBar).mount('#app')
