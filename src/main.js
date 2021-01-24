import "@/css/app.css"
import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from "@/router/index";
import store from "@/store/index";

import "@/css/app.css";

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
