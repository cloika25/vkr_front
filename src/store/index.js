import Vue from 'vue';
import Vuex from 'vuex';
import getResourses from "@/js/axiosWrapper";
import {media_dir} from "@/config";
import auth from "@/store/modules/auth";
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    photo: null,
    genderId: null,
    birthDate: null,
    events: [],
  },
  mutations: {
    SET_ACCOUNT(state, body) {
      state.username = body.username;
      state.photo = body.photo;
      state.email = body.email;
    },
    CLEAR_ACCOUNT(state) {
      state.username = '';
      state.email = '';
      state.firstName = '';
      state.lastName = '';
    },
    ALL_EVENTS(state, value) {
      state.events = value
    },
    SET_CABINET(state, value) {
      state.firstName = value.firstName;
      state.lastName = value.lastName;
      state.email = value.email;
      state.genderId = value.genderId;
      state.birthDate = value.birthDate;
      state.photo = value.photo;
    },
    SET_AVATAR(state, value) {
      if (value !== '') {
        state.photo = media_dir + value;
      } else {
        state.photo = null;
      }
    },
  },
  actions: {
    // ------ CRUD functional ------
    createEvent({commit}, body) { // eslint-disable-line
      return getResourses('POST', 'api/create_event', body)
    },

    removeEvent({commit}, id) { // eslint-disable-line
      return getResourses('POST', 'api/remove_event', {id: id})
    },

    updateEvent({commit}, data) { // eslint-disable-line
      let formData = new FormData()
      formData.append('Id', data.id)
      formData.append('FullName', data.FullName)
      formData.append('DateClose', data.DateClose)
      formData.append('DateStart', data.DateStart)
      formData.append('PhotoMain', data.PhotoMain)
      formData.append('PhotoPreview', data.PhotoPreview)
      formData.append('Description', data.Description)
      return getResourses('PUT', 'api/update_event', formData)
    },

    getAllEvents({commit}) {
      getResourses('GET', 'api/events')
        .then((response) => {
          commit('ALL_EVENTS', response.data);
        })
        .catch(() => {
            Vue.$toast.error('Произошла ошибка при загрузке мероприятий')
          }
        )
    },
    // ------ CRUD functional END------

    // ------ AUTH api ----------------

    tryLogin({commit, dispatch, getters}) {
      commit('auth/GET_SESSION_STORAGE');
      if (getters.token !== null) {
        dispatch('account')
      }
    },

    login({dispatch}, data) {
      let formData = new FormData()
      formData.append("password", data.password)
      formData.append("username", data.username)
      dispatch('auth/login', formData)
        .then(() => {
          dispatch('account');
          router.push({name: "main_page"})
        })
    },

    logout({commit, dispatch}) {
      dispatch('auth/logout')
        .then(() => {
          commit('CLEAR_ACCOUNT')
          Vue.$toast.success("Успешно вышел)))))")
        })
    },

    registration({commit, dispatch}, data) {
      let formData = new FormData();
      formData.append("username", data.username)
      formData.append("password", data.password)
      dispatch('auth/registration', formData)
        .then((response) => {
          commit('SET_ACCOUNT', response.data)
          router.push({name: "main_page"})
        })
    },

    // ------ AUTH api END ------------


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

    getUsernameFromStorage({commit}) {
      var username = sessionStorage.getItem('username_fqw');
      if (username) {
        commit('auth_user', username)
        return true
      } else {
        return false
      }
    },

    getEvent({commit}, id) { // eslint-disable-line
      return getResourses('POST', 'api/event', {id: id})
    },

    getEventForEdit({commit}, id) { // eslint-disable-line
      return getResourses('POST', 'api/eventForEdit', {id: id})
    },

    setCabinet({commit}, data) {
      commit('SET_CABINET', data)
    },

    getCabinet({commit}) {
      return getResourses('GET', 'api/cabinet')
        .then((response) => {
          commit("SET_CABINET", response.data)
        })
    },

    updateAvatar({dispatch}, data) {
      let formData = new FormData()
      formData.append("photo", data)
      getResourses('POST', 'api/updateAvatar', formData)
        .then(() => {
          console.log("all ok")
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
  },
  getters: {
    getAccount: state => {
      return {
        username: state.username,
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
        genderId: state.genderId,
        birthDate: state.birthDate,
        photo: state.photo,
      }
    },
    token: state => state.auth.token,
    isAuth: state => state.auth.isAuth,
  },
  modules: {
    auth: auth
  },
})
