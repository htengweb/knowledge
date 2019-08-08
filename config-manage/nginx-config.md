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
 ```
server {
    listen 80 default;
    server_name _;
    return 404;
}
sserver {
    listen 80;
    server_name < 域名 >; // server_name www.teng-design.com;
}
```
* 配置gzip
```
# 开启gizp
gzip  on;
# 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
gzip_min_length 1k;
# 设置压缩所需要的缓冲区大小
gzip_buffers 4 16k;
# gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
gzip_comp_level 8;
# 压缩的文件类型
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
# 是否在http header中添加Vary: Accept-Encoding，建议开启
gzip_vary off;
# 禁用IE 6 gzip
gzip_disable "MSIE [1-6]\.";
```
* Nginx是否允许列出整个目录
```
autoindex off;
```