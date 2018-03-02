const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack')

const extractSass = new ExtractTextPlugin({
  filename: "user.css"
})

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  parallel: true,
  sourceMap : true
})

const plugins = [
  extractSass
]

if (process.env.NODE_ENV === "production") {
  plugins.push(uglifyPlugin)
}

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        },
        test: /\.(js|vue)$/
      },
      {
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        test: /\.js$/
      },
      {
        exclude: /node_modules/,
        loader: 'vue-loader',
        test: /\.vue$/
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      }
    ]
  },
  plugins,
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': './src'
    }
  }
}
