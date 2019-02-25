import {Configuration} from "webpack";

const DtsPlugin = require('dts-webpack-plugin');

const config: Configuration = {
    entry: "./index.tsx",
    output: {
        path: __dirname,
        filename: "./index.js",
        libraryTarget: "umd",
        library: "HuiReact",
        umdNamedDefine: false
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"]
    },
    module: {
        rules: [
            {test: /\.tsx?/, loader: "ts-loader"}
        ]
    },
    externals: {
        "react": {
            commonjs: 'react',
            commonjs2: 'react',
            amd: "react",
            root: "React"
        },
        "react-dom": {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: "react-dom",
            root: "ReactDOM"
        },
        "hefang-js": {
            commonjs: 'hefang-js',
            commonjs2: 'hefang-js',
            amd: "hefang-js",
            root: "H"
        },
        "jquery": {
            commonjs: 'jquery',
            commonjs2: 'jquery',
            amd: "jquery",
            root: "$"
        }
    },
    plugins: [
        new DtsPlugin({
            name: 'hefang-ui-react'
        })
    ]
};

export default config;