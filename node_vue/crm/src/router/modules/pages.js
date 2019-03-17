export default [{
  path: '/docTemplate',
  name:'docTemplate',
  meta: {
    title: 'NTKO模板'
  },
  component: resolve => require(['@/pages/template_NTKO'], resolve)
}]