import {Configuration} from "webpack";
import * as path from "path";
//
const config: Configuration = {
    entry: {
        "hefang-ui": "./index.tsx",
        "example": "./example.tsx"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
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
    },
    plugins: [
        // new DtsPlugin({
        //     name: 'hefang-ui-react'
        // })
    ]
};

export default config;