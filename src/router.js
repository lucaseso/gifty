import Vue from 'vue';
import Router from 'vue-router';

import Presente from './views/Presente.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{ path: '/', component: Presente }],
});
