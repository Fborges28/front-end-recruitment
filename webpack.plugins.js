const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production'

console.log(devMode)

let path = require('path');

exports.htmlPlugin = () => new HtmlWebpackPlugin({
  // Load a custom template (lodash by default)
  title: 'Netshoes',
  template: './src/index.html',
  filename: './index.html' // relative to root of the application
})

exports.cssPlugin = () => new MiniCssExtractPlugin({
  filename: devMode ? '[name].css' : '[name].[hash].css',
  chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
});

exports.minifyJavaScript = () => ({
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new UglifyWebpackPlugin({ 
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        } 
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
})

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin([path])]
})
