// https://github.com/shelljs/shelljs
import shell from 'shelljs'
import path from 'path'
import config from '../config'
import ora from 'ora'
import webpack from 'webpack'
import webpackConfig from './webpack.prod.conf'

// 设置环境变量
process.env.NODE_ENV = 'production'

const spinner = ora('building for production...')
spinner.start()

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
shell.cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, (err: Error | null, stats: webpack.Stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})