const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = [{
  entry: './src/client/client.js',
  output: {
    path: path.resolve(__dirname, 'dist', 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { 
        test: /\.(js)$/, 
        use: 'babel-loader', 
        exclude: /node_modules/ 
      },
    ],
  },
  // plugins: [
  //   new CleanWebpackPlugin('dist'),
  // ],
}, {
  entry: './src/server/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  target: 'node',
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  }
}];