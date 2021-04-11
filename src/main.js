import Vue from 'vue';
import App from './App.vue';
import VueToast from 'vue-toast-notification';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toast-notification/dist/theme-sugar.css';
import router from "@/router/index";
import store from "@/store/index";
import "./font-awesome-4.7.0/css/font-awesome.min.css"
import "@/css/app.css";
import "@/css/common.scss"

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

Vue.directive('click-outside', {
    bind () {
        this.event = event => this.vm.$emit(this.expression, event)
        this.el.addEventListener('click', this.stopProp)
        document.body.addEventListener('click', this.event)
    },
    unbind() {
        this.el.removeEventListener('click', this.stopProp)
        document.body.removeEventListener('click', this.event)
    },

    stopProp(event) { event.stopPropagation() }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
