const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(require('./webpack.base'), {
  context: __dirname,

  entry: ['./scss/main.scss', './src/index.js'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'uam-vue-user',
    libraryTarget: 'umd',
  },

  externals: {
    'vue': 'vue',
    'vue-authenticate': 'vue-authenticate',
    'vue-axios': 'vue-axios',
    'vue-ls': 'vue-ls',
    'vuex': 'vuex'
  }
})
