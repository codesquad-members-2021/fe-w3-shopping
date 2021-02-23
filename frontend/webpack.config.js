import path from "path"
// const path = require("path")

const webpackConfig = {
  mode: "development",
  entry: {
    index: "./frontend/public/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
}
export default webpackConfig;