import Axios from 'axios';
import ERR from './hydraErrorCodes';

// Include SESSION_EXPIRED because we want to terminate our session
// client-side if our attempt to renew it fails for whatever reason
const sessionKicks = new Set([
  ERR.INVALID_TOKEN,
  ERR.SESSION_EXPIRED,
  ERR.SESSION_KICKED,
  ERR.SESSION_BANNED,
]);

export default (store) => {

  const client = Axios.create({
    baseURL: process.env.VUE_APP_HYDRA_URL,
    timeout: 30 * 1000,
  });

  client.interceptors.request.use(
    (config) => {
      const token = store.getters['devAuth/accessToken'];
      if (token) {
        // Only attach the environment ID header if we've already authed.
        config.headers['X-Hydra-Environment-ID'] = process.env.VUE_APP_HYDRA_ENV_ID;
        config.headers['X-Hydra-Developer-Access-Token'] = token;
      }
      return config;
    },
    error => Promise.reject(new Error(error)),
  );

  client.interceptors.response.use(
    response => response,
    async (error) => {
      const errorContents = (error && error.response && error.response.data) || {};
      const errorCode = errorContents.hydra_error;
      if (sessionKicks.has(errorCode)) { store.dispatch('devAuth/logOut'); }
      return Promise.reject(
        new Error(errorContents.msg || 'An unknown error occurred.'),
      );
    },
  );

  return client;

};
