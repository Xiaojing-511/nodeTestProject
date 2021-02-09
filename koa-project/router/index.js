const router = require('@koa/router')();
const { query } = require('../server');
console.log(query);
router.get('/', async (ctx) => {
    let hello = 'helll world';
    let welcomeText = 'Welcome my blog';
    
    await ctx.render('index', {
        hello,
        welcome: welcomeText,
        myFunc: function(){
            console.log('myFunc..............');
        }
    })
}).get('/blog', async ctx => {
    console.log(ctx.method);
    var blogs = await query("SELECT * FROM t_blog");
    console.log(blogs);
    // await ctx.render('blog', {
    //     blogs,
    // })
    ctx.body = {
        code: 2000,
        data: {
            blogs
        }

    }

})
module.exports = router;