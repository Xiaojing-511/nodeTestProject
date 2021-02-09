const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const Router = require('@koa/router');
const path = require('path')
const router = new Router();
const static = require('koa-static');

const mysql = require('mysql')


// 用来配置ejs文件的加载路径
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs' //ejs文件的扩展名，可以是任何有效的扩展名
}))
app.use(static(path.join(__dirname, './static')))

var pool = mysql.createPool({
  connectionLimit: 10,
  host     : 'localhost',
  user     : 'root',
  password : 'ab123456',
  database : 'myblogs'
});

function query(sql){
  return new Promise((resolve, reject) => {
    console.log(pool.getConnection);
    pool.getConnection(function (err, connection) {
      if (err) reject(err);
      connection.query(sql, function (error, results) {
        connection.release();
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });
}

router.get('/users', async (ctx) => {
  var results = await query("SELECT * FROM t_user");
  await ctx.render("users", {
    users: results,
  });
});

router.get("/blogs", async (ctx) => {
  var results = await query("SELECT * FROM t_blog");
  await ctx.render("blogs", {
    blogs: results,
  });
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, ctx => {
  console.log('30000....');
})
