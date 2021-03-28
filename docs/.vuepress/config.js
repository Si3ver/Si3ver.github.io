const themeConfig = require('./config/theme/')

module.exports = {
  base: '/',
  title: "williamzhou",
  description: '即使没人注视，也要努力成长，许多眼睛都藏在你看不见的地方',
  dest: 'docs/.vuepress/dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig,
  codeTheme: 'coy',
  markdown: {
    lineNumbers: true
  },
  plugins: [
    // 加载动画
    '@vuepress-reco/vuepress-plugin-loading-page',
    // 鼠标点击特效
    "cursor-effects",
    // 图片自适应
    '@vuepress/medium-zoom',
    // 流程图
    'flowchart',
    // 复制代码
    [
      'vuepress-plugin-code-copy',
      {
        successText: '复制成功',
      }
    ],
  ],
}
