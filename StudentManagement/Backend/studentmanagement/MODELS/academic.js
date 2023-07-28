const mongoose=require('mongoose');

const academicsSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true,dropDups:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    class:{type:Number,min:0,max:100,default:0},
    section:{type:String,maxlength: 1,default:'-'},
    rollNumber:{type:Number,min:0,default:0},
    result:{
        maths:{type:Number,min:0,max:100,default:0},
        physics:{type:Number,min:0,max:100,default:0},
        chemistry:{type:Number,min:0,max:100,default:0},
        computer:{type:Number,min:0,max:100,default:0},
        english:{type:Number,min:0,max:100,default:0},
        finalResult:{
            total:{type:Number,max:500,default:0},
            percentage: { type: String, maxlength: 5,default:"0.00%"},
            status:{type:String,maxlength:4,default:"FAIL"}
        }
    }
})
module.exports=mongoose.model('academics',academicsSchema);