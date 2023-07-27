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
//1. student Api Routes
const studentRoutes = require('./ROUTES/studentRouter.js');
//2. admin Api Routes
const adminRoutes = require('./ROUTES/adminRouter.js')
//=======================================================================//


//Api routes
//1. student Api Routes
app.use('/Student', studentRoutes)

//2.Admin Api Routes
app.use('/Admin', adminRoutes)
//* Default API
app.use('*', (req, res) => {
    res.send("Not Found");
    res.end();
})
//=======================================================================//


//Server
app.listen(8000, () => {
    console.log("Server Started")
    console.log("URL : http://localhost:8000/")
})
//=======================================================================//