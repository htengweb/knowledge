# webpack 
* [webpack官方文档](https://webpack.js.org/)
* 初始化生成package.json文件
```
$ npm init
// 根据提示填写信息，生成package.json文件
```
> 安装[webpack](https://github.com/webpack/webpack)
```
// 安装到全局
$ npm install webpack webpack-cli -g
// or
// 安装到当前项目本地
$ npm install webpack webpack-cli --save-dev
```
> 安装[webpack-dev-server](https://github.com/webpack/webpack-dev-server)
```
$ npm install webpack-dev-server --save-dev
```
> 安装[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
```
// html文件生成器
$ npm install html-webpack-plugin --save-dev
```
> 安装[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)
```
$ npm install clean-webpack-plugin --save-dev
```
* 创建webpack.config.js文件
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');// html文件生成器
const { CleanWebpackPlugin } = require("clean-webpack-plugin");// 打包前清除之前的dist打包文件
const interfaces = require('os').networkInterfaces()
let IPAdress = '';
for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            IPAdress = alias.address;
        }
    }
}
// 获取当前IP地址
console.log("IPAdress", IPAdress)
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output:{
        filename: '[name].[chunkhash:8].js',
        path: path.join(__dirname, 'dist')
    },
    devServer:{
        contentBase: path.join(__dirname, './public'),// 开启开发服务后访问的地址
        port: 9000
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'webpack typescript',
            template:'./public/index.html',// 指定html的模板文件
            filename:'index.html',// 生成后的文件名
            minify:{
                collapseWhitespace: true,// 去掉空行
                removeComments: true,// 去掉注释
            }
        }),
        new CleanWebpackPlugin()
    ]
}
```
* 安装完成后的package.json
```json
{
  "name": "study-typescript",
  "version": "1.0.0",
  "description": "learning",
  "main": "js/index.js",
  "scripts": {
    "dev": "webpack-dev-server --progress --colors --watch",
    "build": "webpack --config webpack.config.js --progress --colors",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "huangteng",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.39.2",
    "webpack-cli": "^3.3.6",
    "webpack-dev-server": "^3.8.0"
  }
}
```
### 结合typescript
* 创建tsconfig.json
```
$ tsc --init
```
```json
{
  "compilerOptions": {
    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es6",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    // "lib": [],                             /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": "./",                        /* Redirect output structure to the directory. */
    "rootDir": "./src",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  }
}
```
* vscode中设置监听ts文件改变编译成js文件
```
 Terminal > Run Task... > tsc: watch - tsconfig.json
```
```
├─dist
│      index.ff2d17e3.js
│      index.html
│
├─public
│      index.html
│
├─src
│   │  index.js
│   │  index.ts
│   │
│   └─modules
│           a.js
│           a.ts
│           b.js
│           b.ts
│  package.json
│  tsconfig.json
│  webpack.config.js
```