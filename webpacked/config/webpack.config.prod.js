const  path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//输入npx webpack
module.exports ={
  entry:"./src/js/index.js",
  output:{
    path:path.resolve(__dirname,"../build"),
    filename:"./js/build.js",
    publicPath:"/"
  },
  mode:"production",
//配置less
  module: {
    rules: [

      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader,
          {loader:'css-loader',},
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
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
              name:'imgs/[hash:10].[ext]',
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
    template:"./src/index.html",
    minify: {
      //去除空格
      collapseWhitespace: true,
      //去除注释
      removeComments: true,
      //移除默认属性
      removeRedundantAttributes: true,
      //移除script的type属性
      removeScriptTypeAttributes: true,
      //移除link的type属性
      removeStyleLinkTypeAttributes: true,
      //使用doctype
      useShortDoctype: true
  }
  }),new MiniCssExtractPlugin({
    filename:"css/[name].css"
  })],
  devServer:{
    port:8888,
    host:'127.0.0.1',
    open:true,
    compress:true,//压缩zip
     quiet:true
  },
  optimization: {
    minimizer: [
        new CssMinimizerPlugin(),
    ],
},

}