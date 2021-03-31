---
title: 【模拟实现】new
sidebar: "auto"
date: 2021-03-27
tags:
  - 面试
  - 模拟实现
categories:
  - javascript
---

### 原理

[MDN定义](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

> new 运算符创建一个用户定义的对象类型的实例，或具有构造函数的内置对象的实例。

实现 new 的具体步骤为：

1. 创建一个空的简单 JS 对象；
2. 链接该对象到构造函数的显式原型；
3. 将步骤1中新创建的对象作为 this 的上下文；
4. 如果该函数没有返回对象，则返回 this。

### 我们把new实现为**函数**的形式

```js
/**
 * 模拟实现 new
 * @param {Function} Con 构造函数
 * @param  {...any} args 参数
 */
function myNewFn (Con, ...args) {
  const obj = Object.create(Con.prototype)
  let result = Con.apply(obj, args)
  return result instanceof Object ? result : obj
}
```

### 在浏览器中测试一下

分别测试构造函数不同返回值情况

```js
// 无返回值
function Person1(name, age) {
  this.name = name
  this.age = age
}
// 返回值类型
function Person2(name, age) {
  this.name = name
  this.age = age
  return 'success'
}
// 返回引用类型
const Person3 = function (name, age) {
  this.name = name
  this.age = age
  return {ret: 'success'}
}

let p1 = myNewFn(Person1, 'Tom', 23)
let p2 = myNewFn(Person2, 'Jerry', 23)
let p3 = myNewFn(Person3, 'Alice', 23)
let pa = new Person1('Tom', 23)
let pb = new Person2('Jerry', 23)
let pc = new Person3('Alice', 23)
console.log(p1, p2, p3)
console.log(pa, pb, pc)
```
