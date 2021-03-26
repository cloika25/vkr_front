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
        firstName: '',
        lastName: '',
        genderId: null,
        birthDate: null,
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
            localStorage.clear()
        },
        CLEAR_ACCOUNT(state){
            state.isAuth = false;
            state.username = '';
            state.email = '';
            state.firstName = '';
            state.lastName = '';
        },
        SAVE_IN_SESSION_STORAGE(state, auth_token){
            state.token = auth_token;
            localStorage.setItem('auth_token_fqw', auth_token);
        },
        GET_SESSION_STORAGE(state){
            state.token = localStorage.getItem('auth_token_fqw')
        },
        ALL_EVENTS(state, value){
            state.events = value
        },
        SET_CABINET(state, value){
            state.firstName = value.firstName;
            state.lastName = value.lastName;
            state.email = value.email;
            state.genderId = value.genderId;
            state.birthDate = value.birthDate
        }
    },
    actions:{
        // ------ CRUD functional ------
        createEvent({commit}, body) { // eslint-disable-line
            return getResourses('POST', 'api/create_event', body)
        },

        removeEvent({commit}, id){ // eslint-disable-line
            return getResourses('POST', 'api/remove_event', {id: id})
        },

        updateEvent({commit}, data){ // eslint-disable-line
            var formData = new FormData()
            formData.append('Id', data.id)
            formData.append('FullName', data.FullName)
            formData.append('DateClose', data.DateClose)
            formData.append('DateStart', data.DateStart)
            formData.append('PhotoMain', data.PhotoMain)
            formData.append('PhotoPreview', data.PhotoPreview)
            formData.append('Description', data.Description)
            return getResourses('PUT', 'api/update_event', formData)
        },

        getAllEvents({commit}){
            getResourses('GET', 'api/events')
                .then( (response) =>{
                    commit('ALL_EVENTS', response.data);
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

        tryLogin({commit, dispatch}){
            commit('GET_SESSION_STORAGE');
            if (this.state.token != undefined){
                dispatch('account')
            }
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

        setCabinet({commit}, data){
            commit('SET_CABINET', data)
        },

        getCabinet({commit}){
            return getResourses('GET', 'api/cabinet')
                .then((response)=>{
                    commit("SET_CABINET", response.data)
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
            }
        }
    }
})
