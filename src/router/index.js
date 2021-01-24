import Vue from 'vue'
import Router from 'vue-router'
import main_page from "@/components/mainPage";
import registration from "@/components/registration";
import login from "@/components/login";
import eventsPage from "@/components/eventsPage";
import eventForm from "@/components/eventForm";

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
            path: '/my_events',
            name: 'events',
            component: eventsPage,
        },
        {
            path: '/createEvent',
            name: 'createEvent',
            component: eventForm,
        }
        // {
        //     path: '*',
        //     redirect: '/'
        // },
    ]
})
