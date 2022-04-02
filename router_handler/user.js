/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
const db = require('../config/sql');

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
