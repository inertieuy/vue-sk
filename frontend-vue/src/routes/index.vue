<script>
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '../views/home/index.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import( /* webpackChunkName: "index" */ '../views/auth/register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "create" */ '../views/auth/login.vue')
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes //
})

export default router
</script>