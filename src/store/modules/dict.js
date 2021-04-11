import getResourses from "@/js/axiosWrapper";

const mutations = {
  SET_FORMATS(state, data){
    state.formatsEvent = data;
  }
}

const getters = {
  formats: state => state.formatsEvent,
}

const state = () => ({
  formatsEvent: [],
})

const actions = {
  getFormats({commit}){
    getResourses('GET', 'api/getFormats')
      .then((response) =>{
        commit('SET_FORMATS', response.data)
      })
  },
}

export default {
  namespaced: true,
  mutations,
  getters,
  state,
  actions
}
