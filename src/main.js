import "@/css/app.css"
import Vue from 'vue';
import App from './App.vue';
import VueToast from 'vue-toast-notification';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toast-notification/dist/theme-sugar.css';
import router from "@/router/index";
import store from "@/store/index";

import "@/css/app.css";

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueToast, {
    position: 'top-right'
});

// Vue.$toast.open(options)
// Vue.$toast.success(message,?options)
// Vue.$toast.error(message,?options)
// Vue.$toast.warning(message,?options)
// Vue.$toast.info(message,?options)
// Vue.$toast.default(message,?options)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
