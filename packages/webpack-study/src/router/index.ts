import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/home/index.vue';
import Login from '../pages/login/index.vue';

Vue.use(VueRouter);

const router = new VueRouter({
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