/**
 * @file 实现 v-text 指令，模拟数据驱动视图层更新
 */

class ViewBind {
  constructor({ el = 'body', data = {} } = {}) {
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
      enumerable: true,
      configurable: true,
      set(newVal) {
        value = newVal
        self.updateDom()
      },
      get() {
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


const app = new ViewBind({
  el: '#app',
  data: {
    title: '这是标题',
    time: +new Date()
  }
})

setInterval(() => {
  // 定时修改页面上<span v-text="time">元素中的内容
  app.data.time = +new Date()
  console.log('[data]:', app.data.time)
}, 1000)
