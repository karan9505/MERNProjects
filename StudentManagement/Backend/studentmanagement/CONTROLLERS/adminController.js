const credential = require('../MODELS/credential.js');
const academics=require('../MODELS/academic.js');

const admin=async(req,res)=>{
    const dbResponseAcad=await academics.find({});
    res.send(dbResponseAcad)
    console.log("ALL STUDENTS")
    res.end();
}

const viewStudent = async (req, res) => {
    const dbresponse = await academics.findOne({ _id: req.body.studentId })
    res.send(dbresponse);
    res.end();
}

const updateStudent = async (req, res) => {
    let percentage = (req.body.result.maths + req.body.result.physics + req.body.result.chemistry + req.body.result.computer + req.body.result.english) / 5;
    console.log(percentage)
    res.send("DATA RECEIVED");
    res.end();
}

module.exports={
    admin: admin,
    viewStudent: viewStudent,
    updateStudent: updateStudent
}