const merge = require('webpack-merge');
const webpack = require('webpack');

// Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const cssnano = require('cssnano');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (mode) => {
  return merge([
    {
      mode,
      optimization: {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            extractComments: true,
          }),
          new OptimizeCssAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: {
              discardComments: { removeAll: true },
              safe: true,
            },
            canPrint: true,
          }),
        ],
      },
      output: {
        chunkFilename: '[name].[chunkhash:6].js',
        filename: '[name].[chunkhash:6].js',
        publicPath: '/weather-app/', // where the generated static files reside. This is the project name for gh-pages
      },
      devtool: 'nosources-source-map',
      plugins: [
        new CopyWebpackPlugin([
          { from: './package.json' },
          { from: './Procfile' },
          { from: './favicon.ico' },
        ]), // copys assets, like photos to the output folder.
        new CleanWebpackPlugin(['build']),
        new Visualizer({ filename: './statistics.html' }),
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        }),
        new DuplicatePackageCheckerPlugin({ verbose: true }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
          'process.env.PUBLIC_URL': JSON.stringify('/weather-app/'),
        }),
      ],
    },
  ]);
};
