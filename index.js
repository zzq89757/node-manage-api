const express = require('express');
const route = require('./route/routes');
const app = express();
const cors = require('cors');
const joi = require('joi');
const config = require('./config/token');
const expressJWT = require('express-jwt');
// 解决跨域的中间件
app.use(cors());
// 解码url的中间件
app.use(express.urlencoded({ extended: false }));
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
// 响应错误信息的中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})
// 捕获验证用户名密码相关错误信息的中间件

app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
  res.cc(err)
})
// 错误中间件
app.use(function (err, req, res, next) {
  // 省略其它代码...

  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

  // 未知错误...
})
// 为路由添加统一前缀
app.use('/api',route);
// 监听80端口
app.listen(80,()=>{
  console.log('http://127.0.0.1');
})