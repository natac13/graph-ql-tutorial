const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = (mode) => {
  return merge([
    {
      mode,
      devtool: 'cheap-module-eval-source-map',
      devServer: {
        contentBase: './build',
        overlay: true,
        port: process.env.PORT,
        historyApiFallback: true,
        hot: true,
        open: true,
        proxy: {
          '/api': `http://localhost:${process.env.SERVER_PORT}`,
        },
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.PUBLIC_URL': JSON.stringify('/'),
        }),
      ],
    },
  ]);
};
