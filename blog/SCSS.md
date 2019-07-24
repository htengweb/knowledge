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
* @mixin   @include
```scss
// 混入指令，代码复用。可以传入多个参数
@mixin statusColor($color:#FF0808){
    background-color: #0a1422;
}
.normal{
    @include statusColor(#ffffff);
}
.warn{
    @include statusColor(#ffff00);
}
.error{
    @include statusColor(#ff0000);
}
```
* @each 用法
```scss
// @each $var in <list>
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
* @while
```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
// 编译成
.item-6 {
    width: 12em; 
}
.item-4 {
    width: 8em; 
}
.item-2 {
    width: 4em; 
}
```
* @extend
```scss
.parent{
    width: 200px;
    height: 200px;
}
.children{
    @extend .parent;
    background-color: red;
}
// 编译后
.children{
    width: 200px;
    height: 200px;
    background-color: red;
}
// multiple extends
.class1{}
.class2{}
.child{
    @extend .class1;
    @extend .class2;
}
// !optional 防止报错，跳过空样式
.children{
    @extend .parent !optional;
}
```
* @if  and  @else if
```scss
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```
* @for
```scss
// @for $var from <start> through <end> and @for $var from <start> to <end>
@for $i from 1 through 3 { // $i = 1,2,3
    .item-#{$i} { width: 2em * $i; }
}
// or
@for $i from 1 to 3 { // $i = 1,2
    .item-#{$i} { width: 2em * $i; }
}
@for $i from 1 through 20{
    >li:nth-child( #{$i} ){
        animation-delay: 0.1s * $i;
    }
}
```
* @at-root 改变指令下规则的层级，非当前父级选择器下
```scss
.parent{
    width: 200px;
    @at-root {
        .children{
            font-size: 32px;
        }
    }
}
// 编译后
.parent{
    width: 200px;
}
.children{
    font-size: 32px;
}
// @at-root(without:...) and @at-root(with:...)
```
* @debug
* @warn
```scss
@mixin adjust-location($x, $y) {
  @if unitless($x) {
    @warn "Assuming #{$x} to be in pixels";
    $x: 1px * $x;
  }
  @if unitless($y) {
    @warn "Assuming #{$y} to be in pixels";
    $y: 1px * $y;
  }
  position: relative; left: $x; top: $y;
}
```