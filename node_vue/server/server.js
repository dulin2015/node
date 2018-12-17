const Koa = require('koa');
const Router = require('koa-router');

let server = new Koa();
server.listen(7000);

let router = new Router();

router.use('/auth/user', require('./api/index'));
server.use(router.routes());