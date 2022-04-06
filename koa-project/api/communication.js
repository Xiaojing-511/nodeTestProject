const { query } = require('../js/server');
const { sortDataDecrease,sortDataIncrease,transformTimestamp } = require('./common');
const config = {
    httpAvatar: 'http://localhost:3000/image_avatar/',
    httpCommodity: 'http://localhost:3000/image_commodity/',
    httpStatus: 'http://localhost:3000/image_status/',
    httpChat: 'http://localhost:3000/image_chat/',
}
// 获取sql文件绝对路径
function getSqlFilePath(sqlFileName) {
    let basePath = __dirname
    basePath = basePath.replace(/\\/g, '\/')
    let pathArr = basePath.split('\/')
    pathArr = pathArr.splice(0, pathArr.length - 1)
    basePath = pathArr.join('/') + '/sql/';
    return basePath + sqlFileName;
}
// 增加新账户
async function createUserAccount(bodyData) {
    console.log('query',bodyData);
    // 汉字需要加引号
    await query(`insert into user (uid,upwd,uacademy,umajor,ugrade,styleText,uImageSrc)
    value('${bodyData.uid}', '${bodyData.upwd}','${bodyData.uacademy}','${bodyData.umajor}','${bodyData.ugrade}','${bodyData.styleText}', '${bodyData.uImageSrc}');`).then(res => {
        console.log('res',res);
    }).catch(err => {
        console.log(err);
    })
    // await query(`select * from user`).then(res => {
    //     console.log('插入后',res);
    // }).catch(err => {
    //     console.log(err);
    // })
}
// 获取用户信息
async function getUserInfo(bodyData){
    let info;
    await query(`select * from user where uid = '${bodyData.uid}'`).then(res => {
        info = res[0]
    }).catch(err => {
        console.log(err);
    })
    return info;
}
// 判断用户名是否唯一
async function isOnlyUserId(bodyData){
    let isOnly;
    await query(`select uid from user`).then(res=>{
        let arr = [];
        res.forEach(item=>{
            arr.push(item.uid);
        })
        isOnly = !arr.includes(bodyData.uid);
    })
    return isOnly;
}
// 修改用户头像
async function updateUserImg(bodyData){
    console.log(bodyData);
    let info;
    await query(`update user set uImageSrc = '${config.httpAvatar+bodyData.uImageSrc}' where uid = '${bodyData.uid}'`).then(res => {
        console.log('插入后',res);
    }).catch(err => {
        console.log(err);
    })
    await query(`select * from user where uid = '${bodyData.uid}'`).then(res => {
        console.log('uid的info',res[0]);
        info = res[0]
    }).catch(err => {
        console.log(err);
    })
    return info;
}
// 修改用户信息
async function updateUserInfo(bodyData){
    console.log(bodyData);
    let obj = bodyData.updateKeyValues;
    for(var key in obj){
        console.log('key',key,obj[key]);
        await query(`update user set ${key} = '${obj[key]}' where uid = '${bodyData.uid}'`).then(res => {
            console.log('插入后',res);
        }).catch(err => {
            console.log(err);
        })
    }
    let info;
    await query(`select * from user where uid = '${bodyData.uid}'`).then(res => {
        console.log('uid的info',res[0]);
        info = res[0]
    }).catch(err => {
        console.log(err);
    })
    return info;
}
// 登陆-验证密码是否正确
async function getUserPwd(bodyData){
    // 判断是否有该用户
    let isUser = false;
    await query(`select uid from user`).then(res=>{
        res.forEach((item)=>{
            if(item.uid == bodyData.uid) isUser = true;
        })
    })
    let pwdIsTrue = false;
    if(isUser){
        let pwd;
        await query(`select upwd
        from user
        where uid = '${bodyData.uid}';`).then(res=>{
            pwd = res;
        })
        pwdIsTrue = pwd[0].upwd == bodyData.upwd;
    }
    return {
        isUser,
        pwdIsTrue
    }


}
// 创建新动态
async function createUserStatus(bodyData) {
    let sid = '';
    // 汉字需要加引号
    await query(`insert into user_status (uid,type,contents,image)
    value('${bodyData.uid}','${bodyData.type}','${bodyData.contents}','${bodyData.image}');`).then(res => {
        console.log('res',res);
        sid = res.insertId;;
    }).catch(err => {
        console.log(err);
    })
    return sid;
}
// 查询所有动态
async function queryAllUserStatus(bodyData){
    let tableArr = [];
    await query(`select u.uImageSrc,us.uid,us.sid,us.type,us.contents,us.image,us.createTime
    from user u,user_status us 
    where u.uid = us.uid`).then(res => {
        tableArr = res.sort(sortDataDecrease);
        tableArr = tableArr.map((item)=>{
            let imgArr = [];
            if(item.image.length > 0){
                imgArr = item.image.split(';');
                imgArr = imgArr.splice(0,imgArr.length - 1)
            }
            return {...item,image: imgArr,createTime: transformTimestamp(item.createTime)}
        })
    }).catch(err => {
        console.log(err);
    })
    return tableArr
}
// 查询某用户动态
async function queryUserStatus(bodyData){
    let tableArr = [];
    await query(`select u.uImageSrc,us.uid,us.sid,us.type,us.contents,us.image,us.createTime
    from user u,user_status us 
    where u.uid = us.uid and u.uid = '${bodyData.uid}'`).then(res => {
        tableArr = res.sort(sortDataDecrease);
        tableArr = tableArr.map((item)=>{
            let imgArr = [];
            if(item.image.length > 0){
                imgArr = item.image.split(';');
                imgArr = imgArr.splice(0,imgArr.length - 1)
            }
            return {...item,image: imgArr,createTime: transformTimestamp(item.createTime)}
        })
    }).catch(err => {
        console.log(err);
    })
    return tableArr
}
// 按类别获取动态
async function getTypesStatus(bodyData){
    let types = bodyData.statusTypes;
    let sqlStr = ''; 
    for(var i in types){
        sqlStr += sqlStr ? ` or us.type = '${types[i]}'` : `(us.type = '${types[i]}'`;
    }
    sqlStr = `select u.uImageSrc,us.uid,us.sid,us.type,us.contents,us.image,us.createTime
    from user u,user_status us 
    where u.uid = us.uid and ` + sqlStr + ')';
    let arr = [];
    await query(sqlStr).then(res=>{
        arr = res.sort(sortDataDecrease);
        arr = arr.map(item=>{
            let imgArr = [];
            if(item.image.length > 0){
                imgArr = item.image.split(';');
                imgArr = imgArr.splice(0,imgArr.length - 1)
            }
            return {...item,image: imgArr,createTime: transformTimestamp(item.createTime)}
        });
    }).catch(err=>{
        console.log(err);
    })
    return arr
}
// 获取动态类型
async function getStatusTagTypes(){
    return ['日常动态','学习讨论','提问学长学姐','招领寻物','#话题讨论','周边美食分享','其他'];
}
async function addUserStatusImg(bodyData){
    let imageSrc = '';
    bodyData.imgName.forEach(imgSrc => {
        imageSrc += config.httpStatus + imgSrc + ';';
    });
    query(`update user_status set image = '${imageSrc}' where sid = ${bodyData.sid}`).then(res => {
    }).catch(err => {
        console.log(err);
    })
}
// 查询动态评论
async function getStatusComment(bodyData){
    let arr = [];
    await query(`select * from status_comment where sid = '${bodyData.sid}'`).then(res => {
        arr = res.sort(sortDataDecrease);
    }).catch(err => {
        console.log(err);
    })
    return arr;
}
// 添加动态评论
async function createStatusComment(bodyData){
    await query(`insert into status_comment (sid,commentUser,commentContent)
    value('${bodyData.sid}','${bodyData.commentUser}','${bodyData.commentContent}');`).then(res => {
        console.log('add',res);
    }).catch(err => {
        console.log(err);
    })
}
// 删除某条动态
async function deleteUserStatus(bodyData){
    let result = null;
    console.log('bodyData.sid',bodyData.sid);
    await query(`delete from user_status where sid = ${bodyData.sid}`).then(res=>{
        console.log('delete',res);
    }).catch(err=> result = err);
    return result;
}

