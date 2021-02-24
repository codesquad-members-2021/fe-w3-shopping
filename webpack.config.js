import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = path.resolve();

const config = {
  entry: "./public/src/scss/style.scss",
  output: {
    path: path.resolve(__dirname, "public", "dist"),
  },
  plugins: [
    // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
    new MiniCssExtractPlugin({ filename: "css/style.bundle.css" }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map",
  mode: "development",
};

export default config;
