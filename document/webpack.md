# Webpack 学习总结

## 理论知识

### loader

> webpack会从入口文件开始，按照引用逐步解析各个模块，将模块按照webpack.config.module.rules中的规则分配给对应的loader，其中loader执行的顺序是从数组末尾开始执行，上一个loader执行的值会传递给下一个loader

介绍几个用到的loader

1. 解析ts文件

    - ts-loader
        - 解析ts文件，将文件按照tsconfig.json转换为对应的模块

2. 解析css文件

    - css-loader
        - 用于解析css文件中的引用关系，包括`@import`以及`url()`
        - 可启用css模块化，将css类名转换为hash，避免全局命名冲突（需要额外配置）
    - style-loader
        - 将css文件以内联的形式嵌入到html文件中
    - css-minimizer-webpack-plugin.loader
        - 注意，不可与style-loader一起使用
        - 该插件内置loader用于将css提取为单个文件

3. 解析图片资源

    以往可以通过`resouce-loader`或者`url-loader`的方式进行处理，在webpack5中内置了对静态资源的处理，在对应的module.rules中，不像常规的使用`use`或者`loader`属性指定对应的`loader`，其可以通过type字段来指定资源的处理方式

```ts
import MiniCssExtractPlugin from "mini-css-extract-plugin";
export default {
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/i,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024, // 4kb	如果小于4Kb的资源则以base64的形式嵌入到代码中
                    },
                },
                generator: {
                    filename: "images/[name].[hash:6][ext]",
                },
            }
        ],
    },
}
```

### plugin

> plugin用与为webpack赋能，其通过在webpack执行过程中不同的hook执行不同的任务，其重点在于webpack构建过程中做对应的事情，做更多大局上的把控

常用的plugin：

1. HtmlWebpackPlugin
    - 经过webpack的处理后，所有的内容都被处理为静态资源 + js代码两个部分，而该插件的作用就是以某个html文件作为模板，将对应的资源注入到其中
2. ProvidePlugin
    - 起作用是用于将部分资源作为全局变量以供给其它模块进行调用，例如jquery会在全局中注入变量$，而很多情况下我们并不希望在每个文件中单独引入一次，但为了能够顺利解析其中用到的$，可以通过该插件将资源作为全局变量注入到代码中
3. MiniCssExtractPlugin
    - 用于将css文件抽离为单个模块

```ts
function getTemplate(pageName: string) {
    return path.resolve(process.cwd(), `./src/pages/${pageName}/${pageName}.html`);
}

export default {
    plugins: [
        new HtmlWebpackPlugin({
            template: getTemplate("index"),
            filename: "index.html",
            chunks: ["index"],
        }),
        new HtmlWebpackPlugin({
            template: getTemplate("login"),
            filename: "login.html",
            chunks: ["login"],
        }),
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(process.cwd(), "./src/img"),
                    to: path.resolve(process.cwd(), "./dist/img"),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[name].chunk.css",
        }),
    ],
}
```



### optimization

>作为性能优化的角色存在，其通过代码压缩，treeshaking等方式对文件进行压缩以提高网络性能

1. minimizer

    用于对文件进行压缩，其中可指定特定的处理插件

    - TerserPlugin
        - 用于压缩Js代码
    - CssMinimizerPlugin
        - 用于压缩css代码

2. splitChunks

    通常情况下，每个入口会将所有引用整合起来到一个js文件当中，这样会导致某个js文件特别大，极大的降低了网络请求的速度，而该配置可以以模块为单位，对模块进行抽离以及并入的操作

    - chunks
        - 表示对哪些资源进行split处理，可选值"all", "async", "init"，暂时还不知道具体作用，记录一下

    - minSize

        - 默认配置，单位B，表示单个模块至少为多大才可以单独作为一个js文件而存在

    - cacheGroup

        其中用于对部分模块或者包进行处理，其接受一个数组，数组中可配置类似于loader的规则对不同的模块进行处理

        - test：表示对符合正则判断的模块打包到该规则输出文件中
        - chunks：同上述chunks作用
        - name：输出包的名字

```ts
export default {
    // 模块化后对资源进行优化
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // 去除console
                    },
                    sourceMap: true,
                },
                extractComments: false, // 不生成license文件,
            }),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            chunks: "all",
            minSize: 90 * 1024,
            name: "common",
            cacheGroups: {
                jQuery: {
                    name: "jQuery",
                    test: /jquery/,
                    chunks: "all",
                },
                "lodash-es": {
                    name: "lodash-es",
                    test: /lodash-es/,
                    chunks: "all",
                },
            },
        },
    },
}
```



## 如何实现TreeShaking

四个要点

1. 引入模块必须是Esmodule，不可以是CommonJs规范的代码，例如lodash库就不行，得使用lodash-es
2. 其中的模块必须是export的形式导出，而不能是export default
3. webpack中的mode必须为production
4. 引入时通过`import {xxx} from '[module]'的形式`



## 通过预先打包优化构建速度



## webpack4与webpack5的区别

