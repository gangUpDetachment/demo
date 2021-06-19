const  path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//输入npx webpack
module.exports ={
  entry:"./src/js/index.js",
  output:{
    path:path.resolve(__dirname,"build"),
    filename:"./js/build.js"
  },
  mode:"development",
//配置less
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          {
          loader:'style-loader',},
          {loader:'css-loader',},
          {
            loader: 'less-loader',
          }]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1234,
              name:'./imgs/[hash:10].[ext]',
            },
           // name:imgs/'[hash:10].[tex]',
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template:"./src/index.html"
  })],
  devServer:{
    port:8888,
    host:'127.0.0.1',
    open:true,
    compress:true,//压缩zip
     quiet:true
  }
}