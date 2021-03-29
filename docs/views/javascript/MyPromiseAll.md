---
title: 【模拟实现】promiseAll()
sidebar: "auto"
date: 2020-03-29
tags:
  - 面试
  - 模拟实现
categories:
  - javascript
---

### 实现思路

1. 接收一个`Promise`实例数组，或具有`Iterator`接口的对象
2. 如果元素不是`Promise`对象，则使用`Promise.resolve`转成`Promise`对象
3. 如果全部成功，则状态变为`fulfilled`，返回值组成一个数组回调
4. 只要其中一个失败了，则状态变为`rejected`，失败的返回值传递给`catch`

看下浏览器下，`Promise.all()`的效果：

```js
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1 success')
  }, 500)
})
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2 success')
  }, 1000)
})
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p3 fail')
  }, 500)
})
var p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p4 fail')
  }, 1000)
})

Promise.all([1, 2, 3, p1, p2])
  .then(function (results) {
    console.log(results)
  }).catch(function (e){
    console.log(e)
  })

Promise.all([1, 2, 3, p3, p4])
  .then(function (results) {
    console.log(results)
  }).catch(function (e){
    console.log(e)
  })
// 0.5秒后，p3 fail
// 1秒后，[ 1, 2, 3, 'p1 success', 'p2 success' ]
```

### 代码实现

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('invalid arguments!'))
    }
    let n = promises.length
    let rets = Array(n)   // resolve的返回值
    let resolvedCnt = 0   // 已经resolve的数量
    for (let i = 0; i < n; ++i) {
      Promise.resolve(promises[i])
        .then(
          value => {
            ++resolvedCnt
            rets[i] = value
            if (resolvedCnt === n) {
              return resolve(rets)
            }
          },
          reason => {
            return reject(reason)
          }
        )
    }
  })
}
```

### 测试一下

```js
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1 success')
  }, 500)
})
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2 success')
  }, 1000)
})
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p3 fail')
  }, 500)
})
var p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p4 fail')
  }, 1000)
})

promiseAll([1, 2, 3, p1, p2])
  .then(function (results) {
    console.log(results)
  }).catch(function (e){
    console.log(e)
  })

promiseAll([1, 2, 3, p3, p4])
  .then(function (results) {
    console.log(results)
  }).catch(function (e){
    console.log(e)
  })

// 0.5秒后，p3 fail
// 1秒后，[ 1, 2, 3, 'p1 success', 'p2 success' ]
```

与`Promise.all()`表现一致。
