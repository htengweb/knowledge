<h1 align="center">Flutter 配置详解</h1>

* [Flutter 官方文档](https://flutter.dev/docs)
* [Flutter 中文文档](https://flutter-io.cn/docs)
* [Github 地址](https://github.com/flutter/flutter)
```
// 拉取flutter，选择stable分支
// 拉取过程经常会出现失败，拉取成功后会自动安装dart，不用单独安装
$ git clone -b stable https://github.com/flutter/flutter.git
```
> 拉取成功后需要配置环境变量  D:\application\flutter\bin  

![](../images/flutter_path.png)

```
$ flutter --version
$ flutter doctor
// 由于那啥，执行flutter doctor总是执行失败，所以需配置临时镜像
// 打开环境变量配置
PUB_HOSTED_UR  =  https://pub.flutter-io.cn
FLUTTER_STORAGE_BASE_UR  =  https://storage.flutter-io.cn
```
![](../images/flutter_path1.png)
![](../images/flutter_path2.png)
