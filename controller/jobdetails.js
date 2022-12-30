import Joi, { ref } from "joi";
import { Job } from "../models";

const jobdetailscontroller={
    async postJob(req,res,next){
        const registerSchema = Joi.object({
            categorgy: Joi.required(),
            category_enum:Joi.string().required(),
            compnayname:Joi.string().required(),
            compnaylocation:Joi.string().required(),
            companywebiste:Joi.string(),
            companyemail:Joi.string(),
            vacany:Joi.string(),
            jobnature:Joi.string(),
            salary:Joi.string().required(),
            jobdescription:Joi.string().required(),
            requiredSkills:Joi.string().required(),
            education:Joi.string().required(),
            jobnature:Joi.string().required(),
            

          });
          const { error } = registerSchema.validate(req.body);
          if (error) {
            return next(error);
          }
          const job = new Job({
            categorgy:req.body.categorgy,
            category_enum:Number(req.body.category_enum),
            compnayname:req.body.compnayname,
            compnaylocation:req.body.compnaylocation,
            companywebiste:req.body.companywebiste,
            companyemail:req.body.companyemail,
            vacany:req.body.vacany,
            jobnature:req.body.jobnature,
            salary:req.body.salary,
            jobdescription:req.body.jobdescription,
            requiredSkills:req.body.requiredSkills,
            education:req.body.education,
            
              });
          try{
            const result = await job.save();
            console.log("Result", result);
          }
          catch(error){
          console.log("Error",error)
          }
          res.json({ msg: "Job Creadted Sucessfully" });
    },

    async getJobDetails(req,res,next){
      const categoryId=req.body.categoryId;
     console.log("categoryId",categoryId)
      try{

        var result= await Job.collection.find({"category_enum":{$eq:categoryId}})
        const response=await result.forEach((data)=>{
            console.log("Data",data);
        })
    console.log("Result",result);
      }
      catch(error)
      {
        console.log("Error",error)
      }
    }
}
export default jobdetailscontroller;