import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import '@/assets/css/global.css'

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>

createApp(App)
  .use(router)  // Não se esqueça de adicionar o Vue Router
  .mount('#app');