const SAVE_OBJECTS = 'SAVE_OBJECTS';
const SAVE_OBJECT = 'SAVE_OBJECT';

export default {
  namespaced: true,
  state: {
    objects: {},
  },
  getters: {
    get: state => (slug, id) => (state.objects[slug] || {})[id],
    all: state => slug => state.objects[slug],
  },
  actions: {
    async list({ commit }, { slug, params }) {
      const objects = await this.$hydra.objects.list(slug, params);
      commit(SAVE_OBJECTS, { slug, objects });
    },
    lazyList({ getters, dispatch }, { slug, params }) {
      const objects = getters.all(slug);
      if (objects !== undefined) {
        return Promise.resolve(objects);
      }
      return dispatch('list', { slug, params });
    },
    async fetch({ commit }, { slug, id, params }) {
      const object = await this.$hydra.objects.find(slug, id, params);
      commit(SAVE_OBJECT, { slug, object });
    },
    lazyFetch({ getters, dispatch }, { slug, id, params }) {
      const object = getters.get(slug, id);
      if (object !== undefined) {
        return Promise.resolve(object);
      }
      return dispatch('fetch', { slug, id, params });
    },
  },
  mutations: {
    [SAVE_OBJECTS](state, { slug, objects }) {
      state.objects = {
        ...state.objects,
        [slug]: objects.reduce((memo, obj) => {
          memo[obj.id] = obj;
          return memo;
        }, {}),
      };
    },
    [SAVE_OBJECT](state, { slug, object }) {
      state.objects = {
        ...state.objects,
        [slug]: {
          ...state.objects[slug],
          [object.id]: object,
        },
      };
    },
  },
};
