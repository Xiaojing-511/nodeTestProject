const Koa = require('koa')   //默认找koa下的index.js  没有index.js就加载package.json中的main设置的js
const app = new Koa()
const Router = require('@koa/router')
const router = new Router();
const bodyParser = require('koa-bodyparser'); //用来处理post数据的中间件
app.use(bodyParser())

let html = ` 
<h1>用户注册</h1>
<form method="POST" action="/regist">
  <p>userName: <input name="userName" /></p>
  <p>nickName: <input name="nickName" /></p>
  <p>email: <input name="email" /></p>
  <p><button type="submit">submit</button></p>
</form>
`;
router.get('/', (ctx) => {
    ctx.body = html;
})

router.post('/regist', (ctx) => {
    ctx.body = ctx.request.body;

})
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);

console.log('3000........');