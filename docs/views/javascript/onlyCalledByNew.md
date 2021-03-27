---
title: 【trick】限制函数只能通过new调用
sidebar: "auto"
date: 2020-03-24
tags:
  - 面试
  - trick
categories:
  - javascript
---

### 原理

+ 方法一： [new.target](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new.target)
+ 方法二： 判断 this 指针

### 代码实现

```js
// 方法一：判断 new.target 不为空
function Person1(name) {
  console.log('🚀[new.target] ', new.target)
  if (!new.target) {
    throw new Error('must call by new!')
  }
  this.name = name
}
// 方法二：this 指针
function Person2(name) {
  console.log("🚀[this]", this)
  if (!(this instanceof Person2)) {
    throw new Error('must call by new!')
  }
  this.name = name
}
```

### 测试一下

正确调用

```js
var pnx = new Person1('Tom')  // new.target 指向构造函数
var pny = new Person2('Jerry')  // this 指向对象实例
console.log(pnx, pny)
```

错误调用

```js
try {
  var px = Person1('Rocky') // new.target 是 undefined
} catch (e) {
  console.log(e)
}
try {
  var py = Person2('Panda') // this 指向 window
} catch (e) {
  console.log(e)
}
```
