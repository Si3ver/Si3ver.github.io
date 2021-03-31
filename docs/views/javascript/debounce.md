---
title: 【模拟实现】防抖
sidebar: "auto"
date: 2021-03-22
tags:
  - 面试
  - 模拟实现
categories:
  - javascript
---

### 原理

事件防抖：把触发非常频繁的事件（比如key event，resize）合并成一次执行。

### 代码实现

```js
/**
 * 防抖函数： 事件触发 n 秒后再执行回调，如果 n 秒内再次触发，则重新计时。
 * 
 * 常用于input输入框
 * @param {Function} fn 目标函数
 * @param {Number} wait 延迟时长
 * @param {Boolean} leading 首次触发是否立即执行
 */
const debounce = function(fn, wait = 300, leading = true) {
  let timer, result
  return function(...args) {
    timer && clearTimeout(timer)
    if (leading) {
      if (!timer) {
        result = fn.apply(this, args)
      }
      timer = setTimeout(() => {
        timer = null
      }, wait)
    } else {
      timer = setTimeout(() => {
        result = fn.apply(this, args)
      }, wait)
    }
    return result
  }
}
```

### 测试一下

```js
var f1 = function(i) {
  console.log(`${new Date().getTime()} 调用: ${i}`)
}
var df = debounce(f1, 300, true)

var delay = 100
for (let i = 0; i < 10; ++i) {
  delay += (i % 2 === 0 ? 500 : 100)
  console.log(`${i}放入事件队列，delay ${delay} 毫秒`)
  setTimeout(()=>{
    df(i)
  }, delay)
}
```
