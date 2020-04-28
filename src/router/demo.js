export default [{
    path: '/',
    name: 'Home',
    component: () => import('../pages/demo/Home.vue')
}, {
    path: '/watch',
    name: 'Watch',
    component: () => import('../pages/demo/Watch.vue')
}]