import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuth: false,
        username: '',
    },
    mutations: {
        auth_user(state, username){
            state.isAuth = true;
            state.username = username;
        }
    }
})