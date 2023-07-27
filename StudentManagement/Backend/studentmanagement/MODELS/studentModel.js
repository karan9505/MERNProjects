const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },

    lastName:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true,
    },

    roll:{
        type:Number,
        required:true
    },

    scienceMarks:{
        type:Number,
        require:true
    },
    mathsMarks:{
        type:Number,
        require:true
    },

    socialMarks:{
        type:Number,
        require:true
    },
    englishMarks:{
        type:Number,
        require:true
    },
    hindiMarks:{
        type:Number,
        require:true
    },
    percentage:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    result:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('studentTable',studentSchema);