import path from "path"
const port = process.env.PORT || 3030;
// const path = require("path")

const webpackConfig = {
  mode: "development",
  
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader", // Creates `style` nodes from JS strings
          "css-loader", // Translates CSS into CommonJS
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      
    ],
  },

  entry: {
    index: "./frontend/public/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./build/frontend"),
  },
}
export default webpackConfig;