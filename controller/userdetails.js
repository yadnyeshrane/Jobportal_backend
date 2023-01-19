import { User } from "../models";
import CustomErrorHandler from "../service/CustomErrorHandler";
import multer from "multer";
import fs from "fs";
import path from "path";
import Joi from "joi";
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        // 3746674586-836534453.png
        cb(null, uniqueName);
    },
});

const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 },
}).single("image"); // 5mb
//image-means api requet body field name

const userdetails = {
    async getDetails(req, res, next) {
        try {
            //  console.log("params",req.params.id)
            const userDetails = await User.findOne({ mobileno: req.params.id });
            if (!userDetails) {
                return next(CustomErrorHandler.datanotFound());
            }
            return res.json({ data: userDetails });
            console.log("UserDetsils", userDetails);
        } catch (err) {
            return next(err);
        }
    },
    async updateDetails(req, res, next) {
        // handleMultipartData(req,res,async(err)=>{
        //     if (err) {
        //         return next(CustomErrorHandler.serverError(err.message));
        //     }
        //     const filePath = req.file.path;
        //     const { error } = User.validate(req.body);
        //     if(error){
        //         fs.unlink(`${appRoot}/${filePath}`, (err) => {
        //             if (err) {
        //                 return next(
        //                     CustomErrorHandler.serverError(err.message)
        //                 );
        //         }
        //     }
        // }
        // })

        //   const userDetails=await User.findOneAndUpdate({_id:req.params.id},{
        //     name:req.body.name,
        //     email:req.body.email
        //   },{new:true})

        //   return res.json({msg:'Data updated suceffuly',data:userDetails})
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message));
            }
            let filePath;
            console.log("x", req.file);
            if (req.file) {
                filePath = req.file.path;
            }

            // validation
            // const { error } = User.validate(req.body);
            // if (error) {
            //     // Delete the uploaded file
            //     if (req.file) {
            //         fs.unlink(`${appRoot}/${filePath}`, (err) => {
            //             if (err) {
            //                 return next(
            //                     CustomErrorHandler.serverError(err.message)
            //                 );
            //             }
            //         });
            //     }

            //     return next(error);
            //     // rootfolder/uploads/filename.png
            // }

            const {
                name,
                surname,
                email,
                password,
                mobileno,
                image,
                addresLine_1,
                addresLine_2,
                pincode,
                country,
                state,
                nativeaddresLine_1,
                nativeaddresLine_2,
                nativepincode,
                educationdetails,
                occupation,
            } = req.body;
            let document;
            try {
                document = await User.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        name,
                        surname,
                        email,
                        password,
                        mobileno,
                        addresLine_1,
                        addresLine_2,
                        pincode,
                        country,
                        state,
                        nativeaddresLine_1,
                        nativeaddresLine_2,
                        nativepincode,
                        occupation,
                        educationdetails,
                        ...(req.file && { image: filePath }),
                    },
                    { new: true }
                );
            } catch (err) {
                return next(err);
            }
            res.status(201).json(document);
        });
    },
};

export default userdetails;
