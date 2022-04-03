const db = require('../config/sql');
// const Mock = require('mockjs');
// // 使用mock生成随机数据
// let List = []
// const count = 200
// for (let i = 0; i < count; i++) {
//   List.push(
//     Mock.mock({
//       name: Mock.Random.cname(),
//       addr: Mock.mock('@county(true)'),
//       'age|18-60': 1,
//       birth: Mock.Random.date(),
//       sex: Mock.Random.character('男女')
//     })
//   )
// }
// const insert_sql = 'insert into info set ?';
// for (let item of List) {
//   db.query(insert_sql, {
//     name: item.name,
//     age:item.age,
//     addr:item.addr,
//     birth:item.birth,
//     gender:item.sex,
//   }, function (err, results) {
//     if (err) return err
//   })
// }
const getUserData = (req, res) => {
  const sql = `select * from info`;
  db.query(sql,(err,results)=>{
      res.send({
    status: 0,
    message: '获取用户列表成功',
    data: results
  })
  })
}
module.exports = getUserData;