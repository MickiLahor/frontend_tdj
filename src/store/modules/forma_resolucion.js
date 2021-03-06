import axios from 'axios';

const state = {
	formasResoluciones: [],
	paginationFormaRes: null,
	formaResolucion: null,
	isLoadingFormaRes: false,
	isModalVisibleFormaRes: false,
	isSavingFormaRes: false,
	isEditModeFormaRes: false,
}

const mutations = {
	SET_FORMAS_RESOLUCIONES: (state, items) => {
		state.formasResoluciones = items
	},

	SET_PAGINATE_FORMA_RES: (state, pagination) => {
		state.paginationFormaRes = pagination
	},

	SET_FORMA_RESOLUCION: (state, item) => {
		state.formaResolucion = item
	},

	SET_IS_LOADING_FORMA_RES(state, value) {
		state.isLoadingFormaRes = value
	},

	SET_MODAL_VISIBLE_FORMA_RES(state, value) {
		state.isModalVisibleFormaRes = value;
	},

	SET_SAVING_FORMA_RES(state, value) {
		state.isSavingFormaRes = value;
	},

	SET_EDIT_MODE_FORMA_RES(state, value) {
		state.isEditModeFormaRes = value;
	},

	INSERT_FORMA_RESOLUCION: (state, item) => {
		//state.formasResoluciones.unshift(item);
		state.formasResoluciones.push(item);
	},

	UPDATE_FORMA_RESOLUCION: (state, item) => {
		let index = state.formasResoluciones.findIndex(x => x.idFormaResolucion === item.idFormaResolucion);
		console.log(index);
		if(index > -1) {
			state.formasResoluciones[index] = item;
		}
	},

	DELETE_FORMA_RESOLUCION: (state, id) => {
		let index = state.formasResoluciones.findIndex(x => x.idFormaResolucion === id);
		if(index > -1) {
			state.formasResoluciones.splice(index, 1);
		}
	},
}

const actions = {
	async fetchAllFormasResoluciones({ commit }, params = null) {
		let page = '';
		let search = '';
		if(params !== null){
			page = params.page;
			search = params.search;
		}

		commit('SET_IS_LOADING_FORMA_RES', true);
		let url = `${process.env.VUE_APP_API_URL}formas_resoluciones`;
		/*if (search == "") {
			url = `${url}?page=${page}`;
		}
		else {
			url = `${url}?page=${page}&search=${search}`;
		}*/

		await axios.get(url)
		.then(res => {
			//console.log(res.data);
			const lista = res.data;
			commit('SET_FORMAS_RESOLUCIONES', lista);
			commit('SET_IS_LOADING_FORMA_RES', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_FORMA_RES', false);
		});
	},

	async fetchDetailFormaResolucion({ commit }, id) {
		commit('SET_IS_LOADING_FORMA_RES', true);
		await axios.get(`${process.env.VUE_APP_API_URL}formas_resoluciones/${id}`)
		.then(res => {
			commit('SET_FORMA_RESOLUCION', res.data);
			commit('SET_IS_LOADING_FORMA_RES', false);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_IS_LOADING_FORMA_RES', false);
		});
	},

	async storeFormaResolucion({ commit }, item) {
		commit('SET_SAVING_FORMA_RES', true);
		await axios.post(`${process.env.VUE_APP_API_URL}formas_resoluciones`, item)
		.then(res => {
			setTimeout(function() {
				commit('INSERT_FORMA_RESOLUCION', res.data);
				commit('SET_SAVING_FORMA_RES', false);
				commit('SET_MODAL_VISIBLE_FORMA_RES', false);
			}, 500);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_FORMA_RES', false);
		});
	},

	async updateFormaResolucion({ commit }, item) {
		commit('SET_SAVING_FORMA_RES', true);
		await axios.put(`${process.env.VUE_APP_API_URL}formas_resoluciones`, item)
		.then(res => {
			setTimeout(function() {
				commit('UPDATE_FORMA_RESOLUCION', res.data);
				commit('SET_SAVING_FORMA_RES', false);
				commit('SET_MODAL_VISIBLE_FORMA_RES', false);
			}, 500);
		})
		.catch(err => {
			console.log('error', err);
			commit('SET_SAVING_FORMA_RES', false);
		});
	},

	async deleteFormaResolucion({ commit }, id) {
		await axios.delete(`${process.env.VUE_APP_API_URL}formas_resoluciones/${id}`)
		.then(res => {
			commit('DELETE_FORMA_RESOLUCION', id);
		})
		.catch(err => {
			console.log('error', err);
		});
	},
}

const getters = {
	formasResoluciones: state => state.formasResoluciones,
	paginationFormaRes: state => state.paginationFormaRes,
	formaResolucion: state => state.formaResolucion,
	isLoadingFormaRes: state => state.isLoadingFormaRes,
	isModalVisibleFormaRes: state => state.isModalVisibleFormaRes,
	isSavingFormaRes: state => state.isSavingFormaRes,
	isEditModeFormaRes: state => state.isEditModeFormaRes,
}

const formaResolucionModule = {
	state,
	mutations,
	actions,
	getters
}

export default formaResolucionModule;