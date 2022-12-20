import {ValidationError} from 'joi'
import { DEBUG_MODE } from '../config';
import CustomErrorHandler from '../service/CustomErrorHandler';

const errorHandler=(err,req,res,next)=>{
    let statuscode=500;
    let data={
        message:"Internal Server error",
        ...(DEBUG_MODE==="true" && { originalerror:err.message})
       
    }
    if(err instanceof ValidationError)
    {
        statuscode=422;
        data={
            message:err.message
        }
    }
    if(err instanceof CustomErrorHandler)
    {
        console.log("Error",err)
        statuscode=err.status
        data={
            message:err.message
        }
    }
    return res.status(statuscode).json(data);
}

export default errorHandler;