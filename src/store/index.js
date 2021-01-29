import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import {base_url} from "@/config";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuth: false,
        username: '',
        events: [],
    },
    mutations: {
        auth_user(state, username){
            state.isAuth = true;
            state.username = username;
        },
        SET_IN_SESSION_STORAGE(state){
            sessionStorage.setItem('username_fqw', state.username);
        },
        ALL_EVENTS(state, value){
            state.events = value
        },
    },
    actions:{
        getAllEvents({commit}){
            axios.get(base_url + '/events')
                .then( Response =>{
                    commit('ALL_EVENTS', Response.data);
                    commit('SAVE_IN_SESSION_STORAGE')
                })
        },
        getUsernameFromStorage({commit}){
            var username = sessionStorage.getItem('username_fqw');
            if (username){
                commit('auth_user', username)
                return true
            }else{
                return false
            }
        },
        createEvent({commit}, body) { // eslint-disable-line
            return axios.post(base_url + '/create_event', body)
        },

        removeEvent({commit}, id){ // eslint-disable-line
            return axios.post(base_url + '/remove_event', {id: id} )

        }
    },
    getters: {
    }
})
