let path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.devServer = ({ host, port, source } = {}) => ({
  devServer: {
    contentBase: path.join(__dirname, ""),
    compress: true,
    port: 9000,
    historyApiFallback: true
  }
})

const styleLoader = {
  loader: 'style-loader',
  options: {
    sourceMap: true
  }
}

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: false,
    sourceMap: true
  }
}

const sassLoader = {
  loader: 'sass-loader',
  options: {
    implementation: require("sass"),
    sourceMap: true
  }
}

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: true,
    plugins: () => [
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
      })
    ]
  }
}

const fileLoader = {
  test: /\.(jpg|png|gif|svg|pdf|ico)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: '[path][name]-[hash:8].[ext]'
      }
    },
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: '65-90',
          speed: 4
        },
        gifsicle: {
          interlaced: false
        }
      }
    }
  ]
}

exports.mainModule = () => ({
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.(sa|sc|c)ss$/,
      exclude: /\.module\.scss$/,
      use: [devMode ? styleLoader : MiniCssExtractPlugin.loader, CSSLoader, postCSSLoader, sassLoader]
    },
    fileLoader
  ]
})
