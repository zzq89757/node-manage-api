const express = require('express')
// 创建路由对象
const router = express.Router()

const expressJoi = require('@escook/express-joi')

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')

// 导入用户名密码验证模块
const {
  reg_login_schema,
  update_password_schema
} = require('../schema/user')


// 注册新用户 并验证用户名密码合法性
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)
// 登录 并验证用户名密码合法性
router.post('/login', expressJoi(reg_login_schema), userHandler.login)
// 重置密码
router.post('/updatepwd',expressJoi(update_password_schema), userHandler.updatepwd)


// 将路由对象共享出去
module.exports = router