// 新建聊天内容
async function createNewChatContents(bodyData) {
    if(bodyData.chatImage){
        bodyData.chatImage = config.httpChat + bodyData.chatImage;
    }
    await query(`insert into chat (cid,sendId,receptionId,chatContents,chatImage)
    value(null,'${bodyData.sendId}', '${bodyData.receptionId}', '${bodyData.chatContents}','${bodyData.chatImage}');`).then(res => {
        console.log('res',res);
    }).catch(err => {
        console.log(err);
    })
}
// 群发消息
async function sendMoreChatContents(bodyData){
    bodyData.receptionIds.forEach(receptionId=>{
        createNewChatContents({sendId: bodyData.sendId, receptionId, chatContents: bodyData.chatContents}).then(res=>{
            console.log(res);
        })
    })
}
// 查询聊天记录
async function queryChatList(bodyData){
    let arr = [];
    await query(`select u.uImageSrc,c.cid,c.sendId,c.receptionId,c.chatContents,c.chatImage,c.sendTime
    from chat c, user u
    where u.uid = c.sendId and c.sendId = '${bodyData.sendId}' and c.receptionId = '${bodyData.receptionId}' or u.uid = c.sendId and c.sendId = '${bodyData.receptionId}' and c.receptionId = '${bodyData.sendId}';`).then(res => {
        arr = res.sort(sortDataIncrease)
    }).catch(err => {
        console.log(err);
    })
    return arr
}
// 添加好友
async function addFriend(bodyData){
    await query(`insert into user_friend (uid,ufriendId) value('${bodyData.uid}', '${bodyData.ufriendId}');`).then(res => {
        console.log('res-add',res);
    }).catch(err => {
        console.log(err);
    })
    await query(`insert into user_friend (uid,ufriendId) value('${bodyData.ufriendId}', '${bodyData.uid}');`).then(res => {
        console.log('res',res);
    }).catch(err => {
        console.log(err);
    })
}
// 查询好友列表
async function queryFriends(bodyData){
    let arr = [];
    await query(`select * from user_friend where uid = '${bodyData.uid}'`).then(res => {
        arr = res.sort((a, b) =>{
            return b.addTime - a.addTime
        })
    }).catch(err => {
        console.log(err);
    })
    return arr
}
// 判断两用户是否为好友
async function judgeIsFriend(bodyData){
    let isFriend = '';
    await query(`select ufriendId from user_friend where uid = '${bodyData.uid}'`).then(res => {
        console.log('res',res);
        let friendsIdArr = res.map((item)=>{
            return item.ufriendId
        });
        console.log('friendsIdArr',friendsIdArr);
        isFriend = friendsIdArr.includes(bodyData.ufriendId);
    }).catch(err => {
        console.log(err);
    })
    return isFriend;
}
// 创建新二手商品动态
async function createUserCommodityStatus(bodyData) {
    let cid = ''
    await query(`insert into user_commodity (uid,type,contents,image)
    value('${bodyData.uid}','${bodyData.type}','${bodyData.contents}','');`).then(res => {
        cid = res.insertId;
    }).catch(err => {
        console.log(err);
    })
    
    return cid
}
// 增加二手商品动态的图片
async function addUserCommodityStatusImg(bodyData) {
    let imageSrc = '';
    bodyData.imgName.forEach(imgSrc => {
        imageSrc += config.httpCommodity + imgSrc + ';';
    });
    query(`update user_commodity set image = '${imageSrc}' where cid = ${bodyData.cid}`).then(res => {
    }).catch(err => {
        console.log(err);
    })
   
}
// 获取全部二手商品动态
async function getAllUserCommodityStatus(bodyData){
    let arr = [];
    await query(`select u.uid,u.uImageSrc,u.styleText,uc.cid,uc.type,uc.contents,uc.image,uc.createTime from user u,user_commodity uc where u.uid = uc.uid`).then(res=>{
        arr = res.sort(sortDataDecrease);
        arr = arr.map(item=>{
            let imgArr = [];
            if(item.image.length > 0){
                imgArr = item.image.split(';');
                imgArr = imgArr.splice(0,imgArr.length - 1)
            }
            return {...item,image: imgArr,createTime: transformTimestamp(item.createTime)}
        });
    }).catch(err=>{
        console.log(err);
    })
    return arr
}
// 按类别获取二手商品动态
async function getTypesCommodityStatus(bodyData){
    let types = bodyData.commodityTypes;
    let sqlStr = ''; 
    for(var i in types){
        sqlStr += sqlStr ? ` or uc.type = '${types[i]}'` : `(uc.type = '${types[i]}'`;
    }
    sqlStr = `select u.uid,u.uImageSrc,u.styleText,uc.cid,uc.type,uc.contents,uc.image,uc.createTime from user u,user_commodity uc where u.uid = uc.uid and ` + sqlStr + ')';
    let arr = [];
    await query(sqlStr).then(res=>{
        arr = res.sort(sortDataDecrease);
        arr = arr.map(item=>{
            let imgArr = [];
            if(item.image.length > 0){
                imgArr = item.image.split(';');
                imgArr = imgArr.splice(0,imgArr.length - 1)
            }
            return {...item,image: imgArr,createTime: transformTimestamp(item.createTime)}
        });
    }).catch(err=>{
        console.log(err);
    })
    return arr
}
// 获取某用户二手商品动态
async function getUserCommodityStatus(bodyData){
    let arr = [];
    await query(`select u.uid,u.uImageSrc,u.styleText,uc.cid,uc.type,uc.contents,uc.image,uc.createTime from user u,user_commodity uc where u.uid = uc.uid and u.uid = '${bodyData.uid}'`).then(res=>{
        arr = res.sort(sortDataDecrease);
        arr = arr.map(item=>{
            let imgArr = [];
            if(item.image.length > 0){
                imgArr = item.image.split(';');
                imgArr = imgArr.splice(0,imgArr.length - 1)
            }
            return {...item,image: imgArr,createTime: transformTimestamp(item.createTime)}
        });
    }).catch(err=>{
        console.log(err);
    })
    return arr
}
// 删除用户二手商品动态
async function deleteUserCommodityStatus(bodyData){
    let result = null;
    await query(`delete from user_commodity where cid = ${bodyData.cid}`).then(res=>{
        console.log(res);
    }).catch(err=>result = err);
    await query(`delete from commodity_comment where cid = '${bodyData.cid}'`).then(res=>{
        console.log(res);
    }).catch(err=>result = err);
    return result;
}
// 获取商品分类
async function getCommodityTagTypes(){
    return [
        '手机数码','电脑平板','服饰鞋子','皮箱包包','书籍','食品酒类','玩具乐器','健身器材','其他'
    ]
}
// 添加二手动态评论
async function createCommodityComment(bodyData){
    await query(`insert into commodity_comment (cid,commentUser,commentContent)
    value('${bodyData.cid}','${bodyData.commentUser}','${bodyData.commentContent}');`).then(res => {
        console.log('add',res);
    }).catch(err => {
        console.log(err);
    })
}
// 获取二手动态评论
async function getCommodityComment(bodyData){
    let arr = [];
    await query(`select * from commodity_comment where cid = '${bodyData.cid}'`).then(res => {
        arr = res.sort(sortDataDecrease);
    }).catch(err => {
        console.log(err);
    })
    return arr;
}

