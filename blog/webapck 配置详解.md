<h1 align="center">webpack 配置详解</h1>
<p>
    <a title="Webpack"><img src="https://img.shields.io/badge/-webpack-brightgreen" /></a>
</p>


* entry 入口文件配置
```javascript
module.exports = {
    entry: './src/index.js',
    // or
    entry: {
        index: './src/index.js',
        main: './src/main.ts'
    }
}
```
* output 出口配置 
```javascript
module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),// 输出文件存放
        filename: 'js/[name].[hash:8].js',
        publicPath: './', // 静态资源加地址前缀
    }
}
```
* module 配置
```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    }
                ],
                // 只包含src下的js文件
                include: path.resolve(__dirname, 'src'),
                // 忽略node_modules下的文件编译
                exclude: /node_modules/
            }
        ]
    }    
}
```
* plugins 配置
```javascript
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html文件生成器
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack typescript',
            template: './public/index.html', // 指定html的模板文件
            filename: 'index.html', // 生成后的文件名
            chunks: ['main','vendor','common'], // 只引用对应的代码模块
            minify: {
                removeAttributeQuotes: true,// 删除引号
                collapseWhitespace: true, // 去掉空行
                removeComments: true, // 去掉注释
            }
        }),
    ]
}
```
> webpack.base.js
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'js/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                            ]
                        }
                    }
                ],
                // 只包含src下的js文件
                include: path.resolve(__dirname, '../src'),
                // 忽略node_modules下的文件编译
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,//  修改scss热更新
                            reloadAll: true,
                            inserAt: 'top',// 打包后的css文件提取到顶部
                            publicPath: './'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',// 注入scss变量到全局
                        options: {
                            resources: [
                                './src/styles/variable.scss'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true,
                            insertAt: 'top',
                            publicPath: './'
                        }
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'img',
                            publicPath: '../img',// 打包后图片引用相对地址 
                            // name: '[name].[ext]',// 配置打包后图片的名称
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'react webpack',
            template: './public/index.html',// 指定html的模板文件
            filename: 'index.html',// 生成后的文件名
            chunks: ['index', 'vendor', 'common'],// 只引用对应的代码模块
            minify: {
                removeAttributeQuotes: true,// 删除引号
                collapseWitespace: true,// 去掉空行
                removeComments: true,// 去掉注释
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ],
    // 解析 第三方包 common
    resolve: {
        // 查找的模块
        modules: [
            path.resolve('node_modules')
        ],
        // 别名
        alias: {
            '@': path.resolve(__dirname,'../src'),// 注意，css中引用需加~，如：'~@/**/*.png'
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss']
    },
    optimization: {
        minimizer: [
            // 压缩css文件
            new OptimizeCssAssetsWebpackPlugin({}),
            // 压缩js文件
            new UglifyJsPlugin({
                 cache: true,// 是否缓存
                 parallel: true, // 是否并发
                 sourceMap: true// 源码映射
            })
        ],
        splitChunks: {
            cacheGroups: { // 缓存租
                common: { // 公共的模块
                    chunks: 'initial', // 从什么地方开始,刚开始
                    minSize: 0, // 大于多少抽离
                    minChunks: 1, // 使用多少次以上抽离抽离
                    name: 'common', // 提取后的文件名称，在HtmlWebpackPlugin 的 chunks中引用
                },
                vendor: { // 抽离第三方库
                    priority: 1, // 优先抽离第三方库
                    test: /node_modules/,// 从node_modules中抽
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1,// 最小引用次数时抽离
                    name: 'vendor'
                }
            }
        }
    }
}
```
> webpack.dev.js
```javascript
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('./webpack.base');

module.exports = merge(config, {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, './public'), // 开启开发服务后访问的地址
        port: 8000,
        hot: true, // 热模块替换
        open: true,// 启动自动打开页面
        compress: true, // 启动gzip压缩
        proxy: { // 配置跨域代理请求
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite:{ // 重写地址
                    '/api': ''
                }
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),// 热更新
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            },
        }),
    ],
    // 源码映射文件，方便调试
    // 1 source-map 会单独生成一个map文件。
    // 2 eval-source-map 不会单独生成文件，但可以访问行和列。
    // 3 cheap-module-source-map 生成单独文件，但不会产生列。
    // 4 cheap-module-eval-source-map 不生成文件，集成到打包文件中，不产生列。
    devtool: 'source-map'
})
```
> webpack.prod.js
```javascript
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./webpack.base')

module.exports = merge(config, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname,'../dist'),
        publicPath: './'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: true
        }),
        new webpack.BannerPlugin('版权声明'),
        new CopyWebpackPlugin([
            {
                from: './public/',
                to: './'
            }
        ])
    ],
     // 不需要打包的外部模块
    externals: {
        // jquery: '$'
        // React: 'react'
    },
    // 监控打包
    // watch: true,
    // watchOptions: {
    //     poll: 1000,//每秒监控一次
    //     aggregateTimeout: 500,// 防抖，
    //     ignored: /node_modules/,// 不需要监控的文件
    // },
})
```
* postcss.config.js 配置 css样式兼容加前缀
```javascript
module.exports = {
    plugins: [
        require('autoprefixer')({
            "overrideBrowserslist": [
                "last 1 version",
                "> 1%",
                "IE >= 6",
                "Firefox 23",
                "Chrome 32",
                "Baidu 7.12",
                "Edge 12",
                "Opera 30",
                "Safari 5",
                "Samsung 5"
            ]
        })
    ]
}
```
* [babel 配置](https://babeljs.io/)