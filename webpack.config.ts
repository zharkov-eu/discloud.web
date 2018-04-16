import * as path from "path";
import * as webpack from "webpack";

import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as UglifyJSPlugin from "uglifyjs-webpack-plugin";

const production = process.env["NODE_ENV"] === "production";
const apiUrl = process.env["NODE_API_URL"] || production ? "api.discloud.ru" : "devapi.discloud.ru";

const config: webpack.Configuration = {
    entry: path.join(__dirname, "app", "component", "entrypoint", "index.ts"),
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: [
                    {loader: "ts-loader"},
                ],
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: production,
                            },
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
        new ExtractTextPlugin("../css/index.bundle.css"),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                API_URL: JSON.stringify(apiUrl),
                NODE_ENV: JSON.stringify("production"),
            },
        }),
    ] : [
        new ExtractTextPlugin("../css/index.bundle.css"),
        new webpack.DefinePlugin({
            "process.env": {
                API_URL: JSON.stringify(apiUrl),
                NODE_ENV: JSON.stringify("development"),
            },
        }),
    ],
};

export default config;
