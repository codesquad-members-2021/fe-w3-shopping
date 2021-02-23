const path = require('path');
module.exports = {
  mode: 'development',
  entry: "./public/javascripts/main.js",
  watch: true,
  output: {
    path: path.resolve(__dirname, "public"),
    filename: 'main_bundle.js'
  }
}