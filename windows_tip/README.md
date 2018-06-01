> 批量修改当前目录与子目录下文件的后缀名
###
```text
@echo off
for /r %%a in (*.png) do ren "%%a" "%%~na."
```
###
