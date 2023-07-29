const express=require('express');
const adminRoutes=express.Router();
const adminFunctions=require('../CONTROLLERS/adminController.js');

adminRoutes.post('/', adminFunctions.admin);
adminRoutes.post('/ViewStudent', adminFunctions.viewStudent);
adminRoutes.post('/UpdateStudent', adminFunctions.updateStudent);
adminRoutes.post('/GetStudent', adminFunctions.getStudent);
adminRoutes.post('/DeleteStudent', adminFunctions.deleteStudent);

module.exports=adminRoutes;