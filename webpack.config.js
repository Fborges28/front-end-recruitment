const path = require("path");
const merge = require('webpack-merge');
var webpack = require('webpack');

const parts = require('./webpack.parts');
const webpackPlugins = require('./webpack.plugins');

const PATHS = {
  build: path.resolve(__dirname, 'public')
}

const commonConfig = merge([
  {
    entry: path.resolve(__dirname, 'src/js/app.js'),
    output: {
      path: PATHS.build,
      filename: 'js/bundle.js',
      publicPath: '/'
    },
    module: parts.mainModule(),
    plugins: [
      webpackPlugins.cssPlugin(),
      webpackPlugins.htmlPlugin()
    ]
  }
])

const productionConfig = merge([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  webpackPlugins.clean(PATHS.build),
  webpackPlugins.minifyJavaScript()
])

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT
  }),
  {
    devtool: 'cheap-module-eval-source-map'
  }
])

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}