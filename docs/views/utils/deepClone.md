---
title: 【工具方法】deepClone
sidebar: "auto"
date: 2020-03-12
tags:
  - 面试
  - 编程能力
categories:
  - utils
---

### 参考资料

> [WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

### 实现原理

+ 值类型及 Date、RegExp 拷贝完可以终止
+ weakMap解决循环引用
+ 递归拷贝 Array 和 Object 属性

### 代码实现

```js
/**
 * 深拷贝
 * @param {any} origin 被克隆者
 */
const myDeepClone = function (origin, wm = new WeakMap()) {
  // 处理一般对象
  if (typeof origin !== 'object' || origin == null) return origin
  if (origin instanceof Date) return new Date(origin)
  if (origin instanceof RegExp) return new RegExp(origin)
  // weakMap 处理循环引用
  const stashed = wm.get(origin)
  if (stashed) return stashed
  let target = Array.isArray(origin) ? [] : {}
  wm.set(origin, target)
  // 递归拷贝每个属性（Array or Object）
  for (let key in origin) {
    if (origin.hasOwnProperty(key)) {
      target[key] = myDeepClone(origin[key], wm)
    }
  }
  return target
}
```

### 测试一下

一般对象

```js
var p1 = {
  name: 'alwyn',
  age: 12,
  birthday: new Date('1995-09-12'),
  hobby: ['eat', 'sleep', 'code'],
  address: {
    city: 'shenzhen'
  },
}

var p2 = myDeepClone(p1)
p1.address.city = 'beijing'
p2.hobby.push('music')
console.log(p1, p2) // p1、p2 相互独立
```

循环引用的对象

```js
var o1 = {x: 1}, o2 = {y: 2}
o1.a = o2
o2.b = o1
var o3 = myDeepClone(o1)
o1.z = 100
console.log(o1, o3)
```

循环引用的数组

```js
var arr1 = [1, 2, 3]
arr1.push(arr1)
var arr2 = myDeepClone(arr1)
arr2.push(1)
console.log(arr1, arr2)
```
