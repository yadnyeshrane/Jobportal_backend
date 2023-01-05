import Joi from "joi";
import { User } from "../models";
import CustomErrorHandler from "../service/CustomErrorHandler";
import bcrpyt from "bcrypt";

const logincontroller = {
    async login(req, res, next) {
        // console.log(req.body);
        const loginschema = Joi.object({
            mobileno: Joi.string()
                .min(10)
                .pattern(/^[0-9]+$/)
                .required(),
            password: Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
                .required(),
        });

        const { error } = loginschema.validate(req.body);
        if (error) {
            return next(error);
        }
        try {
            const userData = await User.findOne({
                mobileno: req.body.mobileno,
            });
            // console.log("USerData", userData.password);
            if (!userData) {
                return next(CustomErrorHandler.wronCredentails());
            }
            const comparepassword = await bcrpyt.compare(
                req.body.password,
                userData.password
            );
            if (!comparepassword) {
                return next(
                    CustomErrorHandler.wronCredentails("Password is Wrong")
                );
            }
        } catch (error) {
            //  console.log(error);
            return next(error);
        }
        res.json({ msg: "Login Sucessfully" });
    },
};

export default logincontroller;
