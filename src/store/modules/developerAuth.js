import storage from '../localStorage';

const KEY_DEV_ACCESS_TOKEN = 'KEY_DEV_ACCESS_TOKEN';

const SAVE_DEV_ACCESS_TOKEN = 'SAVE_DEV_ACCESS_TOKEN';
const DROP_DEV_ACCESS_TOKEN = 'DROP_DEV_ACCESS_TOKEN';

export default {
  namespaced: true,
  state: {
    accessToken: storage.getString(KEY_DEV_ACCESS_TOKEN),
  },
  getters: {
    isLoggedIn: state => !!state.accessToken,
    accessToken: state => state.accessToken,
  },
  actions: {
    async logIn({ commit }, { username, password }) {
      const { accessToken } = await this.$hydra.devAuth.logIn(
        { username, password },
      );
      commit(SAVE_DEV_ACCESS_TOKEN, accessToken);
    },
    logOut({ commit }) {
      commit(DROP_DEV_ACCESS_TOKEN);
    },
  },
  mutations: {
    [SAVE_DEV_ACCESS_TOKEN](state, token) {
      state.accessToken = token;
      storage.setString(KEY_DEV_ACCESS_TOKEN, token);
    },
    [DROP_DEV_ACCESS_TOKEN](state) {
      state.accessToken = null;
      storage.remove(KEY_DEV_ACCESS_TOKEN);
    },
  },
};
