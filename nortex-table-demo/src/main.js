import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import VTooltip from 'v-tooltip'
Vue.use(VTooltip);

import Multiselect from 'vue-multiselect/dist/vue-multiselect.min'
Vue.component('multiselect', Multiselect);

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
