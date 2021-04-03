import getResourses from "@/js/axiosWrapper";
import Vue from 'vue';

const mutations = {
  CLEAR_TOKEN(state) {
    state.token = null;
    localStorage.clear();
    state.isAuth = false;
  },
  SAVE_IN_SESSION_STORAGE(state, auth_token) {
    state.isAuth = true;
    state.token = auth_token;
    localStorage.setItem('auth_token_fqw', auth_token);
  },
  GET_SESSION_STORAGE(state) {
    state.token = localStorage.getItem('auth_token_fqw')
    if (state.token !== null) {
      state.isAuth = true;
    }
  },
}

const getters = {}

const state = () => ({
  token: null,
  isAuth: false,
})

const actions = {
  login({commit}, data) {
    commit('CLEAR_TOKEN');
    return new Promise((resolve, reject) => {
      getResourses('POST', 'auth/token/login', data)
        .then((response) => {
          commit('SAVE_IN_SESSION_STORAGE', response.data.auth_token);
          resolve(response);
        })
        .catch((error) => {
          console.log(error)
          Vue.$toast.error(error.response.data)
          reject(error)
        })
    })
  },

  logout({commit}) {
    return new Promise((resolve, reject) => {
      getResourses('POST', 'auth/token/logout/', this.state.username)
        .then(() => {
          commit('CLEAR_TOKEN');
          resolve();
        })
        .catch(() => {
          Vue.$toast.error('Произошла ошибка при выходе');
          reject();
        })
    })
  },
  registration({dispatch}, data) {
    return new Promise((resolve, reject) => {
      getResourses('POST', 'auth/users/', data)
        .then((response) => {
          dispatch('login', data)
            .then(() => {
              resolve(response);
            })
        })
        .catch((error) => {
          console.log(error.response)
          if (error.response.data.username !== undefined) {
            Vue.$toast.error(error.response.data.username[0]);
          } else {
            Vue.$toast.error(error.response.data.password[0]);
          }
          reject();
        })
    })
  }
}

export default {
  namespaced: true,
  mutations,
  getters,
  state,
  actions
}
