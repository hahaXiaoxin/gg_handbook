import config from '../config'
import webpack from 'webpack'
import { merge } from 'webpack-merge'
import * as utils from './utils'
import baseWebpackConfig from './webpack.base.conf'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration } from 'webpack'

// 添加热重载相关代码到入口
const devWebpackConfig: Configuration = merge(baseWebpackConfig, {
    mode: 'development',
    entry: {
        app: ['./build/dev-client', './src/main.ts']
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap
        })
    },
    // eval-source-map 在开发环境下更快
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // 热模块替换
        new webpack.HotModuleReplacementPlugin(),
        // 生成 HTML 文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: 'favicon.ico',
            inject: true
        })
    ]
})

export default devWebpackConfig