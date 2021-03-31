---
title: 【模拟实现】Call/Apply/Bind
sidebar: "auto"
date: 2020-03-24
tags:
  - 面试
  - 模拟实现
categories:
  - javascript
---

### 原理

三个方法经常用来改变`this`的指向

+ [this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
+ [Function.prototype.call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
+ [Function.prototype.apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
+ [Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)


### 代码实现

```js
/**
 * 模拟实现 call
 * this 指向要调用的函数
 * @param {*} context 传入的对象
 * @param  {...any} args 参数
 */
Function.prototype.myCall = function(context, ...args) {
  const obj = context ? new Object(context) : window
  const key = Symbol()
  obj[key] = this
  const result = obj[key](...args)
  delete obj[key]
  return result
}

/**
 * 模拟实现 apply
 * this 指向要调用的函数
 * @param {Object} context 传入的对象
 */
Function.prototype.myApply = function(context) {
  const obj = context ? new Object(context) : window
  const args = arguments[1]
  const key = Symbol()
  obj[key] = this
  const result = args ? obj[key](...args) : obj[key]()
  delete obj[key]
  return result
}

/**
 * 模拟实现 bind
 * this 指向要调用的函数
 * @param {Object} context 传入的对象
 * @param  {...any} args 
 */
Function.prototype.myBind = function(context, ...args) {
  const fn = this
  const bindFn = function (...newFnArgs) {
    return fn.call(
      this instanceof bindFn ? this : context,
      ...args,
      ...newFnArgs
    )
  }
  bindFn.prototype = Object.create(fn.prototype)
  return bindFn
}
```

### 测试一下

```js
window.name = 'Rocky'
const person1 = {
  name: 'Tom',
  say(arg1, arg2) {
    console.log(`my name is ${this.name}, ${arg1}-${arg2}`)
  }
}
const person2 = {
  name: 'Jerry'
}

person1.say('aaa', 'bbb') // Tom
person1.say.call(person2, 'ccc', 'ddd') // Jerry
person1.say.myCall(null, 'ddd', 'eee')  // Rocky
person1.say.myApply(person2, ['fff', 'ggg']) // Jerry
person1.say.myApply(null, ['hhh', 'iii']) // Rocky
var newSay = person1.say.bind(person2, 'jjj')
newSay('kkk', 'lll')  // Jerry jjj-kkk
```
