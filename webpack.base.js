const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "uam-vuejs-user.css",
  disable: process.env.NODE_ENV === "development"
})

module.exports = {
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        test: /\.js/
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
  plugins: [
    extractSass
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': './src'
    }
  }
}
