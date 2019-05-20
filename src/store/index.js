import Vue from 'vue';
import Vuex from 'vuex';

import hydraAPI from '@/api';
import hydraClient from './hydraClient';

import devAuth from './modules/developerAuth';
import profiles from './modules/profiles';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: (process.env.NODE_ENV !== 'production'),
  modules: {
    devAuth,
    profiles,
  },
});

store.$hydra = hydraAPI(hydraClient(store));

export default store;
