const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: "url-loader", // url-loader 依賴 file-loader
        options: {
          limit: 8 * 1024, // 若低於 8kb 的圖片，會轉成 base64
          esModule: false, // (url-loader 用 es6 解析，但 html-loader 是 common.js 解析，所以要關閉 url-loader 中的 es6 解析)
        },
      },
      {
        test: /\.html$/,
        use: "html-loader", // 處理 html 裡面的 img
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
