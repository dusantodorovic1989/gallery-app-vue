import galleriesService from './../services/galleries-service';
export default {
	state: {
			galleries: [],
			userGalleries: [],
			errors: null
	},
	mutations: {
			SET_GALLERIES(state, galleries) {
					state.galleries = galleries;
			},
			SET_USER_GALLERIES(state, userGalleries) {
				state.userGalleries = userGalleries;
			},
			SET_ERRORS(state, payload) {
					state.errors = payload;
			}
	},
	actions: {
		async getGalleries({commit}) {
				try {
					commit('SET_GALLERIES', await galleriesService.getGalleries());
				} catch (error) {
					commit('SET_ERRORS', error)
				}
		},
		async getUsersGalleries({commit}, id, page = 1, term = '') {
			try {
				commit('SET_USER_GALLERIES', await galleriesService.getUsersGalleries(id, page, term));
			} catch (error) {
				commit('SET_ERRORS', error)
			}
		}
	},
	getters: {
		getGalleries(state) {
			return state.galleries;
		},
		getUsersGalleries(state) {
			return state.userGalleries
		}
	}
}



