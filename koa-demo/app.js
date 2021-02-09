const Koa = require('koa')   //默认找koa下的index.js  没有index.js就加载package.json中的main设置的js
const app = new Koa()
const logger = require('./logger')
const Router = require('koa-router')

// 日志
// app.use( async ( ctx ) => {
//     ctx.body = 'hello koa2'
//     let url = ctx.request.url;
//     ctx.body = url;
// })
// app.use(logger());

// 路由
const router = new Router();
router.get('/',async (ctx) => {
    ctx.body = '<p>首页。。。。。。。。。。</p>'
}).get('/404',async (ctx) => {
    ctx.body = '<p>404...........</p>'
})
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())







app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')