---
title: 【模拟实现】节流
sidebar: "auto"
date: 2020-03-22
tags:
  - 面试
  - 模拟实现
categories:
  - javascript
---

### 原理

事件节流：只允许一个函数在 x 毫秒内执行一次。

### 代码实现

```js
/**
 * 1. 定时器版 【事件执行距离事件触发有 wait 毫秒延迟】
 * @param {Function} fn 要处理的函数
 * @param {Number} wait 延迟时长
 */
const throttle1 = function(fn, wait = 300) {
  let timer
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        // console.log('111')
        return fn.apply(this, args)
      }, wait)
    }
  }
}

/**
 * 2. 时间戳版 【首次立即执行、最后一次可能会cut掉】
 * @param {Function} fn 要处理的函数
 * @param {Number} wait 延迟时长
 */
const throttle2 = function(fn, wait = 300) {
  let prev = 0
  return function(...args) {
    let now = new Date().getTime()
    if (now - prev > wait) {
      prev = now
      // console.log('222')
      return fn.apply(this, args)
    }
  }
}

/**
 * 3. 双剑合璧版
 * @param {Function} fn 要处理的函数
 * @param {Number} wait 延迟时长
 * @param {Boolean} leading false 表示禁用第一次执行
 * @param {Boolean} trailing false 表示禁用停止触发的回调
 * leading：false 和 trailing: false 不能同时设置
 */
const throttle3 = function(fn, wait = 300, leading = true, trailing = true) {
  let prev = 0, timer
  const later = function(args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, wait)
  }
  return function (...args) {
    let now = new Date().getTime()
    if (!leading) return later(args)
    if (now - prev > wait) {
      fn.apply(this, args)
      prev = now
    } else if (trailing) {
      later(args)
    }
  }
}
```

### 测试一下

```js
var fn = function(x) {
  console.log(`${new Date().getTime()} 调用fn: ${x}`)
}
var tf1 = throttle1(fn, 300)
var tf2 = throttle2(fn, 300)
var tf3 = throttle3(fn, 300)


var wait = 100
for(let i = 0; i < 30; ++i) {
  wait += 200
  console.log(`${i}放入事件队列，wait ${wait} 毫秒`)
  setTimeout(()=>{
    // tf1(i)
    // tf2(i)
    tf3(i)
  }, wait)
}
```
