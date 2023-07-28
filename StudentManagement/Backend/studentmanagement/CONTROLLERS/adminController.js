const credential = require('../MODELS/credential.js');
const academics=require('../MODELS/academic.js');

const admin=async(req,res)=>{
    const dbResponseAcad=await academics.find({});
    res.send(dbResponseAcad)
    res.end();
}

module.exports={
    admin:admin
}