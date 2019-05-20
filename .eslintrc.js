const PROD = (process.env.NODE_ENV === 'production');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'no-console': PROD ? 'error' : 'off',
    'no-debugger': PROD ? 'error' : 'off',
    indent: 'off',
    'padded-blocks': 'off',
    'no-param-reassign': ['error', {
      // Allows Vuex to manipulate state.foo.bar etc.
      props: false,
    }],
    'vue/script-indent': ['error', 2, {
      baseIndent: 1,
    }],
    'vue/html-self-closing': ['error', {
      html: { 'void': 'always' },
    }]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
