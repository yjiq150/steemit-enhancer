const path = require('path');

const devCommon = require('./devCommon');

module.exports = {
  ...devCommon,
  devServer: {
    port: 3030,
    publicPath: '/js/', // Make sure publicPath always starts and ends with a forward slash
    contentBase: './dev',
    hot: true
  },
  entry: {
    // array of script file added per entry will be merged to each entry point.
    popup: [path.join(__dirname, '../chrome/extension/popup')],
    background: [path.join(__dirname, '../chrome/extension/background')],
  },
};
