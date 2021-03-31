---
title: 【模拟实现】函数柯里化
sidebar: "auto"
date: 2021-03-21
tags:
  - 面试
  - 模拟实现
categories:
  - javascript
---

### 原理

柯里化：是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术

### 代码实现

```js
const currying = (fn) => {
  return _curry = (...args) => {
    return args.length >= fn.length
           ? fn(...args)
           : (...newArgs) => _curry(...args, ...newArgs)
  }
}
```

### 测试一下

```js
const add = (a, b, c, d) => a + b + c + d
const cAdd = currying(add)
console.log(cAdd(1)(2)(3)(4)) // 10
console.log(cAdd(1, 2)(3, 4)) // 10
console.log(cAdd(1)(2, 3, 4)) // 10
console.log(cAdd(1, 2, 3)(4)) // 10
```
