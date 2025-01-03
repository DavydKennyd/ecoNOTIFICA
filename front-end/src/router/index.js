import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import cadastroForm from '@/components/registerForm.vue';


const routes = [
    {path: '/login', component: LoginForm, beforeEnter: ()=> {console.log('rota acionada')}},
    {path: '/cadastro', component: cadastroForm, beforeEnter: () => { console.log('Cadastro route triggered')}},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;