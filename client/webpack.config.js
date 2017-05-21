require('dotenv').load();
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const proxy = {};
proxy[`/${process.env.API_PATH}`] = process.env.DEV_SERVER_PROXY;

module.exports = env => ({
  entry: {
    app: ['babel-polyfill', './src'],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: env === 'development',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$|\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer],
              },
            },
            'less-loader',
          ],
        }),
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.eot$|\.woff$|\.ttf$/,
        loader: 'url-loader',
        options: {
          limit: '30000',
          name: '[name].[hash:5].[ext]',
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  target: 'web',
  devServer: {
    proxy,
    port: process.env.DEV_SERVER_PORT,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
    new CleanWebpackPlugin('./dist', {
      verbose: env === 'production',
      dry: env === 'development',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: env === 'production',
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
      disable: env === 'development',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ context }) => context && context.includes('node_modules'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
    }),
  ],
});
