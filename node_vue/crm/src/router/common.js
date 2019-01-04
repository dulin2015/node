export default [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: resolve => require(['@/pages/common/login'], resolve)
}, {
  path: '*',
  meta: {
    title: '404'
  },
  name: 'NotFount',
  component: resolve => require.ensure([], resolve(require(['@/pages/common/404'])))
}]
