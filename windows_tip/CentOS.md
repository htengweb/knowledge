# windows运程连接CentOS服务器
> CentOS安装桌面
```
# yum -y groups install "GNOME Desktop"
# startx
```
> 配置源
```
# yum install  epel* -y
```
> 安装xrdp
```
# yum --enablerepo=epel -y install xrdp
```
> 启动xrdp并开机启动
```
# systemctl start xrdp
# systemctl enable xrdp
```
