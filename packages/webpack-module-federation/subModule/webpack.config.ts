import path from 'path';
import { Configuration, container } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server'

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
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
			filename: 'index.html'
		}),
		new ModuleFederationPlugin({
			filename: 'subModule.js',
			name: 'subModule',
			remotes: {
				mainModule: 'main@http://localhost:3000/mainModule.js'
			}
		})
	],
	devServer: {
		host: 'localhost',
		port: 3001,
		hot: true
	}
}

export default config;


