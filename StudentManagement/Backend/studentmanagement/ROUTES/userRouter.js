const express=require('express');
const userRoutes=express.Router();
const userFunctions=require('../CONTROLLERS/userController.js')

userRoutes.post('/',userFunctions.user)

userRoutes.post('/Login',userFunctions.userLogin)

userRoutes.post('/Signup',userFunctions.userSignup)

userRoutes.post('/Update',userFunctions.userUpdate)

userRoutes.post('/Search',userFunctions.userSearch)


module.exports=userRoutes;