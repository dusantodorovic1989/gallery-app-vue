import Vue from 'vue';
import VueRouter from 'vue-router';
import AppGallery from './components/AppGallery';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import SingleGalleries from './components/SingleGalleries';
import AuthorGallery from './components/AuthorGallery';
import MyGalleries from './components/MyGalleries';
import CreateGallery from './components/CreateGallery';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';



Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
    {
        
        path: '/',
        redirect: 'galleries',
            
        
    },
    {
        
        path: '/galleries',
        name: 'home',
        component: AppGallery,
    
        
    },
    {
        path: '/galleries/:id',
        name: 'single-gallery',
        component: SingleGalleries,
       
    },
    {
        path: '/authors/:id',
        name: 'authors-gallery',
        component: AuthorGallery
    },
    {
        path: '/my-galleries',
        name: 'my-galleries',
        component: MyGalleries
    },
    {
        path: '/create',
        name: 'create-gallery',
        component: CreateGallery,
        meta: {
          auth: true
        }
    },
    {
        path: '/edit-gallery/:id',
        name: 'edit',
        component: CreateGallery,
        meta: {
          auth: true
        }
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: {
            guest: true
        }
       
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: {
            guest: true
        }
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