// let tableArr = [
//     "student",
//     "academy",
//     "teacher",
//     "course",
//     "found_course",
//     "study"
// ];


// 插入数据
function insertValues(bodyData) {
    // console.log(bodyData);
    const nameArr = [
        "student",
        "academy",
        "teacher",
        "course",
        "found_course",
        "study"
    ];
    let nameIndex = nameArr.indexOf(bodyData.tableName);
    console.log('--------nameIndex------', nameIndex, bodyData.tableName);
    // 汉字需要加引号
    const queryArr = [
        `insert into ${bodyData.tableName} (ssn, name, sex, bdate,sphone,grade,sacademy)
    value('${bodyData.ssn}', '${bodyData.name}', '${bodyData.sex}','${bodyData.bdate}','${bodyData.sphone}','${bodyData.grade}','${bodyData.sacademy}');`,
        `insert into ${bodyData.tableName} (assn, aname, location,aphone)
    value('${bodyData.assn}', '${bodyData.aname}', '${bodyData.location}','${bodyData.aphone}');`,
        `insert into ${bodyData.tableName} (tssn, tname, tage,tphone)
    value('${bodyData.tssn}', '${bodyData.tname}', '${bodyData.tage}','${bodyData.tphone}');`,
        `insert into ${bodyData.tableName} (cssn, tssn, cname,startdate,enddate,type,clocation,begintime,overtime)
    value('${bodyData.cssn}', '${bodyData.tssn}', '${bodyData.cname}','${bodyData.startdate}','${bodyData.enddate}', '${bodyData.type}', '${bodyData.clocation}','${bodyData.begintime}','${bodyData.overtime}');`,
        `insert into ${bodyData.tableName} (assn, cssn, times)
    value('${bodyData.assn}', '${bodyData.cssn}', '${bodyData.times}');`,
        `insert into ${bodyData.tableName} (ssn, cssn, tssn,score)
    value('${bodyData.ssn}', '${bodyData.cssn}','${bodyData.tssn}', '${bodyData.score}');`,
    ]
    query(queryArr[nameIndex]).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
    query(`select * from ${bodyData.tableName}`).then(res => {
        console.log('插入后。。。。。。。。。。。', bodyData.tableName);
    }).catch(err => {
        console.log(err);
    })
}

