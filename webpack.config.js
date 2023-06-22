const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require("path");

module.exports = {
  entry: {
    viper: [path.resolve(__dirname, "src", "viper.js")],
  },
  externals: {
    'fs': 'fs',
    'window': 'window'
  },
  output: {
    clean: true,
    libraryTarget: 'umd',
    globalObject: 'this',
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    // static: path.resolve(__dirname, "dist"),
    open: true
  },
  node: {
    __dirname: false,   // this configuration ensures you get the actual directory path
    __filename: false,  // this configuration ensures you get the actual file path
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Viper',
      metaDesc: 'Viper',
      template: path.resolve(__dirname, "src/index.ejs"),
      filename: 'index.html',
      inject: false,
      minify: false,
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Viper',
      metaDesc: 'Viper',
      template: path.resolve(__dirname, "src/grid.ejs"),
      filename: 'grid.html',
      inject: false,
      minify: false,
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: 'public' }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: true,
            },
          },
        ],
      },
    ]
  }
}