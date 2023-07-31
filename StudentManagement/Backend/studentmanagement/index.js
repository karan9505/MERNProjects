//Application setup
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors({
    origin: "http://localhost:3000"
}))
//=======================================================================//

//Database connection
require('./databaseConnect.js');
//=======================================================================//

//API Routes imports
//1. General API Routes
const generalRoutes=require('./ROUTES/generalRouter.js')
//2. Student API Routes
const studentRoutes = require('./ROUTES/studentRouter.js');
//3. Admin API Routes
const adminRoutes = require('./ROUTES/adminRouter.js')
//=======================================================================//


//API Routes
//1. General API Routes
app.use('/', generalRoutes)

//2. Student API Routes
app.use('/Student', studentRoutes)

//3.Admin API Routes
app.use('/Admin', adminRoutes)
//* Default API
app.use('*', (req, res) => {
    res.send("Not Found");
    res.end();
})
//=======================================================================//


//Server
const port=8000;
app.listen(port, () => {
    console.log("Server Started")
    console.log("URL : http://localhost:"+port+"/")
})
//=======================================================================//