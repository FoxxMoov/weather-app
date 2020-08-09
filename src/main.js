import Vue from "vue";
import App from "./App.vue";
import "./assets/css/tailwind.css";
import dayjs from "dayjs";
import fr from "dayjs/locale/fr";

Vue.config.productionTip = false;
Vue.use("tailwind");

dayjs.locale(fr);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
