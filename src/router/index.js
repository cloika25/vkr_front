import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import main_page from "@/components/mainPage";
import registration from "@/components/registration";
import login from "@/components/login";
import cabinet from "@/components/cabinet"
import eventForm from "@/components/events/eventForm";
import eventEdit from "@/components/events/eventEdit";
import allEvents from "@/components/allEvents";
import myEvents from "@/components/myEvents";
import personalDataEdit from "@/components/cabinet/personalDataEdit";
import eventPage from "@/components/events/eventPage";
import allStages from "@/components/stages/allStages";
import registerToStage from "@/components/events/registrations/registerToStage";

Vue.use(Router)

function authGuard(from, to, next) {
  store.dispatch(`tryLogin`).then(() => {
    let isAuth = store.getters.isAuth;
    if (isAuth == 'true' || isAuth == true) {
      next();
    } else {
      window.localStorage.clear();
      next({name: 'login'});
    }
  })
}


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
      path: '/all_events',
      name: 'events',
      component: allEvents,
    },
    {
      path: '/createEvent',
      name: 'createEvent',
      component: eventForm,
    },
    {
      path: '/eventEdit/:id',
      name: 'eventEdit',
      beforeEnter: authGuard,
      component: eventEdit,
    },
    {
      path: '/my_events',
      name: 'myEvents',
      beforeEnter: authGuard,
      component: myEvents,
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      beforeEnter: authGuard,
      component: cabinet,
    },
    {
      path: '/personal_data_edit',
      name: 'personalDataEdit',
      beforeEnter: authGuard,
      component: personalDataEdit,
    },
    {
      path: '/event/:id',
      name: 'eventPage',
      component: eventPage
    },
    {
      path: '/stages/:id',
      name: 'myStages',
      beforeEnter: authGuard,
      component: allStages
    },
    {
      path: '/registration_to_stage/:id/:stageId',
      name: 'registerToStage',
      component: registerToStage
    }
  ]
})
