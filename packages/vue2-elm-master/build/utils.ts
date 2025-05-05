import path from 'path'
import config from '../config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type { RuleSetRule } from 'webpack'

interface CssLoaderOptions {
    sourceMap?: boolean
    extract?: boolean
}

interface LoaderOptions {
    sourceMap?: boolean
    extract?: boolean
}

export function assetsPath(_path: string): string {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' 
        ? config.build.assetsSubDirectory 
        : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

export function cssLoaders(options: CssLoaderOptions = {}) {
    function generateLoaders(loaders: string[]): string | string[] {
        const sourceLoader = loaders.map(loader => {
            let extraParamChar: string
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?')
                extraParamChar = '&'
            } else {
                loader = loader + '-loader'
                extraParamChar = '?'
            }
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
        }).join('!')

        if (options.extract) {
            return MiniCssExtractPlugin.loader
        } else {
            return ['vue-style-loader', sourceLoader].join('!')
        }
    }

    return {
        css: generateLoaders(['css']),
        postcss: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        stylus: generateLoaders(['css', 'stylus']),
        styl: generateLoaders(['css', 'stylus'])
    }
}

export function styleLoaders(options: LoaderOptions): RuleSetRule[] {
    const output: RuleSetRule[] = []
    const loaders = cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension as keyof typeof loaders]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: Array.isArray(loader) ? loader : [loader]
        })
    }

    return output
}