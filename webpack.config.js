const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
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
    'vee-validate': 'vee-validate',
    'vue-authenticate': 'vue-authenticate',
    'vue-axios': 'vue-axios',
    'vue-ls': 'vue-ls',
    'vuex': 'vuex',
    'vue': 'vue'
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
