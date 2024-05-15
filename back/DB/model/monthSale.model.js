import mongoose, { model, Schema } from "mongoose";

const SalingMonthlySchema = new Schema({

    month: {
        type: Number,
        required: true
    },
    companyName:{
        type:String,
        required:true
    },
    saling:[{
        type: Array,
        ref:'sale'

    }]


})
const salingMonthlyModel=model('monthlySale',SalingMonthlySchema)
export {salingMonthlyModel}