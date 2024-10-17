import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// i prepare the routes
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/todolist/:name',
    name: 'todolist',
    component: () => import('../views/ToDoListView.vue'),
    // here i pass a parameter
    props: route => ({ userName: route.params.name })
  },
  {
    path: '/completed/:name',
    name: 'completed',
    component: () => import('../views/CompletedView.vue'),
    // here i pass a parameter
    props: route => ({ userName: route.params.name })
  },
  {
    path: '/error',
    name: 'errorView',
    component: () => import('../views/ErrorView.vue'),
  },
  {
    path: '/comic',
    name: 'comic',
    component: () => import('../views/ComicView.vue')
  }
]

const router = new VueRouter({
  mode: "hash",
  routes
})

export default router
