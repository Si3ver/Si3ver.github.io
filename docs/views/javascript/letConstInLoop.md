---
title: 【原理】你真的了解let/const吗
sidebar: "auto"
date: 2021-04-03
tags:
  - 原理
  - ES6
categories:
  - javascript
---

[[toc]]

## 先看几段代码

### 1. 异步打印

```js
for (var i = 0; i < 3; ++i) {
  setTimeout(() => {console.log(i)})
}
```

::: details 查看结果
3
3
3
:::

**改成let试试**

```js
for (let i = 0; i < 3; ++i) {
  setTimeout(() => {console.log(i)})
}
```

::: details 查看结果
0
1
2
:::

### 2. 在循环中创建函数

```js
var fns = []
for (var i = 0; i < 3; ++i) {
  fns.push(() => { console.log(i) })
}
fns.forEach(fn => fn())
```

::: details 查看结果
3
3
3
:::

**改成let试试**

```js
var fns = []
for (let i = 0; i < 3; ++i) {
  fns.push(() => { console.log(i) })
}
fns.forEach(fn => fn())
```

::: details 查看结果
1
2
3
:::

## 原理

[《深入理解ES6》](https://book.douban.com/subject/27072230/) 第一章，块级作用域绑定，P9 循环中的let声明一节中提到，每次循环迭代都会创建一个新变量，并以之前迭代中同名变量的值将其初始化。

[《JavaScript高级程序设计（第4版）》](https://book.douban.com/subject/35175321/) 第三章，语言基础，3.3.2节，P28页中也提到，在使用let声明迭代变量时，JavaScript引擎在后台会为每个迭代循环声明一个新的迭代变量。

因此，推荐`for`循环中使用let来声明变量，`for...in`和`for...of`推荐使用`const`来声明迭代变量。

## 使用引用类型循环

```js
for (const i = {a: 0}; i.a < 3; i.a = i.a + 1) {
  i[`${i.a}`] = i.a
  setTimeout(() => console.log(i), 1000 * i.a)
}
```

::: details 查看结果
{ '0': 0, '1': 1, '2': 2, a: 3 }

{ '0': 0, '1': 1, '2': 2, a: 3 }

{ '0': 0, '1': 1, '2': 2, a: 3 }
:::

如果使用引用类型来进行循环，因为没有改变`i`的值（实际上`i`是一个指向堆内存对象的指针），可以使用`const`来声明`i`,这与使用`let`、`var`结果相同。

如果`JavaScript`暂时未提供查看变量栈内存地址的API，就能比较容易地验证这种说法了。