// 查询表所有数据
async function queryAllData(tableName) {
    let tableArr = [];
    await query(`select * from ${tableName.tableName}`).then(res => {
        console.log('查询。。。。。。。。。。。。');
        tableArr = res;
    }).catch(err => {
        console.log(err);
    })
    return tableArr
}

// 删除记录
async function deleteTableData(bodyData) {
    let objKeyArr = Object.keys(bodyData);
    if (tableArr.indexOf(bodyData.tableName) > 2) {
        await query(`delete from ${bodyData.tableName} where ${objKeyArr[1]} = ${bodyData[objKeyArr[1]]} and ${objKeyArr[2]} = ${bodyData[objKeyArr[2]]}  `)

    } else {
        await query(`delete from ${bodyData.tableName} where ${objKeyArr[1]} = ${bodyData[objKeyArr[1]]} `)
    }
}

// 更新记录
async function updateTableData(bodyData) {
    console.log('***************', bodyData);
    let primaryArr = Object.keys(bodyData.primary);
    if (tableArr.indexOf(bodyData.tableName) > 2 && tableArr.indexOf(bodyData.tableName) < 5) {
        await query(`update ${bodyData.tableName} set ${bodyData.updateProp} = '${bodyData.updateValue}' where ${primaryArr[0]}= ${bodyData.primary[primaryArr[0]]} and ${primaryArr[1]} = ${bodyData.primary[primaryArr[1]]}`)
    } else if(tableArr.indexOf(bodyData.tableName) < 2){
        await query(`update ${bodyData.tableName} set ${bodyData.updateProp} = '${bodyData.updateValue}' where ${primaryArr[0]} = ${bodyData.primary[primaryArr[0]]} `)
    }else if(tableArr.indexOf(bodyData.tableName) == 5){
        await query(`update ${bodyData.tableName} set ${bodyData.updateProp} = '${bodyData.updateValue}' where ${primaryArr[0]} = ${bodyData.primary[primaryArr[0]]} and ${primaryArr[1]} = ${bodyData.primary[primaryArr[1]]} and ${primaryArr[2]} = ${bodyData.primary[primaryArr[2]]} `)

    }
}

