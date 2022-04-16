const router = require('@koa/router')();
const upload = require('../js/upload');
const upload_commodity = require('../js/upload_commodity');
const upload_status = require('../js/upload_status');
const upload_chat = require('../js/upload_chat');
const { createUserAccount,getUserPwd,isOnlyUserId,createUserStatus,addUserStatusImg,queryAllUserStatus,queryUserStatus,getTypesStatus
    ,createNewChatContents,sendMoreChatContents,queryChatList,addFriend,queryFriends,judgeIsFriend,deleteFriend,getStatusTagTypes,
    createUserCommodityStatus,updateUserInfo,getUserInfo,updateUserImg,addUserCommodityStatusImg,
    getAllUserCommodityStatus,getTypesCommodityStatus,getUserCommodityStatus,getCommodityTagTypes,createCommodityComment,
    getCommodityComment,deleteUserStatus,deleteUserCommodityStatus,getStatusComment,createStatusComment
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
    // console.log('friend',ctx.request.body.uid);
    await addFriend({
        uid: ctx.request.body.uid,
        ufriendId: '官方小助手'
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
}).post('/updateAccountInfo',async ctx=>{
    let info = await updateUserInfo(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data: {
            info
        }
    }
}).post('/userlogin',async ctx=>{
    let data = await getUserPwd(ctx.request.body);
    // console.log('password--------',pwdIsTrue);
    ctx.body =
    {
        status: 200,
        data
    }
}).post('/isOnlyUserId',async ctx=>{
    let isOnly = await isOnlyUserId(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data: {
            isOnly
        }
    }
}).post('/searchUser',async ctx=>{
    let isHave = await isOnlyUserId(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data: {
            isHave: !isHave
        }
    }
}).post('/createUserStatus',async ctx=>{
    let sid = await createUserStatus(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data: {
            sid
        }
    }
}).post('/addStatusPhoto',upload_status.upload.array("filestatus",9), async (ctx) => {
    let img = upload_status.getImgName();
    // 返回结果给前端
    ctx.body = {
      mesg: "ok",
      imgName: img,
    };
}).post('/addUserStatusImg',async ctx=>{
    addUserStatusImg(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data: {
            
        }
    }
}).post('/getAllUserStatus',async ctx=>{
    let res = await queryAllUserStatus(ctx.request.body);
    // console.log('res',res);
    ctx.body =
    {
        status: 200,
        data: res
    }
}).post('/getUserStatus',async ctx=>{
    let res = await queryUserStatus(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data: res
    }
}).post('/getTypesStatus',async ctx=>{
    let data = await getTypesStatus(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data
    }
}).post('/addStatusComment',async ctx=>{
    await createStatusComment(ctx.request.body);
    ctx.body =
    {
        status: 200,
    }
}).post('/getStatusComment',async ctx=>{
    let res = await getStatusComment(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data: res
    }
}).post('/deleteUserStatus',async ctx=>{
    let result = await deleteUserStatus(ctx.request.body);
    ctx.body =
    {
        status: result instanceof Error ? 500 : 200,
    }
}).get('/getStatusTagTypes',async ctx=>{
    let data = await getStatusTagTypes(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data
    }
}).post('/createNewChatContents',async ctx=>{
    // console.log('ctx',ctx);
    let res = await createNewChatContents(ctx.request.body);
    // console.log('res',res);
    ctx.body =
    {
        status: 200,
        data: res
    }
}).post('/sendMoreChatContents',async ctx=>{
    await sendMoreChatContents(ctx.request.body);
    ctx.body =
    {
        status: 200,
    }
}).post("/addChatPhoto", upload_chat.upload.single("filechat"), async (ctx) => {
    console.log('req...',ctx);
    // 返回结果给前端
    ctx.body = {
      mesg: "ok",
      imgName: upload_chat.getImgName(),
    };
})
.post('/queryChatList',async ctx=>{
    let res = await queryChatList(ctx.request.body);
    // console.log('res',res);
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
    // console.log('res',res);
    ctx.body =
    {
        status: 200,
        data: {
            isFriend: res
        }
    }
}).post('/deleteFriend',async ctx=>{
    await deleteFriend(ctx.request.body);
    // console.log('res',res);
    ctx.body =
    {
        status: 200,
        data: {
        }
    }
}).post("/addAvatar", upload.upload.single("file"), async (ctx) => {
    console.log('req...',ctx);
    // 返回结果给前端
    ctx.body = {
      mesg: "ok",
      imgName: upload.getImgName(),
    };
}).post("/addCommodityPhoto", upload_commodity.upload.array("filecommodity",9), async (ctx) => {
    let img = upload_commodity.getImgName();
    // 返回结果给前端
    ctx.body = {
      mesg: "ok",
      imgName: img,
    };
}).post('/createUserCommodityStatus',async ctx=>{
    let cid = await createUserCommodityStatus(ctx.request.body);
    // console.log('res',res);
    ctx.body =
    {
        status: 200,
        data: {
            cid
        }
    }
}).post('/addUserCommodityStatusImg',async ctx=>{
    addUserCommodityStatusImg(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data: {
            
        }
    }
}).post('/getAllUserCommodityStatus',async ctx=>{
    let data = await getAllUserCommodityStatus(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data
    }
}).post('/getTypesCommodityStatus',async ctx=>{
    let data = await getTypesCommodityStatus(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data
    }
}).post('/getUserCommodityStatus',async ctx=>{
    let data = await getUserCommodityStatus(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data
    }
}).post('/deleteUserCommodityStatus',async ctx=>{
    let result = await deleteUserCommodityStatus(ctx.request.body);
    ctx.body =
    {
        status: result instanceof Error ? 500 : 200,
    }
}).post('/getCommodityTagTypes',async ctx=>{
    let data = await getCommodityTagTypes(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data
    }
}).post('/addCommodityComment',async ctx=>{
    await createCommodityComment(ctx.request.body);
    ctx.body =
    {
        status: 200,
    }
}).post('/getCommodityComment',async ctx=>{
    let data = await getCommodityComment(ctx.request.body);
    ctx.body =
    {
        status: 200,
        data
    }
})

module.exports = router;