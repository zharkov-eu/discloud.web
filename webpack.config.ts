import * as path from "path";
import * as webpack from "webpack";

import CssoWebpackPlugin from "csso-webpack-plugin";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";

const production = process.env.NODE_ENV === "production";

const config: webpack.Configuration = {
  entry: path.join(__dirname, "app", "component", "entrypoint", "index.ts"),
  mode: production ? "production" : "development",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
          {loader: "ts-loader", options: {transpileOnly: !production}},
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
            }, {
              loader: "sass-loader",
            },
          ],
        }),
      },
    ],
  },
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "public/build/js"),
  },
  plugins: production ? [
    new webpack.DefinePlugin({
      "process.env": {
        API_URL: JSON.stringify("https://api.discloud.ru"),
        COOKIE_DOMAIN: JSON.stringify(".discloud.ru"),
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new ExtractTextPlugin("../css/index.bundle.css"),
    new CssoWebpackPlugin(),
  ] : [
    new webpack.DefinePlugin({
      "process.env": {
        API_URL: JSON.stringify("https://api.discloud.ru"),
        COOKIE_DOMAIN: JSON.stringify(".localhost.com"),
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    new ExtractTextPlugin("../css/index.bundle.css"),
  ],
};

export default config;
