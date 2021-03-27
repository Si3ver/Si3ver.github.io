---
title: 【模拟实现】EventEmitter
sidebar: "auto"
date: 2020-03-25
tags:
  - 面试
  - 模拟实现
  - 设计模式
categories:
  - javascript
---

### 原理

发布订阅模式

1. emitter.on(name,fn) // 订阅name事件，监听函数为fn，可多次订阅
2. emitter.once(name,fn)  // 功能与on类似，但监听函数为一次性的，触发后自动移除
3. emitter.emit(name,data1,data2,...,datan) // 发布name事件，所有订阅该事件的监听函数被触发，data1,…,datan作为参数传给监听函数，若有多个函数，按照顺序执行
4. emitter.remove(name,fn) // 移除name事件的监听函数fn

### 代码实现

```js
class EventEmitter {
  constructor () {
    this._cache = Object.create(null)
  }
  on (type, fn) {
    this._cache[type] = this._cache[type] || []
    const fns = this._cache[type]
    if (fns.indexOf(fn) < 0) {
      fns.push(fn)
    }
    return this
  }
  once (type, fn) {
    const wrapFn = (...args) => {
      fn.apply(this, args)
      this.remove(type, wrapFn)
    }
    this.on(type, wrapFn)
    return this
  }
  emit (type, ...args) {
    const fns = this._cache[type]
    if (Array.isArray(fns)) {
      fns.forEach(fn => {
        fn(...args)
      })
    }
    return this
  }
  remove (type, fn) {
    const fns = this._cache[type]
    if (Array.isArray(fns)) {
      if (fn) {
        const idx = fns.indexOf(fn)
        if (idx >= 0) {
          fns.splice(idx, 1)
        }
      } else { // clear all binded functions
        fns.length = 0
      }
    }
    return this
  }
}
```

### 测试一下

```js
function fn1(a, b, c) {
  console.log(a, b, c)
}
function fn2(a, b) {
  console.log(a * 2, b * 3)
}
var em = new EventEmitter()

// 测试 on 和 emit
em.on('e1', fn1)
  .on('e1', fn2)
  .emit('e1', 1, 2, 3)  // 1, 2, 3   2, 6
  .emit('e1', 1, 2, 3)  // 1, 2, 3   2, 6
console.log(em._cache.e1) // [fn1, fn2]

// 测试 once 和 emit
em.once('e2', fn1)
  .once('e2', fn2)
  .emit('e2', 3, 4, 5)  // 3, 4, 5   6, 12
  .emit('e2', 3, 4, 5)  // 3, 4, 5
  .emit('e2', 3, 4, 5)  // 3, 4, 5
console.log(em._cache.e2) // []
```
