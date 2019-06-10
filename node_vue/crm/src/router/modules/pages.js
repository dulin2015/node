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
}, {
  path: '/clamp',
  name:'clamp',
  meta: {
    title: 'Clamp'
  },
  component: resolve => require(['@/pages/clamp'], resolve)
}, {
  path: '/data',
  name:'data',
  meta: {
    title: 'data'
  },
  component: resolve => require(['@/pages/data'], resolve)
}, {
  path: '/reg',
  name:'reg',
  meta: {
    title: 'reg'
  },
  component: resolve => require(['@/pages/reg'], resolve)
}, {
  path: '/form',
  name:'form',
  meta: {
    title: 'form'
  },
  component: resolve => require(['@/pages/form'], resolve)
}, {
  path: '/table',
  name:'table',
  meta: {
    title: 'table'
  },
  component: resolve => require(['@/pages/table'], resolve)
}]