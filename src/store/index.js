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
        ALL_EVENTS(state, value){
            state.events = value
        }
    },
    actions:{
        getAllEvents({commit}){
            axios.get(base_url + '/events')
                .then( Response =>{
                    commit('ALL_EVENTS', Response.data);
                })
        },
        createEvent({commit}, body, nextPage = 'my_events'){
            axios.post(base_url + '/create_event', body)
                .then(
                    this.$router.push(nextPage)
                )
                .catch(error =>{
                    console.log(error)
                })
        }
    },
    getters: {
    }
})
