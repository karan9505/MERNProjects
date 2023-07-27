const credential = require('../MODELS/credential.js');

const user=async (req,res)=>{
    let result=await credential.find({});
    res.send(result)
}

const userLogin=async (req,res)=>{
    let userEmail=await credential.findOne({email:req.body.email});
    if(userEmail===null || req.body.userType!==userEmail.userType){
        console.log("Invalid email");
        res.send({message:"Invalid email"});
        res.end()
        return;
    }
    else if(userEmail.password!==req.body.password){
        console.log("Invalid password");
        res.send({message:"Invalid password"});
        res.end()
        return;
    }
    else{
        console.log("Valid Login Data");
        res.send(userEmail);
        res.end()
        return;
    }
}

const userSignup=async (req,res)=>{
    console.log("SignUp API Accessed");
    let checkEmail=await credential.find({email:req.body.email}).count();
    if(checkEmail){
        res.send({message:"User already exist"})
        res.end()
        return;
    }
    let newEntry=new credential(req.body);
    let dbResponse=await newEntry.save();
    if(dbResponse._id!=="")
        res.send({message:"Signup Successful"})
    res.end();
}

const userUpdate=async (req,res)=>{
    res.send("User Update");
    res.end();
}

const userSearch=async (req,res)=>{
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
    user:user,
    userLogin:userLogin,
    userSignup:userSignup,
    userUpdate:userUpdate,
    userSearch:userSearch
}