import Vue from 'vue';
import Router from 'vue-router';

import Gift from './views/gift/containers/Gift.vue';
import GiftAdd from './views/gift/containers/GiftAdd.vue';
import GiftEdit from './views/gift/containers/GiftEdit.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/gift', component: Gift },
    { path: '/gift/add', component: GiftAdd },
    { path: '/gift/:id/edit', component: GiftEdit, props: true },
    {
      path: '*',
      redirect: '/gift',
    },
  ],
});
