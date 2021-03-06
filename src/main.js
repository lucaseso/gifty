import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';

import router from './router';
import store from './store';

import Vuelidate from 'vuelidate';

import vuetify from './plugins/vuetify';
import '@/assets/custom.css';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
