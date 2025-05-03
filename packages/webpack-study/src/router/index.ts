import Home from '../pages/home/index.vue';
import Login from '../pages/login/index.vue';

import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/',
            redirect: '/home'
        },
    ]
})

export default router;
