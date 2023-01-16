import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userschema = new Schema(
    {
        categorgy: { type: String },
        category_enum: { type: Number },
        compnayname: { type: String },
        compnaylocation: { type: String },
        companywebiste: { type: String },
        companyemail: { type: String },
        vacany: { type: String },
        jobnature: { type: String },
        salary: { type: String },
        jobdescription: { type: String },
        requiredSkills: { type: String },
        education: { type: String },
        jobnature: { type: String },
        comapny_mob: { type: String },
        comapny_aletrmob: { type: String },
        adressline_1: { type: String },
        adressline_2: { type: String },
        state: { type: String },
        country: { type: String },
        postcode: { type: String },
        position: { type: String },
        min_exp: { type: Number },
        max_exp: { type: Number },
        min_salary: { type: Number },
        max_salary: { type: Number },
    creatorId: { type: String },
    },
    { timestamps: true }
);
export default mongoose.model("Job", userschema, "JobDB");
