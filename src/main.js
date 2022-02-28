import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import store from "./store";

Vue.config.productionTip = false;
// Vue.config.globalProperties.$axios = axios;
Vue.prototype.$axios = axios;
new Vue({
  router,
  vuetify,
  axios,
  store,
  render: (h) => h(App),
}).$mount("#app");
