const credential = require('../MODELS/credential.js');
const academics=require('../MODELS/academic.js');

const admin=async(req,res)=>{
    let mainResponse=new Object();
    const dbResponseCred=await credential.find({userType:0});
    const dbResponseAcad=await academics.find({});
    mainResponse.dbResponseCred=dbResponseCred;
    mainResponse.dbResponseAcad=dbResponseAcad;
    console.log(mainResponse)
    res.send(mainResponse)
    res.end();
}

module.exports={
    admin:admin
}