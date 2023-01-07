import { Employee } from "../models"

const empoloyejobController={
    async employyeregister(data){
      console.log("Data",data)
      const defaultobject={
          
          headline: "",
          job_exp: "",
          objective: "",
          relocateFlag: "",
          lookingJob: "",
          prefered_job_sector: "",
          work_Details:"",
          education_Details:[],
          skills: "",
          language_known: "",
          online_profile: "",
          certification_Details:"",
          project_Details:"",
      }

      const employyeDetails={...data,...defaultobject}
      console.log("Employye details",employyeDetails)
      const employeData=new Employee(employyeDetails);
      try{
const response=await employeData.save();
console.log("Response",response);
      }
      catch(error)
      {
        console.log("Error",response);
      }
      }
    }



export default empoloyejobController