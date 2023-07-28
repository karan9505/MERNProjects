const credential = require('../MODELS/credential.js');
const academics=require('../MODELS/academic.js')

const student=async (req,res)=>{
    let result=await credential.find({});
    res.send(result)
}

const studentLogin=async (req,res)=>{
    console.log("Login API Accessed")
    let studentEmail=await credential.findOne({email:req.body.email});
    if(studentEmail===null || req.body.userType!==studentEmail.userType){
        console.log("Invalid email");
        res.send({message:"Invalid email"});
        res.end()
        return;
    }
    else if(studentEmail.password!==req.body.password){
        console.log("Invalid password");
        res.send({message:"Invalid password"});
        res.end()
        return;
    }
    else{
        console.log("Valid Login Data");
        res.send(studentEmail);
        res.end()
        return;
    }
}

const studentSignup=async (req,res)=>{
    console.log("SignUp API Accessed");
    let checkEmail=await credential.find({email:req.body.email}).count();
    if(checkEmail){
        res.send({message:"student already exist"})
        res.end()
        return;
    }
    let newEntry=new credential(req.body);
    let dbResponse=await newEntry.save();
    if(dbResponse._id!=="")
        res.send({message:"Signup Successful"})
    if(req.body.userType===0){
        let newAcademic=new academics({
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
        });
        dbResponse=await newAcademic.save();
    }
    res.end();
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