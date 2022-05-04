const jwt = require("jsonwebtoken");
// let { secret } = require("../util/secret");
const SECRET_KEY = 'Online social networking site for college students';
async function check(ctx, next) {
    // console.log('ctx.request',ctx.request);
    // await next();
    let url = ctx.request.url;
    // 登录 不用检查
    // 规定token写在header 的 'autohriurlzation' 
    let token = ctx.request.headers["authorization"];
    if (url == "/userlogin" || url.split('.').length > 1 || !token || token == 'null') await next();
    else {
        // 解码
        let payload = jwt.verify(token, SECRET_KEY);
        let { time, timeout } = payload;
        let data = new Date().getTime();
        // console.log('time, timeout',time, timeout,data - time);
        if (data - time <= timeout) {
            console.log('未过期11。。。');
            // 未过期
            await next();
        } else {
            //过期
            console.log('token 已过期');
            ctx.body = {
                status: 50014,
                message:'token 已过期'
            };
    }
  }
}

module.exports = check