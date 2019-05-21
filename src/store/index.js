import Vue from 'vue';
import Vuex from 'vuex';

import hydraAPI from '@/api';
import hydraClient from './hydraClient';

import devAuth from './modules/developerAuth';
import profiles from './modules/profiles';
import objects from './modules/objects';
import inventory from './modules/inventory';
import leaderboards from './modules/leaderboards';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: (process.env.NODE_ENV !== 'production'),
  modules: {
    devAuth,
    profiles,
    objects,
    inventory,
    leaderboards,
  },
});

store.$hydra = hydraAPI(hydraClient(store));

export default store;
