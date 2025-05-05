import config from '../config'
import * as utils from './utils'
import webpack from 'webpack'
import { merge } from 'webpack-merge'
import baseWebpackConfig from './webpack.base.conf'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { Configuration } from 'webpack'

const env = config.build.env

const webpackConfig: Configuration = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? 'source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[contenthash].js'),
        chunkFilename: utils.assetsPath('js/[name].[contenthash].js'),
        clean: true
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: true
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial'
                },
                manifest: {
                    name: 'manifest',
                    minChunks: Infinity,
                    priority: 20
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'auto'
        })
    ]
})

if (config.build.productionGzip) {
    const CompressionPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins?.push(
        new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

export default webpackConfig