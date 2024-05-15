import mongoose, { model, Schema } from "mongoose";

const biyingMonthlySchema = new Schema({

    month: {
        type: Number,
        required: true
    },
    
    buying: [{
        type: Array,
        ref: 'buy'
    }],
 


})
const biyingMonthlyModel=model('monthly',biyingMonthlySchema)
export {biyingMonthlyModel}