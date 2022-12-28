import mongoose from "mongoose";
const Schema=mongoose.Schema;


const userschema=new Schema({
    name:{type:String,required:true},
    surname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    mobileno:{type:String,required:true,unique:true},
    image:{type: String},
    addresLine_1:{type:String},
    addresLine_2:{type:String},
    pincode:{type:String},
    country:{type:String},
    state:{type:String},
    nativeaddresLine_1:{type:String},
    nativeaddresLine_2:{type:String},
    nativepincode:{type:String},
    
},{timestamps:true})

export default mongoose.model("User",userschema,'Register')