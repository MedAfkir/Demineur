const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtratPlugin = require("mini-css-extract-plugin");
const path = require("path");

let mode = "development";

if (process.env.NODE_ENV === "production ") {
  mode = "production";
  // Temporary workaround for 'browserslist' bug that is being patched in the near future
  target = "browserslist";
}

module.exports = {
  mode,

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
    assetModuleFilename: "images/[hash][ext][query]",
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtratPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtratPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  devtool: "source-map",

  resolve: {
    extensions: [".js", ".jsx"],
  },

  devServer: {
    static: {
      directory: "./build",
    },
  },
};
