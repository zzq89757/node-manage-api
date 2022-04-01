const express = require('express')
const { getUserInfo } = require('../router_handler/user_info')
// 创建路由对象
const router = express.Router()

// 获取用户信息的接口
router.get('/userinfo',getUserInfo)

module.exports=router