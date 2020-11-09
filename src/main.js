import Vue from 'vue';
import App from './App.vue';
//
// Vue.config.productionTip = false
import router from "@/router/index";
import store from "@/store/index";

import "@/css/app.css";


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");