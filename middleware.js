const express = require('express');
const app = express();
const mw=(req,res,next)=>{
  console.log('meet mw');
  next();
}
app.use(mw);
app.listen(80,()=>{
  console.log('http://127.0.0.1');
})