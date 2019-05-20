import storage from '../localStorage';

const KEY_AUTH_TOKEN = 'KEY_AUTH_TOKEN';
const KEY_ACCESS_TOKEN = 'KEY_ACCESS_TOKEN';

const SAVE_AUTH_TOKEN = 'SAVE_AUTH_TOKEN';
const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN';
const DROP_ACCESS_TOKEN = 'DROP_ACCESS_TOKEN';
const DROP_AUTH_TOKEN = 'DROP_AUTH_TOKEN';

export default {
  namespaced: true,
  state: {
    authToken: storage.getString(KEY_AUTH_TOKEN),
    accessToken: storage.getString(KEY_ACCESS_TOKEN),
  },
  getters: {
    isLoggedIn: state => !!state.accessToken,
    accessToken: state => state.accessToken,
  },
  actions: {
    async register({ commit }, { email, username, password }) {
      const { authToken, accessToken } = await this.$hydra.auth.register(
        { email, username, password },
      );
      commit(SAVE_AUTH_TOKEN, authToken);
      commit(SAVE_ACCESS_TOKEN, accessToken);
    },
    async logIn({ commit }, { username, password }) {
      const { authToken, accessToken } = await this.$hydra.auth.logIn(
        { username, password },
      );
      commit(SAVE_AUTH_TOKEN, authToken);
      commit(SAVE_ACCESS_TOKEN, accessToken);
    },
    async renewAccess({ commit, state }) {
      // Need to drop old access token before requesting a new one, because
      // Hydra will 401 the request straight up if it gets an expired token
      commit(DROP_ACCESS_TOKEN);
      try {
        commit(SAVE_ACCESS_TOKEN, await this.$hydra.auth.getAccessToken(
          { authToken: state.authToken },
        ));
      } catch (err) { return false; }
      return true;
    },
    logOut({ commit }) {
      commit(DROP_AUTH_TOKEN);
      commit(DROP_ACCESS_TOKEN);
    },
  },
  mutations: {
    [SAVE_AUTH_TOKEN](state, token) {
      state.authToken = token;
      storage.setString(KEY_AUTH_TOKEN, token);
    },
    [SAVE_ACCESS_TOKEN](state, token) {
      state.accessToken = token;
      storage.setString(KEY_ACCESS_TOKEN, token);
    },
    [DROP_AUTH_TOKEN](state) {
      state.authToken = null;
      storage.remove(KEY_AUTH_TOKEN);
    },
    [DROP_ACCESS_TOKEN](state) {
      state.accessToken = null;
      storage.remove(KEY_ACCESS_TOKEN);
    },
  },
};
