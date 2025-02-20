import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import '@/assets/css/global.css'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons'


library.add(faWhatsapp, faInstagram)

createApp(App)
  .use(router)  
  .component('font-awesome-icon', FontAwesomeIcon) 
  .mount('#app');
