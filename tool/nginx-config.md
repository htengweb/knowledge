 <h1 align="center">Nginx Config</h1>
 <p align="center">
 <a href="http://nginx.org/">
 <img src="https://img.shields.io/badge/-Nginx-success" alt="Nginx"></a>
 </p>
 
 * 启动、关闭、重启命令
 ```
$ nginx   // 启动
$ nginx -s stop // 关闭
$ nginx -s reload // 重启
```
 * 配置只能通过域名访问服务，禁止使用IP访问
 ```scss
server {
    listen 80 default;
    server_name _;
    return 404;
}
sserver {
    listen 80;
    server_name < 域名 >; // server_name teng-design.com;
}
```