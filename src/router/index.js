import Vue from 'vue'
import Router from 'vue-router'
import main_page from "@/views/mainPage";
import registration from "@/views/registration";
import login from "@/views/login";
import cabinet from "@/components/cabinet"
import eventForm from "@/components/events/eventForm";
import eventEdit from "@/components/events/eventEdit";
import allEvents from "@/components/allEvents";
import myEvents from "@/components/myEvents";
import personalDataEdit from "@/components/cabinet/personalDataEdit";
import eventPage from "@/components/events/eventPage";
import allStages from "@/components/stages/allStages";
import registerToStage from "@/components/events/registrations/registerToStage";
import eventParticipants from "@/components/events/eventParticipants";
import MainLayout from "@/views/Layout/MainLayout";

Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'main_page',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'main_page',
          component: main_page,
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
          component: eventEdit,
        },
        {
          path: '/my_events',
          name: 'myEvents',
          component: myEvents,
        },
        {
          path: '/cabinet',
          name: 'cabinet',
          component: cabinet,
        },
        {
          path: '/personal_data_edit',
          name: 'personalDataEdit',
          component: personalDataEdit,
        },
        {
          path: '/event/:id',
          name: 'eventPage',
          component: eventPage
        },
        {
          path: '/event/:id/participants',
          name: 'eventParticipants',
          component: eventParticipants
        },
        {
          path: '/stages/:id',
          name: 'myStages',
          component: allStages
        },
        {
          path: '/registration_to_stage/:id/:stageId',
          name: 'registerToStage',
          component: registerToStage
        }
      ]
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
  ]
})

