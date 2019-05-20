const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ['**/*.{vue,css,scss,sass}'],
      }),
    ],
  },
  devServer: {
    port: process.env.PORT || 3000,
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/stylesheets/_global.scss";',
      },
    },
  },
};
