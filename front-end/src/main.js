import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import '@/assets/css/global.css'


createApp(App)
  .use(router)  // Não se esqueça de adicionar o Vue Router
  .mount('#app');