import Vue from 'vue';
import VueRouter from 'vue-router';
import AppGalleries from './components/AppGalleries';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

Vue.use(VueRouter);

const routes = [
    {
        name: 'home',
        path: '/',
        component: AppGalleries,
        
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
       
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        
    },
    
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (isAuthenticated && to.meta.guest) {
      return next({ name: 'home' });
    }
    if (!isAuthenticated && to.meta.auth) {
      return next({ name: 'login' });
    }
    return next();
});

export default router;