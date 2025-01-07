import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/views/LoginForm.vue';
import cadastroForm from '@/views/registerForm.vue';
import userPerfil from '@/views/user_page.vue';
import Index_eco from '@/views/Index.vue';

import '@/assets/css/global.css'



const routes = [
    {path: '/login', component: LoginForm, beforeEnter: ()=> {console.log('rota acionada')}},
    {path: '/cadastro', component: cadastroForm, beforeEnter: () => { console.log('Cadastro route triggered')}},
    {path: '/perfil', component:userPerfil},
    {path: '/', component:Index_eco},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;