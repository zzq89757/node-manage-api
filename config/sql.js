const mysql = require('mysql');
const db = mysql.createPool({
  host:'47.100.106.65',
  user:'root',
  password:'q19991202',
  database:'user',
})
module.exports=db