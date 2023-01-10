import { Employee } from "../models";
import CustomErrorHandler from "../service/CustomErrorHandler";

const empoloyejobController = {
    async employyeregister(data) {
        console.log("Data", data);
        const defaultobject = {
            headline: "",
            job_exp: "",
            objective: "",
            relocateFlag: "",
            lookingJob: "",
            prefered_job_sector: "",
            work_Details: "",
            education_Details: [],
            skills: "",
            language_known: "",
            online_profile: "",
            certification_Details: "",
            project_Details: "",
        };

        const employyeDetails = { ...data, ...defaultobject };
        console.log("Employye details", employyeDetails);
        const employeData = new Employee(employyeDetails);
        try {
            const response = await employeData.save();
            console.log("Response", response);
        } catch (error) {
            console.log("Error", response);
        }
    },
    async updateEmployyeRegister(req, res, next) {
        const {
            id,
            firstname,
            lastname,
            email,
            mobileno,
            headline,
            job_exp,
            objective,
            relocateFlag,
            lookingJob,
            prefered_job_sector,
            work_Details,
            education_Details,
            skills,
            language_known,
            online_profile,
            certification_Details,
            project_Details,
        } = req.body;
        let document;
        console.log("Id",id)
        try {
            document=await Employee.findOneAndUpdate({_id:id},{$set:{
                firstname,
                lastname,
                email,
                mobileno,
                headline,
                job_exp,
                objective,
                relocateFlag,
                lookingJob,
                prefered_job_sector,
                work_Details,
                education_Details,
                skills,
                language_known,
                online_profile,
                certification_Details,
                project_Details
            }},{ new: true })
        } catch (error) {
            console.log("Error",error)
            return next(err);
        }
     //   console.log("document",document)
        res.status(200).json({msg:"Details updated sucessfully"});
    },
    async getEmployyeRegister(req, res, next) {
        try {
            const userDetails = await Employee.findOne({
                mobileno: req.params.id,
            });
            if (!userDetails) {
                return next(CustomErrorHandler.datanotFound());
            }
            return res.json({ data: userDetails });
            console.log("UserDetsils", userDetails);
        } catch (err) {
            return next(err);
        }
    },
};

export default empoloyejobController;