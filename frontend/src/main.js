import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import naive from 'naive-ui'
import App from './App.vue'
import router from './router'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

const app = createApp(App)
    .use(naive)
    .use(createPinia())
    .use(router)
    .use(VueTailwindDatepicker)
    .mount('#app')


export default app;