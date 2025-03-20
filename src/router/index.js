import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Login/LoginView.vue';
import DashboardView from '../views/Painel/DashboardView.vue';
import ConfiguracoesView from '../views/Painel/ConfiguracoesView.vue';
import AuthService from '../services/auth.service';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: LoginView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/configuracoes',
      name: 'configuracoes',
      component: ConfiguracoesView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !AuthService.isLoggedIn()) {
    next('/login');
  } else {
    next();
  }
});

export default router;