# vue mockjs
* [mockjs](http://mockjs.com/) 
```
$ npm install mockjs --save-dev
//or
$ cnpm install mockjs --save-dev
```
> 创建mock.js文件
```javascript
import Mock from 'mockjs';
const login = Mock.mock({
      "code":200,
      "data":[{
          "name":"mockjs"
      }]
})
Mock.mock(/\/api\/login/, 'get', login);
```
> main.js中引用mock.js文件
```javascript
import './mock.js';
```
> axios调用
```javascript
import axios from 'axios';
axios.get('/api/login').then(res=>{
    
})
/* 踩坑
* 调用成功之后浏览器的network中没有请求地址，可直接在axios返回结果中打印数据。
* 如果请求接口提示404，请使用正则(如上所示)，可参考官网
*/
```
