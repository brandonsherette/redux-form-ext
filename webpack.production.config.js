const config = require('./config.js');

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dependencies = require('./package.json').dependencies;
const externals = {};
const allDependencies = Object.assign({}, dependencies, {
  /* add css dependencies */
});

for (var extName in allDependencies) {
  externals[extName] = {
    root: (extName === 'react') ? 'React' : extName,
    commonjs: extName,
    commonjs2: extName,
    amd: extName,
  }
};

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
  externals,
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
