const express = require('express');
const dataRoute = express.Router();
const getUserData = require('../router_handler/data')
dataRoute.get('/user',getUserData)

module.exports=dataRoute;