// 学生-获取课程信息
async function getStudentCourse(bodyData) {
    // console.log(bodyData.ssn);
    let studentCourseInfoArr = [];
    await query(`select c.cssn,c.cname,t.tname,c.startdate,c.enddate,c.type,c.clocation,c.begintime,c.overtime,a.aname
    from study s,course c,found_course fc,teacher t,academy a
    where s.ssn='${bodyData.ssn}' and s.cssn = c.cssn and s.tssn = c.tssn and c.cssn = fc.cssn and c.tssn = t.tssn and a.assn = fc.assn;`).then(res => {
        studentCourseInfoArr = res;
    }).catch(err => {
        console.log(err);
    })
    return studentCourseInfoArr
}

// 学生-获取考试成绩信息
async function getStudentExamInfo(bodyData){
    let studentExamInfoArr = [];
    await query(`select c.cssn,c.cname,t.tname,s.score
    from study s,course c,teacher t
    where s.ssn = '${bodyData.ssn}' and s.cssn = c.cssn and s.tssn = c.tssn and t.tssn = s.tssn;`)
    .then(res=>{
        studentExamInfoArr = res;
    }).catch(err=>{
        console.log(err);
    })
    return studentExamInfoArr;
}

// 学生-获取平均考试成绩
async function getStudentAvgScore(bodyData){
    let avg = '';
    await query(`select avg(score)
    from study
    where ssn = '${bodyData.ssn}';`).then(res=>{
        avg = res[0]['avg(score)'];
    }).catch(err=>{
        console.log(err);
    })
    return avg;
}
// 学生-获取所修课程类型数量 判断是否符合毕业标准
async function getStudentGraduate(bodyData){
    let typeArr={};
    await query(` select count(t1.type) as compulsory
    from (select c.type from study s, course c where s.ssn = '${bodyData.ssn}' and s.tssn = c.tssn and s.cssn = c.cssn and c.type = '必修') t1`)
    .then(res=>{
        typeArr.compulsory = res[0].compulsory;
    }).catch(err=>{
        console.log(err);
    })
    await query(` select count(t1.type) as take
    from (select c.type from study s, course c where s.ssn = '${bodyData.ssn}' and s.tssn = c.tssn and s.cssn = c.cssn and c.type = '选修') t1`)
    .then(res=>{
        typeArr.take = res[0].take;
    }).catch(err=>{
        console.log(err);
    })
    return typeArr;

}

