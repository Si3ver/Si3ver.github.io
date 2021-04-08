---
title: 【工具方法】getAge
sidebar: "auto"
date: 2021-04-02
tags:
  - 面试
  - 编程能力
categories:
  - utils
---

### 参考资料

> [MDN定义 - Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

### 问题

根据出生年月计算年龄

+ 约定： 过了 x 岁生日后一天才算 x 岁

注意事项：

1. 参数合法性校验
2. 边界条件
3. UTC时间

### 代码实现

```js
/**
 * @param {String} birthday 出生年月日
 * @returns {Number} 年龄
 */
function getAge(birthday) {
  const validator = new RegExp(/^\d{4}-\d{2}-\d{2}$/)
  if (!validator.test(birthday)) {
    throw new Error(`invalid argument ${birthday}`)
  }

  const [birthYear, birthMonth, birthDay] = birthday.split('-').map(str => Number(str))
  const now = new Date()
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth() + 1
  const nowDay = now.getDate()

  const age = nowYear - birthYear - 1
  if (nowMonth > birthMonth || (nowMonth === birthMonth && nowDay > birthDay)) {
    return age + 1
  } else {
    return age
  }
}
```

### 测试一下

```js
var log = console.log
log(getAge('1995-09-12'))
log(getAge('1995-03-26'))
log(getAge('1995-03-27'))
log(getAge('1995-03-28'))
```
