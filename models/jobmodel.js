import mongoose from "mongoose";
const Schema=mongoose.Schema;
const userschema=new Schema({
            categorgy:{type:String},
            category_enum:{type:Number},
            compnayname:{type:String},
            compnaylocation:{type:String},
            companywebiste:{type:String},
            companyemail:{type:String},
            vacany:{type:String},
            jobnature:{type:String},
            salary:{type:String},
            jobdescription:{type:String},
            requiredSkills:{type:String},
            education:{type:String},
            jobnature:{type:String},
    
},{timestamps:true})
export default mongoose.model("Job",userschema,'JobDB')