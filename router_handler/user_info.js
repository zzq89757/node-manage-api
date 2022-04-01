const db = require('../db/sql');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const ejwt = require('express-jwt');

const config = require('../config/token');
// 获取用户信息
module.exports.getUserInfo=(req,res)=>{
  const username = req.user.username;
  const sql = `select id,username,nickname,email,usr_pic from user where username=?`;
  db.query(sql,[username],(err,results)=>{
    // SQL语句执行失败
    if(err) return res.cc(err);
    if(!results.length) return res.cc('未知错误！！');
    
    res.send(results[0])
  })
}