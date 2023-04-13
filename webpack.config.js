const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require("path");

module.exports = {
  entry: {
    viper: [path.resolve(__dirname, "src", "viper.js")],
  },
  externals: {
    'fs': 'fs'
  },
  output: {
    clean: true,
    libraryTarget: 'umd',
    globalObject: 'this',

    // path: path.resolve(__dirname, "dist")
  },
  devServer: {
    // static: path.resolve(__dirname, "dist"),
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Viper',
      metaDesc: 'Viper',
      // template: path.resolve(__dirname, "src/index.html"),
      filename: 'index.html',
      inject: 'head',
      minify: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public' }
      ]
    })
  ]
}