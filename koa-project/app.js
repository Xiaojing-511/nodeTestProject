const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const path = require('path');
const bodyParser = require('koa-bodyparser');
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

app.use(bodyParser());

// 启动路由
app.use(router.routes()).use(router.allowedMethods())
// 以上为官方推荐方式，allowedMethods用在routes之后，作用是根据ctx.status设置response header.
app.listen(3000);
console.log(' ok 3000.....');
const WebSocket = require('ws') 

const wss = new WebSocket.Server({ port: 8080 })
// 调用broadcast广播，实现数据互通和实时更新
wss.broadcast = function (msg) {
    wss.clients.forEach(function (item) {
      item.send(msg)
    })
  }
wss.on('connection', ws => {
//   console.log('server connection')
    ws.on('message', e => {
        var resData = JSON.parse(e);
        console.log('服务端接收的消息：', e)
        // 每次发送都相当于广播一次消息
        wss.broadcast(JSON.stringify({ sendId: resData.sendId, receptionId: resData.receptionId}))
    })
    ws.on('close', function (e) {
        console.log('长连接已关闭',e)
    })

//   ws.send('连接已建立')
})

