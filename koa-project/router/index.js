const router = require('@koa/router')();
const { createUserAccount,getUserPwd,createUserStatus,queryAllUserStatus
    ,createNewChatContents,queryChatList,addFriend,queryFriends } = require('../api/communication');
router.get('/', async (ctx) => {
    let hello = 'helll world';
    let welcomeText = 'Welcome my blog';

    await ctx.render('index', {
        hello,
        welcome: welcomeText,
        myFunc: function () {
            console.log('myFunc..............');
        }
    })
}).post('/createAccount',async ctx=>{
    await createUserAccount(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data: {
            
        }
    }
})
.post('/userlogin',async ctx=>{
    let pwdIsTrue = await getUserPwd(ctx.request.body);
    console.log('password--------',pwdIsTrue);
    ctx.body =
    {
        status: 200,
        data: {
            pwdIsTrue
        }
    }
}).post('/createUserStatus',async ctx=>{
    await createUserStatus(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data: {
            
        }
    }
}).post('/getAllUserStatus',async ctx=>{
    let res = await queryAllUserStatus(ctx.request.body);
    console.log('res',res);
    ctx.body =
    {
        status: 200,
        data: res
    }
}).post('/createNewChatContents',async ctx=>{
    console.log('ctx',ctx);
    let res = await createNewChatContents(ctx.request.body);
    console.log('res',res);
    ctx.body =
    {
        status: 200,
        data: res
    }
}).post('/queryChatList',async ctx=>{
    let res = await queryChatList(ctx.request.body);
    console.log('res',res);
    ctx.body =
    {
        status: 200,
        data: res
    }
}).post('/addFriend',async ctx=>{
    let res = await addFriend(ctx.request.body);
    console.log('res',res);
    ctx.body =
    {
        status: 200,
        data: res
    }
}).post('/queryFriends',async ctx=>{
    let res = await queryFriends(ctx.request.body);
    console.log('res',res);
    ctx.body =
    {
        status: 200,
        data: res
    }
})
module.exports = router;