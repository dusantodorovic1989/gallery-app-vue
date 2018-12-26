import Vue from 'vue';
import Vuex from 'vuex';

import galleriesStore from './galleries-store';
import authStore from './auth-store';

Vue.use(Vuex)

const store  = new Vuex.Store({
    modules: {
        galleriesStore,
        authStore
    }
});

export default store;