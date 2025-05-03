import { Configuration, ProvidePlugin } from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';
import 'webpack-dev-server';
import {VueLoaderPlugin} from 'vue-loader';

const config: Configuration = {
    mode: 'development',
    entry: {
        index: path.resolve(process.cwd(), 'src/main.ts'),
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(process.cwd(), 'dist'),
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(process.cwd(), 'dist'),
        },
        compress: true, // 是否开启压缩
        port: 8080, // 端口号
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                type: 'asset',
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                generator: {
                    filename: 'images/[name].[hash:6][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024,
                    },
                },
            }
        ],
    },
    resolve: {
        extensions: ['.vue', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), 'public/index.html'),
            filename: 'index.html',
            chunks: ['index'],
        }),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(process.cwd(), 'src/img'),
                    to: path.resolve(process.cwd(), 'dist/img'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new VueLoaderPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                extractComments: false,
                terserOptions: {
                    sourceMap: true,
                },
            }),
            new CssMinimizerWebpackPlugin(),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30 * 1024,
            name: 'common',
            cacheGroups: {
                jquery: {
                    name: 'jquery',
                    test: /jquery/,
                    chunks: 'all',
                },
                lodash: {
                    name: 'lodash',
                    test: /lodash/,
                    chunks: 'all',
                },
            },
        },
    },
};

export default config;
