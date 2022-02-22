const router = require('@koa/router')();
const upload = require('../js/upload');
const { createUserAccount,getUserPwd,createUserStatus,queryAllUserStatus
    ,createNewChatContents,queryChatList,addFriend,queryFriends,judgeIsFriend,
    createUserCommodityStatus,updateUserInfo,getUserInfo,updateUserImg
} = require('../api/communication');
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
    console.log('friend',ctx.request.body.uid);
    await addFriend({
        uid: ctx.request.body.uid,
        ufriendId: '小助手'
    });
    ctx.body =
    {
        status: 200,
        data: {
            
        }
    }
}).post('/getUserInfo',async ctx=>{
    let info = await getUserInfo(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data: {
            info
        }
    }
}).post('/updateAccountImg',async ctx=>{
    let info = await updateUserImg(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data: {
            info
        }
    }
})
.post('/updateAccountInfo',async ctx=>{
    let info = await updateUserInfo(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data: {
            info
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
    await addFriend(ctx.request.body);
    ctx.body =
    {
        status: 200
    }
}).post('/queryFriends',async ctx=>{
    let res = await queryFriends(ctx.request.body);
    console.log('res',res);
    ctx.body =
    {
        status: 200,
        data: res
    }
}).post('/judgeIsFriend',async ctx=>{
    let res = await judgeIsFriend(ctx.request.body);
    console.log('res',res);
    ctx.body =
    {
        status: 200,
        data: {
            isFriend: res
        }
    }
}).post('/createUserCommodityStatus',async ctx=>{
    let res = await createUserCommodityStatus(ctx.request.body);
    console.log('res',res);
    ctx.body =
    {
        status: 200,
        data: {
            
        }
    }
}).post("/add", upload.upload.single("file"), async (ctx) => {
    console.log('upload...',upload,upload.getImgName());
    // 返回结果给前端
    ctx.body = {
      mesg: "ok",
      imgName: upload.getImgName(),
    };
});

module.exports = router;