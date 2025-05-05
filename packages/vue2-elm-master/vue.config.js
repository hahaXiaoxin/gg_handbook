const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    entry: './src/main.ts',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
      alias: {
        'src': path.resolve(__dirname, './src'),
        'assets': path.resolve(__dirname, './src/assets'),
        'components': path.resolve(__dirname, './src/components')
    }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true
          },
          exclude: /node_modules/
        }
      ]
    }
  }
}) 