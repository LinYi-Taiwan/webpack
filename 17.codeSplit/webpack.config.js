const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
//壓縮 css 的 plugin

// 設置 node env，postcss 預設 production，所以才要改

/** 

 */

process.env.NODE_ENV = "production";

module.exports = {
  entry: "./src/js/index.js", // 單入口
  // entry: {
  //   main: "./src/js/index.js",
  //   test: "./src/js/test.js",
  // },
  output: {
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname, "build"),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        //移除空格
        collapseWhitespace: true,
        //移除註釋
        removeComments: true,
      },
    }),
  ],
  /**
    split chunks 可以：
      1. 將 node_modules 單獨打包成一個 chunk 
      2. 將「共用」文件抽取打包成一個 chunk 
 */
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  mode: "production",
};
