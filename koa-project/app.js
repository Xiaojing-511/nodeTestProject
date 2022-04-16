const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const KoaStatic = require('koa-static')
const path = require('path');
const bodyParser = require('koa-bodyparser');
// const multer = require("@koa/multer");
const cors = require("koa-cors");
const WebSocket = require('ws');
app.use(cors()); //跨域插件
// 引入路由
const router = require('./router/index');
app.use(async (ctx, next) => {
    // 配置公共数据 ctx.state
    ctx.state.commonTitle = '这是一个公共数据';
    await next();
})
app.use(bodyParser());
// 配置ejs文件的加载路径
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'  // ejs文件的扩展名，可以是任何有效的扩展名
}))
// 启动路由
app.use(router.routes()).use(router.allowedMethods());
// 以上为官方推荐方式，allowedMethods用在routes之后，作用是根据ctx.status设置response header.

//使用KoaStatic，绑定目录为./public/upload，直接用‘地址/文件名访问’
// app.use(KoaStatic("./public/upload"));
app.use(KoaStatic(path.join(__dirname, "public")));



app.listen(3000);
console.log(' ok 3000.....');

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
        let data = {
            sendId: resData.sendId, 
        };
        data.receptionId = resData.receptionId ? resData.receptionId : resData.receptionIds;
        // 每次发送都相当于广播一次消息
        wss.broadcast(JSON.stringify(data))
    })
    ws.on('close', function (e) {
        console.log('长连接已关闭',e)
    })

//   ws.send('连接已建立')
})

