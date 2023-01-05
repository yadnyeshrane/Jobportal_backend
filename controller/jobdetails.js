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
            jobdescription:Joi.string().required(),
            requiredSkills:Joi.string().required(),
            education:Joi.string().required(),
            jobnature:Joi.string().required(),
            comapny_mob:Joi.string(),
            comapny_aletrmob:Joi.string(),
            adressline_1:Joi.string(),
            adressline_2:Joi.string(),
            state:Joi.string(),
            country:Joi.string(),
            postcode:Joi.string(),
            position:Joi.string(),
            min_exp:Joi.string(),
            max_exp:Joi.string(),
            min_salary:Joi.string(),
            max_salary:Joi.string(),
            

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
            comapny_mob:req.body.comapny_mob,
            comapny_aletrmob:req.body.comapny_aletrmob,
            vacany:req.body.vacany,
            jobnature:req.body.jobnature,
            salary:req.body.salary,
            jobdescription:req.body.jobdescription,
            requiredSkills:req.body.requiredSkills,
            education:req.body.education,
            adressline_1:req.body.adressline_1,
            adressline_2:req.body.adressline_2,
            state:req.body.state,
            country:req.body.country,
            postcode:req.body.postcode,
            position:req.body.position,
            min_exp:Number(req.body.min_exp),
            max_exp:Number(req.body.max_exp),
            min_salary:Number(req.body.min_salary),
            max_salary:Number(req.body.max_salary),
            
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
     var tempArray=[];
      try{
        
        var result= await Job.collection.find({"category_enum":{$eq:categoryId}})
        const response=await result.forEach((data)=>{
            console.log("Data",data);
            tempArray.push(data);
        })
    console.log("Result",result);
      }
      catch(error)
      {
        console.log("Error",error)
      }
      return res.json({"data":tempArray});
    }
}
export default jobdetailscontroller;