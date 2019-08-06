let path = require('path');
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "build.js",
    path: path.join(_dirname, './dist')
  },
  module: {
    //loader配置
    rules: [
      {
        test: /\.js$/, use: ["babel-loader"], exclude: /node_moudles/
      },
      {
        test: /\.css$/, use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(jpg|gif|png|jpeg)$/, use: ["url-loader?limit=5120"]
      }
    ]
  },
  plugins: [
    //注册插件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
};
