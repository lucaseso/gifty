import Vue from 'vue';
import Router from 'vue-router';

import Gift from './views/Gift.vue';
import GiftAdd from './views/GiftAdd.vue';
import GiftEdit from './views/GiftEdit.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Gift },
    { path: '/gift/add', component: GiftAdd },
    { path: '/gift/:id/edit', component: GiftEdit, props: true },
  ],
});
