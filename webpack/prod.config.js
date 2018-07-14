const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    popup: [path.join(__dirname, '../chrome/extension/popup')],
    background: [path.join(__dirname, '../chrome/extension/background')],
    content: [path.join(__dirname, '../chrome/extension/content')],
    page: [path.join(__dirname, '../chrome/extension/page')]
  },
  output: {
    path: path.join(__dirname, '../build/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  optimization: {
    minimize: true
  },
  resolve: {
    extensions: ['*', '.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react-optimize']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?localIdentName=[name]__[local]___[hash:base64:5]',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'sass-loader',
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: 'url-loader',
          },
        ]
      }
    ]
  }
};
