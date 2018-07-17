# node init
> cnpm init  创建初始文件
* package.json
```json
  "dependencies": {
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "http-errors": "~1.6.2",
    "make-dir": "^1.3.0",
    "nodemon": "^1.17.5",
    "request": "^2.87.0"
  }
```
* create app.js
```javascript
var request = require('request');
var fs = require('fs');
var makeDir = require('make-dir');
var arg={
	minX:12482,//12482
	maxX:12482,//13340,
	minY:3960,
	maxY:4487,
	zoom:16
}
batchDownload(arg)
/*
params={
	minX:
	maxX:
	minY:
	maxY:
	zoom:
}
*/
function batchDownload(params){
	for(var x=params.minX;x<=params.maxX;x++){
		for(var y=params.minY;y<=params.maxY;y++){
			(function(X,Y,Z){
				saveImg(X,Y,Z)
			})(x,y,params.zoom)
		}
	}
}
function saveImg(x,y,z){
	var url=`http://api2.map.bdimg.com/customimage/tile?&x=${x}&y=${y}&z=${z}&udt=20180601&scale=1&ak=8d6c8b8f3749aed6b1aff3aad6f40e37&styles=t%3Aland%7Ce%3Ag%7Cc%3A%233c3e42ff%2Ct%3Abuilding%7Ce%3Ag%7Cc%3A%232b2b2b%2Ct%3Ahighway%7Ce%3Aall%7Cc%3A%23a99d7bff%7Cl%3A-42%7Cs%3A-91%2Ct%3Aarterial%7Ce%3Ag%7Cl%3A-77%7Cs%3A-94%2Ct%3Agreen%7Ce%3Ag%7Cc%3A%231b1b1b%2Ct%3Awater%7Ce%3Ag%7Cc%3A%2347545cff%2Ct%3Asubway%7Ce%3Ag.s%7Cc%3A%23181818%2Ct%3Arailway%7Ce%3Ag%7Cl%3A-52%2Ct%3Aall%7Ce%3Al.t.s%7Cc%3A%23313131%2Ct%3Aall%7Ce%3Al.t.f%7Cc%3A%238b8787%2Ct%3Amanmade%7Ce%3Ag%7Cc%3A%231b1b1b%2Ct%3Alocal%7Ce%3Ag%7Cl%3A-75%7Cs%3A-91%2Ct%3Asubway%7Ce%3Ag%7Cl%3A-65%2Ct%3Arailway%7Ce%3Aall%7Cl%3A-40%2Ct%3Aboundary%7Ce%3Ag%7Cc%3A%238b8787%7Cl%3A-29%7Cw%3A1%2Ct%3Alabel%7Ce%3Al.t.f%7Cc%3A%23a99d7bff%2Ct%3Alabel%7Ce%3Al.t.f%7Cc%3A%23a99d7bff`
	var dir='tiles/'+z+'/'+x+'/'
	makeDir(dir).then(path => {
	    request(url).on('response',function(response){
	    	if(response.statusCode===200){
	    		console.log('下载完成...',dir+ y + '.png')
	    	}
	    }).pipe(fs.createWriteStream(dir + y + '.png'))
	});
}
```
> node app.js   启动
