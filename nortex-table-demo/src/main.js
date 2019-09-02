import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

Vue.config.productionTip = false;

import VTooltip from "v-tooltip";
import "./assets/tooltip.scss";
import "./assets/simple-line-icons.scss";
Vue.use(VTooltip);

import Multiselect from "vue-multiselect/dist/vue-multiselect.min";
Vue.component("multiselect", Multiselect);

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
Vue.component("VueCtkDateTimePicker", VueCtkDateTimePicker);

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
window.axios = axios;
axios.defaults.headers.common["Accept"] = "application/json";

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
