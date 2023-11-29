import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import ('../views/HeroView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login.vue')
    },
      {
        path: '/registro',
        name: 'registro',
        component: () => import('../views/RegistroView.vue')
      },
      {
        path: '/CursosRecomendados',
        name: 'CursosRecomendados',
        component: () => import('../views/CursosrecView.vue')
      },
      {
        path: '/CursosRecomendados/Curso1',
        name: 'Curso1',
        component: () => import ('../views/Curso1View.vue')
      },
      {
        path: '/CursosRecomendados/Curso2',
        name: 'Curso2',
        component: () => import ('../views/Curso2View.vue')
      },
      {
        path: '/CursosRecomendados/Curso3',
        name: 'Curso3',
        component: () => import ('../views/Curso3View.vue')
      },
      {
        path: '/CursosRecomendados/Curso4',
        name: 'Curso4',
        component: () => import ('../views/Curso4View.vue')
      },
      {
        path: '/CursosRecomendados/Curso5',
        name: 'Curso5',
        component: () => import ('../views/Curso5View.vue')
      },
      {
        path: '/CursosRecomendados/Curso6',
        name: 'Curso6',
        component: () => import ('../views/Curso6View.vue')
      }
      ,
      {
        path: '/CursosRecomendados/Perfil',
        name: 'Perfil',
        component: () => import ('../views/PerfilView.vue')
      }
  ]
})
export default router
