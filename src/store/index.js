import Vue from 'vue';
import Vuex from 'vuex';

import gifts from './modules/gifts';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    gifts,
  },
});
