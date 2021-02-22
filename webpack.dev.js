const path = require("path");

const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index-dev.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ IS_BROWSER: true }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),
  ],
  devtool: "inline-source-map",
  node: false,
  devServer: {
    contentBase: "./dist",
  },
};
