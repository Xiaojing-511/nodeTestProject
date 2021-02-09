const Koa = require('koa');
const app = new Koa();
const path = require('path');
const static = require('koa-static');
const staticPath = './static'

app.use(static(
    path.join(staticPath)
))

app.use(async ctx=>{
    ctx.body = 'hello'
})

app.listen(3000,()=>{
    console.log('3000..........');
}
)