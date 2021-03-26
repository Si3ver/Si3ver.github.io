module.exports = {
  title: 'alwynzhou',
  description: '即使没人注视，也要努力成长，许多眼睛都藏在你看不见的地方',
  themeConfig: {
    //   logo: '/assets/img/logo.png',
    nav: [
      { text: '主页', link: '/' },
      {
        text: '关于', items: [
          { text: '关于我', link: '/views/about/' },
          { text: 'Github', link: 'https://github.com/Si3ver' },
        ]
      },
    ],
    lastUpdated: 'Last Updated',
  },
  markdown: { 
    lineNumbers: true,
  },
}
