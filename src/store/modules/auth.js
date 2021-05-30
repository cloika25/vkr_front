import getResourses from "@/js/axiosWrapper";
import Vue from 'vue';
import router from "@/router";
import {base_url} from "@/config";

const mutations = {
  CLEAR_TOKEN(state) {
    state.token = null;
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
  SET_ACCOUNT(state, body) {
    state.id = body.id;
    state.username = body.username;
    state.photo = body.photo;
    state.email = body.email;
  },
  SET_CABINET(state, value) {
    if (value.token){
      state.token = value.token;
      state.isAuth = true;
    }
    state.id = value.data.user.id;
    state.firstName = value.data.user.first_name;
    state.lastName = value.data.user.last_name;
    state.email = value.data.user.email;
    state.genderId = value.data.genderId;
    state.birthDate = value.data.birth_date;
    state.photo = value.data.photo;
    state.username = value.data.user.username;
  },
  CLEAR_ACCOUNT(state) {
    state.username = '';
    state.email = '';
    state.firstName = '';
    state.lastName = '';
  },
  SET_AVATAR(state, value) {
    if (value !== '') {
      state.photo = base_url + value;
    } else {
      state.photo = null;
    }
  },
}

const getters = {
  username: state => state.username === ""
    ? "empty profile"
    : state.username,
  isAuth: state => state.isAuth,
  avatarUrl: state => state.photo,
  token: state => state.token,
  getAccount: state => ({
    username: state.username,
    email: state.email,
    firstName: state.firstName,
    lastName: state.lastName,
    genderId: state.genderId,
    birthDate: state.birthDate,
    photo: state.photo,
  }),
}

const state = () => ({
  token: null,
  isAuth: false,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  photo: null,
  genderId: null,
  birthDate: null,
})

const actions = {
  login({commit, dispatch}, data) {
    let formData = new FormData()
    formData.append("password", data.password)
    formData.append("username", data.username)
    return new Promise(() => {
      getResourses('POST', 'auth/token/login', data)
        .then((response) => {
          commit('SAVE_IN_SESSION_STORAGE', response.data.auth_token);
          dispatch('getCabinet');
          router.push({name: "main_page"});
        })
        .catch((error) => {
          Vue.$toast.error(error.response.data)
        })
    })
  },

  logout({commit}) {
    return new Promise(() => {
      getResourses('POST', 'auth/token/logout/', this.state.username)
        .then(() => {
          commit('CLEAR_TOKEN');
          commit('CLEAR_ACCOUNT')
          location.reload()
        })
        .catch(() => {
          Vue.$toast.error('Произошла ошибка при выходе');
        })
    })
  },

  registration({dispatch}, data) {
    return new Promise(() => {
      getResourses('POST', 'auth/users/', data)
        .then(() => {
          dispatch('login', data)
            .then(() => {
            })
        })
        .catch((error) => {
          if (error.response.data.username !== undefined) {
            Vue.$toast.error(error.response.data.username[0]);
          } else {
            Vue.$toast.error(error.response.data.password[0]);
          }
        })
    })
  },
  account({commit, dispatch}) {
    getResourses('GET', 'auth/users/me/')
      .then((account) => {
        let body = account.data
        commit('SET_ACCOUNT', body)
      })
    dispatch('getAvatar');
  },

  getAvatar({commit}) {
    getResourses('GET', 'api/avatar')
      .then((response) => {
        let photoLink = response.data
        commit('SET_AVATAR', photoLink)
      })
  },

  getCabinet({commit}) {
    return getResourses('GET', 'api/profile')
      .then((response) => {
        const token = localStorage.getItem('auth_token_fqw');
        commit("SET_CABINET", {data: response.data[0],token:  token})
      })
  },

  updateAvatar({dispatch}, data) {
    let formData = new FormData()
    formData.append("photo", data)
    getResourses('POST', 'api/updateAvatar', formData)
      .then(() => {
        dispatch('getAvatar')
      })
      .catch((error) => {
        this.$toast.error(error.response)
      })
  },
  removeAvatar({commit}) {
    getResourses('GET', 'api/removeAvatar')
      .then(() => {
        this.$toast.success("Аватарка удалена")
        commit('SET_AVATAR', '')
      })
      .catch((error) => {
        this.$toast.error(error.response)
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
