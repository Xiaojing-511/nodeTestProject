import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/system',
        component: () => import('@/views/System.vue'),
    },
    {
        path: '/student/:ssn',
        component: () => import('@/views/Student.vue'),
    },
    {
        path: '/teacher/:tssn',
        component: () => import('@/views/Teacher.vue'),
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
  });

export default router;