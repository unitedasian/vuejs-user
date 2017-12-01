const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname + '/index.js'),
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'index.js',
    library: 'uam-vuejs-user',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          postcss: [require('autoprefixer')({browsers: ['>0%']})]
        }
      },
      {
        test: /\.css$/,
        loader: 'style!less!css'
      }
    ]
  },
  externals: {
    bootstrap: 'bootstrap',
    bootstrapVue: 'bootstrap-vue',
    veeValidate: 'vee-validate',
    vueAuthenticate: 'vue-authenticate',
    vueAxios: 'vue-axios',
    vueI18n: 'vue-i18n',
    vueLs: 'vue-ls',
    vuex: 'vuex',
    vue: 'vue'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
}
