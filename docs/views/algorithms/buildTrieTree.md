---
title: 【算法】扁平对象树形化
sidebar: "auto"
date: 2020-03-31
tags:
  - 面试
  - trie树
categories:
  - algoritms
---

### 面试题

将一个扁平对象，根据 keys 树形化。

```js
function listToTree(entries, keys) {
  // 待实现
}

var entries = [
  { "province": "浙江", "city": "杭州", "name": "西湖" },
  { "province": "四川", "city": "成都", "name": "锦里" },
  { "province": "四川", "city": "成都", "name": "方所" },
  { "province": "四川", "city": "阿坝", "name": "九寨沟" }
]
console.log(JSON.stringify(listToTree(entries, keys), null, 2))

/**
 * 期望结果如下
[
  {
    "value": "浙江",
    "children": [
      {
        "value": "杭州",
        "children": [
          {
            "value": "西湖"
          }
        ]
      }
    ]
  },
  {
    "value": "四川",
    "children": [
      {
        "value": "成都",
        "children": [
          {
            "value": "锦里"
          },
          {
            "value": "方所"
          }
        ]
      },
      {
        "value": "阿坝",
        "children": [
          {
            "value": "九寨沟"
          }
        ]
      }
    ]
  }
]
*/
```

### 实现思路

```js
function translate(entries = [], keys = []) {
  return entries.reduce(
    (tree, entry) => {
      return addEntryIntoTree(entry, keys, tree)
    },
    []
  )
}

function addEntryIntoTree(entry, keys, tree = []) {
  let value = entry[keys[0]]
  let target = tree.find(item => item.value === value)
  if (target) { // 找到 target，则修改 target
    toTree(entry, keys, target)
  } else {      // 无target，增加一项
    tree.push(toTree(entry, keys))
  }
  return tree
}

function toTree(entry, [key, ...restKeys], target = {}) {
  if (target.value == null) {
    target.value = entry[key]
    if (restKeys.length) {
      target.children = addEntryIntoTree(entry, restKeys)
    }
  } else if (target.value === entry[key] && restKeys.length) {
    addEntryIntoTree(entry, restKeys, target.children)
  }
  return target
}
```

### 测试一下

```js
var entries = [
  { "province": "浙江", "city": "杭州", "name": "西湖" },
  { "province": "四川", "city": "成都", "name": "锦里" },
  { "province": "四川", "city": "成都", "name": "方所" },
  { "province": "四川", "city": "阿坝", "name": "九寨沟" }
]
var keys = ['province', 'city', 'name']
console.log(JSON.stringify(translate(entries, keys), null, 2))
```
