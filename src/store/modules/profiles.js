const SAVE_PROFILE = 'SAVE_PROFILE';
const DEFAULT_PROFILE = { LOADING: true };

export default {
  namespaced: true,
  state: {
    profiles: {},
  },
  getters: {
    get: state => accountId => state.profiles[accountId] || DEFAULT_PROFILE,
    all: state => state.profiles,
  },
  actions: {
    async list({ commit }, params = {}) {
      const profiles = await this.$hydra.profiles.list(params);
      profiles.forEach((data) => {
        const { profile, account } = data;
        if (!account.id) return;
        profile.account = account;
        commit(SAVE_PROFILE, { profile, accountId: account.id });
      });
    },
    lazyList({ getters, dispatch }, params = {}) {
      const profiles = getters.all;
      if (Object.keys(profiles).length > 0) {
        return Promise.resolve(profiles);
      }
      return dispatch('list', params);
    },
    async fetch({ commit }, accountId) {
      const profile = await this.$hydra.profiles.find(accountId);
      commit(SAVE_PROFILE, { accountId, profile });
    },
    lazyFetch({ getters, dispatch }, accountId) {
      const profile = getters.get(accountId);
      if (profile !== DEFAULT_PROFILE) {
        return Promise.resolve(profile);
      }
      return dispatch('fetch', accountId);
    },
    async updateOps({ commit }, { accountId, operations }) {
      const profile = await this.$hydra.profiles.updateOps(
        accountId,
        operations,
      );
      commit(SAVE_PROFILE, { accountId, profile });
    },
  },
  mutations: {
    [SAVE_PROFILE](state, { profile, accountId }) {
      state.profiles = {
        ...state.profiles,
        [accountId]: profile,
      };
    },
  },
};
