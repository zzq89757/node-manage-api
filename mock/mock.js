import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import userApi from './mockServerData/user'
import permissionApi from './mockServerData/permission'
// 首页相关
Mock.mock('/api/home/getData', homeApi.getStatisticalData)
// Mock.mock('/api/user/getUser', userApi.getUserList)

// 用户相关
Mock.mock(/api\/data\/user/, 'get', userApi.getUserList)
Mock.mock(/api\/user\/add/, 'post', userApi.createUser)
Mock.mock(/api\/user\/edit/, 'post', userApi.updateUser)
// 权限相关
Mock.mock(/api\/permission\/getMenu/, 'get', permissionApi.getMenu)