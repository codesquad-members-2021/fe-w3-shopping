const path = require('path');
module.exports = {
  mode: 'development',
  entry: "./public/javascripts/main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: 'main_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}