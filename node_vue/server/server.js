const Koa = require('koa');
const body = require('koa-better-body');
const Router = require('koa-router');
const cors = require('koa-cors');
const session = require('koa-session');

let server = new Koa();
server.use(cors({
    origin: "http://localhost:7070",
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
})); //跨域

server.use(body({
    uploadDir: './upload'
}));

server.use(session({
    
}, server))

let router = new Router();

router.use(require('./routers/user'));
server.use(router.routes());

server.listen(7000, 'localhost', function() {
    console.log('=== node server ===')
});
