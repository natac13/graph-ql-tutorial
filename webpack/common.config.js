const webpack = require('webpack');
// import webpack from 'webpack';
const merge = require('webpack-merge');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('./paths.js');

require('dotenv').config();

module.exports = (mode) => {
  const isDevelopment = mode !== 'production';
  return merge([
    {
      context: paths.root, // absolute path for resolving entry point(s)
      entry: [paths.entry],
      output: {
        path: paths.output,
        filename: 'bundle.js',
        chunkFilename: '[name].js',
        publicPath: '/', // where the generated static files reside.
      },
      resolve: {
        // alias: {
        //   '@material-ui/core': '@material-ui/core/es',
        // },
        extensions: [
          '*',
          '.js',
          '.jsx',
          '.json',
          '.node',
          '.png',
          '.css',
          '.scss',
        ],
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            include: paths.appFolder,
            use: [
              {
                loader: 'babel-loader',
              },
            ],
          },
          {
            test: /\.scss$/,
            use: [
              isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: true,
                  camelCase: true,
                  localIdentName: '[local]__[hash:base64:9]',
                  importLoaders: 2,
                },
              },
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  filename: '[name].[contenthash:6].[ext]',
                  data: `@import "${paths.theme}";`,
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
            ],
          },
          {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 50000,
                name: 'fonts/[name]',
              },
            },
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'assets/[name].[hash:6].[ext]',
                },
              },
              'image-webpack-loader',
            ],
          },
        ],
      },
      optimization: {
        runtimeChunk: 'single',
        // usedExports: true,
        splitChunks: {
          // sync + async chunks
          chunks: 'all',
          cacheGroups: {
            common: {
              name: 'commons',
              chunks: 'initial',
              minChunks: 2,
            },
            vendor: {
              // import file path containing node_modules
              test: /node_modules/,
              name: 'vendor.bundle',
            },
          },
        },
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: paths.template,
          filename: './index.html',
          favicon: './favicon.ico',
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
        // new CopyWebpackPlugin([{ from: './public/static' }]),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(mode),
        }),
      ],
    },
  ]);
};
