const express=require('express');
const studentRoutes=express.Router();
const studentFunctions=require('../CONTROLLERS/studentController.js')

studentRoutes.post('/',studentFunctions.student)

studentRoutes.post('/Login',studentFunctions.studentLogin)

studentRoutes.post('/Signup',studentFunctions.studentSignup)

studentRoutes.post('/Update',studentFunctions.studentUpdate)

studentRoutes.post('/Search',studentFunctions.studentSearch)


module.exports=studentRoutes;