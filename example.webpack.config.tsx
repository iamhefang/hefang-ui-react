import {Configuration} from "webpack";

const config: Configuration = {
	entry: "./example.tsx",
	output: {
		path: __dirname,
		filename: "./example.js",
		libraryTarget: "umd"
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
	}
};

export default config;
