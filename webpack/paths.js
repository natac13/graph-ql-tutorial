const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  output: path.resolve(__dirname, '../', 'build'),
  entry: path.resolve(__dirname, '../', 'app/index.js'),
  template: path.resolve(__dirname, '../', 'public/index.html'),
  theme: path.resolve(__dirname, '../', 'app/stylesheets/theme.scss'),
  serverEntry: path.resolve(__dirname, '../', 'server/index.js'),
  appFolder: path.resolve(__dirname, '../', 'app'),
  serverFolder: path.resolve(__dirname, '../', 'server'),
};
