import Vue from 'vue';
import VueRouter from 'vue-router';
import AppGalleries from './components/AppGalleries';
import SingleGalleries from './components/SingleGalleries'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';



Vue.use(BootstrapVue);
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
    {
        path: '/galleries/:id',
        name: 'single-gallery',
        component: SingleGalleries,
       
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