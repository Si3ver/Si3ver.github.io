---
title: 【模拟实现】instanceof
sidebar: "auto"
date: 2020-03-26
tags:
  - 面试
  - 模拟实现
  - 原型链
categories:
  - javascript
---

### 原理

[MDN定义 - instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)

> `instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型上。

> 特别注意：[对值类型变量使用 instanceof](https://stackoverflow.com/questions/203739/why-does-instanceof-return-false-for-some-literals)

### 实现思路

遍历左边变量的原型链，直到找到右边变量的 prototype，如果没有找到，返回 false

### 代码实现（函数形式）

```js
/**
 * instanceof 函数
 * @param {Object} left 某变量
 * @param {Function} right 某构造函数
 */
function myInstanceofFn (left, right) {
  // 值类型变量
  if (left == null) return false
  if (['boolean', 'string', 'number'].indexOf(typeof left) > -1) return false

  let lProto = left.__proto__
  const target = right.prototype
  while (lProto) {
    if (lProto === target) return true
    lProto = lProto.__proto__
  }
  return false
}
```

### 测试一下

分别测试构造函数不同返回值情况

```js
// 测试值类型
console.log(  // false
  myInstanceofFn(Object.create(null), Object),
  Object.create(null) instanceof Object
)
console.log(  // false
  myInstanceofFn('abc', Object),
  'abc' instanceof Object
)

// 测试引用类型
console.log(  // true
  myInstanceofFn(Array, Object),
  Array instanceof Object
)
console.log(  // true
  myInstanceofFn(Function, Object),
  Function instanceof Object
)
console.log(  // true
  myInstanceofFn(new String('abc'), String),
  new String('abc') instanceof String
)
console.log(  // true
  myInstanceofFn(new String('abc'), Object),
  new String('abc') instanceof Object
)
console.log(  // false
  myInstanceofFn(new String('abc'), Array),
  new String('abc') instanceof Array
)
```
