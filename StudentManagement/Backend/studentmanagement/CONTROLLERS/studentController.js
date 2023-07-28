const credential = require('../MODELS/credential.js');
const academics=require('../MODELS/academic.js')

const student=async (req,res)=>{
    let result=await credential.find({});
    res.send(result)
}

const studentLogin=async (req,res)=>{
    
}

const studentSignup=async (req,res)=>{
    
}

const studentUpdate=async (req,res)=>{
    res.send("student Update");
    res.end();
}

const studentSearch=async (req,res)=>{
    let data=await credential.find(
        {
            "$or":[
                {"firstName":{$regex:req.body.key}}
            ]
        }
    )
    res.send(data)
}



module.exports={
    student:student,
    studentLogin:studentLogin,
    studentSignup:studentSignup,
    studentUpdate:studentUpdate,
    studentSearch:studentSearch
}