const merge = require('webpack-merge');

const commonConfig = require('./common.config');
const productionConfig = require('./prod.config');
const developmentConfig = require('./dev.config');

module.exports = (mode) => {
  if (mode === 'production') {
    return merge(commonConfig(mode), productionConfig(mode));
  }

  return merge(commonConfig(mode), developmentConfig(mode));
};