// 教师-获取教师教授课程信息
async function getTeacherCourse(bodyData){
    let queryArr = [];
    await query(`select c2.cssn,c2.cname,c2.startdate,c2.enddate,c2.begintime,c2.overtime,c2.clocation,c1.studentcount
    from (select count(s.ssn) as studentcount ,s.cssn
    from study s
    where s.tssn = '${bodyData.tssn}'  
    group by s.cssn) c1 ,course c2 
    where c1.cssn = c2.cssn and c2.tssn = '${bodyData.tssn}';`).then(res=>{
        queryArr = res;
        console.log(queryArr);
    }).catch(err=>{
        console.log(err);
    })
    return queryArr;
}

// 教师-成绩录入（获取选课的学生）
async function getTeacherScore(bodyData){
    let queryArr = [];
    await query(`select s.ssn, st.name, c.cssn,c.cname,s.score
    from course c ,study s,student st
    where s.tssn = '${bodyData.tssn}' and s.cssn = c.cssn and c.tssn = s.tssn and st.ssn = s.ssn`)
    .then(res=>{
        queryArr = res;
        console.log(queryArr);
    }).catch(err=>{
        console.log(err);
    })
    return queryArr;
}
module.exports = {
    // getSqlFilePath, insertValues, queryAllData, deleteTableData, updateTableData, getStudentCourse
    // ,getStudentExamInfo,getStudentAvgScore,getTeacherCourse,getTeacherScore,getStudentGraduate,
    
    getSqlFilePath,getUserPwd,createUserAccount,getUserInfo,isOnlyUserId,createUserStatus,queryAllUserStatus,getTypesStatus,createNewChatContents,queryChatList,addFriend,queryFriends,
    judgeIsFriend,createUserCommodityStatus,updateUserInfo,updateUserImg,addUserCommodityStatusImg,getUserCommodityStatus,getAllUserCommodityStatus,getTypesCommodityStatus,queryUserStatus,
    getCommodityTagTypes,createCommodityComment,getCommodityComment,deleteUserStatus,getStatusTagTypes,deleteUserCommodityStatus,getStatusComment,createStatusComment,addUserStatusImg
    ,sendMoreChatContents
}