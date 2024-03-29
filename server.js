import express from 'express';
import { APP_PORT, DB_URL } from './config';
import mongoose from 'mongoose';
import router from './routes';
import errorHandler from './middleware/errorHandler';
import path from 'path';
import cors from 'cors';
let morgan= require('morgan');

const app=express();
mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

app.use('/uploads',express.static('uploads'))
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json({limit:'50mb'}))
app.use(morgan('tiny'));

global.appRoot=path.resolve(__dirname);
app.use("/api",router)
app.use(errorHandler);
app.listen(APP_PORT,()=>{
    console.log("Server connected")
    console.log(`Server running on http://localhost:${APP_PORT}`)    
})