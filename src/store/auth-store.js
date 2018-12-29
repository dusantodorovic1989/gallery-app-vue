import authService from './../services/auth-service';
import router from './../router';

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  if(user) {
    return (user);

  }
};

// const getUserFromLocalStorage = () => {
//   const json = localStorage.getItem('user')
//   return JSON.parse(json.user || '{}')
// }

export default {
  state: {
    user: getUserFromLocalStorage(),
    errors: null
  },
  mutations: {
    SET_DATA(state, user ) {
      (state.user = user), (state.errors = null);
    },
    SET_ERRORS(state, errors) {
      state.errors = errors;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        commit('SET_DATA', await authService.login(email, password));
        router.push({ name: 'home' });
      } catch (error) {
        commit('SET_ERRORS', error.response.data.message);
      }
    },
    async register({ commit }, user) {
      try {
        commit('SET_DATA', await authService.register(user));
        router.push({ name: 'home' });
      } catch (error) {
        commit('SET_ERRORS', error);
      }
    },

    logout({ commit }) {
      authService.setAuthHeaders();
      localStorage.removeItem('user');
      localStorage.removeItem('token')
      commit('SET_DATA', {user:null, token:null});
      router.push({ name: '/' });
    },

    
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getErrors(state) {
      return state.errors;
    }
  }
};