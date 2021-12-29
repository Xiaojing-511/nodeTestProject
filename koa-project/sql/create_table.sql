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

create table user
(uid char(18) not null, 
upwd char(18) not null,
primary key(uid));

