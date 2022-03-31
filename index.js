const express = require('express');
const route = require('./route/routes')
const app = express();
const cors = require('cors');
// 解决跨域的中间件
app.use(cors());
// 解码url的中间件
app.use(express.urlencoded({ extended: false }));
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
// 为路由添加统一前缀
app.use('/api',route);
// 监听80端口
app.listen(80,()=>{
  console.log('http://127.0.0.1');
})