import express from "express";
import logincontroller from "../controller/logincontroller";
import registercontroller from "../controller/registercontroller";
import userdetails from "../controller/userdetails";

const router=express.Router();

router.post("/register",registercontroller.register);
router.post("/login",logincontroller.login);
router.get("/user/:id",userdetails.getDetails);
router.put("/user/:id",userdetails.updateDetails);
export default router;