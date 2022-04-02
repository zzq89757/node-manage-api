const express = require('express')
const { getUserInfo,updatepwd } = require('../router_handler/user_info')
const expressJoi = require('@escook/express-joi')

// 导入重置密码验证模块
const {
  update_password_schema
} = require('../schema/user')
// 创建路由对象
const router = express.Router()

// 获取用户信息的接口
router.get('/userinfo',getUserInfo)
// 重置密码
router.post('/updatepwd',expressJoi(update_password_schema),updatepwd)

module.exports=router