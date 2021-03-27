---
title: 【模拟实现】new
sidebar: "auto"
date: 2020-03-27
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

```js
const Person = function (name, age) {
  this.name = name
  this.age = age
}

var p1 = myNewFn(Person, 'Tom', 23)
var p2 = new Person('Jerry', 24)
console.log(p1, p2)
console.log(p1.__proto__ === Person.prototype)  // true
console.log(p1.__proto__ === p2.__proto__) // true
```
