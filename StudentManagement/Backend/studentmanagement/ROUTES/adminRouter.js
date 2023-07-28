const express=require('express');
const adminRoutes=express.Router();
const adminFunctions=require('../CONTROLLERS/adminController.js');

adminRoutes.post('/', adminFunctions.admin);
adminRoutes.post('/ViewStudent', adminFunctions.viewStudent);

module.exports=adminRoutes;