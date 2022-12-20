import Joi, { ref } from "joi";
import CustomErrorHandler from "../service/CustomErrorHandler";
import bcrpyt from 'bcrypt';
import { User } from "../models";



const registercontroller = {
  async register(req, res, next) {
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      surname: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
        mobileno:Joi.string().min(10).pattern(/^[0-9]+$/).required(),
        image:Joi.string()
      //repeat_password:Joi.ref(password)
    });
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    try{
        //check if the user alredy exist
        const exist=await User.exists({mobileno:req.body.mobileno})
       console.log("Exist--",exist)
        if(exist)
        {
        //    console.log("inside")
            return next(CustomErrorHandler.alreadyExist("This user is already registerd"))
        }

    }
    catch(error)
    {
     return next(error);
    }

    const hashedpass=await bcrpyt.hash(req.body.password,10)
    const user=new User({
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        password:hashedpass,
        mobileno:req.body.mobileno,
        image:''
    })
    //Register user
    console.log("USer",user);
    try{
        const result=await user.save()
        console.log("Result",result)

    }
    catch(error)
    {
   //     console.log(error)

    }
   res.json({msg:"Regsitered Sucessfully"})

  },
};

export default registercontroller;
