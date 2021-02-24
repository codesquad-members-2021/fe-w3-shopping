const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: './src/js/app.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        // to use image files in .scss
        test: /\.(png|jpe?g)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      }
    ]
  },
  plugins: [
    // to use image files in .html
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './rsc/img',
          to: 'rsc/img',
        },
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  }
};