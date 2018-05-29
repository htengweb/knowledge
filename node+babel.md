# `node` `babel` node中使用es6语法

* 需要安装的插件
> cnpm install --save-dev babel-plugin-add-module-exports  
> cnpm install --save-dev babel-plugin-syntax-async-functions  
> cnpm install --save-dev babel-plugin-transform-es2015-destructuring  
> cnpm install --save-dev babel-plugin-transform-es2015-modules-commonjs  
> cnpm install --save-dev babel-plugin-transform-es2015-parameters  
> cnpm install --save-dev babel-plugin-transform-es2015-spread  
> cnpm install --save-dev babel-plugin-transform-object-rest-spread  
> cnpm install --save-dev babel-plugin-transform-regenerator  
> cnpm install --save-dev babel-plugin-transform-strict-mode  
> cnpm install --save-dev babel-polyfill  
> cnpm install --save-dev babel-preset-env  
> cnpm install --save-dev babel-register  

-------------------------------------------
* 根目录下创建一个新文件： .babelrc
###
```json
{
    "presets": [
        "env"
    ],
    "plugins": [
        "add-module-exports",
        "transform-regenerator",
        "transform-es2015-destructuring",
        "transform-es2015-modules-commonjs",
        "transform-es2015-parameters",
        "transform-es2015-spread",
        "transform-object-rest-spread",
        "transform-strict-mode"
    ]
}
```
###
-------------------------------------------
* 引用  
app.js文件中
> require("babel-register");
