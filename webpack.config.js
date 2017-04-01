const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'vdom.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'es2015',
              'stage-0'
            ],
            plugins: [
              'transform-runtime',
              ['babel-plugin-root-import', [{
                'rootPathPrefix': '@',
                'rootPathSuffix': 'src'
              }, {
                'rootPathPrefix': '@util',
                'rootPathSuffix': 'src/util'
              }]]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: {except : ['require', 'exports', 'module']}
    })
  ]
};