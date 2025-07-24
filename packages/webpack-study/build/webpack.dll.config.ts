import { Configuration, DllPlugin } from 'webpack';
import path from 'path';
import TerserWebpackPlugin from 'terser-webpack-plugin';

const config: Configuration = {
  mode: 'production',
  entry: {
    // 这里添加需要预先打包的库
    vendor: ['vue', 'jquery', 'lodash-es'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(process.cwd(), 'public/dll'),
    library: '[name]_dll_lib',
  },
  plugins: [
    new DllPlugin({
      name: '[name]_dll_lib',
      path: path.resolve(process.cwd(), 'public/dll/[name].manifest.json'),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false,
      }),
    ],
  },
};

export default config; 