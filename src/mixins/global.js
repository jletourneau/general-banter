export default {
  methods: {
    $toDate(str) {
      try {
        return new Date(str.replace(/[+-]00:?00$/, 'Z'));
      } catch (err) {
        return str;
      }
    },
  },
};
