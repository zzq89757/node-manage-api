const Mock = require('mockjs');
// 使用mock生成随机数据
let List = []
const count = 200
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.character('男女')
    })
  )
}
const getUserData = (req, res) => {
  res.send({
    status:0,
    message:'获取用户列表成功',
    data:List
  })
}
module.exports = getUserData;