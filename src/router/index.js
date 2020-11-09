import Vue from 'vue'
import Router from 'vue-router'
import main_page from "@/components/main_page";
import registration from "@/components/registration";
import login from "@/components/login";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'main_page',
            component: main_page,
        },
        {
          path: '/registration',
          name: 'registration',
          component: registration,
        },
        {
          path: '/login',
          name: 'login',
          component: login,
        },
        {
            path: '*',
            redirect: '/'
        },
    ]
})