# 静态文件配置相对路径 
> production 下配置 "publicPath":"./"  
* .roadhogrc文件中
```json
    "production": {
      "publicPath":"./",
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
      ]
    }
```
