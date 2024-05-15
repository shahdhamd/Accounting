import { model, Schema } from 'mongoose'
const buySchema = new Schema({
    pieces: {
        type: String,
        required: true
    },
    NumbersOfPieces: {
        type: Number,
        required: true

    },
    price: {
        type: Number,
        required: true

    },
    typeOfpieces:{
        type:String,
    }

})
const byModel=model('buy',buySchema)
export {byModel}
