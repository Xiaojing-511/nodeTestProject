const { query } = require('../js/server');
let tableArr = [
    "user"
]
async function createUserAccount(bodyData) {
    console.log('query',bodyData);
    // 汉字需要加引号
    await query(`insert into user (uid,upwd)
    value('${bodyData.uid}', '${bodyData.upwd}');`).then(res => {
        console.log('res',res);
    }).catch(err => {
        console.log(err);
    })
    await query(`select * from user`).then(res => {
        console.log('插入后',res);
    }).catch(err => {
        console.log(err);
    })
}
// 登陆-验证密码是否正确
async function getUserPwd(bodyData){
    let pwd;
    await query(`select upwd
    from user
    where uid = '${bodyData.uid}';`).then(res=>{
        pwd = res;
    })
    return pwd[0].upwd == bodyData.upwd 
}
// let tableArr = [
//     "student",
//     "academy",
//     "teacher",
//     "course",
//     "found_course",
//     "study"
// ];
// 获取sql文件绝对路径
function getSqlFilePath(sqlFileName) {
    let basePath = __dirname
    basePath = basePath.replace(/\\/g, '\/')
    let pathArr = basePath.split('\/')
    pathArr = pathArr.splice(0, pathArr.length - 1)
    basePath = pathArr.join('/') + '/sql/';
    return basePath + sqlFileName;
}

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
    getSqlFilePath, insertValues, queryAllData, deleteTableData, updateTableData, getStudentCourse
    ,getStudentExamInfo,getStudentAvgScore,getTeacherCourse,getTeacherScore,getStudentGraduate,
    getUserPwd,
    createUserAccount
}