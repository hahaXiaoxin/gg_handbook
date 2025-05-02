import { Configuration, ProvidePlugin } from 'webpack';
import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';
import 'webpack-dev-server';

function getEntryPath(pageName: string) {
    return path.resolve(__dirname, `src/pages/${pageName}/index.ts`);
}

function getTemplatePath(pageName: string) {
    return path.resolve(__dirname, `src/pages/${pageName}/index.html`);
}

const config: Configuration = {
    mode: 'development',
    entry: {
        home: getEntryPath('home'),
        login: getEntryPath('login'),
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devServer:{
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true, // 是否开启压缩
        port: 8080, // 端口号
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
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
                        maxSize: 8 * 1024
                    }
                }
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: getTemplatePath('home'),
            filename: 'home.html',
            chunks: ['home'],
        }),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'dist/img'),
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: getTemplatePath('login'),
            filename: 'login.html',
            chunks: ['login'],
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                extractComments: false,
                'terserOptions': {
                    sourceMap: true,
                },
            }),
            new CssMinimizerWebpackPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30 * 1024,
            name: 'common',
            cacheGroups: {
                jquery: {
                    name: 'jquery',
                    test: /jquery/,
                    chunks: 'all'
                },
                lodash: {
                    name: 'lodash',
                    test: /lodash/,
                    chunks: 'all'
                }
            }
        }
    }
};

export default config; 