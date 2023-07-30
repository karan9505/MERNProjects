const mongoose=require('mongoose');

const credentialSchema=new mongoose.Schema({
    firstName:{type:String,required:true},

    lastName:{type:String,required:true},

    email:{unique:true,type:String,required:true,dropDups:true},

    password:{type:String,required:true},

    userType: { type: Number, min: 0, max: 1 },
    
    image:{type:String}
})

module.exports=mongoose.model('credential',credentialSchema);