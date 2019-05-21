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
    path: '/current-season',
    name: 'current-season',
    component: () => import(/* webpackChunkName: "seasons" */ '@/views/CurrentSeason.vue'),
  },
  {
    path: '/last-season',
    name: 'last-season',
    component: () => import(/* webpackChunkName: "seasons" */ '@/views/LastSeason.vue'),
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
