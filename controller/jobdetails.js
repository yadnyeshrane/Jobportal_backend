import Joi, { ref } from "joi";
import { Job } from "../models";
import CustomErrorHandler from "../service/CustomErrorHandler";
var ObjectID = require("mongodb").ObjectId;

const jobdetailscontroller = {
    async postJob(req, res, next) {
        const registerSchema = Joi.object({
            categorgy: Joi.required(),
            category_enum: Joi.string().required(),
            compnayname: Joi.string().required(),
            compnaylocation: Joi.string(),
            companywebiste: Joi.string(),
            companyemail: Joi.string(),
            vacany: Joi.string(),
            jobnature: Joi.string(),
            jobdescription: Joi.string().required(),
            requiredSkills: Joi.string().required(),
            education: Joi.string().required(),
            jobnature: Joi.string().required(),
            comapny_mob: Joi.string(),
            comapny_aletrmob: Joi.string(),
            adressline_1: Joi.string(),
            adressline_2: Joi.string(),
            state: Joi.string(),
            country: Joi.string(),
            postcode: Joi.string(),
            position: Joi.string(),
            min_exp: Joi.string(),
            max_exp: Joi.string(),
            min_salary: Joi.string(),
            max_salary: Joi.string(),
            creatorId: Joi.string(),
        });
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const job = new Job({
            categorgy: req.body.categorgy,
            category_enum: Number(req.body.category_enum),
            comapny_mob: req.body.comapny_mob,
            comapny_aletrmob: req.body.comapny_aletrmob,
            compnayname: req.body.compnayname,
            compnaylocation: req.body.compnaylocation,
            companywebiste: req.body.companywebiste,
            companyemail: req.body.companyemail,
            vacany: req.body.vacany,
            jobnature: req.body.jobnature,
            salary: req.body.salary,
            jobdescription: req.body.jobdescription,
            requiredSkills: req.body.requiredSkills,
            education: req.body.education,
            adressline_1: req.body.adressline_1,
            adressline_2: req.body.adressline_2,
            state: req.body.state,
            country: req.body.country,
            postcode: req.body.postcode,
            position: req.body.position,
            min_exp: Number(req.body.min_exp),
            max_exp: Number(req.body.max_exp),
            min_salary: Number(req.body.min_salary),
            max_salary: Number(req.body.max_salary),
            creatorId: req.body.creatorId,
        });
        try {
            const result = await job.save();
            console.log("Result", result);
        } catch (error) {
            console.log("Error", error);
        }
        res.json({ msg: "Job Creadted Sucessfully" });
    },

    async getJobDetails(req, res, next) {
        console.log(req);
        const categoryId = req.body.categoryId;
        console.log("categoryId", categoryId);
        var tempArray = [];
        try {
            var result = await Job.collection.find({
                category_enum: { $eq: categoryId },
            });
            const response = await result.forEach((data) => {
                console.log("Data", data);
                tempArray.push(data);
            });
            console.log("Result", result);
        } catch (error) {
            console.log("Error", error);
        }
        return res.json({ data: tempArray });
    },
    async getDetials(req, res, next) {
        console.log(req);
        const categoryId = req.params.id;
        console.log("categoryId", categoryId);
        var tempArray = [];
        try {
            var result = await Job.findOne({
                _id: categoryId,
            });
            if (!result) {
                return next(CustomErrorHandler.datanotFound());
            }
            return res.json({ data: result });
            console.log("Result", result);
        } catch (error) {
            console.log("Error", error);
        }
    },

    async getJobByCategory(req, res, next) {
        const categoryId = parseInt(req.params.cat_id);
        var tempArray = [];
        // var usersProjection = {

        //     _id: 0
        // };
        try {
            let result;
            categoryId == 0
                ? (result = Job.collection.find({}))
                : (result = Job.collection.find({
                      category_enum: { $eq: categoryId },
                  }));
            console.log("Result", result);
            const response = await result.forEach((data) => {
                console.log("Data", data);
                tempArray.push(data);
            });
            // console.log("Result", response);
            // console.log("Result", result);
        } catch (error) {
            console.log("Error", error);
        }
        return res.json({ data: tempArray });
    },
    async getEmpJobCreatedDetails(req, res, next) {
        const jobCreatorId = req.params.creator_id;
        console.log("Cre", jobCreatorId);
        let tempArray = [];
        try {
            let result = Job.collection.find({
                creatorId: { $eq: jobCreatorId },
            });
            console.log("Result", result.length);
            const response = await result.forEach((data) => {
                console.log("Data", data);
                tempArray.push(data);
            });
            if (tempArray.length == 0) {
                return next(CustomErrorHandler.datanotFound());
            }
            console.log("Response", tempArray);
            return res.json({ data: tempArray });
        } catch (err) {
            console.log("Error", err);
        }
    },
    async updateEmpJobCreatedDetails(req, res, next) {
        const updateSchema = Joi.object({
            _id: Joi.string(),
            categorgy: Joi.required(),
            category_enum: Joi.string().required(),
            compnayname: Joi.string().required(),
            compnaylocation: Joi.string(),
            companywebiste: Joi.string(),
            companyemail: Joi.string(),
            vacany: Joi.string(),
            jobnature: Joi.string(),
            jobdescription: Joi.string().required(),
            requiredSkills: Joi.string().required(),
            education: Joi.string().required(),
            jobnature: Joi.string().required(),
            comapny_mob: Joi.string(),
            comapny_aletrmob: Joi.string(),
            adressline_1: Joi.string(),
            adressline_2: Joi.string(),
            state: Joi.string(),
            country: Joi.string(),
            postcode: Joi.string(),
            position: Joi.string(),
            min_exp: Joi.string(),
            max_exp: Joi.string(),
            min_salary: Joi.string(),
            max_salary: Joi.string(),
            creatorId: Joi.string(),
        });
        const { error } = updateSchema.validate(req.body);
        console.log("Error", error);
        if (error) {
            return next(error);
        }
        const updatejobData = new Job({
            categorgy: req.body.categorgy,
            category_enum: Number(req.body.category_enum),
            comapny_mob: req.body.comapny_mob,
            comapny_aletrmob: req.body.comapny_aletrmob,
            compnayname: req.body.compnayname,
            compnaylocation: req.body.compnaylocation,
            companywebiste: req.body.companywebiste,
            companyemail: req.body.companyemail,
            vacany: req.body.vacany,
            jobnature: req.body.jobnature,
            salary: req.body.salary,
            jobdescription: req.body.jobdescription,
            requiredSkills: req.body.requiredSkills,
            education: req.body.education,
            adressline_1: req.body.adressline_1,
            adressline_2: req.body.adressline_2,
            state: req.body.state,
            country: req.body.country,
            postcode: req.body.postcode,
            position: req.body.position,
            min_exp: Number(req.body.min_exp),
            max_exp: Number(req.body.max_exp),
            min_salary: Number(req.body.min_salary),
            max_salary: Number(req.body.max_salary),
            creatorId: req.body.creatorId,
        });
        let document;

        try {
            document = await Job.findOneAndUpdate(
                { _id: req.body._id },
                {
                    categorgy: req.body.categorgy,
                    category_enum: Number(req.body.category_enum),
                    comapny_mob: req.body.comapny_mob,
                    comapny_aletrmob: req.body.comapny_aletrmob,
                    compnayname: req.body.compnayname,
                    compnaylocation: req.body.compnaylocation,
                    companywebiste: req.body.companywebiste,
                    companyemail: req.body.companyemail,
                    vacany: req.body.vacany,
                    jobnature: req.body.jobnature,
                    salary: req.body.salary,
                    jobdescription: req.body.jobdescription,
                    requiredSkills: req.body.requiredSkills,
                    education: req.body.education,
                    adressline_1: req.body.adressline_1,
                    adressline_2: req.body.adressline_2,
                    state: req.body.state,
                    country: req.body.country,
                    postcode: req.body.postcode,
                    position: req.body.position,
                    min_exp: Number(req.body.min_exp),
                    max_exp: Number(req.body.max_exp),
                    min_salary: Number(req.body.min_salary),
                    max_salary: Number(req.body.max_salary),
                    creatorId: req.body.creatorId,
                },
                { new: true }
            );
        } catch (error) {
            console.log("Error", error);
        }
        res.status(200).json(document);
    },
    async deleteJobCreated(req, res, next) {
        const uniqueId = req.params.id;
        try {
            const response = await Job.deleteOne({ _id: ObjectID(uniqueId) });
        } catch (error) {
            return CustomErrorHandler.serverError(err.message);
        }
        return res.status(200).json({ msg: "data deleted sucessfully" });

        console.log("Response", response);
    },
};
export default jobdetailscontroller;
