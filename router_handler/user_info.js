const db = require('../config/sql');

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
    
    res.send({
      status: 0,
      message: '获取用户基本信息成功！',
      data: results[0],
    })
  })
}
// 重置用户密码
exports.updatepwd = (req, res) => {
  // 定义根据 id 查询用户数据的 SQL 语句
  const sql = `select * from user where id=?`;
  // 执行 SQL 语句查询用户是否存在
  db.query(sql, req.user.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)

    // 检查指定 id 的用户是否存在
    if (!results.length) return res.cc('用户不存在！')

    // 判断提交的旧密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('原密码错误！')
    // 定义更新用户密码的 SQL 语句
    const sql = `update user set password=? where id=?`

    // 对新密码进行 bcrypt 加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

    // 执行 SQL 语句，根据 id 更新用户的密码
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      // SQL 语句执行失败
      if (err) return res.cc(err)

      // SQL 语句执行成功，但是影响行数不等于 1
      if (!results.affectedRows) return res.cc('更新密码失败！')

      // 更新密码成功
      res.cc('更新密码成功！', 0)
    })
  })

}