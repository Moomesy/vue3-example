import { createRouter, createWebHashHistory } from "vue-router";

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('../pages/HelloWorld.vue')
}, {
    path: '/about',
    name: 'About',
    component: () => import('../pages/HelloWorld2.vue')
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router