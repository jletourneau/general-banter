import Vue from 'vue';
import Buefy from 'buefy';
import app from './views/App.vue';
import router from './router';
import store from './store';
import log from './utils/logger';
import './assets/stylesheets/app.scss';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(log.logger, log.options);

new Vue({
  router,
  store,
  render: h => h(app),
}).$mount('#app');
