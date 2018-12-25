import Vue from 'vue';
import VueRouter from 'vue-router';
import AppGalleries from './components/AppGalleries';

Vue.use(VueRouter);

const routes = [
    {
        name: 'galleries',
        path: '/',
        component: AppGalleries
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});


export default router;