export default [{
  path: '/docTemplate',
  name:'docTemplate',
  meta: {
    title: 'NTKO模板'
  },
  component: resolve => require(['@/pages/template_NTKO'], resolve)
}, {
  path: '/transition',
  name:'transition',
  meta: {
    title: '显示更多'
  },
  component: resolve => require(['@/pages/transition'], resolve)
}]