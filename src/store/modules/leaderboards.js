const SAVE_LEADERS = 'SAVE_LEADERS';

const cacheKey = ({ objectTypeSlug, leaderboard, grouping }) => [
  objectTypeSlug, leaderboard, JSON.stringify(grouping || {}),
].join('-');

export default {
  namespaced: true,
  state: {
    leaderboards: {},
  },
  getters: {
    get: state => ({ objectTypeSlug, leaderboard, grouping }) => (
      state.leaderboards[cacheKey({ objectTypeSlug, leaderboard, grouping })]
    ),
  },
  actions: {
    async fetchPage({ commit }, { objectTypeSlug, leaderboard, grouping }) {
      const groupingParams = Object.keys(grouping).reduce((memo, key) => {
        memo[`group.${key}`] = grouping[key];
        return memo;
      }, {});
      const leaders = await this.$hydra.leaderboards.fetchPage(
        { objectTypeSlug, leaderboard, params: groupingParams },
      );
      commit(SAVE_LEADERS, {
        objectTypeSlug, leaderboard, grouping, leaders,
      });
    },
    lazyFetchPage({ getters, dispatch }, { objectTypeSlug, leaderboard, grouping }) {
      const leaders = getters.get(cacheKey({ objectTypeSlug, leaderboard, grouping }));
      if (leaders !== undefined) {
        return Promise.resolve(leaders);
      }
      return dispatch('fetchPage', { objectTypeSlug, leaderboard, grouping });
    },
  },
  mutations: {
    [SAVE_LEADERS](state, {
      objectTypeSlug, leaderboard, grouping, leaders,
    }) {
      state.leaderboards = {
        ...state.leaderboards,
        [cacheKey({ objectTypeSlug, leaderboard, grouping })]: leaders,
      };
    },
  },
};
