import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./DB/connection.js";
import * as indexRouter from './src/module/index.route.js'
const  app=express();
 
dotenv.config()
app.use(express.json())
connectDB()

const port=process.env.port;
app.use(cors());
app.use('/api/v1/buy',indexRouter.buyRouter)
app.use('/api/v1/sale',indexRouter.saleRouter)
app.use('*',(req,res)=>{
res.status(404).json({message:"page not found"})
})
app.listen(port,()=>{
    console.log(`server run in ${port}`)    


})