import Vue from 'vue';
import App from './pages/App.vue';
import router from './router';

new Vue({
    render: h => h(App),
    router
}).$mount('#root')