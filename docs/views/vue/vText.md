---
title: 【模拟实现】v-text
sidebar: "auto"
date: 2020-03-30
tags:
  - 面试
  - vue
  - 模拟实现
categories:
  - javascript
---

### 面试题

模拟实现 v-text 指令，模拟数据驱动视图层更新。给定代码模版如下：

```html
<div id="app">
  <h1 v-text="title"></h1>
  <p>当前时间戳：<span v-text="time"></span></p>
</div>
```

```js
class ViewBind {
  constructor ({ el = 'body', data = {}} = {}) {
    // 此处实现代码
  }
}
/**
 * 调用方式类似 Vue 初始化，
 * el 代表根元素，data 中的字段会自动和 DOM 中 v-text 属性对应元素内容绑定
 **/
const app = new ViewBind({
  el: '#app',
  data: {
    title: '这是标题',
    time: +new Date()
  }
})
/**
 * 初始化之后页面#app显示效果如下：
  <div id="app">
    <h1 v-text="title">这是标题</h1>
    <p>当前时间戳：<span v-text="time">1522070099060</span></p>
  </div>
 * 类似于 Vue，初始化之后 app 内部有一个 data 对象，
 * 通过修改 data 对象的属性来间接修改 DOM 中挂载了对应 v-text 属性的元素内容
 **/
setInterval(() => {
  // 定时修改页面上<span v-text="time">元素中的内容
  app.data.time = +new Date()
  console.log('[data]:', app.data.time)
}, 1000)
```

### ViewBind类实现

**实现步骤**

1. 数据劫持，劫持 data 的 setter 方法
2. 更新视图

```js
class ViewBind {
  constructor ({ el = 'body', data = {}} = {}) {
    this.dom = document.querySelectorAll(el)
    this.data = data
    this.observe(data)
  }
  // 数据劫持
  observe(data) {
    const self = this
    Object.keys(data).forEach(function (key) {
      self.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, value) {
    const self = this
    Object.defineProperty(data, key, {
      enumerable : true,
      configurable : true,
      set (newVal) {
        value = newVal
        self.updateDom()
      },
      get () {
        return value
      },
    })
  }
  // 更新视图
  updateDom() {
    const self = this
    const queue = [...this.dom]
    while (queue.length > 0) {
      const node = queue.shift()
      if (node.children) {
        queue.push(...node.children)
      }
      if (node.attributes['v-text']) {
        const key = node.attributes['v-text'].value
        node.innerText = self.data[key]
      }
    }
  }
}
```

### 测试一下

[点击跳转](https://si3ver.github.io/demo/v-text.html)
