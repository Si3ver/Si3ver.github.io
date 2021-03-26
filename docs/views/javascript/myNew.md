---
title: 模拟实现new
sidebar: "auto"
tags:
  - 面试
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
