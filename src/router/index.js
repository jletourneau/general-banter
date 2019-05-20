import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: { public: true },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    meta: { public: true },
  },
];

const router = new Router({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'is-active',
});

router.beforeEach((to, from, next) => {
  const defaultPrivate = true;
  const loginRoute = { name: 'home' };
  const requireAuth = (
    defaultPrivate
      ? !to.matched.some(record => record.meta.public)
      : to.matched.some(record => record.meta.private)
  );
  if (!requireAuth || store.getters['devAuth/isLoggedIn']) {
    next();
  } else {
    next(loginRoute);
  }
});

export default router;
