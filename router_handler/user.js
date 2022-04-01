/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
const db = require('../db/sql');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const ejwt = require('express-jwt');

const config = require('../config/token');

// 注册用户的处理函数
exports.regUser = (req, res) => {
  const userinfo = req.body;
  const sql = `select * from user where username=?`;
  db.query(sql, [userinfo.username], function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 查询到的包含结果的数组长度不为零，即用户名存在
    if (results.length) return res.cc('用户名被占用，请更换其他用户名！')

    // 用户名可用，对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);

    // 操作数据库 并插入数据
    const insert_sql = 'insert into user set ?';
    db.query(insert_sql, {
      username: userinfo.username,
      password: userinfo.password
    }, function (err, results) {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
      // SQL 语句执行成功，但影响行数不为 1
      if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
      // 注册成功
      res.send({
        status: 0,
        message: '注册成功！'
      })
    })
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  // 接收表单数据
  const userinfo = req.body;
  // 定义查询用户的sql语句
  const sql = `select * from user where username=?`;
  // 执行sql语句查询用户
  db.query(sql, userinfo.username, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是查询到的数据条数为0 
    if (!results.length) return res.cc('登录失败！用户不存在')
    // 判断用户输入的登录密码是否和数据库中的密码一致
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password);
    if (!compareResult) return res.cc('密码错误！！')
    // 登录成功，生成token...
    // 剔除用户密码和头像相关信息
    const user = {
      ...results[0],
      password: '',
      user_pic: ''
    };
    // 生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn, // token 有效期
    })
    // 将token响应给用户
    res.send({
      status: 0,
      message: '登录成功！',
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: 'Bearer ' + tokenStr,
    })
  })

}
exports.updatepwd = (req, res) => {
  // 定义根据 id 查询用户数据的 SQL 语句
  const sql = `select * from user where id=?`
  console.log(req.body);
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
      if (results.affectedRows !== 1) return res.cc('更新密码失败！')

      // 更新密码成功
      res.cc('更新密码成功！', 0)
    })
  })

}