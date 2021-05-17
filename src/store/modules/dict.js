import getResourses from "@/js/axiosWrapper";
import eventService from '@/services/eventService'

const mutations = {
  SET_FORMATS(state, data) {
    state.formatsEvent = data;
  },
  SET_EVENTS(state, data) {
    state.events = data
  }
}

const getters = {
  formats: state => state.formatsEvent,
  events: state => state.events,
}

const state = () => ({
  formatsEvent: [],
  events: [],
})

const actions = {
  getFormats({commit}) {
    getResourses('GET', 'api/getFormats')
      .then((response) => {
        commit('SET_FORMATS', response.data)
      })
  },
  getEvents({commit}) {
    eventService.getEvents()
      .then((response => commit('SET_EVENTS', response.data)))
  },
  updateEvent({commit}, data) { // eslint-disable-line
    eventService.saveEvent(data);
  },
}

export default {
  namespaced: true,
  mutations,
  getters,
  state,
  actions
}
