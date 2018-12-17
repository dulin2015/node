const Router = require('koa-router');

let router = new Router();

router.get('/catalogue', async (ctx, next) => {
    ctx.body = 'catalogue';
})

module.exports = router.routes();