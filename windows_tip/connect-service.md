# windows远程连接服务器

> 家庭版windows登录服务器报错问题解决  
1.打开运行(win+R),输入regedit，打开注册表编辑  
2.找到以下路径   
```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\CredSSP\Parameters
```
新建 \CredSSP\Parameters 目录   
3.在Parameters里新建DWORD（32位）文件，文件名：AllowEncryptionOracle,并且把值该为2   
> 无法运程连接阿里云服务器配置  
打开阿里云管理控制台->云服务器ECS->安全组->配置规则->添加安全组->协议类型：RDP（3389），授权对象：0.0.0.0/0
