import mongoose from "mongoose";
const Schema = mongoose.Schema;
const employeSchema = new Schema(
    {
        firstname: { type: String },
        lastname: { type: String },
        email: { type: String },

        mobileno: { type: String },
        headline: { type: String },
        job_exp: { type: String },
        objective: { type: String },
        relocateFlag: { type: String },
        lookingJob: { type: String },
        prefered_job_sector: { type: String },
        work_Details: { type: String },
        education_Details: { type: Array },
        skills: { type:String },
        language_known: { type: String },
        online_profile: { type: String },
        certification_Details: { type: String },
        project_Details: { type: String },
    },
    { timestamps: true }
);
export default mongoose.model("Employee", employeSchema, "Employee");
