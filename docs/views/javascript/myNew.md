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

> 直接上代码

```js
function myNewFn (Con, ...args) {
  const obj = Object.create(Con.prototype)
  let result = Con.apply(obj, args)
  return result instanceof Object ? result : obj
}
```
