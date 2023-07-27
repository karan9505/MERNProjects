//Application setup
const express=require('express');
const app=express();
app.use(express.json());

const cors=require('cors');
app.use(cors({
    origin:"http://localhost:3000"
}))
//=======================================================================//

//Database connection
require('./databaseConnect.js');
//=======================================================================//

//API Routes imports
//1. User Api Routes
const userRoutes=require('./ROUTES/userRouter.js');
//=======================================================================//


//Api routes
//1. User Api Routes
app.use('/User',userRoutes)

//2.Admin Api Routes

//* Default API
app.use('*',(req,res)=>{
    res.send("Not Found");
    res.end();
})
//=======================================================================//


//Server
app.listen(8000,()=>{
    console.log("Server Started")
    console.log("URL : http://localhost:8000/")
})
//=======================================================================//