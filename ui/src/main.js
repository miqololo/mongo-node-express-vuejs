import Vue from 'vue'
import App from './App.vue'
import Vuefy from 'vuetify'
import router from './router'
import bootstrapVue from 'bootstrap-vue';
import {EagleModal} from 'vue-eagle-modal'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
window.axios = require('axios');

window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};
window.axios.defaults.headers.authorization = 'Auth <authentication_key_for_work_project>';
Vue.config.productionTip = false;
Vue.use(Vuefy);
Vue.use(EagleModal);
Vue.use(bootstrapVue);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
