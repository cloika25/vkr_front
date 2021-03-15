import Vue from 'vue';
import Vuex from 'vuex';
import router from "@/router/index"
import getResourses from "@/js/axiosWrapper";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuth: false,
        username: '',
        email: '',
        events: [],
        token: '',
    },
    mutations: {
        SET_ACCOUNT(state, body){
            state.isAuth = true;
            state.username = body.username;
            state.email = body.email;
        },
        CLEAR_TOKEN(state){
            state.token = '';
        },
        CLEAR_ACCOUNT(state){
            state.isAuth = false;
            state.username = '';
            state.email = '';
        },
        SAVE_IN_SESSION_STORAGE(state, auth_token){
            state.token = auth_token;
            sessionStorage.setItem('auth_token_fqw', auth_token);
        },
        GET_SESSION_STORAGE(state){
            state.token = sessionStorage.getItem('auth_token_fqw')
        },
        ALL_EVENTS(state, value){
            state.events = value
        },
    },
    actions:{
        // ------ CRUD functional ------
        createEvent({commit}, body) { // eslint-disable-line
            return getResourses('POST', 'api/create_event', body)
        },

        removeEvent({commit}, id){ // eslint-disable-line
            return getResourses('POST', 'api/remove_event', {id: id})
        },

        updateEvent({commit}, id, body){ // eslint-disable-line
            return getResourses('POST', 'api/update_event', body)
        },

        getAllEvents({commit}){
            getResourses('GET', 'api/events')
                .then( Response =>{
                    commit('ALL_EVENTS', Response.data);
                })
                .catch(()=>{
                        Vue.$toast.error('Произошла ошибка при загрузке мероприятий')
                    }
                )
        },

        // ------ CRUD functional END------
        registration({commit}, data){
            let body = {
                username: data.username,
                password: data.password
            }
            getResourses('POST','auth/users/', body)
                .then((response)=>{
                    commit('SET_ACCOUNT', response.data)
                })
                .catch((error)=>{
                    console.log(error.response)
                    if (error.response.data.username != undefined){
                        Vue.$toast.error(error.response.data.username[0]);
                    }else{
                        Vue.$toast.error(error.response.data.password[0]);
                    }
                })
        },

        login({commit, dispatch}, data){
            commit('CLEAR_TOKEN');
            getResourses('POST', 'auth/token/login', data)
                .then((response)=>{
                    commit('SAVE_IN_SESSION_STORAGE', response.data.auth_token);
                    dispatch('account');
                    router.push({name: "main_page"})
                })
                .catch((error)=>{
                    console.log(error)
                    Vue.$toast.error()
                })
        },

        logout({commit}){
            getResourses('POST', 'auth/token/logout/', this.state.username)
            commit('CLEAR_ACCOUNT')
            commit('CLEAR_TOKEN')
        },

        account({commit}){ // eslint-disable-line
            getResourses('GET', 'auth/users/me/')
                .then((account)=>{
                    let body = account.data
                    commit('SET_ACCOUNT', body)
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

        getEvent({commit}, id){ // eslint-disable-line
            return getResourses('POST', 'api/event', {id: id})
        },
    },
    getters: {
    }
})
