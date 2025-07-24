import path from 'path';
import { Configuration, container } from 'webpack';
import 'webpack-dev-server';

const { ModuleFederationPlugin } = container;


const config: Configuration = {
	mode: 'production',
	entry: path.resolve(__dirname, 'index.ts'),
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	devServer: {
		host: 'localhost',
		port: 3000,
		hot: true,
		setupMiddlewares: (middlewares, devServer) => {
			if (!devServer) {
				throw new Error('webpack-dev-server is not defined');
			}

			// 添加 CORS 中间件，为了作为模块联邦中remote时，可以让host发起对热更新模块的请求
			middlewares.unshift({
				name: 'cors-middleware',
				// @ts-ignore
				middleware: (req, res, next) => {
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
					res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
					
					// 处理 OPTIONS 请求
					if (req.method === 'OPTIONS') {
						res.sendStatus(200);
						return;
					}
					
					next();
				}
			});

			return middlewares;
		}
	},
	plugins: [
		new ModuleFederationPlugin({
			filename: 'mainModule.js',
			name: 'main',
			exposes: {
				'./run': path.resolve(__dirname, 'index.ts'),
			}
		})
	],
}

export default config;
