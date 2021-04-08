---
title: 【工具方法】页面出现次数最多的标签
sidebar: "auto"
date: 2021-04-03
tags:
  - 面试
  - 编程能力
categories:
  - utils
---

### 步骤

1. 获取页面所有标签
2. 哈希表统计计数
3. 遍历一趟哈希表，取出最大 tag

### 代码实现

```js
function getFrequentTag () {
  const tags = [].map.call(
    document.querySelectorAll('*'), 
    node => 
      node.tagName.toLowerCase()
  )
  const map = tags.reduce((o, tag) => {
    o[tag] = o[tag] ? o[tag] + 1 : 1
    return o
  }, {})
  const list = Object.entries(map)
  const targetItem = list.reduce((maxTimeItem, item) => {
    return item[1] > maxTimeItem[1] ? item : maxTimeItem
  })
  return targetItem[0]
}
```

### 测试一下

```js
getFrequentTag()
```
