import galleriesService from './../services/galleries-sevice';
export default {
	state: {
			galleries: [],
			errors: null
	},
	mutations: {
			SET_GALLERIES(state, galleries) {
					state.galleries = galleries;
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
		}
	},
	getters: {
		getGalleries(state) {
			return state.galleries;
		}
	}
}




