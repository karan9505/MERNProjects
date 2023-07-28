const express=require('express');
const generalRoutes=express.Router();

const generalFunction=require('../CONTROLLERS/generalController.js')

generalRoutes.post('/Login',generalFunction.Login)
generalRoutes.post('/Signup',generalFunction.Signup)

module.exports=generalRoutes;