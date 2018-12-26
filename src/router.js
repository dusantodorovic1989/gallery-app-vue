import Vue from 'vue';
import VueRouter from 'vue-router';
import AppGalleries from './components/AppGalleries';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

Vue.use(VueRouter);

const routes = [
    {
        name: '/',
        path: 'home',
        component: AppGalleries
    },
    {
        name: '/login',
        path: 'login',
        component: Login
    },
    {
        name: '/register',
        path: 'register',
        component: Register
    },
    
];

const router = new VueRouter({
    routes,
    mode: 'history'
});


export default router;