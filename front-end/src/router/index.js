import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/views/LoginForm.vue';
import cadastroForm from '@/views/registerForm.vue';
import userPerfil from '@/views/user_page.vue';
import ContactPage from '@/views/ContactPage.vue'; // Novo
import AboutPage from '@/views/AboutPage.vue'; // Novo
import HelpPage from '@/views/HelpPage.vue'; // Novo
import Index_eco from '@/views/Index.vue';
import UserProfile from '@/views/UserProfile.vue'; 

import '@/assets/css/global.css';

const routes = [
  { path: '/login', component: LoginForm, beforeEnter: () => { console.log('rota acionada') } },
  { path: '/cadastro', component: cadastroForm, beforeEnter: () => { console.log('Cadastro route triggered') } },
  { path: '/feed', component: userPerfil },
  { path: '/Perfil', component: UserProfile },
  { path: '/contato', component: ContactPage }, // Novo
  { path: '/sobre', component: AboutPage }, // Novo
  { path: '/ajuda', component: HelpPage }, // Novo
  { path: '/', component: Index_eco },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
