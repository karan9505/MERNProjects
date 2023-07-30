const credential = require('../MODELS/credential.js');
const academics=require('../MODELS/academic.js');

const admin=async(req,res)=>{
    const dbResponseAcad=await academics.find({});
    res.send(dbResponseAcad)
    console.log("ALL STUDENTS")
    res.end();
}

const viewStudent = async (req, res) => {
    console.log("VIEW API",req.body)
    const dbresponse = await academics.findOne({ email: req.body.semail })
    res.send(dbresponse);
    res.end();
}

const getStudent = async (req, res) => {
    
    const dbresponse = await academics.findOne({ email: req.body.semail })
    let resBody = JSON.parse(JSON.stringify(dbresponse.result));
    resBody.firstName = dbresponse.firstName;
    resBody.lastName = dbresponse.lastName;
    resBody.class = dbresponse.class;
    resBody.section = dbresponse.section;
    resBody.rollNumber = dbresponse.rollNumber;
    resBody.email = dbresponse.email;
    delete resBody['finalResult']
    res.send(resBody);
    res.end();
}

const updateStudent = async (req, res) => {
    console.log(req.body)
    console.log(req.body._id)
    let total = (req.body.maths + req.body.physics + req.body.chemistry + req.body.computer + req.body.english);
    
    let mainResult = '';

    if (req.body.mstatus === 'F' || req.body.pstatus === 'F' || req.body.cstatus === 'F' || req.body.costatus === 'F' || req.body.estatus === 'F')
        mainResult = 'FAIL';
    else if ((total/5) < 33)
        mainResult = 'FAIL';
    else
        mainResult = 'PASS';
    
    let dbresponse = await academics.updateOne({ email: req.body.email }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        class: req.body.class,
        section: req.body.section,
        rollNumber: req.body.rollNumber,
        result: {
            maths: req.body.maths,
            physics: req.body.physics,
            chemistry: req.body.chemistry,
            computer: req.body.computer,
            english: req.body.english,
            mstatus: req.body.mstatus,
            pstatus: req.body.pstatus,
            cstatus: req.body.cstatus,
            costatus: req.body.costatus,
            estatus: req.body.estatus,
            finalResult: {
                total: total,
                percentage: String(total/5)+"%",
                status: mainResult
            }
        }
    })
    dbresponse = await credential.updateOne({ email: req.body.email }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    console.log(dbresponse)
    res.send("DATA RECEIVED");
    res.end();
}


const deleteStudent = async (req, res) => {
    let dbresponse = await academics.deleteOne({ email: req.body.email });
    dbresponse = await credential.deleteOne({ email: req.body.email });
    dbresponse = await academics.find({});
    res.send(dbresponse);
    res.end();
}

module.exports={
    admin: admin,
    viewStudent: viewStudent,
    updateStudent: updateStudent,
    getStudent: getStudent,
    deleteStudent: deleteStudent
}