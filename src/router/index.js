import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Estatisticas from '../components/Estatisticas.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/estatisticas', component: Estatisticas },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;