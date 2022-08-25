import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import naive from 'naive-ui'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(naive)
app.use(createPinia())
app.use(router)
app.mount('#app')


export default app;