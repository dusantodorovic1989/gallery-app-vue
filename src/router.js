import Vue from 'vue';
import VueRouter from 'vue-router';
import AppGalleries from './components/AppGalleries';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import SingleGalleries from './components/SingleGalleries'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';



Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
    {
        
            path: '/',
            name: 'home',
            component: AppGalleries
        
    },
    {
        name: 'home',
        path: '/galleries',
        component: AppGalleries,
        // meta: {
        //     auth: false
        // }
        
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        // meta: {
        //     guest: true
        // }
       
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        // meta: {
        //     guest: true
        // }
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