const Router = require('koa-router');
const controller = require('../controller/user')

let router = new Router();

router.post('/auth/login', controller.login)

module.exports = router.routes();