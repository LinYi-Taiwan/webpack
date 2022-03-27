const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path");
//壓縮 css 的 plugin
const cssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

// 設置 node env，postcss 預設 production，所以才要改

/** 
   tree shaking 去除無用程式碼
    前提：1. 必須使用 es6 2. 開啟 production
    滿足以上兩個條件，即有 tree shaking 功能
    
    備註：
      使用 core.js 可解決套件中呼叫無用代碼問題
      使用 tree shaking 在 package.json 設定 sideEffect 可解決不想被移除的檔名，如：[*.css, *.scss] 等
 */

process.env.NODE_ENV = "production";

module.exports = {
  entry: "./js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        // 兼容性處理: babel-loader, @babel/preset-env, @babel/core
        /**
          問題：
          1. @bable/preset-env 只能轉換基本語法，例如 new promise 就不會轉換
          解決方法：
          1. 使用全部 js 兼容性處理 --> @babel/polyfill
            但會有問題：
            1. @babel/polyfill 會把所有的兼容 js 都引入，體積太大
            解決方法：
            1. 需要做兼容性處理再引入 --> core-js
            2. 不能使用 @babel/polyfill，要取消

         */
        test: /\.js$/,
        exclude: [
          // core-js 會不小心解析到 css-loader，導致壞掉
          /node_modules\/(css-loader|core-js|promise-polyfill|webpack|html-webpack-plugin|whatwg-fetch)\//,
        ],

        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                //需要再下載兼容性 js
                useBuiltIns: "usage",
                corejs: {
                  version: 3,
                },
                // 指定兼容到哪個版本的瀏覽器
                targets: {
                  chrome: "60",
                  firefox: "60",
                  ie: "9",
                  safari: "10",
                  edge: "17",
                },
              },
            ],
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          /*css 兼容性處理： postcss-loader postcss-preset-env
            幫 postcss 找到 package.json 中 broswerslist 裡面的配置，通過配置加載指定的 css 兼容樣式

            "browserslist": {
                "development": [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
                ],
                "production": [
                ">0.2%",
                "not dead",
                "not op_mini all"
                ]
            }
          **/
          {
            loader: "postcss-loader",
            options: {
              //   ident: "postcss",
              //   plugins: () => [require("postcss-preset-env")()],
              //以上註解的是舊版的 postcss 引入，新版如下
              postcssOptions: {
                ident: "postcss",
                plugins: [require("postcss-preset-env")()],
              },
            },
          },
        ],
      },
    ],
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
    new MiniCssExtractPlugin({
      filename: "css/built.css",
    }),
    new cssMinimizerWebpackPlugin(),
  ],
  mode: "production",
};
