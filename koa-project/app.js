const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const path = require('path');
// 引入路由
const router = require('./router/index');

app.use(async (ctx, next) => {
    // 配置公共数据 ctx.state
    ctx.state.commonTitle = '这是一个公共数据';
    await next();
})

// 配置ejs文件的加载路径
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'  // ejs文件的扩展名，可以是任何有效的扩展名
}))

// 启动路由
app.use(router.routes()).use(router.allowedMethods())
// 以上为官方推荐方式，allowedMethods用在routes之后，作用是根据ctx.status设置response header.
app.listen(3000);
console.log(' ok 3000.....');
