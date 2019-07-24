# SCSS的用法
* $ 变量
```scss
// create file variable.scss
$color: #ffffff;
$width: 100px;
// 单独引用
// @import "@/styles/variable.scss";
// !default 默认值
$content: "first content";
$content: "second content" !default;
/*
当 $content 已经声明存在时，直接取。如果在 !default 之前没有声明或为null时取 !default 的值
*/
```
```javascript
// 全局引用 webpack 中配置
{
    css:{
        loaderOptions:{
            sass:{
              data:`@import "@/styles/variable.scss";`
            }
        }
    }
}
```
* @import 用法
```scss
/*
@import "./foo.scss";
@import "./foo";
@import "http://*.com/foo.css";
@import url();
@import "./foo.scss","./common.scss";
*/
```
* & 标识符
```scss
.content{
    width: 100px;
    &--list{
    
    }
    &:hover{
    
    }
    &:before{
    
    }
    &:after{
    
    }
}
```
* \#{} 插值语句
```scss
// #{变量}。scss中 #{} 用以存放变量或计算
$name: foo;
$width:100px;
.#{name}{
    width: calc(100% - #{$width});
}
// 编译后
.foo{
    width: calc(100% + 100px);
}
```
* @each 用法
```scss

$align-content:(
    center:center,
    between:space-between,
    around:space-around,
    end:flex-end
);
@each $type,$value in $align-content {
    .flex-align-#{$type} {
        display: flex;
        align-content: $value;
        flex-wrap: wrap;
    }
}
```