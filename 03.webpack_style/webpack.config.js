/**
  webpack.config.js 
  作用：指示 webpack 的指令

  基於 node.js，並且默認採用 common.js
 */

const { resolve } = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader", // 創建 style 標籤，將 js 中的樣式添加到 head 中，讓網站可以運行
          "css-loader", // css-loader: 將 css 文件以字串的形式變成 common.js 的模組，然後 insert 到 js （common.js ）中
        ],
      },
    ],
  },
  plugins: [],
  mode: "development",
};
