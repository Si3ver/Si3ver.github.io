---
title: 【模拟实现】Promise(一)
sidebar: "auto"
date: 2020-03-29
tags:
  - 面试
  - 模拟实现
categories:
  - javascript
---

### 第一版本：同步/异步调用

+ 构造函数接受一个 excutor 要立即执行
+ executor 接收 promise 提供的两个参数 resolve，reject
+ then 接收两个参数，成功回调和失败回调
+ 未调用 resolve 或 reject 时，promise 处于pending 状态等待
+ resolve 时，执行成功回调
+ reject 时，执行失败回调

```js
const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
}

class MyPromise {
  constructor(executor) {
    this.status = STATUS.PENDING
    this.value = void(0)  // 成功时的返回值
    this.reason = void(0) // 失败原因
    this.resolvedQueue = []  // 成功回调
    this.rejectedQueue = []  // 失败回调

    const resolve = value => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED
        this.value = value
        this.resolvedQueue.forEach(fn => fn())
      }
    }
    const reject = reason => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED
        this.reason = reason
        this.rejectedQueue.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then (onFullfilled, onRejected) {
    // 同步
    if (this.status === STATUS.FULFILLED) {
      onFullfilled(this.value)
    }
    if (this.status === STATUS.REJECTED) {
      onRejected(this.reason)
    }
    // 异步 -> 加入回调
    if (this.status === STATUS.PENDING) {
      this.resolvedQueue.push(() => {
        onFullfilled(this.value)
      })
      this.rejectedQueue.push(() => {
        onRejected(this.reason)
      })
    }
  }
}
```

#### 测试一下

```js
// 同步调用
new MyPromise((resolve, reject) => {
  resolve('🙆‍♂️')
  reject('🙅‍♂️')
}).then(
  (value) => {
    console.log('[sync fulfilled]', value)
  },
  (reason) => {
    console.log('[sync rejected]', reason)
  }
)

// 异步调用
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('🙆‍♂️')
  }, 500)
  setTimeout(() => {
    reject('🙅‍♂️')
  }, 100)
}).then(
  (value) => {
    console.log('[async fulfilled]', value)
  },
  (reason) => {
    console.log('[async rejected]', reason)
  }
)
```

### 第二版本：链式调用

先来看看什么是链式调用，先看看以下代码在浏览器的运行结果：

```js
// 同步链式调用
var p1 = new Promise((resolve, reject) => {
  resolve('value1')
}).then((value) => {
  console.log("log1", value)
  return 'value2'
}).then((value) => {
  console.log("log2", value);
})
console.log(p1)
// log1 value1
// log2 value2

// 异步链式调用
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('value1')
  }, 500)
}).then((value) => {
  return new Promise((resolve) => {
    console.log("log1", value)
    setTimeout(() => {
      resolve('value2')
    }, 1000)
  })
}).then((value) => {
  console.log("log2", value);
})
console.log(p2)
// 500毫秒后：log1 value1
// 1500毫秒后：log2 value2
```

第二版本，敬请期待！
