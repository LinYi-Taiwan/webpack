const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path");

// 設置 node env，postcss 預設 production，所以才要改
process.env.NODE_ENV = "development";

module.exports = {
  entry: "./js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
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
    }),
    new MiniCssExtractPlugin({
      filename: "css/built.css",
    }),
  ],
  mode: "development",
};
