const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path/posix");

//mini-css-extract:
// 1. 因為 css 之前都是在 js 中下載的，所以當頁面載入時畫面會有一閃，且分離 css 會讓 js 引入更快（因為體積更小）
// 2. 取代 style-loader 
module.exports  = {
    entry: './js/index.js',
    output:{
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        })
    ],
    mode: 'development'
}