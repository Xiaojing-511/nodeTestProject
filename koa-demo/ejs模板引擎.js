const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const path= require('path')
const Router = require('@koa/router');
const router = new Router();
const static = require('koa-static');

// 用来配置ejs文件的加载路径
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs' //ejs文件的扩展名，可以是任何有效的扩展名
}))
app.use(static(path.join(__dirname, './static')))

router.get('/index',async (ctx)=>{
    var title = 'hello ejs';
    await ctx.render('index',{
        myTitle: title
    });
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000,ctx=>{
    console.log('30000....');
});