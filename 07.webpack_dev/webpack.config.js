const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",

  // 開發服務器： 自動化（儲存後自動編譯、刷新瀏覽器)
  // 啟動指令為： npx webpack-dev-server
  devServer: {
    static: resolve(__dirname, "build"), // 之前好像是 contentBase, 但現在應該要寫 static
    compress: true, // 讓程式碼體積更小，啟動速度更快
    port: 3000,
    hot: "only",
    liveReload: true,
  },
};
