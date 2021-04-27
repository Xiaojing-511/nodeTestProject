const router = require('@koa/router')();
const { insertValues, queryAllData, deleteTableData, updateTableData,
    getStudentCourse, getStudentExamInfo, getStudentAvgScore, getTeacherCourse,
    getTeacherScore,getStudentGraduate,getUserPwd
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
}).post('/sql', async ctx => {
    // 插入数据
    await insertValues(ctx.request.body)
    ctx.body =
    {
        status: 200
    }

}).post('/sql/queryAll', async ctx => {
    // 查询表全部数据
    var queryArr = await queryAllData(ctx.request.body)
    ctx.body =
    {
        status: 200,
        data: queryArr
    }
}).post('/delete', async ctx => {
    // 删除一条记录
    // console.log(ctx.request.body);
    await deleteTableData(ctx.request.body)
    ctx.body =
    {
        status: 200,
        message: '删除成功',
    }
}).post('/update', async ctx => {
    // 修改一条记录的值
    // console.log(ctx.request.body);
    await updateTableData(ctx.request.body)
    ctx.body =
    {
        status: 200,
        message: '修改成功',
    }
}).post('/query/studentcourse', async ctx => {
    let queryArr = await getStudentCourse(ctx.request.body)
    ctx.body =
    {
        status: 200,
        data: queryArr
    }
}).post('/query/studentexam', async ctx => {
    let queryArr = await getStudentExamInfo(ctx.request.body)
    ctx.body =
    {
        status: 200,
        data: queryArr
    }
}).post('/query/avgscore', async ctx => {
    let avg = await getStudentAvgScore(ctx.request.body)
    ctx.body = {
        status: 200,
        data: avg
    }
}).post('/query/studentgraduate',async ctx=>{
    let queryObj = await getStudentGraduate(ctx.request.body)
    ctx.body = {
        status: 200,
        data: queryObj
    }
})
.post('/query/teachercourse', async ctx => {
    let queryArr = await getTeacherCourse(ctx.request.body)
    ctx.body =
    {
        status: 200,
        data: queryArr
    }
}).post('/query/teacherscore',async ctx=>{
    let queryArr = await getTeacherScore(ctx.request.body)
    ctx.body =
    {
        status: 200,
        data: queryArr
    }
}).post('/query/userlogin',async ctx=>{
    let pwdIsTrue = await getUserPwd(ctx.request.body);
    console.log('password--------',pwdIsTrue);
    ctx.body =
    {
        status: 200,
        data: {
            pwdIsTrue
        }
    }
})
module.exports = router;