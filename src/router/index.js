import { createRouter, createWebHashHistory } from "vue-router";

import routes  from './demo';

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router