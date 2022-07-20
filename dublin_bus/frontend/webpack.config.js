const path = require("path");
const webpack = require("webpack");

const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = (env, argv) => {
  const mode = argv.mode || "development";
  return {
    mode,
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./static/javascript"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },

        {
          test: /\.(sass|scss|css)$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },

        {
          test: /\.js$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },

        {
          test: /\.(gif|svg|jpg|png)$/,
          loader: "file-loader",
        },
      ],
    },
    optimization: {
      minimize: true,
    },
    plugins: [
      // ...
      new webpack.DefinePlugin({
        // "process.env.NODE_ENV": JSON.stringify(mode),
        // "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        "process.env": JSON.stringify(dotenv.parsed),
        "process.env.NODE_ENV": JSON.stringify(
          isDevelopment ? "development" : "production"
        ),

        React: "react",
      }),
    ],
  };
};
