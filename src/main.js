import Vue from 'vue';
import Buefy from 'buefy';
import app from './views/App.vue';
import router from './router';
import store from './store';
import log from './utils/logger';
import globalMixin from './mixins/global';
import './assets/stylesheets/app.scss';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(log.logger, log.options);
Vue.mixin(globalMixin);

new Vue({
  router,
  store,
  render: h => h(app),
}).$mount('#app');
