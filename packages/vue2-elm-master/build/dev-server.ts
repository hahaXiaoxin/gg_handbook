import config from '../config'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import opn from 'opn'
import proxyMiddleware from 'http-proxy-middleware'
import webpackConfig from './webpack.dev.conf'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import historyApiFallback from 'connect-history-api-fallback'

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// 默认端口
const port = process.env.PORT || config.dev.port

const server = express()
const compiler = webpack(webpackConfig)

const devMiddlewareInstance = devMiddleware(compiler, {
    publicPath: webpackConfig.output?.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

const hotMiddlewareInstance = hotMiddleware(compiler)

// 当 html-webpack-plugin 模板改变时强制页面重载
compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => {
    hotMiddlewareInstance.publish({
        action: 'reload'
    })
})

const context = config.dev.context

let proxypath: string
switch(process.env.NODE_ENV) {
    case 'local':
        proxypath = 'http://localhost:8001'
        break
    case 'online':
        proxypath = 'https://elm.cangdu.org'
        break
    default:
        proxypath = config.dev.proxypath
}

const options = {
    target: proxypath,
    changeOrigin: true
}

if (context.length) {
    server.use(proxyMiddleware(context, options))
}

// 处理 HTML5 历史 API 的回退
server.use(historyApiFallback())

// 提供 webpack 打包输出
server.use(devMiddlewareInstance)

// 启用热重载和状态保持
// 编译错误显示
server.use(hotMiddlewareInstance)

// 提供纯静态资源
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
server.use(staticPath, express.static('./static'))

export default server.listen(port, (err?: Error) => {
    if (err) {
        console.log(err)
        return
    }
    const uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')

    // 当环境为测试时，不需要打开浏览器
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})
