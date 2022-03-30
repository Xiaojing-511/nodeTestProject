-- 用户表
-- create table user
-- (uid char(18) not null, 
-- upwd char(18) not null,
-- styleText varchar(50) not null,
-- uImageSrc varchar(100) not null,
-- primary key(uid));

-- 用户动态表
-- create table user_status
-- (uid char(18) not null, 
-- sid bigint(8) unsigned zerofill not null AUTO_INCREMENT, 
-- contents varchar(100) not null,
-- createTime timestamp DEFAULT CURRENT_TIMESTAMP not null,
-- primary key(sid));

-- 聊天记录表
-- create table chat
-- (cid bigint(8) unsigned zerofill not null AUTO_INCREMENT,
-- sendId char(18) not null, 
-- receptionId char(18) not null, 
-- sendTime timestamp DEFAULT CURRENT_TIMESTAMP not null,
-- chatContents varchar(150) not null,
-- primary key(cid));

-- 用户好友表
-- create table user_friend
-- (ufid bigint(8) unsigned zerofill not null AUTO_INCREMENT,
-- uid char(18) not null, 
-- ufriendId char(18) not null,
-- addTime timestamp DEFAULT CURRENT_TIMESTAMP not null,
-- primary key(ufid));

-- 用户发表二手商品动态表
-- create table user_commodity
-- (uid char(18) not null, 
-- cid bigint(8) unsigned zerofill not null AUTO_INCREMENT,  
-- type varchar(100) not null,
-- contents varchar(100) not null,
-- image varchar(500) not null,
-- createTime timestamp DEFAULT CURRENT_TIMESTAMP not null,
-- primary key(cid));

-- 二手动态评论表
create table commodity_comment
(ccid bigint(8) unsigned zerofill not null AUTO_INCREMENT,
cid char(8) not null, 
commentUser char(18) not null,
commentContent varchar(100) not null,
createTime timestamp DEFAULT CURRENT_TIMESTAMP not null,
primary key(ccid));











-- create table student
-- (ssn char(18) not null, 
-- name char(10) not null, 
-- sex char(5) not null, 
-- bdate char(10) not null,
-- sphone char(16) not null, 
-- grade char(5) not null, 
-- sacademy char(10) not null,
-- primary key(ssn));

-- create table academy
-- (assn char(18) not null, 
-- aname char(10) not null, 
-- location char(20) not null, 
-- aphone char(16) not null, 
-- primary key(assn));

-- create table teacher
-- (tssn char(18) not null, 
-- tname char(10) not null, 
-- tage char(4) not null, 
-- tphone char(16) not null, 
-- primary key(tssn));

-- create table course
-- (cssn char(18) not null, 
-- tssn char(18) not null, 
-- cname char(10) not null, 
-- startdate char(16) not null,
-- enddate char(16) not null,
-- type char(5) not null, 
-- clocation char(10) not null,
-- begintime char(10) not null,
-- overtime char(10) not null,
-- primary key(cssn,tssn));

-- create table found_course
-- (assn char(18) not null, 
-- cssn char(18) not null,
-- times char(5) not null,
-- primary key(assn,cssn));