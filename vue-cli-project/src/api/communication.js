import { request } from './ajax';
export const sqlNoReturn = (params) => {
    return request({
        url: '/sql',
        method: 'post',
        data: params
    })
}

export const getTable = (params) => {
    return request({
        url: '/sql/queryAll',
        method: 'post',
        data: params
    })
}

export const deleteRecord = (params) => {
    return request({
        url: '/delete',
        method: 'post',
        data: params
    })
}

export const updateRecordValue = (params) => {
    return request({
        url: '/update',
        method: 'post',
        data: params
    })
}

export const getStudentCourse = (params) => {
    return request({
        url: '/query/studentcourse',
        method: 'post',
        data: params
    })
}

export const getStudentExam = (params) => {
    return request({
        url: '/query/studentexam',
        method: 'post',
        data: params
    })
}
export const getStudentAvgExam = (params) => {
    return request({
        url: '/query/avgscore',
        method: 'post',
        data: params
    })
}
export const getStudentGraduate = (params) => {
    return request({
        url: '/query/studentgraduate',
        method: 'post',
        data: params
    })
}
export const getTeacherCourse = (params) => {
    return request({
        url: '/query/teachercourse',
        method: 'post',
        data: params
    })
}
export const getTeacherScore = (params) => {
    return request({
        url: '/query/teacherscore',
        method: 'post',
        data: params
    })
}

export const getUserLogin = (params) => {
    return request({
        url: '/query/userlogin',
        method: 'post',
        data: params
    })
}