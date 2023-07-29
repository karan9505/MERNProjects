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

module.exports={
    admin: admin,
    viewStudent: viewStudent
}