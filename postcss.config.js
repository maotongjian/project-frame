export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      mediaQuery: false,
      exclude: /(node_module)/,
      propList: ['*'],
      replace: true,
      minPixelValue: 1,
    },
  },
};
