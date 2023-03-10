import express from "express";
import empoloyejobController from "../controller/employyedetails";
import jobdetailscontroller from "../controller/jobdetails";
import logincontroller from "../controller/logincontroller";
import registercontroller from "../controller/registercontroller";
import userdetails from "../controller/userdetails";


const router=express.Router();

router.post("/register",registercontroller.register);
router.post("/login",logincontroller.login);
router.get("/user/:id",userdetails.getDetails);
router.put("/user/:id",userdetails.updateDetails);
router.post("/postjob",jobdetailscontroller.postJob);
router.post("/getparticularjobdetails",jobdetailscontroller.getJobDetails);
router.get("/getjobsbycategory/:cat_id",jobdetailscontroller.getJobByCategory);
router.get("/employee/:id",empoloyejobController.getEmployyeRegister)
router.put("/employee/:id",empoloyejobController.updateEmployyeRegister);
//based on id
router.get("/getJobDetails/:id",jobdetailscontroller.getDetials);

router.get("/get-emp-by-category/:cat_id",empoloyejobController.getCategorizeEmployye);//filter the job based on id & change for job yesflag

router.get("/get-emp-all-details/:user_mobile",empoloyejobController.getEmpAllDetails);//get all employyedetails including profille  & Employye Detials
router.get("/get-joblist-posted-byuser/:creator_id",jobdetailscontroller.getEmpJobCreatedDetails)//employe who created the jobs
router.put("/jobposted-update",jobdetailscontroller.updateEmpJobCreatedDetails);//update the job created by employyers
router.delete("/jobposted-delete/:id",jobdetailscontroller.deleteJobCreated);//update the job created by employyers
router.get("/civilservices",userdetails.getCivilServicesDetails);
export default router;