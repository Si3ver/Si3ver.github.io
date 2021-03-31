---
title: 【模拟实现】Object.assign()
sidebar: "auto"
date: 2021-03-23
tags:
  - 面试
  - 模拟实现
categories:
  - javascript
---

### 原理

+ [Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

### 代码实现

```js
/**
 * 模拟实现 Object.assign
 * @param {Object} target 接收对象
 * @param {Object} source 被拷贝的对象
 * @returns 
 */
function myAssign(target, source) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  const to = Object(target) // 装箱转换，对于 object ，仍然指向同一个地址
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      to[key] = source[key]
    }
  }
  return to
}
```

### 测试一下

```js
const target1 = { a: 1, b: 2 };
const target2 = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget1 = Object.assign(target1, source)
const returnedTarget2 = myAssign(target2, source)

console.log(returnedTarget1 === target1, returnedTarget2 === target2) // true true
// returnedTarget1、target1 -> {a: 1, b: 4, c: 5}
// returnedTarget2、target2 -> {a: 1, b: 4, c: 5}
```
