// import login from '@/pages/user/login'
import NotFount from '@/404'

export default [{
  path: '/',
  redirect: '/login'
}, {
  path: '*',
  meta: {
    title: '404'
  },
  name: 'NotFount',
  component: NotFount
}]
