const SAVE_INVENTORY = 'SAVE_INVENTORY';

export default {
  namespaced: true,
  state: {
    items: {},
  },
  getters: {
    get: state => ({ slug, accountId }) => {
      const items = state.items[slug] || {};
      return items[accountId] || {};
    },
    all: state => (slug) => {
      const items = state.items[slug];
      return items || {};
    },
  },
  actions: {
    async fetch({ commit }, { slug, accountId }) {
      const data = await this.$hydra.inventory.getBySlug({ slug, accountId });
      commit(SAVE_INVENTORY, { slug, accountId, data });
    },
    lazyFetch({ getters, dispatch }, { slug, accountId }) {
      const profile = getters.get(slug, accountId);
      if (profile !== undefined) {
        return Promise.resolve(profile);
      }
      return dispatch('fetch', { slug, accountId });
    },
  },
  mutations: {
    [SAVE_INVENTORY](state, { slug, accountId, data }) {
      state.items = {
        ...state.items,
        [slug]: {
          ...state.items[slug],
          [accountId]: data,
        },
      };
    },
  },
};
