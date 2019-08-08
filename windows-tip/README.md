> 修改文件后缀名(先创建一个bat文件)
###
```text
ren *.png *.jpg 
(把png改为jpg)
```
###
> 批量修改当前目录与子目录下文件的后缀名（创建一个bat文件，输入下面文本信息后双击打开）
###
```text
@echo off
for /r %%a in (*.png) do ren "%%a" "%%~na." 
（此处把png文件后缀名改成空） 
------------------------------------------------
@echo off
for /r %%a in (*.png) do ren "%%a" "%%~na.jpg" 
（此处把png文件后缀名改成jpg）
```
###
