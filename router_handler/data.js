const getUserData=(req,res)=>{
  res.send({
    status:0,
    message:'获取列表数据成功！！',
    data:'user data'
  })
}
module.exports=getUserData;