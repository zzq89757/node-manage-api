/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
const db = require('../db/sql');

const bcrypt = require('bcryptjs');



// 注册用户的处理函数
exports.regUser = (req, res) => {
  const userinfo = req.body;
  //  
  if (!userinfo.username || !userinfo.password) {
    return res.cc('用户名或密码不能为空！')
  }
  const sql = `select * from user where username=?`;
  db.query(sql, [userinfo.username], function (err, results) {
    // 执行 SQL 语句失败
    if (err) {
      return res.cc(err)
    }
    // 查询到的包含结果的数组长度不为零，即用户名存在
    if (results.length) {
      return res.cc('用户名被占用，请更换其他用户名！')
    }
    // 用户名可用，对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    // console.log(userinfo.password);

    // 操作数据库 并插入数据
    const insert_sql = 'insert into user set ?';
    db.query(insert_sql, {
      username: userinfo.username,
      password: userinfo.password
    }, function (err, results) {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
      // SQL 语句执行成功，但影响行数不为 1
      if (results.affectedRows !== 1) {
        return res.cc('注册用户失败，请稍后再试！')
      }
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
  res.send('login OK')
}