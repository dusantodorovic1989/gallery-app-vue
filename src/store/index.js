import Vue from 'vue';
import Vuex from 'vuex';

import galleriesStore from './galleries-store';

Vue.use(Vuex)

const store  = new Vuex.Store({
    modules: {
        galleriesStore
    }
});

export default store;