import Vue from 'vue';
import Vuex from 'vuex';
import getResourses from "@/js/axiosWrapper";
import auth from "@/store/modules/auth";
import dict from "@/store/modules/dict";
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    createEvent({commit}, body) { // eslint-disable-line
      return getResourses('POST', 'api/events', body)
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

    getEvent({commit}, id) { // eslint-disable-line
      return getResourses('GET', 'api/event/'+ id)
    },

    getEventForEdit({commit}, id) { // eslint-disable-line
      return getResourses('POST', 'api/eventForEdit', {id: id})
    },
  },
  getters: {
    getFIO: state => state.auth.firstName + " " + state.auth.lastName,
    genderName: state => state.auth.genderId === 1 ? "Мужской" : "Женский",
    birthDate: state => state.auth.birthDate,
  },
  modules: {
    auth: auth,
    dict: dict
  },
})
