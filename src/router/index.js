import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/todolist/:name',
    name: 'todolist',
    component: () => import('../views/ToDoListView.vue'),
    props: route => ({ userName: route.params.name })
  },
  {
    path: '/completed/:name',
    name: 'completed',
    component: () => import('../views/CompletedView.vue'),
    props: route => ({ userName: route.params.name })
  },
  {
    path: '/error',
    name: 'errorView',
    component: () => import('../views/ErrorView.vue'),
  },

]

const router = new VueRouter({
  mode: "hash",
  routes
})

export default router
