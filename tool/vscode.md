# setting.json配置设置
* 设置->首选项->setting.json配置  
```javascript
{
  "search.followSymlinks": false,//解决[rg.exe]占用cpu卡顿现象
  "search.exclude": { 
      "system/": true, 
      "!/system/*/.ps*": true ,
      "**/src": true
  },//全局搜索配置
}
```
* VSCode插件  
> power-mode 炫酷气泡插件 
下载安装Power Mode后，配置setting.json
```
"powermode.enabled": true
```
