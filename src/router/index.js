import { createRouter, createWebHashHistory } from "vue-router";

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
}, {
    path: '/watch',
    name: 'Watch',
    component: () => import('../pages/Watch.vue')
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router