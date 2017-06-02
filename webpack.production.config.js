const config = require('./config.js');

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app/' + config.libraryName + '/index.js',
  devtool: false,
  output: {
    path: __dirname + '/dist',
    filename: config.outputFile,
    library: config.libraryClassName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    'classnames': {
      root: 'classnames',
      commonjs2: 'classnames',
      commonjs: 'classnames',
      amd: 'classnames'
    },
    'prop-types': {
      root: 'prop-types',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types'
    },
    'rc-slider': {
      root: 'rc-slider',
      commonjs2: 'rc-slider',
      commonjs: 'rc-slider',
      amd: 'rc-slider'
    },
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-addons-css-transition-group': {
      root: 'react-addons-css-transition-group',
      commonjs2: 'react-addons-css-transition-group',
      commonjs: 'react-addons-css-transition-group',
      amd: 'react-addons-css-transition-group',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'react-redux': {
      root: 'react-redux',
      commonjs2: 'react-redux',
      commonjs: 'react-redux',
      amd: 'react-redux',
    },
    'react-select': {
      root: 'react-select',
      commonjs2: 'react-select',
      commonjs: 'react-select',
      amd: 'react-select'
    },
    'redux': {
      root: 'redux',
      commonjs2: 'redux',
      commonjs: 'redux',
      amd: 'redux'
    },
    'redux-form': {
      root: 'redux-form',
      commonjs2: 'redux-form',
      commonjs: 'redux-form',
      amd: 'redux-form'
    },
    'redux-logger': {
      root: 'logger',
      commonjs2: 'redux-logger',
      commonjs: 'redux-logger',
      amd: 'redux-logger',
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            }, {
              loader: 'resolve-url-loader'
            }, {
              loader: 'sass-loader',
              options: {
                includePaths: ['src/styles/scss/abstract/'],
                url: false
              }
            }],
        })
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=10000',
        options: {
          includePaths: ['images/']
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: [
    new ExtractTextPlugin('./' + config.libraryName + '.css')
  ]
};
